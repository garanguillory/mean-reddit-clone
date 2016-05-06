
app.directive("navigation",['navigationService',function(navigationService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/navigation/navigation.view.html",
			controller: function($scope, $window, auth, store){

				$scope.auth = auth;

				// console.log($scope.auth.profile)
				// console.log(auth.profile)

				$scope.hideNewPost = true;

				$scope.order = function(string) {
				  $scope.reverse = ($scope.orderOption === string) ? !$scope.reverse : false;
				  $scope.orderOption = string;
				};


				$scope.logout = function() {
				  auth.signout();
				  store.remove('profile');
				  store.remove('token');
				  $window.location.reload();
				}
				
			}
		};
}]);