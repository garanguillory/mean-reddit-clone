
app.directive("newpost",['newpostService', function(newpostService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/newpost/newpost.view.html",
			controller: function($scope, $window){

				$scope.post = {};

				$scope.addPost = function(){
					console.log($scope.post);
					newpostService.addPost($scope.post);
					$scope.post = {};
					$window.location.reload();
				};

			}
		};
}]);
