const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 4000;
const cors = require('cors');
app.use(cors());

let host = 'localhost';
let user = 'root';
let password = 'mysql';
let database = 'GeoCacheDB';

app.put("/hunts", async function(request, response){
    try{
        console.log("Request received in app.post /hunts");
        let conn = mysql.createConnection({host: host, user: user, password: password, database: database});
        await conn.connect();

        let sql = "INSERT INTO hunts (huntName, difficulty, latitude, longitude) VALUES ('"
        +request.body.huntName+"','"
        +request.body.difficulty+"','"
        +request.body.latitude+"','"
        +request.body.longitude+"');";

        await conn.query(sql, function(err, result){
            if (err){
                if(err.errno == 1062){
                    response.send("DUPENAME");}
                else{
                    console.log("An error occurred with sql request: "+err)
                    response.send("ERROR")
                }
            }
            else{
                console.log("Insert successful.  Contents: "+sql);
                response.send("SUCCESS");
            }
        })
        conn.end()
    }catch(error){
        console.log("An error occurred in path /hunts: "+error);
        response.send("ERROR");
    }
})

app.get("/hunts", async function(request,response){
    try{
        console.log("Request received in app.get /hunts");
        let conn = mysql.createConnection({host: host, user: user, password: password, database: database});
        await conn.connect();

        let sql = "SELECT * FROM hunts;";
        console.log("sql statement being used is "+sql);

        await conn.query(sql, function(err, result){
            if(err){
                console.log("An error occurred "+err);
            }
            else{
                console.log("SUCCESS");
                console.log("Result is "+result);
                response.send(result);
            }
        })
    } catch(error){
        console.log("An error occurred in path /hunts: "+error);
        response.send("ERROR");
    }
})

app.listen(port, ()=>console.log("server.js listening on port ",port));
