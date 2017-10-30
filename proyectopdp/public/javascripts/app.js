var app = angular.module("miApp", ['ngRoute']);
app.controller('contacto', function($scope, $routeParams) {
    $scope.Elnombre = $routeParams.nombre;
});
app.controller('listado', function($scope, $http) {
    $scope.prueba = "mesaje de pruenba";
    //Ruta a api rest $http.get(/usuarios/obtenerTodos)
    $http.get('https://dog.ceo/api/breeds/list/all')
        .then(function(respuesta) {
            //Todo Ok 
            $scope.listado = respuesta;
        }, function(error) {
            //Pasó algo
            console.log(error);
        });
});
app.controller('usuarios', function($scope, $http, $route) {
    $http.get('/users/getAll')
        .then(function(respuesta) {
            //Todo Ok 

            $scope.listaDeUsuarios = respuesta.data;


        }, function(error) {
            //Pasó algo
            console.log(error);
        });
    $scope.eliminarUsuario = function(usuarioId) {
        //console.log("Voy a eliminar a : " + usuarioIndice);
        $http.put("/users/delete/", { eliminar: usuarioId })
            .then(function(respuesta) {
                console.log("OK");
                $route.reload();
            }, function(error) {
                //Pasó algo
                console.log("Error:" + error);
            });
    }
    $scope.crearUsuario = function() {
        $http.post('/users/create', $scope.usuarioNuevo)
            .then(function(respuesta) {

                $route.reload();
            }, function(error) {
                //Pasó algo
                console.log("Error:" + error);
            });

    }
    $scope.obtenerUsuario = function(usuarioId) {
        $http.get('/users/get/' + usuarioId)
            .then(function(respuesta) {

                $scope.usuario = respuesta.data;
                $scope.UserUpdate = true;
            }),
            function(error) {
                //
            }
    }
    $scope.actualizarUsuario = function() {
        $http.put('/users/update/' + $scope.usuario._id, $scope.usuario)
            .then(function(respuesta) {
                $route.reload();

            }),
            function(error) {
                //
            }
    }
});

app.controller('altaContacto', function($scope, $http) {

    $scope.darDeAlta = function() {
        $http.post("/users/alta/", $scope.usuario)
            .then(function(respuesta) {
                console.log(respuesta);
            }, function(error) {

            })
    }






});
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "vistas/home.html"
        })
        .when('/listado', {
            templateUrl: "vistas/listado.html",
            controller: "listado"
        })
        .when('/usuarios', {
            templateUrl: "vistas/usuarios.html",
            controller: "usuarios"
        })
        .when('/contacto', {
            templateUrl: 'vistas/contacto.html'

        })
        .when('/contacto/:nombre', {
            templateUrl: 'vistas/contacto.html',
            controller: 'contacto'
        });
    $locationProvider.html5Mode(true);

});