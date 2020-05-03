const db = require("../models");

module.exports = function(app) {

  app.get("/api/workouts", (req, res) => {
    db.Workout.find().sort({day: -1}).limit(1)
      .then(dbUser => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });    

  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    db.Workout.update(
      {
        _id: req.params.id
      }, 
      {
        $push: { exercises: req.body }
      }, 
      (error, edited) => {
        if (error) {
          console.log(error);
          res.json(error);
        }
        else {
          console.log(edited);
          res.json(edited);
        }
      });
  });
      
  app.post("/api/workouts", (req, res) => {
    console.log("req.body");
    console.log(req.body);
    const workout = new db.Workout({exercise: req.body})
    db.Workout.create(workout)
      .then(dbWorkout => {
        console.log("dbWorkout");
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
      
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbUser => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

}