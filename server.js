const express = require('express')
const app = express()
//socket io
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);


const port = 3000
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('/public/login.html', { root: __dirname });
})
app.post('/login', (req, res) => {
  
    if(req.body.room_id=="samir123"){
      res.sendFile(__dirname + '/index.html');
    
    }else{
         res.sendFile('/public/login.html', { root: __dirname });

    }

});
// socket.io connection
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    
    console.log('message: ' + msg); 

    // send to all other clients except the sender
    socket.broadcast.emit('message', msg);    
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})