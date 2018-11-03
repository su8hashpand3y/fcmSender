const express = require('express')
const { google, SCOPES}  = require('googleapis');
var request = require('request');
const app = express();
const port = process.env.PORT || 3000;

function getAccessToken() {
   console.log(process.env.private_key);
   console.log(process.env.private_key.replace(/\\n/g, '\n'));
    return new Promise(function(resolve, reject) {
      var jwtClient = new google.auth.JWT(
        process.env.client_email,
        null,
        process.env.private_key.replace(/\\n/g, '\n'),
        ["https://www.googleapis.com/auth/firebase.messaging"],
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }
  

app.get('/message/:deviceId', (req, res) =>
{ 
  getAccessToken().then(x=>
    {
      var options = {
        url: 'https://fcm.googleapis.com/v1/projects/messageback-41590/messages:send',
        method:'POST',
        headers: {
          'Authorization': `Bearer ${x}`
        },
        json: {
          "message":{
            "token" : deviceId,
            "notification" : {
              "body" : "You Have new message",
              "title" : "MESSAGE BACK : New Message"
              }
           }
        }
      };


      request(options,x=> console.log(x));
      res.send(`Sending Notification`)
    });
  // res.send('Hello World! Node' + req.params.deviceId)
});

app.get('/',(req,res)=> res.send("Hello World"))

app.get('/reply/:deviceId', (req, res) =>
{ 
  getAccessToken().then(x=>
    {
      var options = {
        url: 'https://fcm.googleapis.com/v1/projects/messageback-41590/messages:send',
        method:'POST',
        headers: {
          'Authorization': `Bearer ${x}`
        },
        json: {
          "message":{
            "token" : deviceId,
            "notification" : {
              "body" : "You have new reply",
              "title" : "MESSAGE BACK : New Reply"
              }
           }
        }
      };


      request(options,x=> console.log(x));
      res.send(`Sending Notification`)
    });
  // res.send('Hello World! Node' + req.params.deviceId)
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
