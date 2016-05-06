
app.service('postsService',[ '$http', function($http){
	

	return {

			toggle: function(element){
				return element ? element = false : element = true
			},


			getAllPosts: function(){
				return $http.get('/posts')
								.then(function(res){
								  return res;
								})
								.catch(function(err){
								  return err;
								});
			},

			deletePost: function(postid){
				return $http.delete('/posts/'+postid)
								.then(function(res){
								  return res;
								})
								.catch(function(err){
								  return err;
								});
			},

			addComment: function(id, payload){
				return $http.put('/posts/'+id+'/comment', payload)
								.then(function(res){
								  return res;
								})
								.catch(function(err){
								  return err;
								});
			},

			// need payload??? deleted payload

			deleteComment: function(postid, userid){
				return $http.put('/posts/'+postid+'/comment/'+userid+'/delete')
								.then(function(res){
								  return res;
								})
								.catch(function(err){
								  return err;
								});
			},

			upvote: function(id){
				return $http.put('/posts/'+id+'/upvote')
								.then(function(res){
									console.log("res: ", res);
								  return res;
								})
								.catch(function(err){
									console.log(err);
								  return err;
								});
			},

			// upvote: function(id, array){
			// 	for(var i=0; i<array.length; i++){
			// 			if(array[i]._id == id){
			// 				++array[i].votes;
			// 			}
			// 		}
			// },

			downvote: function(id){
				return $http.put('/posts/'+id+'/downvote')
								.then(function(res){
									console.log("res: ", res);
								  return res;
								})
								.catch(function(err){
									console.log(err);
								  return err;
								});
			}

			// downvote: function(id, array){
			// 	for(var i=0; i<array.length; i++){
			// 			if(array[i]._id == id){
			// 				--array[i].votes;
			// 			}
			// 		}
			// }

	}


}]);
