define(['SquireWrapper', 'jquery'], function (SquireWrapper) {

    'use strict';

    var testee,
        def = $.Deferred(),
        injector = new SquireWrapper(),
        stubs = {
            'services/dataservice-camera': {
                shutterPress: sinon.stub().returns(def.promise())
            }
        };

    describe('datacontext', function () {

        beforeEach(function () {
            if (!testee) {
                injector.mock(stubs).require(['services/datacontext'], function (dsCamera) {
                    testee = dsCamera;
                    def.resolve();
                });
            }
            waitsFor(function () {
                return def.state() !== 'pending';
            });
        });

        afterEach(function () {
            injector.clean();
        });

        describe('camera shutterPress', function () {

            var dsStub;

            beforeEach(function () {
                dsStub = stubs['services/dataservice-camera'].shutterPress;
            });

            it('should call dataservice camera shutterPress', function () {
                testee.camera.shutterPress();
                sinon.assert.called(dsStub);
            });

        });

    });

});
