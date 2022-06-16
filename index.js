const express= require("express");
// var mongoose = require(‘mongoose’);
const app = express();
const http= require('http').createServer(app)
const PORT= process.env.PORT || 3000
http.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
// var bodyParser = require(‘body-parser’)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}))
// app.set('views', './views')
// app.set('view engine', 'ejs')

// //using middleware of express
app.use(express.static(__dirname + '/public'))
// app.use(express.urlencoded({ extended: true }))
// creating route

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});
// const rooms = { }

// app.get('/', (req, res) => {
//   res.render('index', { rooms: rooms })
// })

// app.post('/room', (req, res) => {
//   if (rooms[req.body.room] != null) {
//     return res.redirect('/')
//   }
//   rooms[req.body.room] = { users: {} }
//   res.redirect(req.body.room)
//   // Send message that new room was created
//   io.emit('room-created', req.body.room)
// })
// app.get('/:room', (req, res) => {
//     if (rooms[req.params.room] == null) {
//       return res.redirect('/')
//     }
//     res.render('room', { roomName: req.params.room })
//   })  
// var dbUrl = ‘mongodb://username:pass@ds257981.mlab.com:57981/Chat’
// mongoose.connect(dbUrl , (err) => { 
//     console.log(‘mongodb connected’,err);
//  })
//  var Message = mongoose.model(‘Message’,{ name : String, message : String})
//socket
const io= require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connected...");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
});
