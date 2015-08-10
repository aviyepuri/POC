(function (ng) {

    ng.module('ngBoilerplate', [
        'templates-app',
        'templates-common',
        'ngBoilerplate.home',
        'ngBoilerplate.about',
        'ui.router',
        'ui.bootstrap',
        //'UserSessionService',
        'childState',
        'seperate'
    ])


    .controller('AppCtrl', function AppCtrl($scope) {

        })

    .controller('LeftSideController',function ctrl($scope){
            $scope.pageTitle = "Demo App";
        })
    .controller('RightSideController',function ctrl($scope){
            $scope.dropdownDemoItems = [
                "The first choice!",
                "And another choice for you.",
                "but wait! A third!"
            ];
        })

    .config(function myAppConfig($httpProvider,$stateProvider, $urlRouterProvider) {

            // httpProvider global config
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

            // urlRoute global config
            $urlRouterProvider.otherwise('home');

            // stateProvider global config for parent state
            $stateProvider
                .state('app', {
                    url: '/parent',

                    resolve: {
                        user: ['UserSessionService', function (userSessionService) {
                            return userSessionService.getSessionUser();
                        }]
                    },

                    views: {
                        'left_side@': {
                            templateUrl: 'home/home.tpl.html',
                            controller: 'LeftSideController'
                        },

                        'right_side@': {
                            templateUrl: 'about/about.tpl.html',
                            controller: 'RightSideController'
                        }
                    }
                });


        })

        .run(['$rootScope', '$log', '$state', function ($rootScope, $log, $state) {
            // These states must be redirected back to default page  if page refresh occurs
            var nonRefreshingStates = [
                'app.child','home','about'
            ];

            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState) {
                    // if the fromState.name is empty then refresh was selected.
                    if (_.isEmpty(fromState.name) &&
                        _.contains(nonRefreshingStates, toState.name)) {
                        event.preventDefault(); // cancel loading the current state
                        $state.go('app');
                    }
                });
        }]);

})(angular);

