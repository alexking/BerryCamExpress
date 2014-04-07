define(['extensions/extensions', 'knockout', 'amplify'], function (testee, ko, amplify) {

    'use strict';

    describe('extensions', function () {

        var ampStub, target;

        beforeEach(function () {
            ampStub = sinon.stub(amplify, 'store');
            target = ko.observable('myVal').extend({
                localStore: 'myKey'
            });
        });

        afterEach(function () {
            ampStub.restore();
        });

        describe('ko.extenders.localStore', function () {

            it('should exist', function () {
                expect(ko.extenders.localStore).toBeDefined();
            });

            describe('write', function () {

                it('should read and write value of obsevable', function () {
                    sinon.assert.calledTwice(ampStub);
                    expect(ampStub.args[0][0]).toBe('myKey');
                    expect(ampStub.args[1][0]).toBe('myKey', 'myVal');
                });

            });

        });

    });

});
