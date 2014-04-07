define(['main',
    'knockout',
    'jquery',
    'viewmodel'], function (testee, ko, $, viewmodel) {

    'use strict';

    describe('main', function () {

        afterEach(function () {
            ko.cleanNode($('html')[0]);
        });

        it('should apply bindings', function () {
            var appBindingStub = sinon.stub(ko, 'applyBindings');
            testee.activate();
            sinon.assert.calledWith(appBindingStub, viewmodel, $('html')[0]);
            appBindingStub.restore();
        });

        it('should show #main-container', function () {
            var showStub = sinon.stub($.fn, 'show');
            testee.activate();
            sinon.assert.called(showStub);
            showStub.restore();
        });

    });

});
