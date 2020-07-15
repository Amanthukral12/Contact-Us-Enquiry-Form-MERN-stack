const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

var mongoDatabase = 'mongodb://localhost:27017/formData';

mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);

const EmailRoutes = require('./routes/emails');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', () => {
    resizeBy.send('welcome to my forma')
})

app.post('/api/forma', (req, res) => {
    let data = req.body
    let SMTPTransport = nodemailer.createTransport({
        service: '*****',//your service provider
        port: 465,
        auth: {
            user: '********',//your email id
            pass: '*********'//your password
        }
    });

    let mailOptions = {
        from: data.email,
        to: '********',//email id on which mail has to send
        subject: `Message from ${data.name}`,
        html: `
        <h3>Information</h3>
        <ul>
        <li>Name:${data.name}</li>
        <li>Phone:${data.phone}</li>
        
        </ul>
        
        <h3>Message:</h3>
        <p>${data.message}</p>
        `
    };
    SMTPTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.send(error);
        }
        else {
            res.send('success');
        }
    })

    SMTPTransport.close();

})

const PORT = process.env.PORT || 3001;
app.use('/', EmailRoutes);

app.listen(PORT, () => {
    console.log(`server starting at port ${PORT}`);
})