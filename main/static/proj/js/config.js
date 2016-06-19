materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
        //$urlRouterProvider.otherwise("/login");

        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------

        .state('login', {
            url: "/login",
            templateUrl: "login.html",
            data: {
                    requireLogin: false // this property will apply to all children of 'app'
                },
        })

        .state ('tables', {
            url: '/tables',
            templateUrl: 'views/common.html'
        })
        .state ('tables.subscribe-manager', {
            url: '/subscribe_manager',
            templateUrl: 'views/subscriber_management.html',

            resolve: {

                loadPlugin: function($ocLazyLoad, $location, $rootScope) {

                    //if($rootScope.is_authenticated == false || $rootScope.role != "operator")
                    //    $location.path("/login")
                    //else
                        return $ocLazyLoad.load ([])
                }

            }
        })
        .state ('tables.pin-manager', {
            url: '/pin_manager',
            templateUrl: 'views/pin_management.html',

            resolve: {

                loadPlugin: function($ocLazyLoad, $location, $rootScope) {

                    if($rootScope.is_authenticated == false || $rootScope.role != "operator")
                        $location.path("/login")
                    else
                        return $ocLazyLoad.load ([])
                }

            }
        })
        .state ('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            resolve: {

                loadPlugin: function($ocLazyLoad, $location, $rootScope) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                                    'vendors/bower_components/flot/jquery.flot.js',
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                }

            }
        })
        .state ('productList', {
            url: '/product-list',
            templateUrl: 'views/product-list.html',
            resolve: {

                loadPlugin: function($ocLazyLoad) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([])
                }

            }
        })
        .state ('productDetail', {
            url: '/product-detail:productID',
            templateUrl: 'views/product-detail.html',
            controller: function($scope, $stateParams) {
                 $scope.productID = $stateParams.productID.substr(1, $stateParams.productID.length);
              },
            resolve: {

                loadPlugin: function($ocLazyLoad) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([])
                }

            }
        })

        .state('blank', {
            url: "/blank",
            templateUrl: "views/blank.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad, $location, $rootScope) {

                    if ($rootScope.is_authenticated == false)
                        $location.path("/login")
                }
            }

        })


    });
