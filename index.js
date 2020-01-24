const config = require("./config");
const fs = require("fs");
const moment = require("moment");
const Cayenne = require("cayennejs");
const nodemailer = require("nodemailer");
const Raspistill = require("node-raspistill").Raspistill;
const raspistill = new Raspistill(config.raspistill);
const SlackClient = require("node-slack-upload");
const slack = new SlackClient(config.slackToken);

const cayenneClient = new Cayenne.MQTT({
  username: config.cayenne.username,
  password: config.cayenne.password,
  clientId: config.cayenne.clientId
});

const transporter = nodemailer.createTransport(config.nodemailer);
const fileName = `${config.raspistill.fileName}.${config.raspistill.encoding}`;

cayenneClient.connect((err, mqttClient) => {
  cayenneClient.on("cmd1", function(data) {
    console.info(
      `Username ${data.meta.username} requested channel ${data.meta.channel}`
    );
    if (data.meta.username === config.cayenne.username) {
      console.info("Taking a photo..");
      raspistill.takePhoto().then(photo => {
        console.info("Photo taken!");

        if (config.sendEmail) {
          console.info("Attaching to e-mail..");
          config.mailOptions.attachments = [
            {
              filename: fileName,
              content: fs.createReadStream(`./photos/${fileName}`)
            }
          ];
          console.info("Attached!");

          console.info("Sending e-mail..");
          transporter.sendMail(config.mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.info("Message sent: %s", info.messageId);
          });
        }

        if (config.uploadFile) {
          console.info("Uploading file..");
          config.slackUploadConfig.file = fs.createReadStream(
            `./photos/${fileName}`
          );
          config.slackUploadConfig.initialComment = `Date and time: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`;
          slack.uploadFile(config.slackUploadConfig, function(err, data) {
            if (err) {
              console.error(`Failed uploading file to Slack: ${err}`);
            } else {
              console.info("File uploaded!");
              console.info(
                `Public permalink (works only on public channels): ${data.file.permalink}`
              );
              console.info(
                `Private permalink (works on all channels, but requires slack login and access): ${data.file.permalink_public}`
              );
            }
          });
        }
      });
    }
  });
});
