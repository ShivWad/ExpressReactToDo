const express = require('express');
const cors = require('cors');
const app = express();
const { create } = require('./controllers/pr.controller');
// var corsOption = {
//     origin : 'localhost:3000'
// };


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())
app.use(express.urlencoded({extended:true}));




app.get('/', (req,res)=>{
    res.json({message : 'yooooooooooooooo'})
})


require("./routes/pr.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});