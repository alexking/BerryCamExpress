define(['config', 'image-utils', 'jquery', 'model/datamodel'], function (config, imageUtils, $, datamodel) {

    'use strict';

    function buildPayload() {

        var data = datamodel.data,
            dimensions = imageUtils.createImageDimension(data.size.selectedValue()),
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

        if (data.vf.selectedValue() === 'On') {
            opts.vf = true;
        }

        if (data.hf.selectedValue() === 'On') {
            opts.hf = true;
        }

        if (data.mode.selectedValue() === 'Single Image') {
            opts.mode = 'photo';
        } else if (data.mode.selectedValue() === 'Timelapse') {
            opts.mode = 'timelapse';
        }

        return opts;
    }

    return {
        buildPayload: buildPayload
    };

});
