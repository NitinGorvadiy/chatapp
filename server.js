const express = require("express");
const path = require('path');

const app = express();
const server = require("http").createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
       socket.broadcast.emit("update", username + " " + "joined the conversation")
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " " + "left the conversation")
     });

     socket.on("chat", function(message){
        socket.broadcast.emit("chat", message)
     });
});


server.listen(5000, () => console.log(`Listening on port 5000`));



// const express = require("express");
// const path = require('path');
// const mysql = require('mysql');

// const app = express();
// const server = require("http").createServer(app);
// const io = require('socket.io')(server);

// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'chat_room'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

// app.use(express.static(path.join(__dirname + "/public")));

// io.on("connection", function(socket) {
//     socket.on("newuser", function(username) {
//         socket.broadcast.emit("update", username + " " + "joined the conversation")
//     });

//     socket.on("exituser", function(username) {
//         socket.broadcast.emit("update", username + " " + "left the conversation")
//     });

//     socket.on("chat", function(message) {
//         socket.broadcast.emit("chat", message);

//         // Store the message in the database
//         const insertQuery = "INSERT INTO chat_messages (username, message) VALUES (?, ?)";
//         db.query(insertQuery, [message.username, message.text], (err, result) => {
//             if (err) {
//                 console.error('Error inserting message into database:', err);
//             } else {
//                 console.log('Message inserted into database');
//             }
//         });
//     });
// });

// server.listen(5000, () => console.log(`Listening on port 5000`));
