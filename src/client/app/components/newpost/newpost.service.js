
app.service('newpostService',[ '$http', function($http){
	


	return {

		addPost: function(payload){
			return $http.post('/posts', payload)
							.then(function(res){
							  return res;
							})
							.catch(function(err){
							  return err;
							});
		}

	}

}]);