require('dotenv').config();
const port = process.env.PORT || 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, function() {
  console.log(`Sever is listening on port ${port}`);
  }).on('error', function(err) {
       if (err.errno === 'EADDRINUSE') {
          console.log(`Port ${port} is already in use!`);
       } else {
         console.log(`Error returned: ${err}`);
        }
      });