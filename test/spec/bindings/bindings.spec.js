define(['bindings/bindings', 'knockout', 'jquery', 'spinjs'], function (testee, ko, $, Spinner) {

    'use strict';

    describe('bindings sliderValue', function () {
        var $fix, vm;

        function setup(fixture) {
            var fix = fixture || '<input id="myslider" data-bind="sliderValue: $data.selectedValue" data-slider-min="0" data-slider-max="100">';
            setFixtures(fix);
            $fix = $('#myslider');
            ko.applyBindings(vm, $fix[0]);
        }

        beforeEach(function () {
            vm = {
                selectedValue: ko.observable(50)
            };
            setup();
        });

        it('should exist', function () {
            expect(ko.bindingHandlers.sliderValue.init).toBeDefined();
            expect(ko.bindingHandlers.sliderValue.update).toBeDefined();
        });

        describe('init', function () {

            it('should set up slider', function () {
                setup();
                expect(vm.selectedValue()).toBe(50);
            });

            it('should set change value when slider slides', function () {
                setup();
                $('.slider-handle').first().simulate('drag', {dx: 200, dy: 0});
                expect(vm.selectedValue()).not.toBe(50);
            });

        });

    });

    describe('bindings ajaxSpinner', function () {

        var fixture,
            spinner = Spinner.prototype,
            vm = {
                isAjax: ko.observable(false)
            },
            setupFixtureAndApplyBindings = function () {
                fixture = '<button id="fixture" data-bind="ajaxSpinner: isAjax, spinnerOptions: {color: \'#367baa\'}"></button>';
                setFixtures(fixture);
                ko.applyBindings(vm, document.getElementById('fixture'));
            };

        it('should grab spinnerOptions from allBindingsAccessor of element', function () {
            var extendSpy = spyOn($, 'extend');
            setupFixtureAndApplyBindings();
            expect(extendSpy.argsForCall[0][2]).toEqual({color: '#367baa'});
            extendSpy.reset();
        });


        it('should add spinner when isAjax is true', function () {
            setupFixtureAndApplyBindings();
            var spinStub = sinon.stub(spinner, 'spin');
            vm.isAjax(true);
            sinon.assert.called(spinStub);
            spinStub.restore();
        });

    });

});
