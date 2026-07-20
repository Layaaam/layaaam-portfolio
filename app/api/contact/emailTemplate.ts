interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function getEmailTemplate({ name, email, subject, message }: EmailTemplateProps): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #e5e7eb;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 40px 20px;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    .header {
      background: rgba(15, 23, 42, 0.95);
      padding: 40px 30px;
      border-bottom: 2px solid rgba(110, 231, 183, 0.2);
      text-align: left;
    }
    
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.5px;
    }
    
    .header p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      margin-top: 8px;
      font-weight: 400;
    }
    
    .decorative-line {
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(110, 231, 183, 0.3), transparent);
      margin: 0;
    }
    
    .content {
      padding: 40px 30px;
      background: rgba(30, 41, 59, 0.5);
    }
    
    .field {
      margin-bottom: 20px;
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 18px;
      transition: all 0.3s ease;
    }
    
    .field:hover {
      border-color: rgba(110, 231, 183, 0.15);
      background: rgba(15, 23, 42, 0.6);
    }
    
    .label {
      font-weight: 600;
      color: #6ee7b7;
      margin-bottom: 10px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .value {
      color: #f3f4f6;
      font-size: 15px;
      line-height: 1.6;
      word-wrap: break-word;
    }
    
    .value a {
      color: #6ee7b7;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .value a:hover {
      color: #10b981;
    }
    
    .message-content {
      background: rgba(0, 0, 0, 0.15);
      padding: 14px;
      border-radius: 6px;
      border-left: 2px solid rgba(110, 231, 183, 0.4);
      margin-top: 8px;
    }
    
    .footer {
      text-align: center;
      padding: 30px;
      background: rgba(15, 23, 42, 0.9);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .footer-content {
      color: #9ca3af;
      font-size: 14px;
    }
    
    .footer p {
      margin: 0;
      line-height: 1.6;
    }
    
    .footer strong {
      color: #6ee7b7;
      font-weight: 600;
    }
    
    @media only screen and (max-width: 600px) {
      body {
        padding: 20px 10px;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .field {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>Portfolio Contact Form</p>
    </div>
    
    <div class="decorative-line"></div>
    
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${name}</div>
      </div>
      
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">
          <a href="mailto:${email}">${email}</a>
        </div>
      </div>
      
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      
      <div class="field">
        <div class="label">Message</div>
        <div class="value">
          <div class="message-content">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-content">
        <p>Reply to this email to respond to <strong>${name}</strong></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}