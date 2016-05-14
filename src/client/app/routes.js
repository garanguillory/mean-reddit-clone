app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<reddit></reddit>'
      })
      // .when('/posts', {
      //   template: '<reddit></reddit>'
      // })
      .otherwise({
        redirectTo: '/'
      });
}]);
