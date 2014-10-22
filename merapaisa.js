Rows = new Meteor.Collection("rows");

if(Meteor.isClient) {

	Meteor.subscribe('theRows');


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


}