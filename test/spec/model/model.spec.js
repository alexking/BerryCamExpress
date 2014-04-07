define(['model/model'], function (testee) {

    'use strict';

    describe('model', function () {

        describe('properties', function () {

            it('should have cameraSettings', function () {
                expect(testee.CameraSettings).toBeDefined();
            });

            it('should have cameraInterval', function () {
                expect(testee.CaptureInterval).toBeDefined();
            });

        });

    });

});
