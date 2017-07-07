# \<fs-core-element\>

Functions and properties used globally across the FamilySearch site, available to web components.

## Installation

$ bower install --save https://github.com/fs-webdev/fs-core-element.git

## Usage

```js
var fsCore = document.createElement('fs-core-element');
```

## Properties

* `simpleLocale` - The current language of the page.
* `translations` - Translations for the individual web component. Each web component that needs translations should create its own `<fs-core-element>`.

## Functions

* `i18n` - Get the current languages translations for the individual web component.
* `htmlEncode` - Encode html entities.
* `htmlDecode` - Safely decode html entities.

### i18n

Get the current languages translations for the individual web component.

```js
fsCore.translations = {
  en: {
    hello: 'world'
    // other keys and their translations
  },
  es: {
    hello: 'mundo'
    // ...
  }
  // other locales and their translations
};

fsCore.i18n('hello');  // => 'world'
```

The `<fs-core-element>` element takes a `translation` object and exposes an `i18n(key)` function that can be used to get the current language's translation.

The current language will be taken from the `lang` attribute of the `<fs-core-element>` element, otherwise it will use the `lang` attribute of the `<html>` element. If neither element has a `lang` attribute it will default to `en`.

If the current language does not exist in the `translations` object, the language will default to `en`. If the requested key does not exist in the current language's translations, it will use the value from `en`. Lastly, if the current language uses sublocales (e.g. `en-gb`) and there are no translations for the full locale, it will remove sublocales until a language exists in the `translation` object (e.g. `en-gb` will use `en`).

### htmlEncode

Encode html entities.

```js
fsCore.htmlEncode('<div>Hello world</div>');  // => '&lt;div&gt;hello world&lt;/div&gt;'
fsCore.htmlEncode('<a herf="javascript:void(0)">click</a>'); // => '&lt;a&nbsp;herf=&quot;javascript:void(0)&quot;&gt;click&lt;/a&gt;'
```

## htmlDecode

Safely decode html entities.

```js
fsCore.htmlEncode('&lt;div&gt;hello world&lt;/div&gt;');  // => '<div>Hello world</div>'
fsCore.htmlEncode('&lt;a&nbsp;herf=&quot;javascript:void(0)&quot;&gt;click&lt;/a&gt;'); // => '<a herf="javascript:void(0)">click</a>'
```