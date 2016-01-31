Boxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {

  Meteor.startup(function(){
    console.log('started up client');
  });

  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    },
    player: function(){
      return Session.get('player');
    }
  });

  Template.box.events({
    'click': function(){
      return Session.set('player', 'X');
    }
  });

  Template.box.helpers({
    player: function(){
      return Session.get('player');
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
