define(['config'], function (config) {

    'use strict';

    var defaultDimensions = config.DEFAULT_IMAGE_DIMENSIONS;

    function makeSmall() {
        return {
            width: defaultDimensions.width / 2,
            height: defaultDimensions.height / 2
        };
    }

    function makeMedium() {
        return {
            width: defaultDimensions.width / 4 * 3,
            height: defaultDimensions.height / 4 * 3
        };
    }

    function createImageDimension(imageSize) {

        if (imageSize === 'Small') {
            return makeSmall();
        } else if (imageSize === 'Medium') {
            return makeMedium();
        } else {
            return defaultDimensions;
        }
    }

    return {
        createImageDimension: createImageDimension
    };

});
