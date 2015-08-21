// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'ngCordova'
])

    .run(function ($rootScope, $state, $ionicPlatform) {

      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {
      $ionicConfigProvider.views.maxCache(0);

      $stateProvider

          .state('welcome', {
            url: '/welcome',
            views: {
              'menuContent': {
                templateUrl: 'templates/welcome.html',
                controller: 'WelcomeCtrl'
              }
            }
          })
          .state('drive', {
            url: '/drive',
            views: {
              'menuContent': {
                templateUrl: 'templates/drive.html',
                controller: 'DriveCtrl'
              }
            }
          });

      $urlRouterProvider.otherwise('/welcome');
    })
    .controller('AppCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    }])
    .controller('WelcomeCtrl', function ($scope, Drive, $state) {
      $scope.loginByGoogle = function () {

        var client_id = "452884761284-bark5bkplgau1vcj8re88ok6r2vg3l48.apps.googleusercontent.com";//web-app
        var scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.email'];
        Drive.authenticate(client_id, scopes, {redirect_uri: 'http://localhost/callback/'})
            .then(function (response) {//authenticate
              if (response) {
                var token = response.access_token;
                gapi.auth.setToken(response);
                $state.go('drive');
              }
            },
            function (error) {
              console.log("" + error);
            });

      };
    })
    .controller('DriveCtrl', function ($scope, Drive) {
      $scope.files = [];

      $scope.readFiles = function () {
        Drive.readFiles().then(function (files) {
          $scope.files = files;
          console.log("FileRead: success.");
        }, function () {
          console.log("FileRead: error.");
        });
      };
      $scope.readFiles();

    });
