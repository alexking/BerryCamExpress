define(['knockout', 'extensions/extensions'], function (ko) {

    'use strict';

    var CameraSettings = function (label, vals, defaultValue, minValue, extraLabel) {

        var self = this;

        self.defaultVal = defaultValue;

        self.label = ko.observable(label + (extraLabel ? extraLabel : ''));

        self.iconClass = ko.computed(function () {
            return 'icon-icon-' + self.label().toLowerCase();
        });

        self.selectedValue = ko.observable(defaultValue || vals[0] || '0').extend({
            localStore: label
        });

        self.values = ko.observableArray(vals);

        self.minValue = ko.observable(minValue || 0);
    };

    CameraSettings.prototype.setSelectedValue = function (item) {
        this.selectedValue(this.values().indexOf(item));
    };

    CameraSettings.prototype.increment = function () {
        var idx = this.values().indexOf(this.selectedValue());
        this.selectedValue(this.values()[++idx % this.values().length]);
    };

    CameraSettings.prototype.reset = function () {
        this.selectedValue(this.defaultVal || this.values()[0]);
    };

    return CameraSettings;

});
