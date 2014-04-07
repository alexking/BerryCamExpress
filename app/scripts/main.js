require.config({
    paths: {
        'bower_components': '../bower_components',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'bootstrap-slider': '../vendor/slider',
        'jquery': '../bower_components/jquery/dist/jquery',
        'amplify': '../bower_components/amplify/lib/amplify',
        'moment': '../bower_components/moment/moment',
        'spinjs': '../bower_components/spin.js/spin'
    },
    map: {
        '*': {
            'knockout': '../bower_components/knockout.js/knockout.debug',
            'ko': '../bower_components/knockout.js/knockout.debug'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-slider': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'amplify': {
            deps: ['jquery'],
            exports: 'amplify'
        }
    }
});

define(['jquery', 'knockout', 'viewmodel', 'bootstrap', 'bindings/bindings'], function ($, ko, viewmodel) {

    'use strict';

    var activate = function () {
        ko.applyBindings(viewmodel, $('html')[0]);
        $('#main-container').show();
    };

    activate();

    return {
        activate: activate
    };

});
