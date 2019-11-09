const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// db connexion
mongoose.connect('mongodb://localhost/quizz',{ useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("connected to", db.client.s.url);
});

// database collections
const usersSchema = mongoose.Schema({
  name: String,
  password: String
});

const quizzesSchema = mongoose.Schema({
  name: String,
  icon: String,
  keywords: [],
  questions: [],
  published: Boolean,
  ownerId: Schema.Types.ObjectId,
  scores: []
});


// exports
const Users = mongoose.model('Users', usersSchema);
const Quizzes = mongoose.model('Quizzes', quizzesSchema);

module.exports = {};
module.exports.users = Users;
module.exports.quizz = Quizzes;

