Boxes = new Mongo.Collection('boxes');

if (Meteor.isClient) {
  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    }
  });

  Template.gameboard.events({
    click: function() {
    }
  });

  Template.box.events({
    click: function() {
      console.log('Clicked box nr',this);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //just to be sure, we want to begin with a new collection
    Boxes.remove({});
    //and fill it with 9 boxes
    if(Boxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Boxes.insert({});
      }
    }
  });
}
