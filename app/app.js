let app = angular.module("app", ['ngStorage', 'ngRoute']);
app.controller("AppController", function ($scope, $localStorage) {
    if ($localStorage.forms) {
        $scope.datas = JSON.parse($localStorage.forms).forms;
    }
});

app.controller("ModalController", function ($scope, $localStorage) {

    //This value is default value.
    $scope.originalForm = {
        formName: 'Form1',
        description: 'Uye formu',
        date: new Date,
        name: 'Batuhan',
        surname: 'Keten',
        age: 25
    };

    //Giving default value to form
    $scope.form = angular.copy($scope.originalForm);

    //Submitting the form to local storage
    $scope.submitForm = function () {
        let object = {
            forms: []
        }

        tmpDate = new Date();
        $scope.form.date = tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDate();

        if ($localStorage.forms) {
            let earlyObject = JSON.parse($localStorage.forms)
            console.log(earlyObject.forms);
            earlyObject.forms.push($scope.form);
            $localStorage.forms = JSON.stringify(earlyObject);
        } else {
            object.forms.push($scope.form);
            $localStorage.forms = JSON.stringify(object)
        }
        alert("Başarılı Kayıt");
    };

    //reseting all the local storage and form
    $scope.resetForm = function () {
        $localStorage.$reset();
    };

});

//Making the route configuration
app.config(function ($routeProvider) {

    $routeProvider.when('/forms/:formName', {
        templateUrl: 'forms.html',
        controller: 'FormController'
    }).otherwise({
        redirectTo: "/"
    });

});

//Adding controller to new page(forms.html) of application
app.controller("FormController", function ($scope, $location, $localStorage, $routeParams) {
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