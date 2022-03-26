require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const cron = require('node-cron');
const moment = require('moment');

console.log(`Pill Boss started at ${moment().format('DD/MM/YYYY HH:mm')}`);

// Trigger every day at 20h05 pm
cron.schedule('5 20 * * *', async () => {
  // Inital data of dates (start and end date)
  let startDate = '08/03/2022'
  let endDate = moment(startDate, 'DD/MM/YYYY').add(20, 'days');

  console.log(startDate, endDate);

  // Set new dates for the new cycle
  if (moment().isAfter(endDate)) {
    for (let i = 0; i < 100000; i += 1) {
      if (moment().isAfter(endDate)) {
        startDate = moment(startDate, 'DD/MM/YYYY').add(27, 'days').format('DD/MM/YYYY')
        endDate = moment(startDate, 'DD/MM/YYYY').add(20, 'days')
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
        body: `Take your pill baby. ≈${moment(endDate).diff(moment(), 'days').add('2', 'days')} days till 🩸`,
        from: 'PILL BOSS',
        to: process.env.PHONE_NUMBER,
      })
      .then(message => console.log(message.sid));
  }
});
