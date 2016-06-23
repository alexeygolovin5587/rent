var materialAdmin = angular.module('materialAdmin', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',

])

materialAdmin.run(function ($rootScope, $http, $state, $location) {
        $rootScope.user = {
            firstname: "Sam",
            lastname: "Martin",
            businessname: "web",
            eintin: "235433",
            phone: "00971123456789",
            email: "sam@gmail.com",
            website: "https://sam.com",
            username: 'sam ',
            password: '123',
        };
        $rootScope.is_authenticated = false;

        $rootScope.pass_data = {
            user: '',
            profile: ''
        }

        $rootScope.IP = "localhost"
        $rootScope.PORT = '80'
        $rootScope.rootUrl = "/static/proj/index.html#"

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        });

    })
 