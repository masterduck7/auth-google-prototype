const passport = require('passport');
const app = require('../config/app');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH SETUP  */
var userProfile;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

app.get('/success', (req, res) => {
    res.send(passport.userProfile)
  });
  app.get('/error', (req, res) => res.send("error logging in"));
   
  app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] }));
   
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
      // Successful authentication, redirect success.
      res.redirect('/success');
    });