/**
 * Created by Avi on 8/5/15.
 */
(function (ng) {

    ng.module('childState', [
        'ui.router',
        'ui.bootstrap'
        //'someService'
    ])

        .controller('childController',function ctrl($scope,$http){
            $scope.childStateMessage = 'I am the child state';
            var parameter = JSON.stringify({"hcid":"555555551","requestHeader":{"userName":"PPORT","password":"yB3Jid2OZ062CKsLbKZvDiFZqmaRV"}});
            $http.post('http://va10duvwbs033:19080/pportmemberssvc/getSummary',parameter).then(function(resp) {
                $scope.conditions = resp;
            }, function(err) {
                console.error('ERR', err);
                $scope.conditionserror = "Sorry your rest end point returned with error code";
            });
        })

        .config(function myAppConfig($stateProvider) {
            $stateProvider
                .state('app.child', {
                    url: '/child',
                    /*resolve: {
                     list: ['someService', function (someService) {
                     return someService.getList();
                     }]
                     },*/
                    views: {
                        'right_side@': {
                            templateUrl: 'child/childstate.tpl.html',
                            controller: 'childController'
                        }
                    }
                });


        });

})(angular);

