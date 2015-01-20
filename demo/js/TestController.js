
kpad.controller("DemoController", ['$scope',
    function($scope) {


        $scope.items = [
            {name: 'num1', value:'123'},
            {name: 'num2', value:'456'},
            {name: 'num3', value:'789'},
        ];


        $scope.test = '';
    }
]);