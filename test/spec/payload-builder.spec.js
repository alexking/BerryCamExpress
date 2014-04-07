define(['payload-builder', 'main', 'config', 'jquery', 'model/datamodel'], function (testee, main, config, $, datamodel) {

    'use strict';

    describe('payload-builder', function () {

        describe('buildPayload', function () {

            var payload, data = datamodel.data;

            function setupDatamodel() {
                data.size.selectedValue('Large');
                data.mode.selectedValue('Single Image');
                data.q.selectedValue(99);
                data.awb.selectedValue('Cloud');
                data.mm.selectedValue('Average');
                data.ev.selectedValue('+4');
                data.ex.selectedValue('Backlight');
                data.sh.selectedValue(11);
                data.br.selectedValue(50);
                data.co.selectedValue(9);
                data.sa.selectedValue(12);
                data.ifx.selectedValue('Solarise');
                data.ISO.selectedValue(200);
                data.vf.selectedValue('On');
                data.hf.selectedValue('On');
            }

            beforeEach(function () {
                setupDatamodel();
                payload = testee.buildPayload(datamodel);
            });

            it('should add default image sizes', function () {
                expect(payload.w).toBe(config.DEFAULT_IMAGE_DIMENSIONS.width);
                expect(payload.h).toBe(config.DEFAULT_IMAGE_DIMENSIONS.height);
            });

            it('should have correct mode for exif', function () {
                expect(payload.exif).toBe('IFD1.Software=BerryCam -x EXIF.MakerNote=BerryCam -x EXIF.UserComment=BerryCam');
            });

            it('should have correct mode for Single Image', function () {
                expect(payload.mode).toBe('photo');
            });

            it('should have correct mode for Timelapse', function () {
                data.mode.selectedValue('Timelapse');
                payload = testee.buildPayload(datamodel);
                expect(payload.mode).toBe('timelapse');
            });

            it('should have correct mode for null', function () {
                data.mode.selectedValue(null);
                payload = testee.buildPayload(datamodel);
                expect(payload.mode).toBeUndefined();
            });

            it('should have correct mode for q', function () {
                expect(payload.q).toBe(99);
            });

            it('should have correct mode for awb', function () {
                expect(payload.awb).toBe('Cloud');
            });

            it('should have correct mode for mm', function () {
                expect(payload.mm).toBe('Average');
            });

            it('should have correct mode for ev', function () {
                expect(payload.ev).toBe(4);
            });

            it('should have correct mode for ev when negative', function () {
                data.ev.selectedValue('-4');
                payload = testee.buildPayload(datamodel);
                expect(payload.ev).toBe(-4);
            });

            it('should have correct mode for ev when zero', function () {
                data.ev.selectedValue('0');
                payload = testee.buildPayload(datamodel);
                expect(payload.ev).toBe(0);
            });

            it('should have correct mode for ev when padded zero', function () {
                data.ev.selectedValue(' 0');
                payload = testee.buildPayload(datamodel);
                expect(payload.ev).toBe(0);
            });

            it('should have correct mode for ex', function () {
                expect(payload.ex).toBe('Backlight');
            });

            it('should have correct mode for sh', function () {
                expect(payload.sh).toBe(11);
            });

            it('should have correct mode for br', function () {
                expect(payload.br).toBe(50);
            });

            it('should have correct mode for co', function () {
                expect(payload.co).toBe(9);
            });

            it('should have correct mode for sa', function () {
                expect(payload.sa).toBe(12);
            });

            it('should have correct mode for ifx', function () {
                expect(payload.ifx).toBe('Solarise');
            });

            it('should have correct mode for ISO', function () {
                expect(payload.ISO).toBe(200);
            });

        });

    });

});
