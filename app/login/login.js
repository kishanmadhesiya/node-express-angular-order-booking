(function () {
    'use strict';

    angular
            .module('app')
            .controller('Login', Controller);

    function Controller($window, $scope, $auth,$http,UserService,$location) {
        var vm = this;
        vm.user = null;
        vm.authenticated = authenticated;
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                if(vm.user){
                    $location.path('dashboard');
                }else{
                    $location.path('/');
                }
            });
            
        }
        function authenticated(provider) {
            console.log(provider);
            var x = $auth.authenticate(provider)
                    .then(function (res) {
                       if(res){
                          // $location.path("http://" + $window.location.host + "/#/dashboard");
                         //  window.location = "http://" + $window.location.host + "/#/dashboard";
                           $window.location = '/app/#/dashboard';
                       }
                
                    })
                    .catch(function (error) {
                        if (error.message) {
                            // Satellizer promise reject error.
                            console.log(error.message)
                        } else if (error.data) {
                            // HTTP response error from server
                            console.log(error.data)
                        } else {
                            console.log(error)
                        }
                    });
        }
        ;



    }

})();