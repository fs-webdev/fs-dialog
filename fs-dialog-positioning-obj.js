(function () {
  var INSET = 0;
  var INSET2 = INSET * 2;

  /*********************/
  /* PRIVATE FUNCTIONS */
  /*********************/

  function fsCalculatePercentageVisible (rect, containingRect) {
    if (rect.left >= containingRect.left && rect.right <= containingRect.right && rect.top >= containingRect.top && rect.bottom <= containingRect.bottom) {
      // the entire rect is on screen
      return 1;
    } else {
      var area = rect.width * rect.height;
      var visibleWidth = rect.width;
      var visibleHeight = rect.height;
      var visibleArea;
      var score = 0;
      // where are the sides in relation to the containing rect?
      var left = rect.left - containingRect.left;
      var right = containingRect.right - rect.right;
      var top = rect.top - containingRect.top;
      var bottom = containingRect.bottom - rect.bottom;

      if (left < 0) {
        // it's hanging off the left side of the screen
        visibleWidth = visibleWidth + left;
      }
      if (right < 0) {
        // it's hanging off the right side of the screen
        visibleWidth = visibleWidth + right;
      }
      if (top < 0) {
        // it's hanging off the top of the screen
        visibleHeight = visibleHeight + top;
      }
      if (bottom < 0) {
        // it's hanging off the bottom of the screen
        visibleHeight = visibleHeight + bottom;
      }

      // if we have a negative visible width/height, reset to zero - it just means it's far off the screen.
      if (visibleWidth < 0) {
        visibleWidth = 0;
      }
      if (visibleHeight < 0) {
        visibleHeight = 0;
      }

      visibleArea = visibleWidth * visibleHeight;

      if (visibleArea === area) {
        score = 1;
      } else if (visibleArea < area) {
        score = visibleArea / area;
      }

      return score;
    }
  }

  function myWin () {
    return window.karmaWindow || window;
  }

  function body () {
    return window.karmaBody || document.body;
  }

  /********************/
  /* PUBLIC FUNCITONS */
  /********************/

  function fp2 (value) {
    return Math.round(Number(value || 0) * 100) / 100;
  }

  //* *********************************
  // FSRect Object
  // members: left, top, width, height
  // All values defult to 0
  function FSRect (left, top, width, height) {
    this.top = fp2(top);
    this.height = fp2(height);
    this.bottom = fp2(this.top + this.height);

    this.left = fp2(left);
    this.width = fp2(width);
    this.right = fp2(this.left + this.width);
  }

  function windowTop () {
    return myWin().pageYOffset || body().scrollTop;
  }

  function windowLeft () {
    return myWin().pageXOffset || body().scrollLeft;
  }

  function fsGetWindowRect () {
    var top = windowTop() + INSET;
    var left = windowLeft() + INSET;
    var width = myWin().innerWidth - INSET2;
    var height = myWin().innerHeight - INSET2;
    return new FSRect(left, top, width, height);
  }

  // Convert the FSRect from the local coordinates of $local to global coordinates
  // If 'rect' is null or not defined then use the bounding FSRect of $local
  function fsLocalToGlobal (localEl, rect) {
    var left, top, width, height;
    var globalRect = localEl.getBoundingClientRect();

    if (!rect) {
      left = globalRect.left;
      top = globalRect.top;
      width = globalRect.width;
      height = globalRect.height;
    } else {
      // Convert from local to global coordinates
      left = rect.left - globalRect.left;
      top = rect.top - globalRect.top;
      width = rect.width;
      height = rect.height;
    }

    // Adjust for page scroll offsets
    left += windowLeft();
    top += windowTop();

    // Create a new rect in global coordinates
    return new FSRect(left, top, width, height);
  }

  // Convert the FSRect from the global coordinates to local coordinates of $local
  // If 'rect' is null or not defined then use an empty FSRect
  function fsGlobalToLocal (localEl, rect) {
    var left, top, width, height, bodyLeftOffset;
    var globalRect = localEl.getBoundingClientRect();
    // Bug Fix: OFT-69340/TW-47 - Global flyout positioning does not take body offset into account when walkMeEx is enabled
    // bodyLeftOffset = (FS.showEx('walkMeEx') && localEl.isSameNode(body()) && !body().scrollLeft)? body().getBoundingClientRect().left : 0;
    bodyLeftOffset = (localEl.isSameNode(body()) && !body().scrollLeft) ? body().getBoundingClientRect().left : 0;

    if (rect) {
      left = rect.left;
      top = rect.top;
      width = rect.width;
      height = rect.height;
    } else {
      left = 0;
      top = 0;
      width = 0;
      height = 0;
    }

    // Convert from global to local coordinates
    left -= (globalRect.left + windowLeft());
    left += bodyLeftOffset;
    top -= (globalRect.top + windowTop());

    // Create a new rect in locale coordinates
    return new FSRect(left, top, width, height);
  }

  // Convert the FSRect from the local coordinates of $localSrc
  // to the local coordinates of $localDst.
  // If 'rect' is null or not defined then use the bounding FSRect for $localSrc
  function fsLocalToLocal (localSrcEl, localDstEl, rect) {
    rect = rect || null;
    rect = fsLocalToGlobal(localSrcEl, rect);
    return fsGlobalToLocal(localDstEl, rect);
  }

  FS.dialog.service.positioningObj = {
    fp2: fp2,
    FSRect: FSRect,
    fsCalculatePercentageVisible: fsCalculatePercentageVisible,
    windowTop: windowTop,
    windowLeft: windowLeft,
    fsGetWindowRect: fsGetWindowRect,
    fsLocalToGlobal: fsLocalToGlobal,
    fsGlobalToLocal: fsGlobalToLocal,
    fsLocalToLocal: fsLocalToLocal
  };
})();
