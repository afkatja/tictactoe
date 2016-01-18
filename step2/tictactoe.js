Boxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });

  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    //fill 9 cells
    if(Cells.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Cells.insert({cellIndex: i});
      }
    }
  });
}
