if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });

  Template.gameboard.events({
    click: function() {
      console.log('Clicked the gameboard');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
