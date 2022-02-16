const express = require('express');
const path = require('path');
const config = require('./config/configs');
const app = express();

//SocketIO
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Express Settingd
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


//Routers
const routes = require('./routes/mainRoutes');
app.get('/', routes);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      socket.broadcast.emit('chat message', '<span style="color: red;">User Left</span> ') //Repeat Sender
    });
      socket.on('send message', (msg) => {
        socket.emit('chat message', '<span style="color: green;">You:</span> '+msg) //Repeat Sender
        socket.broadcast.emit('chat message', msg); //Send to everyone
      });
  });

server.listen(config.PORT, ()=> {
    console.log('http://127.0.0.1:'+config.PORT);
})