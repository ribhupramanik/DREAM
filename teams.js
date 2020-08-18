const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public/css"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/teams.html");
});

app.post("/", function(req, res){
const TEAM1 = req.body.TEAM_NAME;
const email = req.body.email;
const password =req.body.password;
const data = {
  members: [
    {
      email_address:email,
      status:"subscribed",
      merge_fields: {
        team: TEAM_NAME

      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/969d776412";
const options = {
  method: "POST",
  auth: "ribhu1:2cff38754c4659c6c5ca072a5c291b46-us17"
}
const request = https.request(url,options,function(response) {

if (response.statusCode ===200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}


  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
