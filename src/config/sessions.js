import session from 'express-session';
const fileStore = require('session-file-store')(session);
require('dotenv').config();

const sessionOptions = session({
  name: 'session',
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  store: new fileStore({
    logFn: function () {},
    path: require('path').join(require('os').tmpdir(), 'sessions'),
  }),
  cookie: {
    secure: false,
    maxAge: 3600000,
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  },
});

export default sessionOptions;
