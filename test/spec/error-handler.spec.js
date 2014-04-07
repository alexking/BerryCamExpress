define(['error-handler'], function (testee) {

    'use strict';

    describe('handleError', function () {

        var alertStub;

        beforeEach(function () {
            alertStub = sinon.stub(window, 'alert');
        });

        afterEach(function () {
            alertStub.restore();
        });

        it('should call window alert with message', function () {
            var msg = 'bad stuff';
            testee.handleError(msg);
            sinon.assert.calledWith(alertStub, msg);
        });

    });

});
