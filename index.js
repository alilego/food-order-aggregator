var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");

//requiring routes
var indexRoutes      = require("./routes/index");
var userRoutes       = require("./routes/users");

//initialising DB connection
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost/respir_info', {
  useMongoClient: true,
  /* other options */
});

//initialising app & framework utils
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// initialising passport - for authentication
app.use(require("express-session")({
    secret: "Folosim respir.info pentru informatii privind calitatea aerului. Masuram, calculam, informam. ASDF1234LEET1337",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to save data for local session
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/user", userRoutes);

// function clearDB(){
//   //Remove all campgrounds
//   User.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("REMOVED ALL USERS!");
//     }); 
// }
// clearDB();

//app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("respir.info server has started...");
//});

app.listen(8080, 'localhost', function(){
   console.log("respir.info server has started...");
   console.log("Listening on localhost port 8080");
});