const nodemailer = require('nodemailer');
const ejs = require('ejs');
const {email_sender, app_password} = process.env;

module.exports = {
    sendEmail: async (html) => {
        return new Promise(async (resolve, reject) => {
            try {

                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: email_sender,
                        pass: app_password
                    }
                });

                const mailOptions = {
                    from: `"Pendeteksi Asap"<noreply@iot.com>`,
                    to: ['charlesgunawan32@gmail.com', 'kwinnyintan17@gmail.com'],
                    subject: 'BAHAYA!!',
                    html
                };

                const response = await transport.sendMail(mailOptions);

                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    getHtml: (filename, data) => {
        return new Promise((resolve, reject) => {
            const path = __dirname + '/../views/email/' + filename;

            ejs.renderFile(path, data, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
};