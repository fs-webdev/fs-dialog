Modules
=========
Modules are resuable groups of elements, such as forms, popups, and navigation. They are location agnostic, flexible, and should be made with reuse in mind.

# Rules
* Use only class selectors to style a module. **Never** use IDs.
* Namespace all class names with `fs-` and use BEM syntax.
* **Never** use tag selectors to style a module.
* **Never** use a parent selector to style a module differently based on it's location on the page. Instead, sub-class the module by creating a new class name which declares the changes needed. For example, if a module needs to look differently in the sidebar, never use the sidebar to style the element. Instead create a new class which modifies the module (such as `module--sidebar`) and append this class to the module (e.g. `<div class="module module--sidebar"></div>`).
