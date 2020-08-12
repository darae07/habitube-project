const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const session = require('express-session');

const userRouter = require('./routes/user');
const mypageRouter = require('./routes/mypage');

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(
  session({
    secret: '@habitube',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.use('/', userRouter);
app.use('/mypage', mypageRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;
