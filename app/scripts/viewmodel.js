define(['knockout',
    'model/model',
    'model/datamodel',
    'services/datacontext',
    'error-handler'
], function (ko, model, datamodel, ctx, errorHandler) {

    'use strict';

    var data = datamodel.data,

        status = ko.observable('active'),

        cameraSettingsUpper = ko.observableArray([
            data.awb,
            data.mm,
            data.ev,
            data.ex
        ]),

        cameraSettingsLower = ko.observableArray([
            data.sh,
            data.br,
            data.co,
            data.sa
        ]),

        cameraSettingsBottom = ko.observableArray([
            data.size,
            data.ISO,
            data.q,
            data.ifx,
            data.mode
        ]),

        cameraSettingsBottomTopRow = ko.observableArray([
            data.size,
            data.ISO,
            data.q,
            data.ifx
        ]),

        cameraSettingsBottomBottomRow = ko.observableArray([
            data.ifx,
            data.mode
        ]),

        sizeAndFx = ko.observableArray([
            data.size,
            data.ISO
        ]),

        compression = ko.observableArray([data.q]),

        flips = ko.observableArray([
            data.hf,
            data.vf
        ]),

        captureIntervals = ko.observableArray([
            data.intervalH,
            data.intervalM,
            data.intervalS
        ]),

        captureIntervalStart = ko.observableArray([
            data.intervalStartH,
            data.intervalStartM
        ]),

        captureIntervalEnd = ko.observableArray([
            data.intervalEndH,
            data.intervalEndM
        ]),

        showTimelaspseMode = ko.computed(function () {
            return data.timeLapseMode.selectedValue() === 'Time Window';
        }),

        showCaptureIntervals = ko.computed(function () {
            return data.mode.selectedValue() === 'Timelapse';
        }),

        timeLapseShortLabel = ko.computed(function () {
            return data.timeLapseMode.selectedValue() === 'Continuous' ? 'T' : 'C';
        }),

        themes = ko.observable(new model.CameraSettings('Theme', ['Default', 'Retro', 'Snow', 'Very Berry'])),

        selectedTheme = ko.computed(function () {
            return themes().selectedValue().toLowerCase().replace(/ /g, '-');
        }),

        currentImageFilename = ko.observable(),

        currentImageFilenameFormatted = ko.computed(function () {
            return currentImageFilename() ? currentImageFilename().split('/').pop() : '';
        }),

        isMakingAjaxRequest = ko.observable(false),

        isTimelapseJobRunning = ko.observable(false),

        toggleIimeLapseMode = function () {
            var current = data.timeLapseMode.selectedValue(),
                newVal;
            if (current === 'Continuous') {
                newVal = 'Time Window';
            } else {
                newVal = 'Continuous';
            }
            data.timeLapseMode.selectedValue(newVal);
        },

        resetCameraSettings = function () {
            datamodel.reset();
        },

        $image = $('#preview-image'),

        doShutterPress = function () {

            if (isMakingAjaxRequest()) {
                return;
            }

            if (data.mode.selectedValue() === 'Single Image') {
                takeSinglePhoto();
            } else {
                startTimelapse();
            }
        },

        takeSinglePhoto = function () {

            $image.fadeTo('slow', 0.2);
            isMakingAjaxRequest(true);

            ctx.camera.shutterPress().done(function (results) {
                loadImage(results.filename);
            }).fail(function () {
                $image.fadeTo('fast', 1.0);
                errorHandler.handleError('creating image failed');
                isMakingAjaxRequest(false);
            });
        },

        startTimelapse = function () {

            isMakingAjaxRequest(true);
            isTimelapseJobRunning(true);

            ctx.camera.shutterPress().done(function () {
                //TODO - notify user that time-lapse job is queued
            }).fail(function () {
                errorHandler.handleError('starting time-lapse failed');
            }).always(function () {
                isMakingAjaxRequest(false);
            });
        },

        loadImage = function (filename) {
            if (!filename) {
                $image.fadeTo('fast', 1.0);
                currentImageFilename('');
                errorHandler.handleError('loading image failed');
            } else {
                $image.attr('src', filename).load(function () {
                    currentImageFilename(filename);
                    isMakingAjaxRequest(false);
                    $image.fadeTo('fast', 1.0);
                });
            }
        },

        killTimer = function () {
            ctx.camera.killTimer().done(function () {
                console.log('Timer killed');
                isTimelapseJobRunning(false);
            });
        };

    return {
        status: status,
        cameraSettingsUpper: cameraSettingsUpper,
        cameraSettingsLower: cameraSettingsLower,
        cameraSettingsBottom: cameraSettingsBottom,
        cameraSettingsBottomTopRow: cameraSettingsBottomTopRow,
        cameraSettingsBottomBottomRow: cameraSettingsBottomBottomRow,
        sizeAndFx: sizeAndFx,
        compression: compression,
        flips: flips,
        captureIntervals: captureIntervals,
        timeLapseMode: data.timeLapseMode,
        showTimelaspseMode: showTimelaspseMode,
        showCaptureIntervals: showCaptureIntervals,
        toggleIimeLapseMode: toggleIimeLapseMode,
        timeLapseShortLabel: timeLapseShortLabel,
        captureIntervalStart: captureIntervalStart,
        captureIntervalEnd: captureIntervalEnd,
        doShutterPress: doShutterPress,
        themes: themes,
        selectedTheme: selectedTheme,
        currentImageFilename: currentImageFilename,
        currentImageFilenameFormatted: currentImageFilenameFormatted,
        isMakingAjaxRequest: isMakingAjaxRequest,
        resetCameraSettings: resetCameraSettings,
        isTimelapseEnabled: true,
        isTimelapseJobRunning: isTimelapseJobRunning,
        killTimer: killTimer
    };

});
