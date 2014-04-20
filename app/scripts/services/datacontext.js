define(['./dataservice'], function (dataservice) {

    'use strict';

    var camera = {
        shutterPress: function () {
            return dataservice.camera.shutterPress().done(function (results) {
                return results;
            });
        },
        killTimer: function () {
            return dataservice.camera.killTimer();
        }
    };

    return {
        camera: camera
    };

});
