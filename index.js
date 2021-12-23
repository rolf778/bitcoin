var express=require('express');
var bodyParser=require('body-parser');
var request=require('request');
require('dotenv').config();
var app=express();
var PORT=process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}));
app.use('/css',express.static(__dirname +'/css'));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})



app.post('/',function(req,res){
  var crypto=req.body.crypto;
  var fiat=req.body.fiat;
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    qs: {from_currency: crypto, function: 'CURRENCY_EXCHANGE_RATE', to_currency: fiat},
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY,
      useQueryString: true
    }
  }

  ;
  request(options,function(error,response,body){
    if (error) throw new Error(error);
    var data=JSON.parse(body);
    var price=data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    var currentDate=data['Realtime Currency Exchange Rate']['6. Last Refreshed'];
    var filePath="css/pictures/rich.png";
    res.write("<body style='background-color: #f9dca4;'>")
    res.write("<p style='text-align:center;font-size:15pt;margin-top:100px;'>The current date is "+currentDate+"</p>");
    res.write("<h1 style='text-align:center;font-size:30pt;'>The current price of "+crypto+" is: "+"<span style='color:red'>"+price+"</span>"+fiat+"</h1>");
    res.write("<img style='margin-left:30%;width:50%;' src='"+filePath+"'/>");
    res.write("</body>")

    res.send();
  })
  })

  app.listen(PORT, () => console.log('Listening on ${ PORT }'));
