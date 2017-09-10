/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserLogin, UserClaim, UserProfile } from './data/models';
import config from './config';

passport.use(new LocalStrategy({
    usernameField: 'usernameOrEmail',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, username, password, done) {
    var user = User.findOne({ where: { email: username } }).then(
      function(user) { console.log(user) },
      function(err) { console.log(err) },
    );

    if ( user ) {
      return done(null, user);
    }
    if ( err ) { done(err); }
    if ( ! user ) { done(null, false); }
    if ( ! user.verifyPassword(password) ) { done(null, false); }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export default passport;
