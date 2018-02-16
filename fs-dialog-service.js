// service to handle stacking of dialogs
(function () {
  var dialogStack = [];
  var buffer = [];
  var bufferElements = (document.readyState === 'loading');

  window.FS = window.FS || {};
  FS.dialog = FS.dialog || {};
  FS.dialog.service = FS.dialog.service || {};

  /**
   * This function will register global elements and attach a reference to them to FS.dialog
   * @param {string} elementName - The name of the element to register e.g. fs-person-card
   * @returns {undefined} - Returns void.
   */
  FS.dialog.register = function (elementName) {
    if (bufferElements) {
      buffer.push(elementName);
      return;
    }
    registerElement(elementName);
  };

  function registerElement (elementName) {
    var camelCaseName = elementName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    if (FS.dialog[camelCaseName]) {
      console.error('Attempted to create element', elementName, 'which already exists');
      return;
    }
    var element = document.createElement(elementName);
    document.body.appendChild(element);
    Object.defineProperty(FS.dialog, camelCaseName, {
      get: function () {
        return element;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bufferElements = false;
      buffer.forEach(registerElement);
    });
  }

  FS.dialog.service.addDialogToStack = function (dialogElement) {
    FS.dialog.service.removeDialogFromStack(dialogElement);
    dialogStack.push(dialogElement);
  };

  FS.dialog.service.removeDialogFromStack = function (dialogElement) {
    var index = dialogStack.indexOf(dialogElement);
    if (index > -1) dialogStack.splice(index, 1);
  };

  FS.dialog.service.dialogIsOnTop = function (dialogElement) {
    var index = dialogStack.indexOf(dialogElement);
    var lastIndex = dialogStack.length - 1;
    return index === lastIndex;
  };

  FS.dialog.service.closeAllDialogs = function () {
    var reverseStack = [].concat(dialogStack).reverse();
    reverseStack.forEach(function (dialog) {
      dialog.close();
    });
  };

  FS.dialog.service.closeDialogAndAllChildren = function (dialogElement) {
    var reverseStack = [].concat(dialogStack).reverse();
    var index = reverseStack.indexOf(dialogElement);

    var animationToUseToClose = dialogElement.getAttribute('transition');
    reverseStack.some(function (dialog, dialogIndex) {
      if (dialogIndex <= index) {
        var animationToRestore = dialog.getAttribute('transition');
        if (animationToUseToClose) {
          dialog.setAttribute('transition', animationToUseToClose);
        }
        dialog.close();
        // Restsore the animation direction after the transition has finished
        if (animationToUseToClose) {
          setTimeout(function () {
            dialog.setAttribute('transition', animationToRestore);
          }, 300);
        }
      } else {
        return true;
      }
    });
  };

  FS.dialog.service.getStack = function () {
    return dialogStack;
  };

  FS.dialog.service.windowHasFocus = true;
})();
