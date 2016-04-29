
app.directive("comments",['commentsService', function(commentsService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/comments/comments.view.html",
			controller: function($scope){
				
			}
		};
}]);


