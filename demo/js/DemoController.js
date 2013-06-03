/**
 * @overview
 * @copyright 2013 Tommy Rochette http://trochette.github.com/
 * @author Tommy Rochette
 * @version 0.0.1
 *
 * @license MIT
 */
(function(){
	var DemoController = function DemoController($scope) {
		var self = this;
		var selectedInputIndex = 0;

		/**
	     * This example show how to toggle locked/unlocked
	     * state of the keypad.
	     */  
		$scope.toggleKeypadLock =  function(){
			toggleLock();
			//Toggling KeyPad Locking state, second argument is Keypad ID
			$scope.$emit(Keypad.TOGGLE_LOCKING, "numeric");
		}



		/**
	     * This example show how to toggle open/close
	     * state of the keypad.
	     */  
		$scope.toggleKeypadOpening =  function(){
			//Toggling KeyPad Locking state, second argument is Keypad ID
			$scope.$emit(Keypad.TOGGLE_OPENING, "numeric");
		}


		/**
	     * This example show how to toggle open/close
	     * state of the keypad and set a position at the same time.
	     */  
		$scope.toggleKeypadPosition =  function(){
			var params = {
				position:{
					x:600,
					y:70
				}
			};
			//Toggling KeyPad Locking state, second argument is Keypad ID, third is the param object.
			$scope.$emit(Keypad.TOGGLE_OPENING, "numeric",params);
		}


		/**
	     * This example show how to listen for the KEY_PRESSED event thrown
	     * by the keypad and do what you need to do with it.
	     */  
	    $scope.listenedString = "";

		$scope.$on(Keypad.KEY_PRESSED, function(event,data){
			$scope.listenedString += data;
			$scope.$digest();
		});





		//DEMO APPLICATION CODE NOT WORTH READING 

		$scope.opened = false;
		$scope.openLabel = "Open Keypad"

		$scope.$on(Keypad.OPENED, function(event,id){
			$scope.openLabel = "Close Keypad";
			$scope.opened = true;
			
			if(!$scope.$$phase){
				$scope.$apply();
			}
		});

		$scope.$on(Keypad.CLOSED, function(event,id){
			$scope.openLabel = "Open Keypad";
			$scope.opened = false;

			if(!$scope.$$phase){
				$scope.$apply();
			}
		});


		$scope.$on(Keypad.MODIFIER_KEY_PRESSED, function(event,key,id){
			var focusedInput = $('a[data-ng-keypad-input]:focus'),
				inputs = $('a[data-ng-keypad-input]'),
				foundIndex = findInputInInputs(focusedInput,inputs),
				index = 0;

			switch(key){
				case "PREVIOUS":
					if(!focusedInput.length){
						index = inputs.length-1;
					}else{
						if(foundIndex===0){
							index = inputs.length-1;
						}else{
							index = foundIndex-1;
						}
					}
					inputs.eq(index).focus();
					break;
				case "NEXT":
					if(focusedInput.length){
						if(foundIndex===inputs.length-1){
							index = 0;
						}else{
							index = foundIndex+1;
						}
					}
					inputs.eq(index).focus();
					break;
			}	
		});


		function findInputInInputs(input,inputs){
			var foundIndex = 0;
			inputs.each(function(index){
				if($(this).is(input.eq(0))){
					foundIndex = index;
				}
			});

			return foundIndex;
		}


		$scope.locked = true;
		$scope.lockLabel = "Lock Keypad"

		function toggleLock(){
			$scope.locked = !$scope.locked;
			
			if($scope.locked){
				$scope.lockLabel = "Lock Keypad"
			}else{
				$scope.lockLabel = "Unlock Keypad"
			}
		}
	}

	window.DemoController = DemoController;
})();