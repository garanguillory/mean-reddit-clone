
app.directive("reddit",['redditService', function(redditService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/reddit/reddit.view.html",
			controller: function($scope){
				// console.log(redditService);
			}
		};
}]);

