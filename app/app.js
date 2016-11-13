var app = require('express')();

// necessary for processing json bodies
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// initialize get and write methods
require("./service/get.js").get(app);
require("./service/write.js").write(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
