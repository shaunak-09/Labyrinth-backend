const express = require("express");
const router = express.Router();
const mysql = require("../database/connection.js").con;
const middlewareComp = require('../middleware/middleware')

router.post("/",middlewareComp, (req,res)=>{
      //  console.log(req.body.SF_ID);
        // var flag=false;
        let qry = `select * from current_status where Team_ID=${req.body.Team_ID} union (select * from current_status order by current_ques_no desc limit 3) ORDER by current_ques_no desc,last_updated asc`;
        mysql.query(qry, (err, result) => {
          
          if (err) {
            res.send({
              code: -1,
              message: err.message,
            });
          } else {
            // let newResult = result.map((ele)=>{
            // //   ele.SF_ID="SF"+ele.SF_ID      
            //   return (ele)
            // })
            
            res.send({
              code: 5,
              message: "These are the users with top scores",
              Top_users: result,
            });
          }
        });
      });


module.exports=router;