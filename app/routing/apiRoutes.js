var friendData = require("../data/friends")

module.exports = function (app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var friendMatch = {
      name: friendData[0].name,
      photo: friendData[0].photo,
      totalDiff: 50
    };
    
    console.log(newFriend);
 
    for (var i = 0; i < friendData.length; i++) {
      var diff = 0;
      for (var j = 0; j < newFriend.scores.length; j++) {
        diff += Math.abs(newFriend.scores[j] - friendData[i].scores[j]);

        if (diff < friendMatch.totalDiff) {
          friendMatch = {
            name: friendData[i].name,
            photo: friendData[i].photo,
            totalDiff: diff
          }
        }
      }
    }
    console.log(friendMatch)
    friendData.push(newFriend);
    res.json(friendMatch)
  });
};