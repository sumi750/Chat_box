const mongoose = require("mongoose");
const Chat = require("./models/chat.js")
main().then(()=>{
    console.log("Connection Succeefull");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
    from:"Neha",
    to:"Priya",
    msg: "Hello Priya send me exams date sheet ",
    created_at: new Date()
    },

    {
    from:"Rohit",
    to:"Sumit",
    msg: "Hello Brother ",
    created_at: new Date()
    },

    {
    from:"Pranav",
    to:"Himanshu",
    msg: "Teach me JS For Backend ",
    created_at: new Date()
    },

    {
    from:"Sudhnshu",
    to:"Krish",
    msg: "Give me the notes of Flutter",
    created_at: new Date()
    },

    {
    from:"David",
    to:"Prince",
    msg: "We have to Go GYM Today for Exercise",
    created_at: new Date()
    },

];

Chat.insertMany(allChats);

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

