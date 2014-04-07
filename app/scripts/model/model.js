define(['./CameraSettings', './CaptureInterval'], function (cameraSettings, captureInterval) {

    'use strict';

    var model = {
        CameraSettings: cameraSettings,
        CaptureInterval: captureInterval
    };

    return model;

});
