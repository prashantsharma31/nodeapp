var express = require('express');
var path = require('path');

const app = express();
const port = process.env.PORT || "8000";

const send = require('gmail-send')({
  user: 'emai@gmail.com',
  pass: 'password',
  to:   'email@gmail.com',
  subject: 'test subject',
});

app.use(express.static(__dirname));

  app.use("/load/*",(req,res,next) => {
    console.log('middleware executed',req.baseUrl);
    next();
  });
  app.get("/test/:id", (req, res) => {
    res.status(200).send( 'Path loaded'+req.params.id );
  });
  app.get("*", (req, res) => {
    send({
      text:    'gmail-send example 1',  
    }, (error, result, fullResult) => {
      if (error) console.error(error);
      res.status(200).send( 'Path loaded');
      console.log(result);
    })
  });
  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });