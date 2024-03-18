const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 9001;
const path = require("path");
const Chat = require("./models/chat.js")
const methodOver = require("method-override");

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));   // for Parsing
app.use(methodOver("_method"));

main().then(()=>{
    console.log("Connection Succeefull");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// Index Route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

// New CHat--Create
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})

// Post Route
app.post("/chats", (req,res)=>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from:from,
        to: to,
        msg: msg,
        created_at : new Date()
    });
    // console.log(newChat);
    newChat.save();    // Asyn Process
    // res.send("Done")
    res.redirect("/chats");
})


// Edit & update Route
app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})


// Put in database/ Update Route
app.put("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, 
        {msg: newMsg},
        {runValidators:true, new:true});
    
    updatedChat.save();

    // console.log(updatedChat);  
    res.redirect("/chats");
})


// Delete Route
app.delete("/chats/:id" , async (req,res)=>{
    let {id} = req.params;
    let delChat = await  Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
})

// Inserting
// let chat1 = new Chat({
//     from:"Neha",
//     to:"Priya",
//     msg: "Hello Priya send me exams date sheet ",
//     created_at: new Date()
// })

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


app.listen(port, (req,res)=>{
    console.log("server  has been started", port);
})

app.get("/", (req,res)=>{
    res.send("welcome to project ");
})
