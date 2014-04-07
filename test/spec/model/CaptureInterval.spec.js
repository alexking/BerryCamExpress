define(['model/CaptureInterval', 'amplify', 'knockout'],

    function (CaptureInterval, amplify, ko) {

        'use strict';

        describe('CaptureInterval', function () {

            var testee, ampStub, max = 3;

            beforeEach(function () {
                ampStub = sinon.stub(amplify, 'store');
                testee = new CaptureInterval('someLabel', max);
            });

            afterEach(function () {
                ampStub.restore();
            });

            function checkIsFunction(val) {
                expect(typeof val).toBe('function');
            }

            describe('properties', function () {

                it('should have max', function () {
                    expect(testee.max).toBe(max);
                });

                it('should have selectedValue', function () {
                    expect(ko.isWriteableObservable(testee.selectedValue)).toBe(true);
                });

                it('should have increment', function () {
                    checkIsFunction(testee.increment);
                });

                it('should have decrement', function () {
                    checkIsFunction(testee.decrement);
                });

                it('should have selectedValueFormatted', function () {
                    expect(ko.isComputed(testee.selectedValueFormatted)).toBe(true);
                });

            });

            describe('selectedValueFormatted', function () {

                it('should prefix selected value under 10 with leading zero', function () {
                    for (var i = 0; i < 10; i++) {
                        testee.selectedValue(i);
                        expect(testee.selectedValueFormatted()).toBe('0' + i);
                    }
                });

                it('should not prefix selected value 10 or over with leading zero', function () {
                    testee.selectedValue(10);
                    expect(testee.selectedValueFormatted()).toBe(10);
                });

            });

            describe('increment', function () {

                it('should add one to counter value when not at the max boundary', function () {
                    expect(testee.selectedValue()).toBe(0);
                    testee.increment();
                    expect(testee.selectedValue()).toBe(1);
                    testee.increment();
                    expect(testee.selectedValue()).toBe(2);
                });

                it('should reset to zero when at max', function () {
                    testee.selectedValue(3);
                    testee.increment();
                    expect(testee.selectedValue()).toBe(0);
                });
            });

            describe('decrement', function () {

                it('should reset to max when at zero', function () {
                    testee.selectedValue(0);
                    testee.decrement();
                    expect(testee.selectedValue()).toBe(2);
                });

                it('should subtract one when not at zero', function () {
                    testee.selectedValue(2);
                    testee.decrement();
                    expect(testee.selectedValue()).toBe(1);
                    testee.decrement();
                    expect(testee.selectedValue()).toBe(0);
                });

            });

        });

    });
