# \<fs-dialog\>

[![Code Climate](https://codeclimate.com/repos/59f368e2098d8e028b000022/badges/0bc25c442f3c57feddae/gpa.svg)](https://codeclimate.com/repos/59f368e2098d8e028b000022/feed) [![Test Coverage](https://codeclimate.com/repos/59f368e2098d8e028b000022/badges/0bc25c442f3c57feddae/coverage.svg)](https://codeclimate.com/repos/59f368e2098d8e028b000022/coverage) [![Issue Count](https://codeclimate.com/repos/59f368e2098d8e028b000022/badges/0bc25c442f3c57feddae/issue_count.svg)](https://codeclimate.com/repos/59f368e2098d8e028b000022/feed) [![Build Status](https://travis-ci.org/fs-webdev/fs-dialog.svg?branch=master)](https://travis-ci.org/fs-webdev/fs-dialog)

An accessible standard dialog implemented in native web components for FamilySearch.

![](/../screenshots/modal.png?raw=true)

A [dialog](https://en.wikipedia.org/wiki/Dialog_box) is:

> "a small window that communicates information to the user and prompts them for a response.
>
> Dialog boxes are classified as "modal" or "modeless", depending on whether they block interaction with the software that initiated the dialog."

For accessibility, dialogs always have a close button in to top right corner, unless explicitly disabled.

The content of a dialog (the element with the class `.fs-dialog--body`) will scroll if it's taller than the dialog or the dialog is taller than the page. The `<header>` or `<footer>` of a dialog will always be visible and won't scroll with the content.

Modal dialogs darken the background and prevent user interaction of all other elements on the page. They are fixed to the center of the screen and cannot be moved. They will always close if clicked outside of the modal or with the <cmd>esc</cmd> key (for accessibility).

Modeless dialogs do not darken the screen and do not prevent interaction of all other elements. They also start in the center of the screen but can be moved. They will not close if clicked outside nor with the <cmd>esc</cmd>.

## Usage

### Import

Import `fs-dialog`:

```html
<link rel="import" href="/components/fs-dialog/fs-dialog-all.html">
```

or just the mode of `fs-dialog` that you need:

```html
<link rel="import" href="../fs-dialog/fs-modal-dialog.html">
```

and then set up your dialog content as desired (`fs-dialog` is light DOM, so you can style as you wish), using `<header>`, `.fs-dialog__body`, and/or `<footer>` elements:

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

___

> NOTE: Some teams have reported issues stemming from multiple components importing different portions of `fs-dialog`, which results in an error (`Class extends value undefined is not a constructor or null`), and broken `fs-dialog` functionality. If you run into this, simply import `fs-dialog-all` in each component.

___

### Attributes

* `opened` - Both opens the dialog and denotes that it is open. Remove attribute to close.
* `type` - The type of dialog. Values can be `modal` or `modeless`. Defaults to `modal`.
* `transition` - Transition to use when opening a modal dialog. Values can be `from-bottom`, `from-right`, or `center`. Defaults to `center`.

### Properties

* `opened` - Boolean that denotes whether it is open.

### Classes

All classes are optional.

* `fs-dialog__body` - Provides default padding and scrolling content. Modal dialogs will add `role=main` to this element for screen readers.

> NOTE: If you do not include an overflow-capable element (generally a `<section>` or `<div>`, lists do not work) with the `fs-dialog__body` class that wraps your dialog content, your dialog will not take advantage of the built-in inner scrolling functionality

### Elements

All elements are optional.

* `header` - The standard dialog header with default padding and a bottom border. NOTE: If you are using a modeless dialog, you need to include a header element, or the dialog will not be repositionable.
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

## Running the Component

<details>

1. (Once) Install or update the [Polymer CLI](https://www.npmjs.com/package/polymer-cli): ```npm i -g polymer-cli```
1. (Once) Install the [frontier-cli](https://github.com/fs-webdev/frontier-cli): ```npm i -g https://github.com/fs-webdev/frontier-cli```
1. Run `npm install` to get dependencies needed to set up the unit testing framework, useful commit hooks, and standards tools (`bower install` is also run as a post-install step).
1. Or (if you want to live dangerously) just run `bower install` to load all of the component's primary dependencies.
1. Run `polymer analyze > analysis.json` to initialize the docs page.

This component's auto-generated documentation is viewable by running:

```bash
frontier element serve
```

> NOTE: If you attempt to `frontier element serve` on a clean install, you will get an error, stating that the analysis.json file (used to populate the documentation page) does not exist. You can fix this by either running `frontier element serve -a`, or by auto-loading the demo page via:

```bash
frontier element serve -d
```

This component's demo page is viewable by running the above command.

</details>

## Online Docs & Demo

The FamilySearch Element Catalog is located at: [https://www.familysearch.org/frontier/catalog/](https://www.familysearch.org/frontier/catalog/), with access granted to members of the `fs-webdev` GitHub organization. [How to create a shared component of your own](https://www.familysearch.org/frontier/ui-components/creating-a-new-web-component/).

## Build, Commit, Test, and Standards Tools

For detail about automatic releases, test plugins, pre-commit hooks, and standards enforcement, see: [fs-common-build-scripts](https://github.com/fs-webdev/fs-common-build-scripts#)

> IMPORTANT NOTE: When running package dependency commands (i.e. `wct`, `standard`), you need to prefix the command with [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

## Running Tests

<details>

This component is set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester).

To run tests locally, run:

```bash
npm test
```

which will run the standards checks through `semistandard` and `stylelint`, and then the unit tests via `wct`.

```bash
npx wct --skip-plugin sauce
```

If you need to debug locally (keeping the browser open), run:

```bash
npx wct --skip-plugin sauce -p
```

or

```bash
polymer test --skip-plugin sauce --local chrome -p
```

If you want to run the full suite of SauceLabs browser tests, run:

```bash
npx wct test/index.html --configFile wct.conf.json  --sauce-username {USERNAME} --sauce-access-key {ACCESS_KEY}
```

> NOTE: You can export `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` in your `.bash_profile` to be able to simply run `npx wct` without needing additional options.

</details>
