(function () {
    'use strict';

    angular
            .module('app')
            .controller('Order_Book', Controller);

    function Controller($window, $scope, $auth,$http,UserService,OrderService,$location) {
        var vm = this;
        vm.user = null;
        vm.items = null;
        vm.userBooked=null;
       // $localStorage.itemBooked=[];
        initController();
        vm.addItem = addItem;
        vm.SubmitForm = SubmitForm;
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            }).catch(function (err) {
                    $window.location="/";
            });
            OrderService.GetAllItem().then(function(item){
                console.log(item);
                vm.items=item;
            })
            OrderService.GetBooked().then(function (itemdata) {
                    console.log(itemdata)
                vm.userBooked = itemdata.data;
            })
        }
        function SubmitForm(){
            
            var config = {
                headers : { 'Content-Type': 'application/json' } 
            }
            swal({
                title: "Matlab Soch Liya Khane Ka?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ha Be",
                cancelButtonText: "Nahi Be",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.post('/api/order/saveorderfinal', vm.userBooked, config)
            .success(function (data, status, headers, config) {
                swal("Atal La Raha Tera Order Wait Kar");
            })
            .error(function (data, status, header, config) {
               swal("Error Hai Ab Bhukhe Reh");
            });
                } else {
                    swal("Kya Hua Bhukkad ??", "");
                }
            });
        }
        function addItem(itemid,quant,price,name){
            var data = {
                itemid: itemid,
                quantity: quant,
                price: price*quant,
                name:name
            };
        
            var config = {
                headers : { 'Content-Type': 'application/json' } 
            }
            swal({
                title: "Suchi Me Bhookh Lagi Kya?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ha Bohot Tez",
                cancelButtonText: "Nahi Hai Bhookh",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.post('/api/order/saveorder', data, config)
            .success(function (data, status, headers, config) {
                swal("Ollala Ho Gya Add");
                OrderService.GetBooked().then(function (itemdata) {
                    console.log(itemdata)
                vm.userBooked = itemdata.data;
            })
            })
            .error(function (data, status, header, config) {
               swal("Error Hai Ab Bhukhe Reh");
            });
                } else {
                    swal("Kya Hua Paise Ni Hai Na ??", "");
                }
            });
            
        
          //  alert(angular.element(item));
        }
        



    }

})();
