if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });

  Template.gameboard.events({
    click: function() {
      console.log('Clicked the gameboard');
    }
  });

  Template.gameboard.helpers({
    // We need this later
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
