Elements
=========
Elements are HTML tags such as buttons, labels, and form inputs. They constitute the base styles for the entire site.

# Rules
* Use only tag selectors to style an element. You may only use pseudo selectors (such as :before, :hover) and attribute selectors when used in conjunction with a tag selector (i.e. use `input[type=text]` instead of just `[type=text]`).
* You may style a single element with a class (such as buttons or badges).
* Namespace all class names with `fs-` and use BEM syntax.
* If what you are styling requires two elements, make it a module.