define(['./model', 'jquery'], function (model, $) {

    'use strict';

    var data = {
        awb: new model.CameraSettings('WB', ['Off', 'Auto', 'Sun', 'Cloud', 'Shade', 'Tungsten', 'Fluorescent', 'Incandescent', 'Flash', 'Horizon']),
        mm: new model.CameraSettings('Metering', ['Matrix', 'Average', 'Spot', 'Backlit']),
        ev: new model.CameraSettings('EV', ['0 ', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', ' 0', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10'], '0 ', ' +/-'),
        ex: new model.CameraSettings('Exposure', ['Off', 'Auto', 'Night', 'Backlight', 'Spotlight', 'Sports', 'Snow', 'Beach', 'Verylong', 'Fireworks']),
        sh: new model.CameraSettings('Sharpness', [], 11, -100),
        br: new model.CameraSettings('Brightness', [], 50),
        co: new model.CameraSettings('Contrast', [], 2, -100),
        sa: new model.CameraSettings('Saturation', [], 4, -100),
        ISO: new model.CameraSettings('ISO', ['100', '200', '400']),
        ifx: new model.CameraSettings('FX', ['None', 'Negative', 'Solarise', 'Posterise', 'Whiteboard', 'Blackboard', 'Sketch', 'Denoise', 'Emboss', 'Oilpaint', 'Hatch', 'Gpen', 'Pastel', 'Watercolour']),
        q: new model.CameraSettings('Compression', [], 100),
        size: new model.CameraSettings('Size', ['Large', 'Medium', 'Small']),
        hf: new model.CameraSettings('HFlip', ['On', 'Off'], 'Off'),
        vf: new model.CameraSettings('VFlip', ['On', 'Off'], 'Off'),
        mode: new model.CameraSettings('Capture Mode', ['Single Image', 'Timelapse']),

        intervalH: new model.CaptureInterval('capIntH', 24),
        intervalM: new model.CaptureInterval('capIntM', 60),
        intervalS: new model.CaptureInterval('capIntS', 60, 15),
        intervalStartH: new model.CaptureInterval('capIntStartH', 24),
        intervalStartM: new model.CaptureInterval('capIntStartM', 60),
        intervalEndH: new model.CaptureInterval('capIntEndH', 24),
        intervalEndM: new model.CaptureInterval('capIntEndM', 60),

        timeLapseMode: new model.CameraSettings('Timelapse Mode', ['Continuous', 'Time Window'])
    };

    function reset() {
        $.each(data, function (key) {
            data[key].reset();
        });
    }

    return {
        data: data,
        reset: reset
    };

});
