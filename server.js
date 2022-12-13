require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path  = require("path")
const cookie = require('cookie-parser');
const SocketServer = require('./SocketServer');
const db = require('./DB/db');


const app = express();
console.log(path.resolve(__dirname, './build/static'));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(bodyparser.urlencoded({
    extended:true
}))
const corsOptions ={
    credentials:true        
}
app.use(express.json());

app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookie());
const http = require('http').createServer(app);

const io = require('socket.io')(http);

io.on('connection', socket => {
    SocketServer(socket);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

//eslint-disable-next-line
db
app.use('/api',require('./Route/list'));
app.use('/api', require('./Route/user'));

const port = process.env.PORT|| 5000;

http.listen(port, () => {
    console.log("Listening on ", port);
});
//eslint-disable-next-line

// let's create 
