# \<fs-dialog\>

An accessible standard dialog for FamilySearch.

![](/../screenshots/modal.png?raw=true)

A [dialog](https://en.wikipedia.org/wiki/Dialog_box) is:

> "a small window that communicates information to the user and prompts them for a response.
>
> Dialog boxes are classified as "modal" or "modeless", depending on whether they block interaction with the software that initiated the dialog."

For accessibility, dialogs always have a close button in to top right corner.

The content of a dialog (the element with the class `.fs-dialog--body`) will scroll if it's taller than the dialog or the dialog is taller than the page. The `<header>` or `<footer>` of a dialog will always be visible and won't scroll with the content.

Modal dialogs darken the background and prevent user interaction of all other elements on the page. They are fixed to the center of the screen and cannot be moved. They will always close if clicked outside of the modal or with the <cmd>esc</cmd> key (for accessibility).

Modeless dialogs do not darken the screen and do not prevent interaction of all other elements. They also start in the center of the screen but can be moved. They will not close if clicked outside nor with the <cmd>esc</cmd>.

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

* `opened` - Both opens the dialog and denotes that it is open. Remove attribute to close.
* `type` - The type of dialog. Values can be `modal` or `modeless`. Defaults to `modal`.
* `transition` - Transition to use when opening a modal dialog. Values can be `from-bottom`, `from-right`, or `center`. Defaults to `center`.

### Properties

* `opened` - Boolean that opens the dialog and denotes that it is open. Set to `false` to close.

### Classes

All classes are optional.

* `fs-dialog__body` - Provides default padding and scrolling content. Modal dialogs will add `role=main` to this element for screen readers.

### Elements

All elements are optional.

* `header` - The standard dialog header with default padding and a bottom border.
* `footer`- The standard dialog footer with default padding, grey background, and a top border.

### Events

All events bubble and are fired on the dialog that triggered the event.

* `fs-dialog-open` - Fired when the dialog is opened.
* `fs-dialog-close` - Fired when the dialog is closed by any means.
* `fs-dialog-dismiss` - Fired when an element that has the `data-dialog-dismiss` attribute is clicked. Will close the dialog.
* `fs-dialog-confirm` Fired when an element that has the `data-dialog-confirm` attribute is clicked. Does not close the dialog so you can preform asynchronous actions when the event is fired. You will have to tell the dialog when to close.

### Functions

* `open` - Open the dialog.
* `close` - Close the dialog.

### Helper Attributes

* `autofocus` - Focus this element when the dialog is opened. By default, the dialog itself is focused when opened.
* `data-dialog-dismiss` - Fire the `fs-dialog-dismiss` event when pressed and close the dialog. Use this attribute to automatically close the dialog. The close X has this attribute.
* `data-dialog-confirm` - Fire the `fs-dialog-confirm` event when pressed and do not close the dialog. Use this attribute to preform asynchronous actions when the event is fired. You will have to tell the dialog when to close.


## Submodules for Common Files

The `tree-common-build-scripts` folder is a Git submodule, made to house build-related code common across multiple repositories. In order to update, run:

```bash
git pull --recurse-submodules; git submodule update --remote --recursive
```

## Running Tests

This component is set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester).

To run tests locally, run:

```bash
wct --skip-plugin sauce
```

If you need to debug locally, run:

```bash
polymer test --skip-plugin sauce --local chrome -p
```
