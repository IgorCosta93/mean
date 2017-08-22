angular.module('myApp',['ngRoute']).config(config);

function config($routeProvider){
  $routeProvider.when('/', {
    //template : '<h1>This is the main Page</h1>'
    templateUrl: 'main/main.html',
    controller: 'MainController',
    controllerAs: 'vm'
  }).when('/film/:id', {
    //template: '<h1>This is the about page</h1>
    templateUrl: 'film/film.html',
    controller: 'FilmController',
    controllerAs : 'vm'
  }).otherwise({
    redirectTo: '/'
  });
}

//teste
