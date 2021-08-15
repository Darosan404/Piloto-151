const express = require("express");
const router = express.Router();
const { emails } = require("./events");

router.get("/Summary", async (req, res) => {
    const { recipient, iDate } = req.query;
    open = 0;
    click = 0;

    console.log(emails);

    if(!recipient && !iDate){
        emails.filter(email =>{
            if(email.action === 'open'){
                open += 1;
            }
            else if (email.action === 'click'){
                click += 1;
            }
        });
        res.status(200).json({
            'open' : open, 
            'click' : click
        });
    }
    else{
        if(recipient){
            emails.filter(email =>{
                if(email.recipient === recipient){
                    if(email.action === 'open'){
                        open += 1;
                    }
                    else if (email.action === 'click'){
                        click += 1;
                    }
                }
            });
            res.status(200).json({
                'email' : recipient,
                'open' : open, 
                'click' : click
            });
        }
        else{
            const [startDate, endDate] = iDate.split('/');
            emails.filter(email =>{
                if(email.timestamp.toDateString() >= startDate && email.timestamp.toDateString() <= endDate){
                    if(email.action === 'open'){
                        open += 1;
                    }
                    else if (email.action === 'click'){
                        click += 1;
                    }
                }
            });
            res.status(200).json({
                'date' : iDate,
                'open' : open, 
                'click' : click
            });
        }
    }
});

module.exports = router;
