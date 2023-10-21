const nodeMailer = require('../config/nodemailer');

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'shivamdwivedi3364',
//     pass: 'ulyiilshbnkjkfwf',
//   },
// });


exports.newComment = (comment) => {
  console.log('inside newComment mailer');

    let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
    from: 'capton@google.com',
    to: comment.user.email, // Fixed the 'to' recipient
    subject: 'new comment published',
    html: htmlString,
  }, (error, info) => {
    if (error) {
      console.log('error in sending the mail', error);
      return;
    }

    console.log('comment sent', info);
    return;
  });
};
