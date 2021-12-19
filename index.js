var express=require('express');
var bodyParser=require('body-parser');
var request=require('request');
require('dotenv').config();
var app=express();
var PORT=process.env.Port || 3000
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
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
      'x-rapidapi-key': 'e24f4ae48dmsh725514a23b86277p1f6da3jsnef70f9f79eae',
      useQueryString: true
    }
  };
  request(options,function(error,response,body){
    if (error) throw new Error(error);
    var data=JSON.parse(body);
    var price=data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    var currentDate=data['Realtime Currency Exchange Rate']['6. Last Refreshed'];
    res.write("<p>The current date is "+currentDate+"</p>");
    res.write("<h1>The current price of "+crypto+" is: "+price+fiat+"</h1>");
    res.send();
  })
  })

  app.listen(PORT, () => console.log('Listening on ${ PORT }'));
