const emailTemplate = (fullName, verifyLink) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Xác nhận thân phận</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f2f2f2; padding: 20px;">
  <div style="background: #fff; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #2c3e50;">Xin chào ${fullName || "bạn"},</h2>
    <p>Chào các con chiên ngoan đạo đã tới với <strong>Royal shoe</strong>.</p>
    <p> Bấm vào nút bên dưới để xác nhận email:</p>
    <p style="text-align: center;">
      <a href="${verifyLink}" style="display:inline-block; padding:12px 24px; background:#4CAF50; color:white; text-decoration:none; border-radius:6px;">Xác nhận email</a>
    </p>
    <p>Nếu không yêu cầu hành động này, hãy bỏ qua email.</p>
    <p style="margin-top: 40px; color: #888;">&copy; ${new Date().getFullYear()} HiếuShop</p>
  </div>
</body>
</html>
`;

export default emailTemplate;
