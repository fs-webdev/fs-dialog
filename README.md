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

## Installation

```
$ bower install --save fs-webdev/fs-dialog
```

## Demo

If you attempt to `frontier element serve` on a clean install, you will get an error, stating that the analysis.json file (used to populate the documentation page) does not exist. You can fix this by either running `frontier element serve -a`, or by auto-loading the demo page via:

`frontier element serve -d`

The demo page is _fully_ dynamic, allowing excercising of each type of dialog with its various options, updating the associated HTML code snippet and allowing for easy testing of various configurations.

## Online Docs & Demo

The FamilySearch Element Catalog is located at: [https://www.familysearch.org/frontier/elements/](https://www.familysearch.org/frontier/elements/), with access granted to members of the `fs-webdev` GitHub organization. You can browse through each shared element's docs and demo

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

## Submodules for Common Files

The `tree-common-build-scripts` folder is a Git submodule, made to house build-related code common across multiple repositories. In order to update, run:

```bash
git pull --recurse-submodules; git submodule update --remote --recursive
```

## Special Plugins

In order for the **`size-limit`** WCT plugin to run, you need to globally install it:

```bash
npm install -g fs-webdev/size-limit
```

### Development Standards Enforcement

> FamilySearch components are developed in compliance with ESLint and CSSLint common standards. Standards checking is run as part of an npm-based husky pre-commit hook, and can also be explicitly run via the `npm test` and `npm run standard` commands.

In order for **`standard`** to run, you generally need to globally install it:

```bash
npm install -g semistandard
npm install -g eslint-plugin-html
npm install -g snazzy
```

and then you can run:

```bash
semistandard --verbose '**/*.html' '**/*.js' --fix | snazzy
```

for a report of JS standards infractions and to automatically fix the easy infractions _(mostly whitespace, commas, quotes, and semicolons)_. Custom configuration should be added to a `semistandard` section of package.json.

In order for **`stylelint`** to run, you need to globally install it:

```bash
npm install stylelint
npm install -g stylelint-config-standard
```

and then you can run:

```bash
stylelint '**/*.html' '**/*.css' --fix
```

for a report of CSS standards infractions and to automatically fix the easy infractions _(mostly whitespace)_. Custom configuration should be added to a `stylelint` section of package.json.

## Running Tests

This component is set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester).

In order to run the `wct` command, you need to globally install web-component-tester:

> NOTE OF WARNING: This component is using a [patcharound](https://github.com/thedeeno/web-component-tester-istanbul/issues/38#issuecomment-287544522) in order to incorporate code coverage reporting. In order to be able to run unit tests locally, (as of 2017-05-18) you must install the *patched* versions of web-component-tester and web-component-tester-istanbul. (You may need to uninstall other versions, first)

```bash
npm install -g t2ym/web-component-tester#6.0.0-wct6-plugin.1
npm install -g t2ym/web-component-tester-istanbul#0.10.1-wct6.11
```

To run tests locally, run:

```bash
npm test
```

or

```bash
wct --skip-plugin sauce
```

If you need to debug locally (keeping the browser open), run:

```bash
wct --skip-plugin sauce -p
```

or

```bash
polymer test --skip-plugin sauce --local chrome -p
```

If you want to run the full suite of SauceLabs browser tests, run:

```bash
wct test/index.html --configFile wct.conf.json  --sauce-username {USERNAME} --sauce-access-key {ACCESS_KEY}
```
