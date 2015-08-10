/**
 * Created by Avi on 8/5/15.
 */
(function (ng) {

    ng.module('seperate', [
        'ui.router',
        'ui.bootstrap'
    ])

        .controller('seperateController',function ctrl($scope,$http){

        })

        .config(function myAppConfig($stateProvider) {
            $stateProvider
                .state('seperate', {
                    url: '/seperate',
                    views: {
                        'right_side@': {
                            templateUrl: 'seperate/seperate.tpl.html',
                            controller: 'seperateController'
                        }
                    }
                });


        });

})(angular);

