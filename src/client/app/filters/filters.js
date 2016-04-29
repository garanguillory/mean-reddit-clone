app.filter('money', function(){
	return function(input){
		var string = String(input);
		var secondToLast = string.charAt(string.length-2);
		var last = string.charAt(string.length-1);
		return '$' + string.replace(/\d.$/, '.' + secondToLast + last);
	};
});

app.filter('inStock', function(){
	return function(input){
		return input == true ? 'yes' : 'no';
	};
});