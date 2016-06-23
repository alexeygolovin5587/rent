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

        .state ('home', {
            url: '/home',
            templateUrl: 'views/account.html',
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
            templateUrl: 'views/product_management.html',
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
            templateUrl: 'views/product_detail.html',
            controller: function($scope, $stateParams) {
                 $scope.productID = $stateParams.productID.substr(1, $stateParams.productID.length);
              },
            resolve: {

                loadPlugin: function($ocLazyLoad) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([{
                                        name: 'css',
                                        insertBefore: '#app-level',
                                        files: [
                                            'vendors/bower_components/nouislider/jquery.nouislider.css',
                                            'vendors/farbtastic/farbtastic.css',
                                            'vendors/bower_components/summernote/dist/summernote.css',
                                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                            'vendors/bower_components/chosen/chosen.min.css'
                                        ]
                                    },
                                    {
                                        name: 'vendors',
                                        files: [
                                            'vendors/input-mask/input-mask.min.js',
                                            'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                            'vendors/bower_components/moment/min/moment.min.js',
                                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                            'vendors/bower_components/summernote/dist/summernote.min.js',
                                            'vendors/fileinput/fileinput.min.js',
                                            'vendors/bower_components/chosen/chosen.jquery.js',
                                            'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                            'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                        ]
                                    }])
                }

            }
        })
        .state ('productRent', {
            url: '/product-rent:productID',
            templateUrl: 'views/product_rent.html',
            controller: function($scope, $stateParams) {
                 $scope.productID = $stateParams.productID.substr(1, $stateParams.productID.length);
              },
            resolve: {

                loadPlugin: function($ocLazyLoad) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([{
                                        name: 'css',
                                        insertBefore: '#app-level',
                                        files: [
                                            'vendors/bower_components/nouislider/jquery.nouislider.css',
                                            'vendors/farbtastic/farbtastic.css',
                                            'vendors/bower_components/summernote/dist/summernote.css',
                                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                            'vendors/bower_components/chosen/chosen.min.css'
                                        ]
                                    },
                                    {
                                        name: 'vendors',
                                        files: [
                                            'vendors/input-mask/input-mask.min.js',
                                            'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                            'vendors/bower_components/moment/min/moment.min.js',
                                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                            'vendors/bower_components/summernote/dist/summernote.min.js',
                                            'vendors/fileinput/fileinput.min.js',
                                            'vendors/bower_components/chosen/chosen.jquery.js',
                                            'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                            'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                        ]
                                    }])
                }

            }
        })
        .state ('productSale', {
            url: '/product-sale:productID',
            templateUrl: 'views/product_sale.html',
            controller: function($scope, $stateParams) {
                 $scope.productID = $stateParams.productID.substr(1, $stateParams.productID.length);
              },
            resolve: {

                loadPlugin: function($ocLazyLoad) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([{
                                        name: 'css',
                                        insertBefore: '#app-level',
                                        files: [
                                            'vendors/bower_components/nouislider/jquery.nouislider.css',
                                            'vendors/farbtastic/farbtastic.css',
                                            'vendors/bower_components/summernote/dist/summernote.css',
                                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                            'vendors/bower_components/chosen/chosen.min.css'
                                        ]
                                    },
                                    {
                                        name: 'vendors',
                                        files: [
                                            'vendors/input-mask/input-mask.min.js',
                                            'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                            'vendors/bower_components/moment/min/moment.min.js',
                                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                            'vendors/bower_components/summernote/dist/summernote.min.js',
                                            'vendors/fileinput/fileinput.min.js',
                                            'vendors/bower_components/chosen/chosen.jquery.js',
                                            'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                            'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                        ]
                                    }])
                }

            }
        })
        .state ('productService', {
            url: '/product-service:productID',
            templateUrl: 'views/product_service.html',
            controller: function($scope, $stateParams) {
                 $scope.productID = $stateParams.productID.substr(1, $stateParams.productID.length);
              },
            resolve: {

                loadPlugin: function($ocLazyLoad) {

                    //if($rootScope.is_authenticated == false)
                    //    $location.path("/login")
                    //else

                        return $ocLazyLoad.load ([{
                                    name: 'css',
                                    insertBefore: '#app-level',
                                    files: [
                                        'vendors/bower_components/nouislider/jquery.nouislider.css',
                                        'vendors/farbtastic/farbtastic.css',
                                        'vendors/bower_components/summernote/dist/summernote.css',
                                        'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                        'vendors/bower_components/chosen/chosen.min.css'
                                    ]
                                },
                                {
                                    name: 'vendors',
                                    files: [
                                        'vendors/input-mask/input-mask.min.js',
                                        'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                        'vendors/bower_components/moment/min/moment.min.js',
                                        'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                        'vendors/bower_components/summernote/dist/summernote.min.js',
                                        'vendors/fileinput/fileinput.min.js',
                                        'vendors/bower_components/chosen/chosen.jquery.js',
                                        'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                        'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                    ]
                                }])
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
