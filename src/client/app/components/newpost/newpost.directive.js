
app.directive("newpost",['newpostService', function(newpostService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/newpost/newpost.view.html",
			controller: function(auth, $scope, $window){

				$scope.auth = auth;
				$scope.post = {};

				console.log("$scope.post.author: ", $scope.post.author);

				// console.log($scope.post.user_id);

				// need to add author/user id 

				// ADD auth.profile.nickname in author field of newpost form ???

				// if(auth.isAuthenticated){
				// 	$scope.post.author = $scope.auth.profile.nickname;
				// 	console.log("$scope.post.author: ", $scope.post.author);
				// 	$scope.post.user_id = $scope.auth.profile.user_id;
				// 	console.log("$scope.post.user_id: ", $scope.post.user_id);
				// }

				$scope.addPost = function(){

					if(auth.isAuthenticated){

						$scope.post.author = $scope.auth.profile.nickname;
						$scope.post.user_id = $scope.auth.profile.user_id;

						console.log($scope.post);
						newpostService.addPost($scope.post);
						$scope.post = {};
						$window.location.reload();
					} else {
						console.log("You must be logged in to submit a new post!!!")
					}
				};

			}
		};
}]);
