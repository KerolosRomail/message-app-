const express = require("express")
const sqlite = require("sqlite3").verbose();
const path = require("path");
const app = express()

app.use(express.static('./public'))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));



const db = new sqlite.Database('messages.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        console.log("Connected to the messages database.");
    }
});

db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, email TEXT, message TEXT)', (err) => {
    if (err) {
        console.error("Error creating table " + err.message);
    } else {
        console.log("Messages table is ready go to ==> http://localhost:3000  ");
    }
});

let messages = [];

app.get("/",(req, res)=>{
    res.sendFile('public/index page.html', {root: __dirname});
})

app.get("/home", (req, res)=>{
    res.sendFile('public/index page.html', {root: __dirname});
})

app.get("/submit", (req, res)=>{
    res.sendFile('public/Message Submission Page.html', {root: __dirname});
})

app.post("/submit", (req, res)=>{
    // Here you would typically handle form submission, e.g., save the message to a database
    // For now, we'll just simulate a message submission

    db.run('Insert into messages (title, email, message) values (?, ?, ?)', [req.body.title, req.body.email, req.body.message], function(err) {
        if (err) {
            console.error("Error inserting message " + err.message);
            res.status(500).send("Something went wrong!");
        } else {
            console.log("Message inserted successfully.");
            res.redirect("/view");
        }
    });

})

// app.get("/view", (req, res)=>{
//     res.sendFile('public/Message Display Page.html', {root: __dirname});
// })


app.get("/view",(req, res)=>{
    // res.render("Message Display Page", {rows: " <div class='cell'> Title 3  </div><div class='cell'>sample2@example.com</div> <div class='cell'> This is another sample message body.</div>"})
    
    db.all('SELECT * FROM messages', [], (err, rows) => {
        if (err) {
            console.error("Error fetching messages " + err.message);
            res.status(500).send("Internal Server Error");
            return;
        }
        
        
        messages = rows.map(row => ({
            title: row.title,
            email: row.email,
            message: row.message
        }));

    });

    // Simulating a database query result
    const rows = messages.map(msg => `<div class='cell'> ${msg.title} </div><div class='cell'>${msg.email}</div> <div class='cell'> ${msg.message}</div>`).join('');
    console.log(rows);
    res.render("Message Display Page", {rows: rows});
})

app.listen(3000)