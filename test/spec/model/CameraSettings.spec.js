define(['model/CameraSettings', 'amplify', 'knockout'],

    function (CameraSettings, amplify, ko) {

        'use strict';

        describe('CameraSettings', function () {

            var testee, ampStub;

            beforeEach(function () {
                ampStub = sinon.stub(amplify, 'store');
                testee = new CameraSettings('some-label', []);
            });

            afterEach(function () {
                ampStub.restore();
            });

            function checkIsFunction(val) {
                expect(typeof val).toBe('function');
            }

            describe('properties', function () {

                it('should have label', function () {
                    expect(ko.isWriteableObservable(testee.label)).toBe(true);
                });

                it('should have iconClass', function () {
                    expect(ko.isComputed(testee.iconClass)).toBe(true);
                });

                it('should have values', function () {
                    expect(ko.isWriteableObservable(testee.values)).toBe(true);
                });

                it('should have selectedValue', function () {
                    expect(ko.isWriteableObservable(testee.selectedValue)).toBe(true);
                });

                it('should have increment', function () {
                    checkIsFunction(testee.increment);
                });

                it('should have minValue', function () {
                    checkIsFunction(testee.minValue);
                });

            });

            describe('label', function () {

                it('should have default set from constructor', function () {
                    expect(testee.label()).toBe('some-label');
                });

                it('should have default set from constructor - with extra text', function () {
                    testee = new CameraSettings('some-label', [], '', 0, ' extra-label-text');
                    expect(testee.label()).toBe('some-label extra-label-text');
                });

                it('should have minValue set from constructor', function () {
                    testee = new CameraSettings('some-label', [], '', -100, ' extra-label-text');
                    expect(testee.minValue()).toBe(-100);
                });
            });

            describe('iconClass computed value', function () {

                it('should have iconClass computed from label value', function () {
                    expect(testee.iconClass()).toBe('icon-icon-some-label');
                });

            });

            describe('increment', function () {

                it('should pick next value from values when not at the boundary', function () {
                    testee.values([1, 2, 3]);
                    testee.selectedValue(1);
                    testee.increment();
                    expect(testee.selectedValue()).toBe(2);
                });

                it('should overlow when at boundary', function () {
                    testee.values([1, 2, 3]);
                    testee.selectedValue(3);
                    testee.increment();
                    expect(testee.selectedValue()).toBe(1);
                });

            });

            describe('setSelectedValue', function () {
                it('should set SelectedValue ', function () {
                    testee.values(['one', 'two', 'another']);
                    testee.selectedValue('one');
                    testee.setSelectedValue('another');
                    expect(testee.selectedValue()).toBe(2);
                });
            });

        });

    });



