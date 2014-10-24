Rows = new Meteor.Collection("rows");

if(Meteor.isClient) {


	Deps.autorun(function() {
	    Meteor.subscribe('users');
	    Meteor.subscribe('theRows');
	});
	
	Template.userdetails.avatar = function(){
		return Meteor.user().avatar;
	};
	Template.userdetails.uname = function(){
		return Meteor.user().username;
	};
	Template.userdetails.money = function(){
		var total = 0;
		var currentUserId = Meteor.userId();

		Rows.find({createdBy: currentUserId}).map(function(doc) {
		  total += parseFloat(doc.money);
		});


		return total;
	};


	Template.paisa.rows = function() {

		var currentUserId = Meteor.userId();

		return Rows.find({createdBy: currentUserId});
	};

	Template.paisa.events({
		'click #insert': function(){
			var n = $("input[name=name]").val();
			var m = $("input[name=money]").val();
			var p = $("input[name=photo]").val();
			currentUserId = Meteor.userId();
			if(n != "") {
				Rows.insert({
					name: n, 
					money: m, 
					photo: p,

					createdBy: currentUserId
				});

				Meteor.user.update(
				{_id: currentUserId},
				{$set: {money: 50}}
			);
			}



			$("input[name=name]").val('');
			$("input[name=money]").val('');
			$("input[name=photo]").val('');

			return false;
		}
	});


}



if (Meteor.isServer) {
	Meteor.startup(function () {
		/*
		INITIALIZING THE DB 


		if (Rows.find().count() === 0) {
			var names = ["Roger Zurawicki",
							"Ada Lovelace",
							"Grace Hopper",
							"Marie Curie",
							"Carl Friedrich Gauss",
							"Nikola Tesla",
							"Claude Shannon"];
			for (var i = 0; i < names.length; i++)
				Rows.insert({name: names[i], money: 0, photo:"http://i.imgur.com/c7zerAO.png"});
		}*/
	});

	Meteor.publish('theRows', function(){
		var currentUserId = this.userId;
		return Rows.find({ createdBy: currentUserId });
	});

	Meteor.publish('users', function() {
    	return Meteor.users.find({}, {
    		fields: {
    			avatar: 1,
    			money: 1
    		}
     	});
	});

	Accounts.onCreateUser(function (options, user) {
		if(user.services.twitter) {
		    user.username = user.services.twitter.screenName;
		    user.avatar = user.services.twitter.profile_image_url;
		}

		if(user.services.facebook) {
			user.username = user.services.facebook.name;
		    user.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
		}

		user.money = 0;

		return user;

	});




}