var express = require('express');
var app = express();

/*app.get('/', function(req,res){
  res.send('index');
}); */

app.use(express.static(__dirname));

app.listen(3000);
console.log("Server running on port 3000");
