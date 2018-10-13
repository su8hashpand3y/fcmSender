const express = require('express')
const { google, SCOPES}  = require('googleapis');
var request = require('request');
const app = express();
const port = process.env.PORT || 3000;

function getAccessToken() {
    return new Promise(function(resolve, reject) {
      var key = require('./mess.json');
      var jwtClient = new google.auth.JWT(
        process.env.client_email,
        null,
        process.env.private_key,
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
            "token" : "efSz8C4HF4E:APA91bE-NL9YBE7YLgR2pQ8UcMCSgyo6cXMbcO-m7K7vL0F-y7clK3VVgrhqun0T9xvZE6Dt6oyiuyoqxxyusSdnhm_qE33i2nBl7RM6m7EEg1itw0JWvAkaCJ6TW9Kg0A7QwV7D3BGk",
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
            "token" : "efSz8C4HF4E:APA91bE-NL9YBE7YLgR2pQ8UcMCSgyo6cXMbcO-m7K7vL0F-y7clK3VVgrhqun0T9xvZE6Dt6oyiuyoqxxyusSdnhm_qE33i2nBl7RM6m7EEg1itw0JWvAkaCJ6TW9Kg0A7QwV7D3BGk",
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