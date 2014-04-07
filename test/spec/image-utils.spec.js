define(['image-utils'], function (testee) {

    'use strict';

    describe('image-utils', function () {

        describe('createImageDimension', function () {

            it('should return modified dimensions', function () {
                var dims = testee.createImageDimension('Small');
                expect(dims.width).toBe(1296);
                expect(dims.height).toBe(972);
            });

            it('should return modified dimensions', function () {
                var dims = testee.createImageDimension('Medium');
                expect(dims.width).toBe(1944);
                expect(dims.height).toBe(1458);
            });

            it('should return default dimensions', function () {
                var dims = testee.createImageDimension();
                expect(dims.width).toBe(2592);
                expect(dims.height).toBe(1944);
            });

        });

    });

});
