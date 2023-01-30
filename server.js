const express = require('express');

const mysql = require('mysql');
const bodyParser =require('body-parser')
const app = express()

app.use(express.json());


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "event_test",
    port: "3306"
}) 
connection.connect((err) => {
    if (err){
        console.log("Error connect to My database")
        return;
    }
    console.log("MySQl successfully")
 })

 app.listen(3000, () => console.log('Server is running on port 3000'))

 // create event
 app.post("/create", async (req,res) => {
    const { name_event ,speaker, place ,web } = req.body;
    
    try{
        connection.query(
            "INSERT INTO seminar_event( name_event ,speaker, place, web ) VALUES(?,?,?,?)",
            [  name_event ,speaker, place ,web ],
            (err,results,fields) => {
                if (err){
                    console.log("Error cannot insert saminar to database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message : "Created successfully"})
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send()
    }
 })
// get all
 app.get("/read", async (req,res) => {
    try {
            connection.query("SELECT * FROM seminar_event", (err,results,fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            })
    }   catch(err){
        console.log(err);
        return res.status(500).send();

    }
 })

//get by id
app.get("/read/:id", async (req,res) => {
    const id = req.params.id;
    

    try {
            connection.query("SELECT * FROM seminar_event WHERE id = ?", [id],(err,results,fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            })
    }   catch(err){
        console.log(err);
        return res.status(500).send();

    }
 })


// update accept invited
 app.put("/accept/:id", async (req,res) => {
    const id = req.params.id;
    const new_accept_event = req.body.new_accept_event;
    

    try {
            connection.query("UPDATE seminar_event SET accept_event = ? WHERE id = ?", [new_accept_event ,id],(err,results,fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "update successfully"})
            })
    }   catch(err){
        console.log(err);
        return res.status(500).send();

    }
 })

 //delete by id
app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id;
    

    try {
            connection.query("DELETE FROM seminar_event WHERE id = ?", [id],(err,results,fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "cannot delete this event"})
                }
                return res.status(200).json({ message : "delete successfully"})
            })
    }   catch(err){
        console.log(err);
        return res.status(500).send();

    }
 })

