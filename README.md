# \<fs-dialog\>

An accessible standard dialog.

## Installation

$ bower install --save fs-webdev/fs-dialog

## Usage

```html
<fs-dialog>
  <h4 class="fs-dialog__header">Dialog Title</h4>
  <div class="fs-dialog__body">
    <p>This is a modal. It really stands out from the content and forces the user to perform an action before they can continue.</p>
  </div>
  <div class="fs-dialog__footer">
    <fs-button type="recommended">OK</fs-button>
  </div>
</fs-dialog>
```

### Attributes

* `open` - Both opens the dialog and denotes that it is open. Remove attribute to close.
* `type` - The type of dialog. Values can be `modal` or `modeless`. Defaults to `modal`.
* `transition` - Transition to use when opening the modal. Values can be `from-bottom`, `from-right`, or `center`. Defaults to `center`.

### Events

All events bubble and are fired on the dialog that caused the event.

* `fs-dialog-open` - Fired when the dialog is opened.
* `fs-dialog-close` - Fired when the dialog is closed by any means.
* `fs-dialog-dismiss` - Fired when an element that has the `data-dialog-dismiss` attribute is clicked. Will close the dialog.
* `fs-dialog-confirm` Fired when an element that has the `data-dialog-confirm` attribute is clicked. Does not close the dialog.

### Functions

* `open` - Open the dialog.
* `close` - Close the dialog.

### Properties

* `isOpen` - If the dialog is currently opened.

### Classes

Using classes allows easy style overrides and manipulation.

* `fs-dialog__header` - The standard dialog header with default padding and a bottom border.
* `fs-dialog__body` - Provides default padding.
* `fs-dialog__foter` - The standard dialog footer with default padding, grey background, and a top border.