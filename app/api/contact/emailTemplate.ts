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
      color: #16171a;
      background: #e7e8ea;
      padding: 40px 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #eceef0;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px -12px rgba(22, 23, 26, 0.15);
    }

    .header {
      background: #eceef0;
      padding: 40px 30px;
      border-bottom: 2px solid #dde5df;
      text-align: left;
    }

    .header h1 {
      color: #16171a;
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.3px;
    }

    .header p {
      color: #6b6d74;
      font-size: 13px;
      margin-top: 8px;
      font-weight: 500;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .decorative-line {
      height: 2px;
      background: linear-gradient(90deg, transparent, #6f8f76, transparent);
      margin: 0;
    }

    .content {
      padding: 36px 30px;
      background: #eceef0;
    }

    .field {
      margin-bottom: 18px;
      background: #e2e4e7;
      border-radius: 14px;
      padding: 18px 20px;
    }

    .label {
      font-weight: 700;
      color: #4c6650;
      margin-bottom: 8px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .value {
      color: #16171a;
      font-size: 15px;
      line-height: 1.6;
      word-wrap: break-word;
    }

    .value a {
      color: #4c6650;
      text-decoration: none;
      font-weight: 600;
    }

    .value a:hover {
      color: #6f8f76;
    }

    .message-content {
      background: #eceef0;
      padding: 14px 16px;
      border-radius: 10px;
      border-left: 3px solid #6f8f76;
      margin-top: 6px;
    }

    .footer {
      text-align: center;
      padding: 28px;
      background: #e7e8ea;
    }

    .footer-content {
      color: #9a9ca3;
      font-size: 13px;
    }

    .footer p {
      margin: 0;
      line-height: 1.6;
    }

    .footer strong {
      color: #4c6650;
      font-weight: 700;
    }

    @media only screen and (max-width: 600px) {
      body {
        padding: 20px 10px;
      }

      .header {
        padding: 30px 20px;
      }

      .header h1 {
        font-size: 20px;
      }

      .content {
        padding: 26px 20px;
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
      <h1>New message from your portfolio</h1>
      <p>Contact form submission</p>
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
        <div class="label">Reason</div>
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
        <p>Reply to this email to respond directly to <strong>${name}</strong></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}