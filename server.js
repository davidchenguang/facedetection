//定义变量
const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const viewsDir = path.join(__dirname, 'views')
app.use(express.static(viewsDir))

//支持浏览器端以http://localhost 进行访问，跳转到webcam.html上来
app.get('/', (req, res) => res.redirect('/webcam'))
app.get('/webcam', (req, res) => res.sendFile(path.join(viewsDir, 'webcam.html')))


var server = app.listen(process.env.PORT || 3000, listen);

function listen() {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Server app listening at http://' + host + ':' + port);

}



