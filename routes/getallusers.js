const express = require("express");
const router = express.Router();
const mysql = require("../database/connection.js").con;
// const middlewareComp = require('../middleware/middleware')
router.post("/", (req,res)=>{
      let qry = `select * from current_status`;
      mysql.query(qry, (err, result) => {
        if (err) {
          res.send({
            code: -1,
            message: err.message,
          });
        } else {
          res.send({
            code: 5,
            message: "These are all the users",
            Top_users: result,
          });
        }
      });
    });
router.get("/getQuestion", (req,res)=>{
      let qry = `select * from labyrinth_questions`;
      mysql.query(qry, (err, result) => {
        if (err) {
          res.send({
            code: -1,
            message: err.message,
          });
        } else {
          res.send({
            code: 5,
            message: "these are the questions",
            Top_users: result,
          });
        }
      });
    });


module.exports=router;