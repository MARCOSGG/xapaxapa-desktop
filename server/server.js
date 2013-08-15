Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("vies", function () {
  return vies.find(
    {$or: [{"public": true}, {owner: this.userId}]});
});
