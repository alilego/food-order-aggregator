var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("main");
});

// show register form
router.get("/register", function(req, res){
  res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    console.log("REGISTER USER");
    var now = new Date();
    var newUser = new User({username: req.body.username,
                            registrationDate: now
                            });
    console.log(newUser);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Salut, " + user.username + "! Bine ai venit in comunitatea respir.info!");
          res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
  res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "La revedere!");
  res.redirect("/");
});

module.exports = router;