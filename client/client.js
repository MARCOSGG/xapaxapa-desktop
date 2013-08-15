Meteor.subscribe("directory");
Meteor.subscribe("vies");

/* 
	Right now I am using the meteor example "Parties" in this website
	because I am a newbie in javascript and Meteor. So this startup in
	a near future will be changed by my own ideas for my webapp.
	But for the moment...
*/

Meteor.startup(function () {
  Deps.autorun(function () {
    if (! Session.get("selected")) {
      var via = vies.findOne();
      if (via)
        Session.set("selected", via._id);
    }
  });
});

////////////////////////////////////////////////////////////////////////
// Via details sidebar

Template.details.via = function () {
	return vies.findOne(Session.get("selected"));
};

Template.details.anyvies = function () {
  return vies.find().count() > 0;
};

