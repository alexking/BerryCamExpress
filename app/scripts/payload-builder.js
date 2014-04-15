define(['config', 'image-utils', 'jquery', 'model/datamodel', 'moment'], function (config, imageUtils, $, datamodel, moment) {

    'use strict';

    function buildPayload() {

        var data = datamodel.data,
            dimensions = imageUtils.createImageDimension(data.size.selectedValue()),
            now = moment(),
            startTime,
            stopTime,
            opts = {
                w: dimensions.width,
                h: dimensions.height,
                exif: 'IFD1.Software=BerryCam -x EXIF.MakerNote=BerryCam -x EXIF.UserComment=BerryCam',
                q: data.q.selectedValue(),
                awb: data.awb.selectedValue(),
                mm: data.mm.selectedValue(),
                ev: parseInt(data.ev.selectedValue().replace('+', '')),
                ex: data.ex.selectedValue(),
                sh: data.sh.selectedValue(),
                br: data.br.selectedValue(),
                co: data.co.selectedValue(),
                sa: data.sa.selectedValue(),
                ifx: data.ifx.selectedValue(),
                ISO: data.ISO.selectedValue()
            };

        function calculateTimelapseInterval() {

            var timelapseIntervalHours = data.intervalH.selectedValue() * 3600 * 1000,
                timelapseIntervalMins = data.intervalM.selectedValue() * 60 * 1000,
                timelapseIntervalSecs = data.intervalS.selectedValue() * 1000;

            return timelapseIntervalHours + timelapseIntervalMins + timelapseIntervalSecs;
        }

        if (data.vf.selectedValue() === 'On') {
            opts.vf = true;
        }

        if (data.hf.selectedValue() === 'On') {
            opts.hf = true;
        }

        if (data.mode.selectedValue() === 'Single Image') {
            opts.mode = 'photo';
            opts.t = 1000;
        } else if (data.mode.selectedValue() === 'Timelapse') {
            opts.mode = 'timelapse';
            opts.tl = calculateTimelapseInterval();

            if (data.timeLapseMode.selectedValue() === 'Time Window') {

                startTime = moment().hour(data.intervalStartH.selectedValue()).minute(data.intervalStartM.selectedValue()).second(0);
                stopTime = moment().hour(data.intervalEndH.selectedValue()).minute(data.intervalEndM.selectedValue()).second(0);

                if (startTime.isBefore(now)) {
                    startTime.add('days', 1);
                    stopTime.add('days', 1);
                }

                if (stopTime.isBefore(startTime)) {
                    stopTime.add('days', 1);
                }

                opts.t = stopTime.valueOf() - startTime.valueOf();
                opts.timerStart = startTime.valueOf() - now.valueOf();

            } else {
                opts.t = 0;
            }
        }

        return opts;
    }

    return {
        buildPayload: buildPayload
    };

});
