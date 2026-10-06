const {
  setCors,
  parseBody,
  sendJson,
  getMailTransporter,
  generateOtpToken,
  DEFAULT_ADMIN_EMAIL
} = require('../_shared');

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const payload = await parseBody(req);
    const role = (payload.role || 'user').toLowerCase().trim();
    const email = (payload.email || '').trim().toLowerCase();

    if (!email) {
      return sendJson(res, 400, { success: false, error: 'Email address is required.' });
    }

    if (role === 'admin' && email !== DEFAULT_ADMIN_EMAIL) {
      return sendJson(res, 403, {
        success: false,
        error: `Access restricted: Only authorized administrator email can reset admin credentials.`
      });
    }

    // Generate 6-digit OTP and 10 minute expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const token = generateOtpToken(role, email, otp, expiresAt);

    const transporter = getMailTransporter();
    const fromAddress = process.env.SMTP_FROM || `"Celebration Events" <${process.env.SMTP_USER || 'kishorek80192@gmail.com'}>`;
    const isRoleAdmin = role === 'admin';

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset OTP</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
      <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #d81b60 0%, #be123c 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
          <div style="font-size: 38px; margin-bottom: 6px;">🎈</div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Celebration Events</h1>
          <p style="margin: 6px 0 0; opacity: 0.92; font-size: 13.5px; font-weight: 500;">
            ${isRoleAdmin ? 'Administrator Security Portal' : 'Customer Account Verification'}
          </p>
        </div>
        <div style="padding: 32px 28px; text-align: center;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">
            ${isRoleAdmin ? 'Admin Password Reset Request' : 'Password Reset Request'}
          </h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px;">
            We received a request to reset your password. Use the 6-digit verification code below to authorize this request:
          </p>
          <div style="display: inline-block; font-size: 34px; font-weight: 800; letter-spacing: 7px; color: #d81b60; background: #fff1f2; border: 2px dashed #f43f5e; padding: 14px 28px; border-radius: 12px; margin: 10px 0 24px; font-family: 'Courier New', Courier, monospace;">
            ${otp}
          </div>
          <p style="font-size: 13px; color: #64748b; margin: 0 0 10px; line-height: 1.5;">
            ⏱️ This code will expire in <strong>10 minutes</strong>.
          </p>
          <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.4;">
            If you did not request this verification code, please ignore this email or reach out to support immediately.
          </p>
        </div>
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
          &copy; ${new Date().getFullYear()} Celebration Events. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: `🎈 ${otp} is your Celebration Events verification code`,
      text: `Your Celebration Events verification code is: ${otp}. It will expire in 10 minutes.`,
      html: emailHtml
    });

    console.log(`[Vercel API] Sent OTP email to ${email}`);

    return sendJson(res, 200, {
      success: true,
      message: `Verification code sent to ${email}`,
      token: token
    });
  } catch (err) {
    console.error('[Vercel API] Error sending OTP:', err);
    return sendJson(res, 500, {
      success: false,
      error: `Failed to send verification email: ${err.message}`
    });
  }
};
