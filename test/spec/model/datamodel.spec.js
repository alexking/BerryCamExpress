define(['model/datamodel', 'model/CameraSettings', 'model/CaptureInterval' ], function (testee, CameraSettings, CaptureInterval) {


    'use strict';

    describe('datamodel', function () {

        function checkIsDefined(val) {
            expect(val).toBeDefined();
        }

        it('should have data', function () {
            expect(testee.data).toBeDefined();
        });

        it('should have reset', function () {
            expect(testee.reset).toBeDefined();
        });

        describe('data', function () {

            it('should have all properties', function () {

                var settings = ['awb', 'mm', 'ev', 'ex', 'sh',
                        'br', 'co', 'sa', 'ISO', 'ifx', 'size', 'q',
                        'hf', 'vf', 'mode'],

                    intervals = ['intervalH', 'intervalM',
                        'intervalS', 'intervalStartH', 'intervalStartM',
                        'intervalEndH', 'intervalEndM'];

                function checkIsCameraSettings(val) {
                    expect(val instanceof CameraSettings).toBe(true);
                }

                function checkIsCaptureInterval(val) {
                    expect(val instanceof CaptureInterval).toBe(true);
                }

                $.each(settings, function (idx, val) {
                    checkIsDefined(testee.data[val]);
                    checkIsCameraSettings(testee.data[val]);
                });

                $.each(intervals, function (idx, val) {
                    checkIsDefined(testee.data[val]);
                    checkIsCaptureInterval(testee.data[val]);
                });

            });

        });

        describe('reset', function () {

            var data = testee.data;

            function check(actual, expected) {
                expect(actual.selectedValue()).toBe(expected);
            }

            it('should do reset', function () {

                $.each(data, function (key) {
                    data[key].selectedValue(null);
                });

                testee.reset();

                check(data.awb, 'Off');
                check(data.mm, 'Matrix');
                check(data.ev, '0 ');
                check(data.ex, 'Off');
                check(data.sh, 11);
                check(data.br, 50);
                check(data.co, 2);
                check(data.sa, 4);
                check(data.ISO, '100');
                check(data.ifx, 'None');
                check(data.q, 100);
                check(data.size, 'Large');
                check(data.hf, 'On');
                check(data.vf, 'On');
                check(data.mode, 'Single Image');

                check(data.intervalH, 0);
                check(data.intervalM, 0);
                check(data.intervalS, 0);
                check(data.intervalStartH, 0);
                check(data.intervalStartM, 0);
                check(data.intervalEndH, 0);
                check(data.intervalEndM, 0);

                check(data.timeLapseMode, 'Continuous');
            });

        });

    });

});
