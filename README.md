# \<fs-dialog\>

An accessible standard dialog for FamilySearch.

A [dialog](https://en.wikipedia.org/wiki/Dialog_box) is:

> "a small window that communicates information to the user and prompts them for a response.
>
> Dialog boxes are classified as "modal" or "modeless", depending on whether they block interaction with the software that initiated the dialog."

FamilySearch modal dialogs darken the background and prevent user interaction of any other elements on the page. They are fixed to the center of the screen and cannot be dragged.

Modeless dialogs do not darken the screen and do not prevent interaction of any other elements. They start in the center of the screen but can be dragged.

## Installation

```
$ bower install --save fs-webdev/fs-dialog
```

## Usage

```html
<fs-dialog>
  <header>
    <h4>Dialog Title</h4>
  </header>
  <div class="fs-dialog__body">
    <p>This is a modal. It really stands out from the content and forces the user to perform an action before they can continue.</p>
  </div>
  <footer>
    <button class="fs-button fs-button--recommended">OK</button>
  </footer>
</fs-dialog>
```

### Attributes

* `open` - Both opens the dialog and denotes that it is open. Remove attribute to close.
* `type` - The type of dialog. Values can be `modal` or `modeless`. Defaults to `modal`.
* `transition` - Transition to use when opening the modal. Values can be `from-bottom`, `from-right`, or `center`. Defaults to `center`.

### Classes

Using these classes are optional.

* `fs-dialog__body` - Provides default padding. Modal dialogs will add `role=main` to this element for screen readers.

### Elements

Using these elements are optional.

* `header` - The standard dialog header with default padding and a bottom border.
* `footer`- The standard dialog footer with default padding, grey background, and a top border.

### Events

All events bubble and are fired on the dialog that caused the event.

* `fs-dialog-open` - Fired when the dialog is opened.
* `fs-dialog-close` - Fired when the dialog is closed by any means.
* `fs-dialog-dismiss` - Fired when an element that has the `data-dialog-dismiss` attribute is clicked. Will close the dialog.
* `fs-dialog-confirm` Fired when an element that has the `data-dialog-confirm` attribute is clicked. Does not close the dialog.

### Functions

* `open` - Open the dialog.
* `close` - Close the dialog.

### Helper Attributes

Use these attributes on buttons inside of the dialog to fire the dismiss or confirm events.

* `data-dialog-dismiss` - Fire the `fs-dialog-dismiss` event and close the modal. Use this attribute to automatically close the modal. The close X has this attribute.
* `data-dialog-confirm` - Fire the `fs-dialog-confirm` event and do not close the modal. Use this attribute to preform asynchronous actions when the event is fired. You will have to tell the modal when to close.

You can use both attributes on a single element to both close the modal and perform an action.

### Properties

* `isOpen` - If the dialog is currently opened.