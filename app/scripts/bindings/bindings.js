define(['knockout', 'jquery', 'spinjs', 'bootstrap-slider', ], function (ko, $, Spinner) {

    'use strict';

    ko.bindingHandlers.sliderValue = {
        init: function (element, valueAccessor, allBindings) {
            var value = valueAccessor(),
                dataSliderMin = ko.unwrap(allBindings.get('dataSliderMin')) || 0;

            $(element).attr('data-slider-min', dataSliderMin)
                .slider('setValue', value)
                .on('slide', function (ev) {
                    value(ev.value);
                });
        },
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            $(element).slider('setValue', value);
        }
    };

    ko.bindingHandlers.ajaxSpinner = {

        update: function (element, valueAccessor, allBindingsAccessor) {

            var options = {},
                valueUnwrapped,
                $elem = $(element),
                backgroundColor = $elem.css('background-color');

            valueUnwrapped = ko.unwrap(valueAccessor());
            $.extend(options, ko.bindingHandlers.ajaxSpinner.defaultOptions, ko.utils.unwrapObservable(allBindingsAccessor().spinnerOptions));

            if (valueUnwrapped) {
                var spinner = new Spinner(options);
                $elem.css({
                    'color': backgroundColor,
                    'cursor': 'default'
                });
                spinner.spin($elem[0]);
            } else {
                $elem.css({
                    'color': '',
                    'cursor': 'auto'
                }).find('.spinner').remove();
            }
        },

        defaultOptions: {
            lines: 9, // The number of lines to draw
            length: 3, // The length of each line
            width: 2, // The line thickness
            radius: 3, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#fff', // '#1A79AB', // #rgb or #rrggbb
            backgroundColor: 'transparent',
            speed: 1.2, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)|
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        }
    };

});
