define(['Squire', 'knockout', 'jquery'], function (Squire, ko) {

    'use strict';

    function SquireWrapper() {

        var squire = new Squire();

        function clean() {
            cleanObj(squire.mocks);
        }

        function isObject(obj) {
            return typeof obj === 'object';
        }

        function cleanObj(mocks, key) {
            if (key !== 'knockout') {
                var mocky = key ? mocks[key] : mocks;
                if (isObject(mocky)) {
                    for (key in mocky) {
                        if (mocky.hasOwnProperty(key)) {
                            cleanObj(mocky, key);
                        }
                    }
                } else {
                    cleanItem(mocky);
                }
            }
        }

        function cleanItem(mock) {
            if (mock.hasOwnProperty('reset')) {
                //sinon
                mock.reset();
            } else if (ko.isObservable(mock) && !ko.isComputed(mock)) {
                //knockout observable
                mock(undefined);
            }
        }

        function mock(stubs) {
            stubs.knockout = ko;
            squire.mock.apply(squire, [stubs]);
            return this;
        }

        function require(module, callback) {
            return squire.require.apply(squire, [module, callback]);
        }

        return {
            clean: clean,
            mock: mock,
            require: require
        };
    }

    return SquireWrapper;

});
