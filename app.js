var express = require('express');
var app = express();

app.use(express.static('static', {
  setHeaders:function(res, path ,stat) {
    // res.set('ca','cacaca')
  }
}));

app.use(express.static('f1', {
  setHeaders:function(res, path ,stat) {
    res.set('Cache-Control','max-age=100')
  }
}));
app.use(express.static('f2', {
  setHeaders:function(res, path ,stat) {
    res.set('Cache-Control','max-age=0')
  }
}));

app.get('/',function (req, res){
  res.send('hello');
})

app.listen('8000', function() {
  console.log('server is running...');
})
