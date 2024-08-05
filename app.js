// Requiring module
const express = require('express');

// Creating express object
const app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    //res.send("Hello World!");
    res.sendFile(__dirname + "index.html", {}, (err) => {
      console.log(err);
    });
  });


// Server Setup
app.listen(port, console.log( `Server started on port ${port}`));