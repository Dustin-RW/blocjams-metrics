//angular.module('blocJams', []); //1rst arg is name of module, 2nd is empty array which injects dependencies
//angular.module('blocJams', ['ui.router']);
(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({ //hashBang URLs are disabled
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('index', {
                url: '/',
                contoller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album.html'
            })
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
            })
            .state('event', {
              url: '/event',
              controller: 'EventCtrl as event',
              templateUrl: '/templates/event.html'
            });
      }



    angular
        .module('blocJams', ['nvd3', 'ui.router'])
        .config(config);
})();
