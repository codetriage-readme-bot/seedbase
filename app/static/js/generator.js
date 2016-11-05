(function() {

  'use strict';

  angular.module('Generator', [])
  .controller('generatorController', ['$scope', '$log', function($scope, $log) {
    $log.log("Test");
  }]);

}());