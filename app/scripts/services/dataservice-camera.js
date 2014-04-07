define(['jquery', 'payload-builder', 'config'], function ($, builder, config) {

    'use strict';

    var shutterPress = function () {
        return $.ajax({
            url: config.BERRYCAM_URL,
            data: $.param(builder.buildPayload())
        });
    };

    return {
        shutterPress: shutterPress
    };

});
