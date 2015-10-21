/**
 * @overview
 * @copyright 2013 Tommy Rochette http://trochette.github.com/
 * @author Tommy Rochette
 * @version 0.0.1
 *
 * @license MIT
 */
(function () {
    "use strict";

    /**
     * @Class
     */
    window.Key = function ($scope, $element, $attrs) {

        var body = $('body');

        /**
         * Initialize Key to default settings
         */
        function init() {
            if ("ontouchstart" in document.documentElement) {
                $element.bind('touchstart.ngKey', keyPressed);
                body.bind('touchend.ngKey', keyDepressed);
            } else {
                $element.bind('mousedown.ngKey', keyPressed);
                body.bind('mouseup.ngKey', keyDepressed);
            }

            $scope.$on('destroy', destroy);
        };


        /**
         * Triggered when a user press on this element
         *
         * @param event
         */
        function keyPressed(event) {
            $element.addClass('pressed');
            event.preventDefault();
            event.stopImmediatePropagation();
            $scope.$emit(Key.PRESSED, $attrs.ngKey);
        }


        /**
         * Triggered when a user stop pressing this element
         *
         * @param event
         */
        function keyDepressed(event) {
            $element.removeClass('pressed');
        }

        /**
         * Cleanup all listeners before destroying this directive.
         */
        function destroy() {
            $element.bind('touchstart.ngKey', keyPressed);
            body.bind('touchend.ngKey', keyDepressed);
            $element.bind('mousedown.ngKey', keyPressed);
            body.bind('mouseup.ngKey', keyDepressed);
        }


        init();
    };

    /**
     * @Event
     */
    Key.PRESSED = "Key.PRESSED";

    angular.module('ngKeypad', [])
        .directive('ngKey', function () {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {
                    new Key($scope, $element, $attrs);
                }
            };
        });
})();
