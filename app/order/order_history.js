(function () {
    'use strict';

    angular
            .module('app')
            .controller('Order_History', Controller);

    function Controller($window, $scope, $auth,$http,UserService,OrderService,$location) {
        var vm = this;
        vm.user = null;
        vm.orderHis=null;
        initController();
        
        function initController() {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            }).catch(function (err) {
                    $window.location="/";
            });
            OrderService.GetBookedHistory().then(function (itemdata) {
                console.log(itemdata);
                vm.orderHis = itemdata;                
            })
        }
        

    }

})();
