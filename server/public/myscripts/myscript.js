const app = angular.module('pictureApp', ['ngRoute']); // <- Pass in angular-route module

console.log('app created');

app.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/picture.html',
    controller: 'PictureController as pc'
  }).when('/picture', {
    templateUrl: 'views/picture.html',
    controller: 'PictureController as pc'
  }).otherwise({ template: '<h1>404 Page Not Found</h1>' });
});

console.log('app configured');
