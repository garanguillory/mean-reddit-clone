var app = angular.module('MeanRedditClone',['ngRoute', 'auth0', 'angular-storage', 'angular-jwt']);



app.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  
  authProvider.init({
    domain: 'garanguillory.auth0.com',
    clientID: 'c7UwrzQIObqrnrSRkDcdimahH9SGVQ3i'
  });


  authProvider.on('loginSuccess', function($location, $window, profilePromise, idToken, store) {
    console.log("Login Success");
    profilePromise.then(function(profile) {
      store.set('profile', profile);
      store.set('token', idToken);
    });
    $location.path('/');
  });

  authProvider.on('loginFailure', function() {
     // Error Callback
  });

  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');

})

.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});


