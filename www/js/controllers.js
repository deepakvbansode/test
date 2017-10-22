angular.module('starter.controllers', ['ngCordova'])

.controller('NewVisitorCtrl', ['$scope','$cordovaSQLite','$ionicPlatform','VisitorService',
                                function($scope,$cordovaSQLite,$ionicPlatform,VisitorService) {
  $scope.vp = {};

  $scope.addVisitor = function(){
    console.log("vistors:",$scope.vp.full_name);
    VisitorService.addNewVisitor($scope.vp.full_name);
  }
}])

.controller('OutCtrl', ['$scope','$cordovaSQLite','$ionicPlatform','VisitorService',
                      function($scope,$cordovaSQLite,$ionicPlatform,VisitorService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    getAllVisitors();
  });
  function getAllVisitors(){
    $scope.loadingVisitors = true;
    VisitorService.getAllVisitors()
    .then(getVisitorsSuccessCB,getVisitorsErrorCB);
  }
  
  function getVisitorsSuccessCB(response){
    $scope.loadingVisitors = false;
    if(response && response.rows && response.rows.length > 0)
    {
      $scope.visitors = [];
      for(var i=0;i<response.rows.length;i++)
      {
        $scope.visitors.push({id:response.rows.item(i).id,name:response.rows.item(i).name});
      }
    }else
    {
      $scope.message = "No visitors available till now.";
    }
  }

  function getVisitorsErrorCB(){
    $scope.loadingVisitors = false;
    $scope.message = "Some error occurred in fetching Visitors List";
  }
  

}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('HomeCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
