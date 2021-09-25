const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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')

const msg = {
    to: 'freddycastuera@gmail.com',
    from: 'plover.software@gmail.com',
    subject: 'Testing Node Email Service',
    text: 'This is a test message from sendgrid & node.js'
}

sgMail.send(msg, function(error, result){
    if(error){
        console.log('Email not Sent');
    } else {
        console.log('Email Sent Success');
    }
})

module.exports = {
    sgMail,
    send
}