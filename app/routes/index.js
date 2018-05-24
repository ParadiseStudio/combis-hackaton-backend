const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/sendPushNoti', function(req, res, next) {



  var apn = require('apn');
  var options = {
    token: {
      key: "algorithm/privat_key",
      keyId: "AJ26ZL97JH",
      teamId: "3G4T2B7D7X"
    },
    production: false
  };
  
  var apnProvider = new apn.Provider(options);
  
  let deviceToken = "29e24032ae4c4b4f6da0ae24d4bde8b7814114de405c77bcd3f7a3db14303b7c"
  
  var note = new apn.Notification();
  
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
  note.payload = { 'messageFrom': 'John Appleseed' };
  note.topic = "com.morselinteractive.PushNotification"
  
  apnProvider.send(note, deviceToken).then((result) => {
    console.log(result)
  });
  
  

  res.json({greeting:"hola boys"});
});

module.exports = router;
