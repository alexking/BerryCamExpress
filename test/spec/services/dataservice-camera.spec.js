define(['services/dataservice-camera', 'jquery'], function (testee, $) {

    'use strict';

    describe('services/dataservice-camera', function () {

        var ajaxStub, def = $.Deferred();

        beforeEach(function () {
            this.server = sinon.fakeServer.create();
            ajaxStub = sinon.stub($, 'ajax').returns(def.promise());
        });

        afterEach(function () {
            ajaxStub.restore();
            this.server.restore();
        });

        describe('shutterPress', function () {

            it('should call ajax', function () {
                testee.shutterPress();
                def.resolve();
                sinon.assert.called(ajaxStub);
            });

        });

        describe('killTimer', function () {

            it('should call ajax', function () {
                testee.killTimer();
                def.resolve();
                sinon.assert.called(ajaxStub);
            });

        });

    });

});
