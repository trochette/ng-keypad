# ng-keypad


ng-keypad is a simple set of directive that allow you to create a custom keypad to provide on screen user input functionnality. Mobile and desktop compatible. You can view a demo here : [View Demo](http://dev.tommyrochette.com/ng-keypad/demo/).



## Usage

```
//Basic usage
<div data-ng-keypad="numeric">
    // Insert key pad template here.
</div>

//Combined with ng-include
<div data-ng-keypad="numeric">
     <div ng-include="" src="'partials/keypad/numeric.html'"></div>
</div>
```

## Options

- `data-ng-keypad` Specify ID for the keypad instance. You can have multiple keypads in the same application.
- `data-auto-close` Set that to true and the keypad will automatically close when user click outside of it.
- `data-ng-draggable` Use for the ng-draggable directive. Allowing the keypad to be moved on screen.




## ng-keypad-input

### Usage

```
 //Basic usage
 <input class="input" data-ng-model="inputModel" data-ng-keypad-input="numeric" />

 //It can also be used on a tag to prevent keyboard to show up on mobile devices
 <a class="input" data-ng-model="inputModel" data-ng-keypad-input="numeric" ></a>
```

## ng-keypad-restrict

Use to restrict input using a regular expression.


