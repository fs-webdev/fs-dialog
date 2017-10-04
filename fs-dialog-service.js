// service to handle stacking of dialogs
(function() {
  var dialogStack = [];

  FS.dialog.service = {};

  FS.dialog.service.addDialogToStack = function(dialogElement) {
    FS.dialog.service.removeDialogFromStack(dialogElement)
    dialogStack.push(dialogElement);
  };

  FS.dialog.service.removeDialogFromStack = function(dialogElement) {
    var index = dialogStack.indexOf(dialogElement);
    if (index > -1) dialogStack.splice(index, 1);
  };

  FS.dialog.service.dialogIsOnTop = function(dialogElement) {
    var index = dialogStack.indexOf(dialogElement);
    var lastIndex = dialogStack.length - 1;
    return index === lastIndex;
  };

  // not 100% sure if this is needed
  FS.dialog.service.isDialogInStack = function(dialogElement) {
    return dialogStack.indexOf(dialogElement) > -1;
  };

  FS.dialog.service.closeAllDialogs = function() {
    var reverseStack = dialogStack.reverse();
    reverseStack.forEach(function(dialog) {
      dialog.close();
    })
  }

  FS.dialog.service.windowHasFocus = true;
  // not 100% sure if this is needed
  FS.dialog.service.mobileBreakpoint = 480;
})();