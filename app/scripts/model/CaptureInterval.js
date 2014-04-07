define(['knockout', 'extensions/extensions'], function (ko) {

    'use strict';

    var CaptureInterval = function (label, max, inc) {
        var self = this;
        self.inc = inc || 1;
        self.max = max;
        self.selectedValue = ko.observable(0).extend({
            localStore: label
        });
        self.selectedValueFormatted = ko.computed(function () {
            var val = self.selectedValue();
            return val > 9 ? val : '0' + val;
        });
    };

    CaptureInterval.prototype.increment = function () {
        var next = this.selectedValue() + this.inc;
        if (next >= this.max) {
            next = 0;
        }
        this.selectedValue(next);
    };

    CaptureInterval.prototype.decrement = function () {
        var prev = this.selectedValue() - this.inc;
        if (prev < 0) {
            prev = this.max - this.inc;
        }
        this.selectedValue(prev);
    };

    CaptureInterval.prototype.reset = function () {
        this.selectedValue(0);
    };

    return CaptureInterval;

});
