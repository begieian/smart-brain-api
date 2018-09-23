const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'blank',
    password : 'zxc',
    database : 'smart-brain-db'
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send(`it is working`);
});

app.post('/signin', signin.signinHandler(db, bcrypt));

app.post('/register', (req, res) => {
  register.registerHandler(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
  profile.profileHandler(req, res, db)
});

app.put('/image', (req, res) => {
  image.imageHandler(req, res, db)
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}...`);
});