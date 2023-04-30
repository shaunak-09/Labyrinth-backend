const express = require("express");
const router = express.Router();
const mysql = require("../database/connection.js").con;
// const middlewareComp = require('../middleware/middleware')
router.post("/", (req,res)=>{
  console.log(req.body.Team_ID);
      const qry = `select * from current_status where Team_ID = ${req.body.Team_ID}`;
      mysql.query(qry, (err, result) => {
        if (err) {
          res.send({
            code: -1,
            message: err.message,
          });
        } else {
          if(result.length==0)
          res.send("no data")
          else
          res.send({
            
            code: 5,
            message: "Current Info",
            Current_qno: result[0]?.current_ques_no,
            Current_qid:result[0]?.current_ques_id,
            Wrong_attempts:result[0]?.wrong_attempts,
            teamname:result[0]?.Team_name,
                    });
        }
      });
    });


module.exports=router;