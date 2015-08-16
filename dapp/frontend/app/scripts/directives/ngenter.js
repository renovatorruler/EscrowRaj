'use strict';

/**
 * @ngdoc directive
 * @name EscrowRajApp.directive:ngEnter
 * @description
 * # ngEnter
 */
angular.module('EscrowRajApp')
  .directive('ngEnter', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
      }
    };
  });
