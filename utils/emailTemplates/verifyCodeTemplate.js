const verifyCodeTemplate = (email, link) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 40px 30px; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333333; text-align: center;">مرحبًا بك في متجرنا!</h2>
          <p style="font-size: 16px; color: #555555;">${email} عزيزي/عزيزتي،</p>
          <p style="font-size: 16px; color: #555555;">
            شكرًا لتسجيلك في متجرنا. لتفعيل حسابك والاستمتاع بتجربة تسوق مميزة، يرجى النقر على الزر أدناه:
          </p>
          <div style="text-align: center; margin: 35px 0;">
            <a href="${link}" style="
              background: linear-gradient(to right, #ff7e5f, #feb47b);
              color: white;
              padding: 14px 30px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
              display: inline-block;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              transition: background 0.3s ease;
            " onmouseover="this.style.background='#ff7043';">
              تفعيل الحساب
            </a>
          </div>
          <p style="font-size: 14px; color: #888888;">
            إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذه الرسالة.
          </p>
          <p style="font-size: 14px; color: #888888;">مع تحياتنا،<br>فريق دعم المتجر</p>
        </div>
      </div>
    `;
  };
  
  module.exports = verifyCodeTemplate;
  