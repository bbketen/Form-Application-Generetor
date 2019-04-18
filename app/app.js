let example = angular.module("example", ['ngStorage', 'ngRoute']);
example.controller("ExampleController", function ($scope, $localStorage) {
    if ($localStorage.forms) {
        $scope.datas = JSON.parse($localStorage.forms).forms;
    }
});


example.controller("ModalController", function ($scope, $localStorage) {

    $scope.originalForm = {
        formName: 'Form1',
        description: 'Uye formu',
        date: new Date,
        name: 'Batuhan',
        surname: 'Keten',
        age: 25
    };

    $scope.form = angular.copy($scope.originalForm);

    $scope.submitForm = function () {
        let object = {
            forms: []
        }

        tmpDate = new Date();
        $scope.form.date = tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDate();

        if ($localStorage.forms) {
            let a = JSON.parse($localStorage.forms)
            console.log(a.forms);
            a.forms.push($scope.form);
            $localStorage.forms = JSON.stringify(a);
        } else {
            object.forms.push($scope.form);
            $localStorage.forms = JSON.stringify(object)
        }
        alert("Başarılı Kayıt");
    };
    //6. create resetForm() function. This will be called on Reset button click.  
    $scope.resetForm = function () {
        //$scope.form = angular.copy($scope.originalForm);
        $localStorage.$reset();
    };

});

example.config(function ($routeProvider) {

    $routeProvider.when('/forms/:formName', {
        templateUrl: 'forms.html',
        controller: 'FormController'
    }).otherwise({
        redirectTo: "/"
    });

});

example.controller("FormController", function ($scope, $location, $localStorage, $routeParams) {
    $scope.originalForm = {
        formName: 'Form1',
        description: 'Uye formu',
        date: new Date,
        name: 'Batuhan',
        surname: 'Keten',
        age: 25
    };
    username = $routeParams.formName
    if ($localStorage.forms) {
        let array = JSON.parse($localStorage.forms).forms;
        angular.forEach(array, function (value, key) {
            if (value.formName == username) {
                $scope.originalForm.formName = value.formName;
                $scope.originalForm.description = value.description;
                $scope.originalForm.date = value.date;
                $scope.originalForm.name = value.name;
                $scope.originalForm.surname = value.surname;
                $scope.originalForm.age = value.age;
            }
        })
    }
    $scope.form = angular.copy($scope.originalForm);
    $location.path('/forms/' + username)
});