// service to handle stacking of dialogs
(function() {
  var dialogStack = [];

  FS.dialog.service = {};

  FS.dialog.service.addDialogToStack = function(dialogElement) {
    dialogStack.push(dialogElement);
    console.log('newStack', dialogStack)
  };

  FS.dialog.service.removeDialogFromStack = function(dialogElement) {
    var index = dialogStack.indexOf(dialogElement);
    if (index > -1) dialogStack.splice(index, 1);
    console.log('newStack', dialogStack)
  };

  FS.dialog.service.dialogIsOnTop = function(dialogElement) {
    var index = dialogStack.indexOf(dialogElement);
    var lastIndex = dialogStack.length - 1;
    return index === lastIndex;
  };

  FS.dialog.service.isDialogInStack = function(dialogElement) {
    return dialogStack.indexOf(dialogElement) > -1;
  };

  FS.dialog.service.windowHasFocus = true;
  FS.dialog.service.mobileBreakpoint = 480;
})();
