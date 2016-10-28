(function () {
    'use strict';

    angular
        .module('app')
        .controller('Create_Clients', Controller);

    function Controller($window, $scope, $auth) {
        var vm = this;
        vm.user = null;
        vm.saveUser = saveUser;
        vm.authenticated = authenticated;
        vm.deleteUser = deleteUser;
        initController();
        function authenticated(provider) {
            console.log(provider);
      $auth.authenticate(provider);
    };
        function initController() {
            // get current user
//            UserService.GetCurrent().then(function (user) {
//                vm.user = user;
//            });
        }

        function saveUser() {
            console.log(vm.user);
//            UserService.Update(vm.user)
//                .then(function () {
//                    FlashService.Success('User updated');
//                })
//                .catch(function (error) {
//                    FlashService.Error(error);
//                });
        }

        function deleteUser() {
//            UserService.Delete(vm.user._id)
//                .then(function () {
//                    // log user out
//                    $window.location = '/login';
//                })
//                .catch(function (error) {
//                    FlashService.Error(error);
//                });
        }
    }

})();