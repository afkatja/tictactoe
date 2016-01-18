if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('Server is started');
  });
}
