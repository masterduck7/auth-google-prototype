const passport = require('passport');
const app = require('./app');
const middleware = require('./middleware');

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
    callbackURL: "/login/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    return done(null, userProfile);
  }
));

app.get('/login/success', (req, res) => {
  middleware.checkUser(res, userProfile);
});
app.get('/login/error', (req, res) => res.send("error logging in"));

app.get('/login/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] })
);
app.get('/login/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/login/success');
  }
);

module.exports = {
  passport: passport,
  userProfile: userProfile,
};