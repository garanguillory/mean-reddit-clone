app.service('navigationService',[ function(){

	return {

		toggle: function(element){
			return element ? element = false : element = true
		}
		
	}

}]);