angular.module('myApp').controller('MainController', MainController);

function MainController($http){
    var vm = this;

    $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(res){
      //console.log(res);
      vm.films = res.data;
    });

    vm.name = 'Tamas';
}
