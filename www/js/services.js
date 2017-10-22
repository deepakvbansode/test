angular.module('starter.services', ['ngCordova'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


/** visitor Service */
var visitorApp = angular.module('starter.services');

visitorApp.factory('VisitorService',['$cordovaSQLite','$ionicPlatform','$q',
	function($cordovaSQLite,$ionicPlatform,$q){
		var db;
    var visitorList;
    initDB();
		return {
			initDB:initDB,
			getAllVisitors: getAllVisitors,
			addNewVisitor: addNewVisitor,
			logOutVisitor: logOutVisitor,
			getVisitor:getVisitor
		}

		function initDB() {
		  $ionicPlatform.ready(function() {
		  	if(window.cordova)
		  	   {
			   	db = $cordovaSQLite.openDB("myapp.db");
			   }else
			   {
			   	db = window.openDatabase("myapp.db", '1.0', 'Trackers DB', -1);
			   }

			 // db = $cordovaSQLite.openDB("visitorapp.db");
			  
			   var query = "CREATE TABLE IF NOT EXISTS visitors (id integer primary key, name string)";
			    runQuery(query,[],function(res) {
			      console.log("table created ");
			    }, function (err) {
			      console.log(err);
			    });
		  }.bind(this));
		}

		function getAllVisitors(){
			var deferred = $q.defer();
			var query = "SELECT * from visitors";
			runQuery(query,[],function(response){
				//Success Callback
				console.log(response);
				visitorList = response.rows;
        deferred.resolve(response);
        //deferred.resolve[{'name':'sham'},{'name':'karan'}]
			},function(error){
				//Error Callback
				console.log(error);
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function addNewVisitor(name) {
			console.log('adding new visitor :'+name);
			var deferred = $q.defer();
			var query = "INSERT INTO visitors (name) VALUES (?)";
			runQuery(query,[name],function(response){
				//Success Callback
				console.log(response);
				deferred.resolve(response);
			},function(error){
				//Error Callback
				console.log(error);
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function logOutVisitor(id) {
			var deferred = $q.defer();
			var query = "DELETE FROM trackers_list WHERE id = ?";
			runQuery(query,[id],function(response){
				//Success Callback
				console.log(response);
				deferred.resolve(response);
			},function(error){
				//Error Callback
				console.log(error);
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function getVisitor(id) {
			var visitor;
			if(visitorList){
				for(var i=0;i<visitorList.length;i++)
				{
					if(visitorList.item(i).id == id)
						visitor = visitorList.item(i);
				}
			}
			return visitor;
		}

		function runQuery(query,dataArray,successCb,errorCb)
		{
      var q = $q.defer();
		  $ionicPlatform.ready(function() {		  
			    $cordovaSQLite.execute(db, query,dataArray).then(function(res) {
			      successCb(res);
			    }, function (err) {
			      errorCb(err);
			    });
      }.bind(this));
      
		}

	}
]);