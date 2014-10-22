Rows = new Meteor.Collection("rows");

if(Meteor.isClient) {

	Template.paisa.rows = function() {
		return Rows.find();
	};

	Template.paisa.events({
		'click #insert': function(){
			var n = $("input[name=name]").val();
			var m = $("input[name=money]").val();
			var p = $("input[name=photo]").val();
			if(n != "") {
				Rows.insert({name: n, money: m, photo: p});
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
}