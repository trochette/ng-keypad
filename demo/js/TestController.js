
kpad.controller("DemoController", ['$scope',
    function($scope) {


        $scope.items = [
            {name: 'num1', value:'1111'},
            {name: 'num2', value:'2222'},
            {name: 'num3', value:'3333'},
        ];



        $scope.items2 = [
            {name: 'num4', value:'4444'},
            {name: 'num5', value:'5555'},
            {name: 'num6', value:'6666'},
        ];


        $scope.items3 = [
            {name: 'num7', value:'7777'},
            {name: 'num8', value:'8888'},
            {name: 'num9', value:'9999'},
        ];


        $scope.test = '';
    }
]);