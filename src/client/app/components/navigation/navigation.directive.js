
app.directive("navigation",['navigationService',function(navigationService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/navigation/navigation.view.html",
			controller: function($scope){

				$scope.toggle = function(){
					navigationService.toggle(newPost);
				};

				$scope.hideNewPost = true;

				$scope.order = function(string) {
				  $scope.reverse = ($scope.orderOption === string) ? !$scope.reverse : false;
				  $scope.orderOption = string;
				};
				
			}
		};
}]);