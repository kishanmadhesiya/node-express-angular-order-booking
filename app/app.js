(function () {
    'use strict';

    angular
            .module('app', ['ui.router', 'satellizer'])
            .config(config)
            .run(run);

    function config($stateProvider, $urlRouterProvider, $authProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
                .state('create', {
                    url: '/create_clients',
                    templateUrl: 'create/client_create.html',
                    controller: 'Create_Clients',
                    controllerAs: 'vm'
                })
                .state('login', {
                    url: '/',
                    templateUrl: 'login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm'
                })
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'dashboard/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm'
                })
                .state('order_history', {
                    url: '/history',
                    templateUrl: 'order/order_history.html',
                    controller: 'Order_History',
                    controllerAs: 'vm'
                })
                .state('complain', {
                    url: '/complain',
                    templateUrl: 'order/complain.html',
                    controller: 'Complain',
                    controllerAs: 'vm'
                })
                .state('allorder', {
                    url: '/allorder',
                    templateUrl: 'admin/allorder.html',
                    controller: 'Admin_Order',
                    controllerAs: 'vm'
                })
                .state('order', {
                    url: '/order',
                    templateUrl: 'order/book_order.html',
                    controller: 'Order_Book',
                    controllerAs: 'vm'
                });
  
//        // Google
        $authProvider.google({
            clientId: '351739550955-3rjfakb8e6hgmdrugid6bk3t54sfgbh0.apps.googleusercontent.com',
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: {width: 452, height: 633}
        });
    }

    function run($http, $rootScope, $window, $location, UserService) {
        
        $rootScope.user = null;
        if ($window.jwtToken) {
            $rootScope.activeUser = true;
        } else {
            $rootScope.activeUser = false;
        }
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
         UserService.GetCurrent().then(function (user) {
                $rootScope.user = user;
            });

        // update active tab on state change
//        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//            $rootScope.activeTab = toState.data.activeTab;
//        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
        
    });
    
})();