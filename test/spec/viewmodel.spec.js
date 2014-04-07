define(['viewmodel',
        'knockout',
        'jquery',
        'services/datacontext',
        'model/model',
        'model/datamodel',
        'error-handler'],
    function (testee, ko, $, ctx, model, datamodel, errorHandler) {

        'use strict';

        describe('jquery', function () {

            function checkIsDefined(val) {
                expect(val).toBeDefined();
            }

            xdescribe('viewModel properties', function () {

                it('should have all properties', function () {

                    var props = ['status',
                        'cameraSettingsUpper',
                        'cameraSettingsLower',
                        'cameraSettingsBottom',
                        'cameraSettingsBottomTopRow',
                        'cameraSettingsBottomBottomRow',
                        'sizeAndFx',
                        'compression',
                        'flips',
                        'captureIntervals',
                        'timeLapseMode',
                        'showTimelaspseMode',
                        'showCaptureIntervals',
                        'toggleIimeLapseMode',
                        'timeLapseShortLabel',
                        'captureIntervalStart',
                        'captureIntervalEnd',
                        'doShutterPress'];

                    $.each(props, function (idx, val) {
                        checkIsDefined(testee[val]);
                    });

                });

            });

            describe('computed observables', function () {

                describe('showTimelaspseMode', function () {

                    it('should be true if timeLapseMode selected value is Time Window', function () {
                        datamodel.data.timeLapseMode.selectedValue(null);
                        expect(testee.showTimelaspseMode()).toBe(false);
                        datamodel.data.timeLapseMode.selectedValue('Time Window');
                        expect(testee.showTimelaspseMode()).toBe(true);
                    });

                });

                describe('showCaptureIntervals', function () {

                    it('should be true if mode selected value is Timelapse', function () {
                        datamodel.data.mode.selectedValue(null);
                        expect(testee.showCaptureIntervals()).toBe(false);
                        datamodel.data.mode.selectedValue('Timelapse');
                        expect(testee.showCaptureIntervals()).toBe(true);
                    });

                });

                describe('timeLapseShortLabel', function () {

                    it('should return T if timeLapseMode bindings is Continuous', function () {
                        datamodel.data.timeLapseMode.selectedValue('Continuous');
                        expect(testee.timeLapseShortLabel()).toBe('T');
                    });

                    it('should return C if timeLapseMode bindings is not Continuous', function () {
                        datamodel.data.timeLapseMode.selectedValue('xxContinouous');
                        expect(testee.timeLapseShortLabel()).toBe('C');
                    });

                });

            });

            describe('toggleIimeLapseMode', function () {

                it('should change timeLapseMode selectedValue to Time Window if Continuous', function () {
                    datamodel.data.timeLapseMode.selectedValue('Continuous');
                    testee.toggleIimeLapseMode();
                    expect(testee.timeLapseMode.selectedValue()).toBe('Time Window');
                });

                it('should change timeLapseMode selectedValue to Continuous if Time Window', function () {
                    datamodel.data.timeLapseMode.selectedValue('Time Window');
                    testee.toggleIimeLapseMode();
                    expect(testee.timeLapseMode.selectedValue()).toBe('Continuous');
                });

            });

            describe('resetCameraSettings ', function () {

                it('should call datamode reset', function () {
                    var stub = sinon.stub(datamodel, 'reset');
                    testee.resetCameraSettings();
                    sinon.assert.called(stub);
                    stub.reset();
                });

            });

            describe('doShutterPress', function () {

                var def, ctxStub, loadStub, errorHandlerStub;

                beforeEach(function () {
                    def = $.Deferred();
                    testee.isMakingAjaxRequest(false);
                    ctxStub = sinon.stub(ctx.camera, 'shutterPress').returns(def.promise());
                    errorHandlerStub = sinon.stub(errorHandler, 'handleError');
                    loadStub = sinon.stub($.fn, 'load');
                });

                afterEach(function () {
                    ctxStub.restore();
                    loadStub.restore();
                    errorHandlerStub.restore();
                });

                describe('isMakingAjaxRequest', function () {

                    it('should not call context camera shutterpress function', function () {
                        testee.isMakingAjaxRequest(true);
                        testee.doShutterPress();
                        sinon.assert.notCalled(ctxStub);
                    });

                });

                describe('not isMakingAjaxRequest', function () {

                    it('should call context camera shutterpress function', function () {
                        testee.doShutterPress();
                        sinon.assert.called(ctxStub);
                    });

                    it('should handle done - good data', function () {
                        testee.doShutterPress();
                        def.resolve({
                            filename: 'fn'
                        });
                        sinon.assert.called(loadStub);
                    });

                    it('should handle done - bad data', function () {
                        testee.doShutterPress();
                        def.resolve({});
                        sinon.assert.notCalled(loadStub);
                        sinon.assert.called(errorHandlerStub, 'loading image failed');
                    });

                    it('should handle fail - set isMakingAjaxRequest false', function () {
                        testee.doShutterPress();
                        expect(testee.isMakingAjaxRequest()).toBe(true);
                        def.reject();
                        expect(testee.isMakingAjaxRequest()).toBe(false);
                        sinon.assert.notCalled(loadStub);
                        sinon.assert.calledWith(errorHandlerStub, 'creating image failed');
                    });

                });

            });

        });

    });
