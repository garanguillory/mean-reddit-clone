
app.directive("posts",['postsService', 'redditService', function(postsService, redditService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/posts/posts.view.html",
			controller: function($scope){

				postsService.getAllPosts()
					.then(function(posts){
						// console.log(posts);
						$scope.posts = posts.data.data;
						console.log($scope.posts);
					})
					.catch(function(error){
						console.log(error);
						// next(error);
					})

				$scope.upvote = function(){
					++this.post.votes // to show real time upvoting
					postsService.upvote(this.post._id)
						.then(function(post){
							return post
						})
				};
				$scope.downvote = function(){
					--this.post.votes // to show real time downvoting
					postsService.downvote(this.post._id)
						.then(function(post){
							return post
						})
				};

				$scope.hideNewComment = true;

				$scope.comment = {};
				$scope.addComment = function(){
					this.post.comments.push($scope.comment) // to show real time commenting
					postsService.addComment(this.post._id, $scope.comment)
						.then(function(comment) {
						  return comment;
						});
					$scope.comment = {};
				}

			}
		};
}]);
