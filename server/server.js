const express = require('express');
const app = express();

// Setup body parser to handle POST body
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // NEEDED FOR ANGULARJS
app.use(bodyParser.urlencoded({extended: true}));

// Setup songs router
const pictureRouter = require('./routes/pictureRouter');
app.use('/pictures', pictureRouter);


// Setup our static files
app.use(express.static('server/public'));

const port = 5000;
app.listen(port, function(){
  console.log(`Listening on port ${port}.`);
})