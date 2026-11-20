const express = require('express');
const router = express.Router();
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const nodemailer = require('nodemailer');

const sql = neon(process.env.DATABASE_URL);

// In-memory OTP store (email -> { otp, expiresAt })

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'helpinghands/volunteers',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf']
  }
});
const upload = multer({ storage: storage });

const otpStore = {};

// Config nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, '')
  }
});

// Route: Send Registration OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    
    // Check if email already registered
    const existing = await sql`SELECT id, status FROM users WHERE LOWER(TRIM(email)) = LOWER(TRIM(${email}))`;
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'This email is already registered. Please go to Volunteer Login.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store in memory
    otpStore[email.toLowerCase().trim()] = { otp, expiresAt };

    // Send email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Hanish Charity Foundation" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Volunteer Verification OTP — Hanish Charity Foundation",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
            <div style="background: #0b2545; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: 0.5px;">Hanish Charity Foundation</h2>
              <p style="margin: 4px 0 0; font-size: 11px; color: #e5a93c; text-transform: uppercase; font-weight: bold;">Volunteer Registration Verification</p>
            </div>
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 14px; margin-top: 0;">Dear <strong>${name || 'Volunteer'}</strong>,</p>
              <p style="font-size: 13px; line-height: 1.6; color: #475569;">
                Thank you for your noble interest in joining <strong>Hanish Charity Foundation</strong> as a dedicated volunteer. Please use the following One-Time Password (OTP) to complete your registration:
              </p>
              <div style="text-align: center; margin: 24px 0;">
                <span style="display: inline-block; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #0b2545; background: #fef7ea; border: 2px dashed #e5a93c; padding: 12px 28px; border-radius: 12px;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
                This OTP is valid for <strong>10 minutes</strong>. After submitting your application, our administration team will review your documents for approval.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Hanish Charity Foundation &bull; Humanity First. Compassion Always.
              </div>
            </div>
          </div>
        `
      });
      console.log(`Registration OTP sent to ${email}`);
    } else {
      console.warn(`>>> OTP for ${email}: ${otp} <<<`);
    }

    res.json({ success: true, message: 'OTP sent to your email. Please verify.' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP email: ' + error.message });
  }
});

// Route: Send Login OTP (for approved volunteers)
router.post('/login-send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const normalizedEmail = email.toLowerCase().trim();
    const users = await sql`
      SELECT id, name, email, status, role 
      FROM users 
      WHERE LOWER(TRIM(email)) = ${normalizedEmail}
    `;

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'No registered volunteer found with this email. Please apply first.' });
    }

    const user = users[0];

    // Check status: must be approved by admin
    if (user.status !== 'approved') {
      if (user.status === 'pending') {
        return res.status(403).json({ 
          success: false, 
          message: 'Your volunteer application is currently pending admin approval. You will receive an email once approved.' 
        });
      } else if (user.status === 'rejected') {
        return res.status(403).json({ 
          success: false, 
          message: 'Your volunteer application was not approved. Please contact Hanish Charity Foundation administration for details.' 
        });
      }
      return res.status(403).json({ success: false, message: 'Account status: ' + (user.status || 'not approved') });
    }

    // Generate 6-digit Login OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore[normalizedEmail] = { otp, expiresAt, isLogin: true, userId: user.id };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Hanish Charity Foundation" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Your Volunteer Login OTP — Hanish Charity Foundation",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
            <div style="background: #0b2545; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: 0.5px;">Hanish Charity Foundation</h2>
              <p style="margin: 4px 0 0; font-size: 11px; color: #e5a93c; text-transform: uppercase; font-weight: bold;">Volunteer Portal Login Verification</p>
            </div>
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 14px; margin-top: 0;">Welcome back, <strong>${user.name}</strong>!</p>
              <p style="font-size: 13px; line-height: 1.6; color: #475569;">
                Here is your secure One-Time Password (OTP) to access your Volunteer Portal and ID card:
              </p>
              <div style="text-align: center; margin: 24px 0;">
                <span style="display: inline-block; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #0b2545; background: #fef7ea; border: 2px dashed #e5a93c; padding: 12px 28px; border-radius: 12px;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
                This OTP is valid for <strong>10 minutes</strong>. If you did not request this login code, please secure your email account.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Hanish Charity Foundation &bull; Humanity First. Compassion Always.
              </div>
            </div>
          </div>
        `
      });
      console.log(`Login OTP sent to ${user.email}`);
    } else {
      console.warn(`>>> Login OTP for ${user.email}: ${otp} <<<`);
    }

    res.json({ success: true, message: 'Login OTP sent to your registered email.' });
  } catch (error) {
    console.error('Login send-otp error:', error);
    res.status(500).json({ success: false, message: 'Failed to send login OTP: ' + error.message });
  }
});

// Route: Verify Login OTP and sign in
router.post('/login-verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const stored = otpStore[normalizedEmail];

    if (!stored) {
      return res.status(400).json({ success: false, message: 'No OTP requested for this email or it has expired.' });
    }
    if (Date.now() > stored.expiresAt) {
      delete otpStore[normalizedEmail];
      return res.status(400).json({ success: false, message: 'OTP expired. Please request a new code.' });
    }
    if (stored.otp.trim() !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP. Please check your email and try again.' });
    }

    // OTP is valid
    delete otpStore[normalizedEmail];

    const users = await sql`
      SELECT id, name, email, role, phone, working_area, status, created_at, profile_pic_url
      FROM users 
      WHERE LOWER(TRIM(email)) = ${normalizedEmail}
    `;

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Volunteer profile not found' });
    }

    const user = users[0];
    if (user.status !== 'approved') {
      return res.status(403).json({ success: false, message: 'Account status: ' + (user.status || 'not approved') });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'volunteer',
        phone: user.phone,
        city: user.working_area,
        status: user.status,
        appliedDate: user.created_at,
        photo: user.profile_pic_url
      }
    });
  } catch (error) {
    console.error('Login verify-otp error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

// Apply as volunteer (Now verifies OTP and accepts password)
router.post('/apply', (req, res, next) => {
  upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'aadhaar_front', maxCount: 1 },
    { name: 'aadhaar_back', maxCount: 1 }
  ])(req, res, function (err) {
    if (err) return res.status(500).json({ success: false, message: 'Upload error: ' + err.message });
    next();
  });
}, async (req, res) => {
  try {
    const data = req.body;
    
    // We expect email, phone, name, otp, password as mandatory minimums.
    if (!data.name || !data.email || !data.phone || !data.otp || !data.password) {
      return res.status(400).json({ success: false, message: 'All required fields including OTP and Password must be provided' });
    }

    // Verify OTP
    const stored = otpStore[data.email];
    if (!stored) {
      return res.status(400).json({ success: false, message: 'No OTP requested for this email' });
    }
    if (Date.now() > stored.expiresAt) {
      delete otpStore[data.email];
      return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
    }
    if (stored.otp !== data.otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    delete otpStore[data.email];

    // Check if email already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${data.email}`;
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    const profile_pic_url = req.files && req.files['profile_picture'] ? req.files['profile_picture'][0].path : null;
    const aadhaar_front_url = req.files && req.files['aadhaar_front'] ? req.files['aadhaar_front'][0].path : null;
    const aadhaar_back_url = req.files && req.files['aadhaar_back'] ? req.files['aadhaar_back'][0].path : null;

    await sql`
      INSERT INTO users (
        name, email, phone, city, role, message, status, password,
        gender, parent_name, dob, profession, blood_group, aadhaar,
        state, district, working_area, pincode, address,
        profile_pic_url, aadhaar_front_url, aadhaar_back_url
      ) VALUES (
        ${data.name}, ${data.email}, ${data.phone}, ${data.city || data.working_area || ''}, 'volunteer', ${data.message || ''}, 'pending', ${passwordHash},
        ${data.gender || null}, ${data.parent_name || null}, ${data.dob || null}, ${data.profession || null}, ${data.blood_group || null}, ${data.aadhaar || null},
        ${data.state || null}, ${data.district || null}, ${data.working_area || null}, ${data.pincode || null}, ${data.address || null},
        ${profile_pic_url}, ${aadhaar_front_url}, ${aadhaar_back_url}
      )
    `;

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET all volunteer updates (putting this here to mark where we are)


// Get ALL volunteers (pending, approved, rejected)
router.get('/all', async (req, res) => {
  try {
    // Also format created_at date as appliedDate for UI
    const volunteers = await sql`
      SELECT *, TO_CHAR(created_at, 'YYYY-MM-DD') as "appliedDate", 0 as hours FROM users 
      WHERE role != 'admin' OR role IS NULL
      ORDER BY id DESC
    `;
    res.json({ success: true, volunteers });
  } catch (error) {
    console.error('Fetch all volunteers error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get pending requests
router.get('/requests', async (req, res) => {
  try {
    const requests = await sql`SELECT *, TO_CHAR(created_at, 'YYYY-MM-DD') as "appliedDate" FROM users WHERE status = 'pending' ORDER BY id DESC`;
    res.json({ success: true, requests });
  } catch (error) {
    console.error('Fetch requests error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Approve request
router.post('/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await sql`SELECT name, email FROM users WHERE id = ${id}`;
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    
    const user = users[0];

    await sql`UPDATE users SET status = 'approved' WHERE id = ${id}`;
    
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Hanish Charity Foundation" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Volunteer Application Approved! — Hanish Charity Foundation",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
            <div style="background: #0b2545; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; color: #ffffff;">Hanish Charity Foundation</h2>
              <p style="margin: 4px 0 0; font-size: 11px; color: #e5a93c; text-transform: uppercase; font-weight: bold;">Application Approved</p>
            </div>
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 15px; margin-top: 0;">Dear <strong>${user.name}</strong>,</p>
              <p style="font-size: 13px; line-height: 1.6; color: #475569;">
                Congratulations! We are delighted to inform you that your volunteer application with <strong>Hanish Charity Foundation</strong> has been <strong>approved</strong> by our administration.
              </p>
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #15803d;">You can now log in to the Volunteer Portal</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #166534;">Enter your email to receive an instant verification OTP to access your ID card and assignments.</p>
              </div>
              <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
                Thank you for your noble commitment to serving humanity and creating brighter futures.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Hanish Charity Foundation &bull; Serilingampally, K.V. Rangareddy, Telangana - 500046, India
              </div>
            </div>
          </div>
        `
      });
      console.log(`Approval email sent to ${user.email}`);
    } else {
      console.warn('SMTP_USER and SMTP_PASS not configured. Approval email skipped for:', user.email);
    }

    res.json({ success: true, message: 'Volunteer approved' });
  } catch (error) {
    console.error('Approve error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Reject request
router.post('/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await sql`SELECT name, email FROM users WHERE id = ${id}`;
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    
    const user = users[0];

    await sql`UPDATE users SET status = 'rejected' WHERE id = ${id}`;
    
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Hanish Charity Foundation" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Volunteer Application Update — Hanish Charity Foundation",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
            <div style="background: #0b2545; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; color: #ffffff;">Hanish Charity Foundation</h2>
              <p style="margin: 4px 0 0; font-size: 11px; color: #e5a93c; text-transform: uppercase; font-weight: bold;">Application Status</p>
            </div>
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 14px; margin-top: 0;">Dear <strong>${user.name}</strong>,</p>
              <p style="font-size: 13px; line-height: 1.6; color: #475569;">
                Thank you for your noble interest in joining <strong>Hanish Charity Foundation</strong>. At this time, our current volunteer positions for your selected region have reached capacity.
              </p>
              <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
                We sincerely appreciate your compassionate spirit and look forward to inviting you to upcoming public drives.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Hanish Charity Foundation &bull; Humanity First. Compassion Always.
              </div>
            </div>
          </div>
        `
      });
      console.log(`Rejection email sent to ${user.email}`);
    } else {
      console.warn('SMTP_USER and SMTP_PASS not configured. Rejection email skipped for:', user.email);
    }

    res.json({ success: true, message: 'Volunteer rejected' });
  } catch (error) {
    console.error('Reject error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET all volunteer updates
router.get('/updates', async (req, res) => {
  try {
    const updates = await sql`
      SELECT id, volunteer_id as "volunteerId", title, message, type, TO_CHAR(created_at, 'YYYY-MM-DD') as date 
      FROM volunteer_updates 
      ORDER BY id DESC
    `;
    res.json({ success: true, updates });
  } catch (error) {
    console.error('Fetch updates error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST new volunteer update
router.post('/updates', async (req, res) => {
  try {
    const { volunteerId, title, message, type } = req.body;
    if (!volunteerId || !title || !message || !type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    await sql`
      INSERT INTO volunteer_updates (volunteer_id, title, message, type)
      VALUES (${volunteerId}, ${title}, ${message}, ${type})
    `;
    res.json({ success: true, message: 'Update posted successfully' });
  } catch (error) {
    console.error('Post update error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE a volunteer update
router.delete('/updates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM volunteer_updates WHERE id = ${id}`;
    res.json({ success: true, message: 'Update deleted successfully' });
  } catch (error) {
    console.error('Delete update error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET volunteer activities
router.get('/:id/activities', async (req, res) => {
  try {
    const { id } = req.params;
    const activities = await sql`SELECT id, volunteer_id, title, hours, status, TO_CHAR(date, 'YYYY-MM-DD') as formatted_date FROM volunteer_activities WHERE volunteer_id = ${id} ORDER BY date DESC`;
    res.json({ success: true, activities });
  } catch (error) {
    console.error('Fetch activities error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET volunteer campaigns
router.get('/:id/campaigns', async (req, res) => {
  try {
    const { id } = req.params;
    const campaigns = await sql`SELECT id, volunteer_id, campaign_name, role, status, TO_CHAR(date, 'YYYY-MM-DD') as formatted_date FROM volunteer_campaigns WHERE volunteer_id = ${id} ORDER BY date DESC`;
    res.json({ success: true, campaigns });
  } catch (error) {
    console.error('Fetch campaigns error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET volunteer programs
router.get('/:id/programs', async (req, res) => {
  try {
    const { id } = req.params;
    const programs = await sql`SELECT * FROM volunteer_programs WHERE volunteer_id = ${id}`;
    res.json({ success: true, programs });
  } catch (error) {
    console.error('Fetch programs error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET volunteer certificates
router.get('/:id/certificates', async (req, res) => {
  try {
    const { id } = req.params;
    const certificates = await sql`SELECT id, volunteer_id, name, issuer, TO_CHAR(date, 'YYYY-MM-DD') as formatted_date FROM volunteer_certificates WHERE volunteer_id = ${id} ORDER BY date DESC`;
    res.json({ success: true, certificates });
  } catch (error) {
    console.error('Fetch certificates error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
