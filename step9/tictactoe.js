Boxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  Session.set({player: 'X'});

  //do the switch of player
  var setNextPlayer = function(){
    var player = Session.get('player');
    if(player == 'X') {
      Session.set({player: 'O'});
    } else {
      Session.set({player: 'X'});
    }
  };

  var hasWon = function() {
    //make a plain array of our Collection so we can use native javascript Array methods
    var boxes = Boxes.find().fetch();
    var player = Session.get('player');
    //only check if there is such property
    if(boxes[0].player) {
      //game rules
      //we have a winner in a row
      if (boxes[0].player == player && boxes[1].player == player && boxes[2].player == player) return true;
      if (boxes[3].player == player && boxes[4].player == player && boxes[5].player == player) return true;
      if (boxes[6].player == player && boxes[7].player == player && boxes[8].player == player) return true;

      //we have a winner in a column
      if (boxes[0].player == player && boxes[3].player == player && boxes[6].player == player) return true;
      if (boxes[1].player == player && boxes[4].player == player && boxes[7].player == player) return true;
      if (boxes[2].player == player && boxes[5].player == player && boxes[8].player == player) return true;

      //we have a winner in a diagonal
      if (boxes[2].player == player && boxes[4].player == player && boxes[6].player == player) return true;
      if (boxes[0].player == player && boxes[4].player == player && boxes[8].player == player) return true;
    }
    //no winner, no joy
    return false;
  };

  var resetGame = function() {
    //Reset game: make all boxes empty
    var boxes = Boxes.find().fetch();
    for(var i = 0; i < boxes.length; i++){
      //remove player property from all cells
      Boxes.update({_id: boxes[i]._id}, {$set: {player: null}});
    }
    //reset the winnter
    Session.set('winner', null);
  };

  Template.gameboard.events({
    'click .reset-game': resetGame
  });


  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    },
    player: function(){
      return Session.get('player');
    },
    hasWon: hasWon,
    winner: function() {
      return Session.get('winner');
    }
  });

  Template.box.events({
    click: function() {
      var boxFilled = this.player;
      //if the box is filled or we have a winner, do nothing
      if (boxFilled || Session.get('winner')) {
        return;
      }
      var player = Session.get('player');
      Boxes.update(this._id, { $set: { player: player } });
      if(hasWon()) {
        Session.set('winner', player);
      } else {
        setNextPlayer();
      }
    }
  });

  Template.box.helpers({
    disabled: function () {
      //if the box is filled, we cannot click there anymore
      return this.player;
    }
  });

}

if (Meteor.isServer) {

  // executed on startup of the server
  Meteor.startup(function () {
    //just to be sure, we want to begin with a new (empty) collection
    Boxes.remove({});
    //and fill it with 9 boxes
    if(Boxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Boxes.insert({boxIndex: i});
        console.log('inserted box with index', i);
      }
    }
  });
}
