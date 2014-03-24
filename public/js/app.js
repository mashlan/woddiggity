
// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','ui.bootstrap', 'diggity.angularGrid'], null);

// Declare controller module
var myControllers = angular.module('myApp.controllers', []);

// Declare services module
var services = angular.module('myApp.services', ['ngResource']);