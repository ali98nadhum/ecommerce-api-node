const verifyCodeTemplate = (email, link) => {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50;">مرحبًا بك في منصتنا التعليمية!</h2>
          <p style="font-size: 16px; color: #34495e;">${email} عزيزي/عزيزتي،</p>
          <p style="font-size: 16px; color: #34495e;">
            شكرًا لتسجيلك في منصتنا. لتفعيل حسابك، يرجى النقر على الزر أدناه:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #3498db; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              تأكيد الحساب
            </a>
          </div>
          <p style="font-size: 14px; color: #7f8c8d;">
            إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذه الرسالة.
          </p>
          <p style="font-size: 14px; color: #7f8c8d;">مع تحياتنا،<br>فريق الدعم</p>
        </div>
      </div>
    `;
  };
  
  module.exports = verifyCodeTemplate;
  