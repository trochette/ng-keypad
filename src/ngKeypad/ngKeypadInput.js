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
    window.KeypadInput = function ($scope, $element, $attrs, controller) {

        var self = this;

        this.modifierKeyListener = null;
        this.keyListener = null;
        this.element = $element;
        this.active = false;
        this.model = null;
        this.padId = $attrs.ngKeypadInput;


        /**
         * Initialize Key to default settings
         */
        function init() {
            $element.on('click.ngKeypadInput', handleElementSelected);
            $element.on('focus.ngKeypadInput', handleElementSelected);
            $element.on('blur.ngKeypadInput', handleElementBlur);

            if (!$attrs.ngModel) {
                throw new Error("KeypadInput requires the use of ng-model on this element", $element);
            }

            $scope.$on('destroy', destroy);
        };


        /**
         * Triggered when a user select a keypad input field.
         * Set listeners and add focused class.
         *
         * @param event
         */
        function handleElementSelected(event) {
            event.stopPropagation();

            if (!self.active) {
                clearSelectedElement();

                self.active = true;
                self.keyListener = $scope.$on(Keypad.KEY_PRESSED, handleKeyPressed);
                self.closeListener = $scope.$on(Keypad.CLOSED, handleKeypadClosed);
                self.modifierKeyListener = $scope.$on(Keypad.MODIFIER_KEY_PRESSED, handleModifierKeyPressed);

                $element.addClass("focus");
                $element.focus();

                $scope.$emit(Keypad.OPEN, $attrs.ngKeypadInput);

                KeypadInput.selectedInput = self;
            }
        };


        /**
         * Clear old reference of the selected element
         */
        function clearSelectedElement() {
            if (KeypadInput.selectedInput) {
                KeypadInput.selectedInput.active = false;
                KeypadInput.selectedInput.keyListener();
                KeypadInput.selectedInput.element.removeClass("focus");
                KeypadInput.selectedInput = null;
            }
        }


        /**
         * Triggered when keypad is closing to clear
         * the current input being edited.
         *
         * @param event
         * @param padId
         */

        function handleKeypadClosed(event, padId) {
            if (self.padId === padId && self.active) {
                clearSelectedElement();
            }
        }


        /**
         * Trigerred when the input loose focus to
         * clear selected element.
         *
         * @param event
         */
        function handleElementBlur(event) {
            clearSelectedElement();
        }


        /**
         * Event triggered from ngKeyPad called only if the current
         * input is selected. Works with ngModel.
         *
         * @param event
         * @param key
         * @param padId
         */
        function handleKeyPressed(event, key, padId) {
            if (self.padId === padId && self.active) {
                var value = controller.$viewValue;


                if (!value) {
                    value = "";
                }

                if (!isRestricted(value, key)) {
                    value += key;
                }

                controller.$setViewValue(value);
                $scope.$apply();
            }
        };


        /**
         * Triggered when a modifier key is pressed
         *
         * @param event
         * @param key
         * @param padId
         */
        function handleModifierKeyPressed(event, key, padId) {
            if (self.padId === padId && self.active) {
                if (key === "CLEAR") {
                    controller.$setViewValue("");
                    $scope.$apply();
                }
            }
        };


        /**
         * Check if the input is retricted by a RegExp.
         * data-ng-keypad-restric is used to save the string
         * corresponding to the RegExp
         *
         * @param value
         * @param key
         */
        function isRestricted(value, key) {
            var restricted = false,
                regExp = new RegExp($attrs.ngKeypadRestrict, 'gi');

            if ($attrs.ngKeypadRestrict) {
                if (!key.match(regExp)) {
                    restricted = true;
                } else if (!String(value + key).match(regExp, 'gi')) {
                    restricted = true;
                }
            }

            return restricted;
        }


        /**
         * Cleanup all listeners before destroying this directive.
         */
        function destroy() {
            $element.off('click.ngKeypadInput');
            $element.on('focus.ngKeypadInput', this.handleElementSelected);
        };


        init();
    };


    KeypadInput.selectedInput = null;


    angular.module('ngKeypad')
        .directive('ngKeypadInput', function () {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, $element, $attrs, controller) {
                    new KeypadInput($scope, $element, $attrs, controller);
                }
            }
        });
})();