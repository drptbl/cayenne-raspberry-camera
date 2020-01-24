const config = {
  sendEmail: true, // do you want to send e-mails?
  uploadFile: true, // do you want to upload files to slack?

  raspistill: {
    width: 1024,
    height: 768,
    encoding: 'png',
    fileName: '1'
  },

  // cayenne setup (add new byod on https://cayenne.mydevices.com/cayenne/dashboard/add):
  cayenne: {
    username: '<EDITED>',
    password: '<EDITED>',
    clientId: '<EDITED>'
  },

  // slack setup:
  slackToken: '<EDITED>', // slack app bot token
  slackWebhook: '<EDITED>', // slack app incoming webhook

  slackUploadConfig: {
    title: 'Took a new photo:', // slack img title
    channels: '#alerts' // slack channel
  },

  // mail setup
  nodemailer: {
    host: '<EDITED>',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '<EDITED>',
      pass: '<EDITED>'
    },
    tls: {
      rejectUnauthorized: false
    }
  },

  mailOptions: {
    from: '"Photos" <someone1@example.cm>', // sender address
    to: 'someone2@example.com', // list of receivers
    subject: 'New photo', // Subject line
    text: 'Here is your new photo:', // plain text body
    html: 'Here is your new photo:<br><br>' // html body
  }
};

module.exports = config;
