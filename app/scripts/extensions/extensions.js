define(['knockout', 'amplify'], function (ko, amplify) {

    'use strict';

    ko.extenders.localStore = function (target, key) {
        var value = amplify.store(key) || target(),
            result = ko.computed({
                read: target,
                write: function (newValue) {
                    amplify.store(key, newValue);
                    target(newValue);
                }
            });
        result(value);
        return result;
    };

});
