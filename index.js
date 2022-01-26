require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const cron = require('node-cron');
const moment = require('moment');

console.log(`Pill Boss started at ${moment().format('DD/MM/YYYY HH:mm')}`);

// Trigger every day at 20h05 pm
cron.schedule('05 20 * * *', async () => {
  // Inital data of dates (start and end date)
  const startDate = '11/01/2022'
  const endDate = moment(startDate, 'DD/MM/YYYY').add(20, 'days').format('DD/MM/YYYY');

  console.log('Start date', startDate, 'before loop');
  console.log('End date', endDate, 'before loop')

  // Set new dates for the new cycle
  if (moment().isAfter(moment(endDate, 'DD/MM/YYYY'))) {
    for (let i = 0; i < 100000; i += 1) {
      if (moment().isAfter(moment(endDate, 'DD/MM/YYYY'))) {
        startDate = moment(startDate, 'DD/MM/YYYY').add(4, 'weeks')
        endDate = moment(startDate, 'DD/MM/YYYY').add(48, 'days')
      } else {
        break;
      }
    }
  }

  console.log('Start date', startDate, 'after loop');
  console.log('End date', endDate, 'after loop')

  // Send the reminder
  if (moment(startDate, 'DD/MM/YYYY').isBefore()) {
    client.messages
      .create({
        body: 'Take your pill baby',
        from: 'PILL BOSS',
        to: process.env.PHONE_NUMBER,
      })
      .then(message => console.log(message.sid));
  }
});
