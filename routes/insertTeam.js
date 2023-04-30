const express = require("express");
const router = express.Router();
const mysql = require("../database/connection.js").con;
const axios = require("axios");

router.post("/", (req, res) => {
  var events = [];
  // const token = JSON.stringify(req.body.token);

  var Team_ID = "";
  var allmembers = [];
  var team_member_names = [];
  var team_member_sfids = [];
  var q_array = [];

  var easy_qs = [];
  var hard_qs = [];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

 
    const q =
      "SELECT question_id FROM labyrinth.labyrinth_questions WHERE difficulty='easy'";
    mysql.query(q, (err, data) => {
      // console.log(data);
      if (err) console.log(err);
      else {
        for (let i = 0; i < data.length; i++) {
          easy_qs.push(`${data[i].question_id}`);
        }

        const q1 =
          "SELECT question_id FROM labyrinth.labyrinth_questions WHERE difficulty='hard'";

        mysql.query(q1, (err, data) => {
          // console.log(data);
          if (err) console.log(err);
          else {
            for (let i = 0; i < data.length; i++) {
              hard_qs.push(`${data[i].question_id}`);
            }

            shuffle(easy_qs);

            shuffle(hard_qs);
          
            easy_qs.map((item,i) => {
              if(i<4)
              return 
                q_array.push(item)
             
            });
           
            hard_qs.map((item,i) => {
              if(i<5)
              return q_array.push(item)
            });

            q_array.push("30");
            console.log(q_array);

            axios
              .post(
                "https://mainapi.springfest.in/api/user/get_registered_events",
                {
                  token: req.body.token,
                }
              )
              .then((response) => {
                if (response.data.code == 0) {
                  events = JSON.parse(
                    JSON.stringify(response.data.message.group)
                  );

                  const event = events.filter((item, i) => {
                    return item.event_name == "Labyrinth";
                  });

                  Team_ID = event[0]?.group_id;
                  console.log(Team_ID);
                  allmembers = event[0]?.members;
                  allmembers?.map((item) => {
                    return (
                      team_member_names.push(item.member_name),
                      team_member_sfids.push(item.member_sfid)
                    );
                  });

                  const last_updated = new Date();

                  const q =
                    "INSERT INTO labyrinth.current_status(Team_ID,Team_name, current_ques_no, current_ques_id, wrong_attempts, last_updated, question_order, team_member_names, team_member_sfids) VALUES (?)";
                  const values = [
                    Team_ID,
                    req.body.Team_name,
                    1,
                    q_array[0],
                    0,
                    last_updated,
                    JSON.stringify(q_array),
                    JSON.stringify(team_member_names),
                    JSON.stringify(team_member_sfids),
                  ];
                  mysql.query(q, [values], (err, data) => {
                    if (err) {
                      console.log(err);
                      return res.send({
                       
                          code: -3,
                          message: err.message,
                        
                      });
                    } else {
                      return res.status(200).send({
                        
                          code: 0,
                          message: "Registration successfull",
                       
                      });
                    }
                  });
                }
                if (response.data.code == -2)
                  res.send({
                  
                      code: -2,
                      message: "Token expired",
                   
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    });
  
  
});

module.exports = router;
