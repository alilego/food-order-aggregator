
/*  time, lat and long shall be created as indexes
        https://docs.mongodb.com/manual/tutorial/create-indexes-to-support-queries/
        https://docs.mongodb.com/manual/core/index-compound/
*/

var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);