//Model, loaded on both the client and the server

/*
	Each "via" is represented by a document in the Vies collection:
		user (who uploaded the via): user id
		x, y: Number (Via's coordinate) 
		public: Boolean
		who have done it: Array of user id's
		title: String
		description: String
*/

Vies = new Meteor.Collection ("vies");

Vies.allow({
	insert: function (userId, via) {
    return false;
	},
	update: function (userId, via, fields, modifier) {
		if (userId !== via.creator)
			return false;

		var allowed = ["title", "description", "x", "y"];
		if (_.difference(fields, allowed).length)
			return false;
		return false;
	},
	remove: function (userId, via) {
		return via.creator === userId === 0;
	}

});

var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});

var Coordinate = Match.Where(function (x) {
  check(x, Number);
  return x >= 0 && x <= 1;
});

Meteor.methods({
	createVia: function (options) {
		check(options, {
      title: NonEmptyString,
      description: NonEmptyString,
      x: Coordinate,
      y: Coordinate,
      public: Match.Optional(Boolean)
    });

    if (options.title.length > 30)
      throw new Meteor.Error(413, "The title is too long!");
    if (options.description.length > 1000)
      throw new Meteor.Error(413, "The description is too long!");
    if (! this.userId)
      throw new Meteor.Error(403, "You aren't logged!");

    return vies.insert({
      creator: this.userId,
      x: options.x,
      y: options.y,
      title: options.title,
      description: options.description,
      public: !! options.public

    });
  }
});

/*

This feature will be programmed and available when the service become more popular
Because if the service isn't popular, this function have no sense.

  done: function (viaId, userId) {
    check(viaId, String);
    check(userId, String);
    var via = vies.findOne(viaId);
    if (! via || via.creator !== this.userId)
  }

});

*/

displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return user.emails[0].address;
};