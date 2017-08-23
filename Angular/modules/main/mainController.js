angular.module('myApp').controller('MainController', MainController);

/*
function MainController($http){
    var vm = this;

    $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(res){
      //console.log(res);
      vm.films = res.data;
    });

    vm.name = 'Tamas';
}
*/

//We can mke it simple in just one file with datafactory

function MainController(FilmFactory){
  var vm = this;

  FilmFactory.getAllFilms().then(function(res){
    vm.films = res;
  });
  vm.name = 'Igor';

  vm.date1 = '12 February 2017';
  vm.date2 = '10 March 2017';
  vm.date3 = '03 May 2016';
  vm.date4 = '23 December 2016';
}
