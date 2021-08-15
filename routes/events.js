const express = require("express");
const router = express.Router();

// Event
emails = [
    {
    id: 0,
    action: 'click or open', // => Should be limited to `click` and `open`
    subject: 'SUBJECT',
    recipient: 'example@piloto151.org', // => Email address
    timestamp: new Date
},
]

router.post("/Events", async (req, res) => {
  const {
    body: { action, subject, recipient },
  } = req;

  email = {
    id: emails.length  + 1,
    action,
    subject,
    recipient,
    timestamp: new Date
  }

  if (!email.recipient){
    res.status(400).end('HAS NO RECIPIENT');
  }
  else if(email.action != 'open' && email.action != 'click'){
    res.status(406).end('ERROR AT ACTION');
  }
  else{
    emails.push(email);
    res.status(202).end('SUCCESS');
  }

});

router.get("/Events", async (req, res) => {
    const { action, recipient, timestamp } = req.query;

    if(!action && !recipient && !timestamp){
        res.status(200).json(emails);
    }
    else{
        filterEmails = []
        if(action){
            emails.filter(email =>{
                if(email.action === action){
                    filterEmails.push(email);
                }
            });
            filterEmails.length > 0  
            ? res.status(200).json(filterEmails)
            : res.status(400).end("ERROR");
        }
        else if(recipient){
            emails.filter(email =>{
                if(email.recipient === recipient){
                    filterEmails.push(email);
                }
            });
            filterEmails.length > 0  
            ? res.status(200).json(filterEmails)
            : res.status(400).end("ERROR");
        }
        else{
            emails.filter(email =>{
                if(email.timestamp.toDateString() === timestamp){
                    filterEmails.push(email);
                }
            });
            filterEmails.length > 0  
            ? res.status(200).json(filterEmails)
            : res.status(400).end("ERROR");
        }
    }
});

module.exports = router;
