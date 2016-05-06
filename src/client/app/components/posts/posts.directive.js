
app.directive("posts",['postsService', 'redditService', function(postsService, redditService){
		return {
			restrict: 'AE',
			templateUrl: "app/components/posts/posts.view.html",
			controller: function($scope, auth, store){

				$scope.auth = auth;

				console.log("auth.isAuthenticated: ", auth.isAuthenticated)


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
					if(auth.isAuthenticated){
						++this.post.votes // to show real time upvoting
						postsService.upvote(this.post._id)
							.then(function(post){
								return post
							})
						} else {
							// SHOW A MESSAGE IN THE HTML
							console.log("You must be logged in to upvote!!!");
						}
				};
				$scope.downvote = function(){
					if(auth.isAuthenticated){
						--this.post.votes // to show real time downvoting
						postsService.downvote(this.post._id)
							.then(function(post){
								return post
							})
						} else {
							// SHOW A MESSAGE IN THE HTML
							console.log("You must be logged in to downvote!!!")
						}
				};

				$scope.hideNewComment = true;

				$scope.comment = {};

				$scope.addComment = function(){

					if(auth.isAuthenticated){

						$scope.comment.user_id = $scope.auth.profile.user_id;
						$scope.comment.author = $scope.auth.profile.nickname;

						this.post.comments.push($scope.comment) // to show real time commenting
						postsService.addComment(this.post._id, $scope.comment)
							.then(function(comment) {
							  return comment;
							});
						$scope.comment = {};
					} else {
						// need to show a message in the html
						console.log("You must be logged in to comment!!!")
					}
				}

				$scope.deleteComment = function(){

					if(auth.isAuthenticated){

						var commentArray = this.post.comments;

						console.log("deleting post");

						for(var i=0; i<commentArray.length; i++){
							if(commentArray[i].user_id == auth.profile.user_id){
								postsService.deleteComment(this.post._id, commentArray[i].user_id)
								commentArray.splice(commentArray.indexOf(commentArray[i]),1)
							}
						}

					} else {
						// need to show a message in the html
						console.log("You must be the author of the comment to delete it!!!")
					}
				}

				// - - - - - - - - - - - - - 

				$scope.deletePost = function(){

					if(auth.isAuthenticated){
						postsService.deletePost(this.post._id);
						$scope.posts.splice($scope.posts.indexOf(this.post), 1);
					} else {
						// need to show a message in the html
						console.log("You must be the author of the post to delete it!!!")
					}


				};

			}
		};
}]);
