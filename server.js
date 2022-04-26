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
        conn.end();
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
        conn.end();
    } catch(error){
        console.log("An error occurred in path /hunts: "+error);
        response.send("ERROR");
    }
})

app.get("/", async function(request,response){
    try{
        console.log("Request received in app.get /");
    }catch(error){
        console.log("An error has occurred in path /"+error);
    }
})

app.put("/search",async function(request,response){
    try {
        console.log("Request received in /search");
        let difficulty = request.body.difficulty;
        let conn = mysql.createConnection({host:host,user:user,password:password,database:database});
        await conn.connect();
        let sql = "SELECT * FROM hunts WHERE difficulty ='"+difficulty+"';";
        console.log("sql statement being used is "+sql);
        await conn.query(sql,function(err,result){
            if(err) console.log("An error occurred "+err);
            else{
                console.log("SUCCESS");
                console.log("Result is: "+result);
                response.send(result);
            }

        })
        conn.end();
    }catch(error){
        console.log("An error occurred in path /search "+error);
    }
})

app.post("/feedback", async function (request, response){
    try{
        console.log("Request received in app.post /feedback");
        let conn = mysql.createConnection({host:host,user:user,password:password,database:database});
        await conn.connect();

        let feedbackList = request.body.list;
        feedbackList.forEach(function(name){
            let sql = "INSERT INTO feedback(feedbackName,feedbackValue) VALUES ('"+name+"','1');";
            conn.query(sql,function(err,result){
                if (err){
                    console.log("Error occurred: "+err);
                    let conn = mysql.createConnection({host:host,user:user,password:password,database:database});
                    conn.connect();
                    let sql2 = "UPDATE feedback SET feedbackValue = feedbackValue+1 WHERE feedbackName = '"+name+"';";
                    conn.query(sql2,function(err2,result2){
                        if(err2){
                            console.log("err2 is : "+err2);
                        }
                        else console.log("Record successfully updated");

                    })
                }
                else console.log("Record successfully updated");
            });

        })
    conn.end();
    }catch(error){
        console.log("An error has occured in path /feedback: "+error);
        response.send("ERROR");
    }
})

app.get("/feedback",async function(request,response){
    try{
        console.log("Request received in app.get /feedback");
        let conn = mysql.createConnection({host:host,user:user,password:password,database:database});
        conn.connect();
        let sql = "SELECT * FROM feedback;";
        conn.query(sql,function(err,result){
            if(err) console.log("An error occurred: "+sql)
            else{
                console.log("SUCCESS");
                response.send(result);
            }
        })
        conn.end()
    }catch(error){
        console.log("An error has occurred in path /feedback get "+error);
        response.send("ERROR");
    }
})

app.listen(port, ()=>console.log("server.js listening on port ",port));
