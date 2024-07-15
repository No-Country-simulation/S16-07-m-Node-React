export default class EmailTemplates {

  static verifyEmail(code: number) {
    return `
    <p>Welcome to GoEvent!</p>
    <p>To verify your account, use the key provided below:</p>
    <div style="width: 100%; display: flex; justify-content: center;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; width: 400px;">
            <div style="text-align: center;">
                <p style="font-size: 36px; font-weight: bold; color: #1f2d3d; margin: 0;">GoEvent</p>
                <p style="font-size: 18px; color: #3b3f44; font-family: arial, helvetica, sans-serif; margin-top: 20px;">
                    Your verification key is:
                </p>
                <div style="background-color: #0b9019; color: #ffffff; font-size: 18px; font-family: arial, helvetica, sans-serif; border-radius: 5px; padding: 10px; margin-top: 10px; display: inline-block;">
                    <strong>${code}</strong>
                </div>
            </div>
        </div>
    </div>
    <p>If you did not create an account, please ignore this email.</p>
`;
  }


  static resetPassword(code: number) {
    return `
    <p>To reset your password, use the code below:</p>
    <p style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
      ${code}
    </p>
    </p>
    <p>If you did not request a password reset, please ignore this email.</p>
    `
  }


  static invitation(event: string, address: string, date: string, code: number, name: string) {
    return `
        <div style="width: 100%; display: flex; justify-content: center;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; width: 400px;">
                <div style="text-align: center;">
                    <h3 style="font-size: 24px; font-weight: bold; color: #1f2d3d; margin-bottom: 10px;">Invitation</h3>
                    <h2 style="font-size: 22px; font-weight: bold; color: #1f2d3d; margin: 5px 0;">Event: ${event}</h2>
                    <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Address: ${address}</h2>
                    <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Date: ${date}</h2>
                    <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Code: ${code}</h2>
                    <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Name: ${name}</h2>
                    <h2 style="font-size: 20px; color: #3b3f44; margin: 20px 0;">Thank you for using GoEvent</h2>
                    <p style="font-size: 18px; color: #3b3f44;">Please find the attached QR code.</p>
                </div>
            </div>
        </div>
    `;
  }



}
