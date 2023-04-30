const express = require("express");
const router = express.Router();
const mysql = require("../database/connection.js").con;

router.post("/", (req,res)=>{
    const teamid = req.body.Team_ID;
    q=`DELETE FROM current_status WHERE Team_ID = ${teamid}`
    mysql.query(q,(err,data)=>{
        if(err){
            res.send({
                code:-44,
                message:err.message
            })
        }
        else{
            res.send({
                code:9,
                message:"Team deregistered successfully"
            })
        }
    })
})
module.exports=router;