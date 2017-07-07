# CSSDoc Proposal for style guide generation

## Standard block tags

- @author : Identify the author of an item
- @copyright : Document some copyright information
- @deprecated : Document that this is no longer the preferred way
- @description (@desc) : Describe a symbol
- @example : Provide an example of how to use a documented item
- @file (@fileoverview, @overview) : Describe a file
- @license : Identify the license that applies to this code
- @requires : This file requires a CSS file
- @see : Refer to some other documentation for more information
- @since : When was this feature added
- @todo : Document tasks to be completed
- @version : Documents the version number of an item

## Standard inline tags

- @link : Link to another item in the documentation

## Custom block tags

- @code : Document custom code output for a documented item (use like @example)

  ```css
  /**
   * @example
   * <h1 class="just-for-example">Hello</h1>
   *
   * @code
   * <h1>Hello</h1>
   */
  ```

- @colordef : Document a color (related to @typedef)
- @color : Document the type of a defined color
- @colorof : This color belongs to a parent section (related to @memberof)

  ```css
  /**
   * @colordef Color Name
   * @color [{system}] <value>
   *
   * @color {hex} #fff
   *
   * @colorof Section Name
   */
  ```

- @icondef : Document an icon (related to @typedef)
- @iconof : This icon belongs to a parent section (related to @memberof)

  ```css
  /**
   * @icondef Icon Name
   * @iconof Section Name
   */
  ```

- @section : Document a section (related to @class or @namespace)
- @subsectionof : This section belongs to a parent section (related to @memberof)

  ```css
  /**
   * Primary Section Name
   *
   * Primary section description.
   *
   * @section
   */

  /**
   * Section Name
   *
   * A description of the section and how to use it's content, etc.
   *
   * @section
   * @subsectionof Primary Section Name
   */
  ```

- @someTag : Any additional tags will be added as properties to the comment