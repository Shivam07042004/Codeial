const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth :{
        user: 'shivamdwivedi3364',
        pass: 'ulyiilshbnkjkfwf'
    }
});


let renderTemplate =(data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(error,template){
            if(error){
                console.log('error in the rendering the template ',error);
                return;
            }

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}