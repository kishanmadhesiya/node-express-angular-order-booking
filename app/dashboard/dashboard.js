(function () {
    'use strict';

    angular
            .module('app')
            .controller('Dashboard', Controller);

    function Controller($window, $scope, $auth,$http,UserService,$location) {
        var vm = this;
        vm.user = null;
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                if(vm.user){
                    $location.path('order'); //will make it dashboard
                }
            }).catch(function (err) {
                    $location.path('login');
            });
        }
        



    }

})();