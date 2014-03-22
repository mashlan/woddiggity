/************ CONFIG PASSPORT ********************/

module.exports = function(passport, localStrategy, userRepo) {

    //configure passport
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new localStrategy(
        function (username, password, done) {
            console.log("LocalStrategy working...");
            userRepo.logIn(username,password, done);
        })
    )
};
