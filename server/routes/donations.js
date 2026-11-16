const express = require('express');
const router = express.Router();
const { neon } = require('@neondatabase/serverless');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const { generate80GPdf } = require('../utils/receiptGenerator');

const sql = neon(process.env.DATABASE_URL);

// Razorpay Client
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_TZvGeQCY7vlXkN';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || '1JW57CgzaHDoDZPOev5p5Q14';
  return new Razorpay({
    key_id,
    key_secret
  });
};

// Route to get Razorpay public key
router.get('/razorpay-key', (req, res) => {
  res.json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID || 'rzp_test_TZvGeQCY7vlXkN'
  });
});

// Route to create a Razorpay standard order for real donation processing
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;
    const numericAmount = Math.round(Number(amount));
    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid donation amount' });
    }

    const instance = getRazorpayInstance();
    const options = {
      amount: numericAmount * 100, // paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || { organization: 'Hanish Charity Foundation' }
    };

    const order = await instance.orders.create(options);
    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_TZvGeQCY7vlXkN'
    });
  } catch (error) {
    console.error('Razorpay create-order error:', error);
    res.status(500).json({
      success: false,
      message: error?.error?.description || error.message || 'Unable to create Razorpay order'
    });
  }
});

// Route to verify Razorpay payment signature
router.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification parameters' });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || '1JW57CgzaHDoDZPOev5p5Q14';
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Razorpay verify error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'helpinghands/donations',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf']
  }
});
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Route to handle donation form submission
router.post('/donate', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'aadhaar_front', maxCount: 1 },
  { name: 'aadhaar_back', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
    
    // Extract file URLs if they were uploaded
    const profile_pic_url = req.files && req.files['profile_picture'] ? req.files['profile_picture'][0].path : null;
    const aadhaar_front_url = req.files && req.files['aadhaar_front'] ? req.files['aadhaar_front'][0].path : null;
    const aadhaar_back_url = req.files && req.files['aadhaar_back'] ? req.files['aadhaar_back'][0].path : null;

    // Use the transaction ID from the client (Razorpay ID), or generate a random one if not provided
    const txn_id = data.txn_id || ('TXN' + crypto.randomBytes(4).toString('hex').toUpperCase());
    const amountStr = data.amount ? data.amount.replace(/[^0-9]/g, '') : "0";

    // Allow parsing campaign_id if present
    const campaign_id = data.campaign_id ? parseInt(data.campaign_id) : null;

    // Insert into database
    await sql`
      INSERT INTO donations (
        amount, payment_method, recurring, designation, name, gender,
        parent_name, dob, profession, blood_group, email, phone,
        aadhaar, state, district, working_area, pincode, address,
        profile_pic_url, aadhaar_front_url, aadhaar_back_url, txn_id, campaign_id, status, pan_number, requests_80g
      ) VALUES (
        ${amountStr}, ${data.payment_method}, ${data.recurring === 'true'}, ${data.designation}, ${data.name}, ${data.gender},
        ${data.parent_name}, ${data.dob || null}, ${data.profession}, ${data.blood_group}, ${data.email}, ${data.phone},
        ${data.aadhaar}, ${data.state}, ${data.district}, ${data.working_area}, ${data.pincode}, ${data.address},
        ${profile_pic_url}, ${aadhaar_front_url}, ${aadhaar_back_url}, ${txn_id}, ${campaign_id}, 'success', ${data.pan_number || null}, ${data.requests_80g === 'true'}
      )
    `;

    // Send 80G Receipt if requested and email is provided
    if (data.requests_80g === 'true' && data.email) {
      try {
        const donationData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          amount: amountStr,
          txn_id: txn_id,
          pan_number: data.pan_number,
          designation: data.designation,
          payment_method: data.payment_method
        };
        const pdfBuffer = await generate80GPdf(donationData);
        
        await transporter.sendMail({
          from: `"Hanish Charity Foundation" <${process.env.SMTP_USER}>`,
          to: data.email,
          subject: 'Your 80G Tax Exemption Receipt — Hanish Charity Foundation',
          text: `Dear ${data.name},\n\nThank you for your generous charitable contribution of Rs. ${amountStr}/- to Hanish Charity Foundation. Please find attached your official 80G Tax Exemption Receipt.\n\nWarm regards,\nHanish Charity Foundation\nSerilingampally, K.V. Rangareddy, Telangana, India`,
          attachments: [
            {
              filename: `80G_Receipt_${txn_id}.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf'
            }
          ]
        });
      } catch (pdfErr) {
        console.error('Error generating or sending PDF:', pdfErr);
      }
    }

    res.json({ success: true, message: 'Donation registered successfully', txn_id, profile_pic_url });
  } catch (error) {
    console.error('Donate error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route for admin to get all donations
router.get('/all', async (req, res) => {
  try {
    // Optionally join campaigns to show campaign name in standard donations list
    const donations = await sql`
      SELECT d.*, c.name as campaign_name 
      FROM donations d
      LEFT JOIN campaigns c ON d.campaign_id = c.id
      ORDER BY d.id DESC
    `;
    res.json({ success: true, donations });
  } catch (error) {
    console.error('Fetch donations error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
