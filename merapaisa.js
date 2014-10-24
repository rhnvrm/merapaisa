Rows = new Meteor.Collection("rows");



if(Meteor.isClient) {


	Accounts.ui.config({

	  passwordSignupFields: 'USERNAME_AND_EMAIL'
	});


	Deps.autorun(function() {
	    Meteor.subscribe('users');
	    Meteor.subscribe('theRows');
	    	Session.set('selectedDateRange', 'default');
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
		/*var dateRange = Session.get('selectedDateRange');

		if(selectedDateRange == 'week'){
			
			var end = new Date();
			
			var start = new Date();

			date.setDate(date.getDate() - 7);
			console.log('week');
			return Rows.find({createdBy: currentUserId, date: {$gte:start, $lt:end}});
		}
		else if(selectedDateRange == 'month'){
			
			var end = new Date();
			
			var start = new Date();

			date.setDate(date.getDate() - 30);
			console.log('yes');
			return Rows.find({createdBy: currentUserId, date: {$gte:start, $lt:end}});
		}*/
		//else{
				return Rows.find({createdBy: currentUserId});
		//}
	};


	Template.paisa.selectedClass = function(){
		var selectedPlayer = Session.get('selectedPlayer');
    	var playerId = this._id;
    	if(selectedPlayer === playerId){
        	return 'selected';
	    }
	};


	Template.paisa.events({
		'click #insert': function(){
			var n = $("input[name=name]").val();
			var m = parseInt($("input[id=money]").val());
			var p = $("input[name=photo]").val();
			var d = $("input[id=datePicker]").val();
			var negate = 1;
			var expr = m * negate;
   		    if($("#crdr_change").val() == "DR") negate = -1;

			currentUserId = Meteor.userId();
			if(n != "") {
				Rows.insert({
					name: n, 
					money: expr, 
					photo: p,
					date: d,

					createdBy: currentUserId
				});
			}



			$("input[name=name]").val('');
			$("input[name=money]").val('');
			$("input[name=photo]").val('');

			return false;
		},

		'click tr': function(){
		    var playerId = this._id;
        	Session.set('selectedPlayer', playerId);
        	var selectedPlayer = Session.get('selectedPlayer');
        	//console.log(selectedPlayer);
		},

		'click #increment': function(){
			var selectedPlayer = Session.get('selectedPlayer');
		    var negate = 1;
		    var change_val = parseInt($("#changemoney").val());
		    if(change_val){
    		    if($("#crdr_change").val() == "DR") negate = -1;
    
    		    Rows.update(
    		        {_id: selectedPlayer},
    		        {$inc: {money: change_val * negate}}
    		    );
		    }
		},

		'click #showonlythisweek': function(){
			Session.set('selectedDateRange', 'week');
		},

		'click #showonlythismonth': function(){
			Session.set('selectedDateRange', 'month');
		},

		'click #showall': function(){
			Session.set('selectedDateRange', 'default');
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