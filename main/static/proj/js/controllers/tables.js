materialAdmin
    .controller('tableCtrl', function($filter, $sce, ngTableParams, tableService, $scope, $rootScope, $location) {
        var data = tableService.data;
        $rootScope.data = data

        //Editable
        this.tableEdit = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                var sliced = {};
                var i = 0;
                for (var k in data) {
                    if (i >= (params.page() - 1) * params.count() && i < params.page() * params.count())
                        sliced[k] = data[k];
                    i++;
                }
                $defer.resolve(sliced);
            }
        });

        $scope.product_detail = function(id){
            $location.path("/product-detail:" + id)
        }
    })
    /*.controller('tableCtrl', function($filter, $sce, ngTableParams, $http, $rootScope, $scope, $uibModal) {
        $scope.data = [];

        $http.get('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/subscribers/')
		.success(function(response) {
            $scope.all_data = response

            $scope.data = $scope.all_data


            //Filtering
            $scope.tableFilter = new ngTableParams({
                page: 1,            // show first page
                count: 10,
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: $scope.data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ? $filter('filter')($scope.all_data, params.filter()) : $scope.all_data;

                    this.name = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.email = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.created_on = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.balance = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.status = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(this.name, this.email, this.created_on, this.balance, this.status);

                    $scope.data = orderedData

                    // use build-in angular filter
                    orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    $scope.data = orderedData
                }
            })

        })

        $scope.modalContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis ullamcorper. Integer dapibus, mi ac tempor varius, purus nibh mattis erat, vitae porta nunc nisi non tellus. Vivamus mollis ante non massa egestas fringilla. Vestibulum egestas consectetur nunc at ultricies. Morbi quis consectetur nunc.';

        //Create Modal
        function modalInstances(animation, size, backdrop, keyboard) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    content: function () {
                        return $scope.modalContent;
                    }
                }

            });
        }

        //Custom Sizes
        $scope.open = function (size) {
            modalInstances(false, size, 'static', true)
        }
    })

    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, $rootScope, $location, content) {

          $scope.modalContent = content;

          $scope.subscriber = {
              "name":"",
              "phone":"",
              "email":"",
              "password":""
          }

          $scope.ok = function (form) {

            if ($scope[form].$valid) {
                var parameter = JSON.stringify($scope.subscriber);

                $http.post('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/create-subscriber/', parameter)
                .success(function(response) {

                    if(response.result == "success")
                    {
                        $location.path("/tables/subscribe_manager")
                    }
                })
                $modalInstance.close();
            }
          };

          $scope.cancel = function () {

            $modalInstance.dismiss('cancel');
          };
    })

    .controller('pinCtrl', function($filter, $sce, ngTableParams, $http, $rootScope, $scope) {
        $scope.data = [];

        $http.get('http://' + $rootScope.IP + ':' + $rootScope.PORT + '/pins/')
		.success(function(response) {
            $scope.all_data = response

            $scope.data = $scope.all_data

            //Filtering
            $scope.tableFilter = new ngTableParams({
                page: 1,            // show first page
                count: 10,
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: $scope.data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ? $filter('filter')($scope.all_data, params.filter()) : $scope.all_data;

                    this.name = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.email = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.created_on = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.activated_on = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.balance = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.value = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(this.name, this.email, this.created_on, this.activated_on, this.balance, this.value);

                    $scope.data = orderedData

                    // use build-in angular filter
                    orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    $scope.data = orderedData
                }
            })

        })
    })*/
