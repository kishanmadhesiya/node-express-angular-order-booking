(function () {
    'use strict';

    angular
            .module('app')
            .controller('Admin_Order', Controller);

    function Controller($window, $scope, $auth,$http,UserService,OrderService,$location) {
        var vm = this;
        vm.user = null;
        vm.orderBooked=null;
        initController();
        
        function initController() {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            }).catch(function (err) {
                    $window.location="/";
            });
            OrderService.GetBookedOrder().then(function (itemdata) {
                console.log(itemdata);
                vm.orderBooked = itemdata;                
            })
        }
        

    }

})();
