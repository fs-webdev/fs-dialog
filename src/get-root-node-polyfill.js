// service to handle stacking of dialogs
(function () {
  // Node getRootNode(optional GetRootNodeOptions options);

  /**
   * Returns the context object’s shadow-including root if options’s composed is true.
   * Returns the context object’s root otherwise.
   *
   * The root of an object is itself, if its parent is null, or else it is the root of its parent.
   *
   * The shadow-including root of an object is its root’s host’s shadow-including root,
   * if the object’s root is a shadow root, and its root otherwise.
   *
   * https://dom.spec.whatwg.org/#dom-node-getrootnode
   *
   * @memberof Node.prototype
   * @param {!object} [opt = {}] - Options.
   * @param {!boolean} [opt.composed] - See above description.
   * @returns {!Node} The root node.
   */
  function getRootNode (opt) {
    var composed = typeof opt === 'object' && Boolean(opt.composed);

    return composed ? getShadowIncludingRoot(this) : getRoot(this);
  }

  function getShadowIncludingRoot (node) {
    var root = getRoot(node);

    if (isShadowRoot(root)) {
      return getShadowIncludingRoot(root.host);
    }

    return root;
  }

  function getRoot (node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  function isShadowRoot (node) {
    return typeof ShadowRoot === 'function' && node instanceof ShadowRoot;
  }

  function isImplemented () {
    return Object.prototype.hasOwnProperty.call(Node.prototype, 'getRootNode');
  }

  if (!isImplemented()) {
    Node.prototype.getRootNode = getRootNode;
  }
})();
