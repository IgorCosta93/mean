//Has i don't pass a [] here this will be identifi has GET
angular.module('myApp').controller('FilmController', FilmController);

//routeParams is used to recover information from the route
function FilmController($http, $routeParams){
  var vm = this;
  var id = $routeParams.id;
    $http.get('http://swapi-tpiros.rhcloud.com/films/'+id).then(function(res){
      vm.film = res.data;
    });
}
