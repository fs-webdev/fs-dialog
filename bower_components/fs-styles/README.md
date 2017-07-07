fs-styles
=========
Global styles for the FamilySearch.org website. Based on the principles of [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).

# How to Use

To use fs-styles in you app, turn on the `fsStylesEx` experiment. This will bring in the latest version of the styles.

## Importing the style guide into your Stylus file

Use `@import '/components/fs-styles/assets/css/helpers/*'` to import all the style guide variables, mixins, and functions into your Stylus files.

### Variables

There are a wide range of variables that the style guide creates, from media query sizes and break points, to colors and font sizes. See the [variable file](assets/css/helpers/_variables.styl) for the complete list of variables.

### Mixins

By default, the style guide will autoprfix most of the important CSS properties for you. See the [mixin file](assets/css/helpers/_mixins.styl) for the complete list of properties.

### Functions

- **overflow: ellipsis** - Shortcut for displaying ellipsis text on truncation.

  ```stylus
  .text {
    overflow: ellipsis;
  }

  // compiles to
  .text {
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  }
  ```

- **clearfix()** - Output the clearfix hack for the element.

  ```stylus
  .content {
    clearfix()
  }

  // compiles to
  .content:before,
  .content:after {
    content: ""
    display: table
  }

  .content:after {
    clear: both
  }
  ```

- **pxToRem(value [...value])** - Take a unit and output both px and rem properties (useful for responsive typography). Accepts multiple values.

  ```stylus
  .content {
    padding: pxToRem(16px);
    margin: pxToRem(16px 14px);
  }

  // compiles to
  .content {
    padding: 16px;
    padding: 1rem;
    margin: 16px 14px;
    margin: 1rem 0.875rem;
  }
  ```

- **calcLineHeight(lineHeight, fontSize)** - Calculate the line-height as a multiplier of the font-size (useful for responsive typography).

  ```stylus
  .text {
    line-height: calcLineHeight(20, 16);
  }

  // compiles to
  .text {
    line-height: 1.25;
  }
  ```

# Folder Organization
To help organize a large CSS code base, we have split the files into different folders. Each file is then compiled into `familysearch-styles.styl` which is what is used on the site.
*See [Architecture SASS Project](http://www.sitepoint.com/architecture-sass-project/) and [SMACSS Categorizing](http://smacss.com/book/categorizing) for more details*

Folder     | Contents
-----------|---------
Helpers    | Variables, mixins, and functions.
Elements   | Basic, indivisible building blocks of the site that include colors, HTML tags, and simple class names.
Modules    | Groupings of Elements that form a reusable aspect of the interface.
Components | Groupings of Modules that form relatively complex secitons of the interface.
Layout     | Styles for content layout such as grids, headers, footers, etc.

# Comments
The styles make use of a custom [CSSDoc](CSSDoc.md) style for comments which can be parsed to generate a style guide.

Always remember to update the comments when changing styles, or to create a new comment block for new styles.

# File Organization
A little effort goes a long way. Please take the time to organize your CSS file so that others may quickly find what they are looking for. Divide your code into meaningful sections that denote what the rules are affecting.
*See [CSS Guidelines](https://github.com/csswizardry/CSS-Guidelines) for more details*

## Recommended Guidelines
- Table of contents at the top of the stylesheet denoting sections
```javascript
/*------------------------------------*\
  $CONTENTS
\*------------------------------------*/
/**
 * CONTENTS..............Section description
 * SECTION-NAME..........Section description
 * ...
 */
```
- Section headings start with $ to make searching easier (`$SECTION-NAME`)
```javascript
/*------------------------------------*\
  $SECTION-NAME
\*------------------------------------*/
```
- Order css properties in alphabetical order. It's the easiest ordering to understand without explaining and ensures that finding a property is easy.

# Naming Conventions

## Files
When naming files, `_filename` denotes that the file is only a partial file and should not be compiled into a CSS file. These files are used by other files to create a fully complied CSS file. Examples include `_mixins` which is a list of mixins and has no selectors that would produce a CSS file.

## Class Names
When naming classes, preface all classes with `fs-` and use [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) syntax. By doing so, we completely nulify class name collision problems. Writing BEM is really easy when using stylus since you can use the `&` symbol to use the class name for each element.

## Variables
When naming variables, start the variable name with the most generic term and end with the most specific term. This allows auto complete to grab all variables that also belong to the generic category. For example, a variable for a blue border should be named `$color-border-blue`.
*See [Sass Variable Architecture](http://peteschuster.com/2014/02/sass-variable-architecture/), [Naming SASS Variables Modularly](http://webdesign.tutsplus.com/articles/quick-tip-name-your-sass-variables-modularly--webdesign-13364), and [SASS Color Variables](http://sachagreif.com/sass-color-variables/) for more details*

## License
Copyright © 2014 by Intellectual Reserve, Inc. See the LICENSE file for license rights and limitations.
