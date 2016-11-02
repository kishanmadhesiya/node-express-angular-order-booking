(function () {
    'use strict';

    angular
            .module('app')
            .controller('Complain', Controller);

    function Controller($window, $scope, $auth,$http,UserService,OrderService,$location) {
        var vm = this;
        vm.user = null;
        vm.name=null;
        vm.email=null;
        vm.orderid=null;
        vm.message=null;
        initController();
        vm.contactUs = contactUs;
        function initController() {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            }).catch(function (err) {
                    $window.location="/";
            });
        }
        function contactUs(){
            if(vm.name=="" || vm.email=="" || vm.message==""){
                return false;
            }
            var data = {
                name: vm.name,
                email: vm.email,
                orderid:vm.orderid,
                message:vm.message
            };
            var config = {
                headers : { 'Content-Type': 'application/json' } 
            }
            swal({
                title: "Suchi Me Complain Karna Hai ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ha Pakka",
                cancelButtonText: "Nahi ",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.post('/api/order/complain', data, config)
            .success(function (data, status, headers, config) {
                swal("Ho Gya Complain");
        $window.location.reload();
            })
            .error(function (data, status, header, config) {
               swal("Error Hai");
            });
                } else {
                    swal("Kya Hua Farzi Aadmi ??", "");
                }
            });
        }

    }

})();
