const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { createUserModel, getUserModel } = require("../models/users.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/user/google/callback",
      proxy: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;

        let user = await getUserModel(email);

        if (!user) {
          user = await createUserModel({
                name: profile.displayName,
                email: email,
                role: 'Profesor',
                password: '123ABCgoogle$' // No se usará pero requiere campo
            });
          
          
        //   (email, "GOOGLE_USER", "Profesor");
          
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Guardar la info en sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Recuperar de sesión
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
