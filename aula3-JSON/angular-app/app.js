angular.module('meanhotel',['ngRoute']).config(config);

function config($routeProvider){
  $routeProvider.when('/', {
    //template : '<h1>This is the main Page</h1>'
    templateUrl:  'angular-app/hotels.html',
    controller: HotelsController,
    controllerAs: 'vm'
  });
}

function HotelsController(){
  var vm = this;
  vm.title = "Mean Hotel App 1";
}
