materialAdmin
    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('materialadminCtrl', function($timeout, $state, $scope, growlService, $rootScope, $location){
        //Welcome Message
        growlService.growl('Welcome back Rent Site!', 'inverse')


        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           angular.element('html').addClass('ismobile');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');

        // For Mainmenu Active Class
        this.$state = $state;

        //Close sidebar on click
        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }

        //Listview Search (Check listview pages)
        this.listviewSearchStat = false;

        this.lvSearch = function() {
            this.listviewSearchStat = true;
        }

        //Listview menu toggle in small screens
        this.lvMenuStat = false;

        //Blog
        this.wallCommenting = [];

        this.wallImage = false;
        this.wallVideo = false;
        this.wallLink = false;

        //Skin Switch
        this.currentSkin = 'blue';

        this.skinList = [
            'lightblue',
            'bluegray',
            'cyan',
            'teal',
            'green',
            'orange',
            'blue',
            'purple'
        ]

        this.skinSwitch = function (color) {
            this.currentSkin = color;
        }

        $scope.logout = function(){

            /*$rootScope.user.username = '';
            $rootScope.user.password = '';
            $rootScope.user.role = '';*/

            $rootScope.is_authenticated = false;

            $location.path("/login")
        }

    })

    .controller('loginCtrl', function($scope, $location, $rootScope, $http, $uibModal, Dialog){

        //Status

        this.login = 1;
        this.register = 0;
        this.forgot = 0;

        $scope.modal = ""

        $scope.user = {
            name: '',
            password: '',
        };


        $scope.loginfunc = function (form) {

            if ($scope[form].$valid) {
                url = 'http://' + $rootScope.IP + ':' + $rootScope.PORT + '/login/';

                var parameter = JSON.stringify($scope.user);

                $http.post(url, parameter)
                    .success(function(response) {

                        if(response.login == 'success') {
                            $rootScope.user.username = $scope.user.name;
                            $rootScope.user.password = $scope.user.password;
                            $rootScope.user.role = response.role;

                            $rootScope.is_authenticated = true;
                            if($rootScope.user.role == "operator")
                                $location.path("/tables/subscribe_manager")
                            else
                                $location.path("/blank")

                            $scope.show = false;
                        }
                        else{
                            $scope.show = true;
                        }
                    });
            } else {

            }

	    }

        $scope.signup = function (form) {
            if($scope.password != $scope.confirm)
                alert("Password and confirm password don't match!")
            //alert($scope[form].$valid)
        }


        $scope.modalContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis ullamcorper. Integer dapibus, mi ac tempor varius, purus nibh mattis erat, vitae porta nunc nisi non tellus. Vivamus mollis ante non massa egestas fringilla. Vestibulum egestas consectetur nunc at ultricies. Morbi quis consectetur nunc.';

        //Create Sign up Modal
        function modalInstances(animation, backdrop, keyboard) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'signupModal.html',
                controller: 'loginCtrl',
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    content: function () {
                        return $scope.modalContent;
                    }
                }

            });
            return modalInstance;
        }

        //Create Register Modal
        function registerInstances(animation, backdrop, keyboard) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'registerModal.html',
                controller: 'loginCtrl',
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    content: function () {
                        return $scope.modalContent;
                    }
                }

            });
            return modalInstance;
        }

        //Custom Sizes
        $scope.open = function () {
            obj = null
            obj = modalInstances(true, true, true)

            Dialog(obj, 1)
        }

        $scope.openRegister = function () {
            obj = Dialog(obj, 0)
            obj.dismiss('cancel');

            obj = registerInstances(true, true, true)
            Dialog(obj, 1)
        };
    }).factory('Dialog', ['$window', function() {
        var object = null;
        return function(obj, flag) {
            if (flag) {
                object = obj
            }
            else{
                return object
            }
        };
     }])

    // =========================================================================
    // Sign up account
    // =========================================================================
    .controller('profileCtrl', function(growlService, $rootScope){

        //Get Profile Information from profileService Service

        //User
        this.profileSummary = "Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.";

        this.firstname = $rootScope.user.firstname;
        this.lastname = $rootScope.user.lastname;
        this.username = $rootScope.user.username;
        this.businessname = $rootScope.user.businessname;
        this.eintin = $rootScope.user.eintin;
        this.phone = $rootScope.user.phone;
        this.email = $rootScope.user.email;
        this.website = $rootScope.user.website;

        // payment preference
        this.bankaccountname = "";

        // payout preference
        this.card_name = "";
        this.card_number = "";
        this.security_code = "";
        this.expiration_date = "";

        //Edit
        this.paypal = 0;
        this.debit = 0;
        this.direct = 0;

        this.out_paypal = 0;
        this.out_debit = 0;

        this.editInfo = 0;
        this.editContact = 0;


        this.submit = function(item, message) {

            if(item === 'profileSummary') {
                this.paypal = 0;
                this.debit=0;
                this.direct=0;
            }

            if(item === 'profileInfo') {
                $rootScope.user.firstname = this.firstname;
                $rootScope.user.lastname = this.lastname;
                $rootScope.user.username = this.username;
                $rootScope.user.businessname = this.businessname;
                $rootScope.user.eintin = this.eintin;
                $rootScope.user.phone = this.phone;
                $rootScope.user.email = this.email;
                $rootScope.user.website = this.website;

                this.editInfo = 0;
            }

            if(item === 'profileContact') {
                this.out_paypal = 0;
                this.out_debit=0;
            }

            growlService.growl(message+' has updated Successfully!', 'inverse');
        }

    })
    .controller('productDetail', function($scope, $rootScope){
        $scope.product = null

        this.spec = 0

        if($rootScope.data[$scope.productID] != undefined)
            $scope.product = $rootScope.data[$scope.productID]

        this.toggle_spec = function(){
            if(this.spec == 0)
                this.spec = 1;
            else
                this.spec = 0;
        }

        this.submit_product = function(spec){
            alert(spec)
        }

    })

// =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', function($timeout, messageService){


        // Top Search
        this.openSearch = function(){
            angular.element('#header').addClass('search-toggled');
            angular.element('#top-search-wrap').find('input').focus();
        }

        this.closeSearch = function(){
            angular.element('#header').removeClass('search-toggled');
        }



        // Get messages and notification for header
        this.img = messageService.img;
        this.user = messageService.user;
        this.user = messageService.text;

        this.messageResult = messageService.getMessage(this.img, this.user, this.text);


        //Clear Notification
        this.clearNotification = function($event) {
            $event.preventDefault();

            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();

            angular.element($event.target).parent().fadeOut();

            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;

            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })

            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
        }

        // Clear Local Storage
        this.clearLocalStorage = function() {

            //Get confirmation, if confirmed clear the localStorage
            swal({
                title: "Are you sure?",
                text: "All your saved localStorage values will be removed",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F44336",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success");
            });

        }

        //Fullscreen View
        this.fullScreen = function() {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }

    })




