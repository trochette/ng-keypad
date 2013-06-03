/**
 * Keypad directive, display a keypad on the screen. Template for it
 * can be include inside the node containing the keypad attribute.
 *
 * Use of Namespace.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */

(function () {
    "use strict";


    /**
     * @Class
     */
    window.Keypad = function ($scope, $element, $attrs, $rootScope) {

        var locked = false,
            opened = false,
            padId = $attrs.ngKeypad,
            body = $('body');

        /**
         * Initialize Keypad to default settings
         * based on attributes.
         */
        function init() {
            $scope.$on(Key.PRESSED, handleKeyPressed);
            $rootScope.$on(Keypad.TOGGLE_LOCKING, handleLockingToggle);
            $rootScope.$on(Keypad.TOGGLE_OPENING, handleOpeningToggle);
            $rootScope.$on(Keypad.OPEN, handleOpeningToggle);
            $rootScope.$on(Keypad.CLOSE, handleOpeningToggle);
            $element.addClass("closed");

            initScope();
        };

        /**
         * Initialize scope variables
         */
        function initScope() {
            $scope.close = function () {
                close();
            }
        }


        /**
         * Triggered when a user press any key on the pad
         * check current status then dispatch KEY_PRESSED event.
         *
         * @param event
         * @param key
         */
        function handleKeyPressed(event, key) {
            if (!locked) {
                if (key.indexOf('[') === -1 && key.indexOf(']') === -1) {
                    $scope.$emit(Keypad.KEY_PRESSED, key, padId);
                } else {
                    $scope.$emit(Keypad.MODIFIER_KEY_PRESSED, key.substring(1, key.length - 1), padId);
                }
            }
        }


        /**
         * Triggered when a user press any key on the pad
         * check current status then dispatch KEY_PRESSED event.
         *
         * @param event
         * @param key
         */
        function handleLockingToggle(event, id) {
            if (padId === id || !id) {
                locked = !locked;

                if (locked) {
                    $element.attr("disabled", "disabled");
                } else {
                    $element.removeAttr("disabled");
                }
            }
        }


        /**
         * Triggered when a user toggle keypad opening.
         *
         * @param event
         * @param key
         */
        function handleOpeningToggle(event, id, params) {
            if (padId === id || !id) {
                switch (event.name) {
                    case Keypad.CLOSE:
                        opened = false;
                        break;
                    case Keypad.OPEN:
                        opened = true;
                        break;
                    default:
                        opened = !opened;
                        break;
                }

                if (!opened) {
                    close();
                } else {
                    open();
                    applyOptions(params);
                }
            }
        }

        function applyOptions(params) {
            if (params && params.position) {
                $element.css("top", params.position.y);
                $element.css("left", params.position.x);
            }
        }


        /**
         * Open current pad
         */
        function open() {
            $element.removeClass("closed");
            $scope.$emit(Keypad.OPENED, padId);
            autoClose();
            applyOptions();
        }


        /**
         * Close current pad
         */
        function close() {
            opened = false;
            $scope.$emit(Keypad.CLOSED, padId);
            body.off("click.keypad");
            $element.addClass("closed");
        }


        /**
         * Check if the attribute auto-close is set then
         * add event for automatic closing.
         *
         * @param event
         * @param key
         */
        function autoClose() {
            if ($attrs.autoClose) {
                //Timeout use to break the event flow.
                setTimeout(function () {
                    body.on("click.keypad", function () {
                        opened = !opened;
                        close();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                    $element.on("click.keypad", cancelEvent);
                }, 1);
            }
        }


        /**
         * Dummy function to cancel event propagation.
         *
         * @param event
         */
        function cancelEvent(event) {
            event.stopPropagation();
        }


        init();
    };


    /**
     * @Events
     */
    Keypad.KEY_PRESSED = "Keypad.KEY_PRESSED";
    Keypad.MODIFIER_KEY_PRESSED = "Keypad.MODIFIER_KEY_PRESSED";
    Keypad.TOGGLE_LOCKING = "Keypad.TOGGLE_LOCKING";
    Keypad.TOGGLE_OPENING = "Keypad.TOGGLE_OPENING";
    Keypad.OPENED = "Keypad.OPENED";
    Keypad.CLOSED = "Keypad.CLOSED";
    Keypad.OPEN = "Keypad.OPEN";
    Keypad.CLOSE = "Keypad.CLOSE";


    angular.module('ngKeypad')
        .directive('ngKeypad', ['$rootScope', function ($rootScope) {

            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {
                    new Keypad($scope, $element, $attrs, $rootScope);
                }
            }
        }]);
})();