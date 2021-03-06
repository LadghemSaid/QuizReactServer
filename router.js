const express = require("express");

const bodyParser = require("body-parser");
const app = express();
//const router = express.Router();

const db = require('./db/mongoose.js');
const Users = db.users;
const Quizz = db.quizz;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
    .use(express.static('resources'))
    .get('/quizz', (req, res) => {
        console.log("Récuperation de tous les quizz");
    Quizz.find({})
        .exec((err, data) => {
            if (err)
                return res.status(500).send(err);
            else
                //console.log("quizz/", data);

            res.json(data);
        })
}).get("/getquizz/:id", (req, res) => {
    console.log("Récuperation d'un quizz");
        let uid = parseInt(req.params.id);
    //console.log(uid);
        Quizz.findOne(
            {
                _uid: uid
               // _uid: 1
            }
        ).exec((err, data) => {
      // console.log(data,err);
        if (err)
            return res.status(500).send(err);
        else
            res.json(data);
          //  console.log("server",data);
    })
}).post("/addquiz", (req, res) => {
    console.log("Ajout d'un quizz");

    //console.log(req.body);
    //let uid = parseInt(req.params.id);
    //console.log(uid);
    Quizz.create(
        {
            _uid: 1,
            name: req.body.quizzName,
            icon: 'quizz2/aix.jpg',
            keywords: ['Aix', 'Tourisme'],
            questions: [{}],
            published: true,
            scores: []

        }
    )
})
    .use((req, res) => {
    res.status(400);
    res.json({
      error: "Bad request"
    });
  });


module.exports = app;
