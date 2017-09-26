(function() {
  var WIDE_ARROW_INSET = 15;
  var TALL_ARROW_INSET = 50;
  var WIDE_ARROW_HEIGHT = 16;
  var WIDE_ARROW_WIDTH = 32;
  var INSET = 15;
  var INSET2 = INSET*2;

  /*********************/
  /* PRIVATE FUNCITONS */
  /*********************/

  // // Calculate scores based on what percentage of the dialog will be on the screen
  // function fsCalculateDialogScores(sourceElement, doNotAllowVerticalScroll, dialogContentElement) {
  //   var scores = {};
  //   var containingRect = doNotAllowVerticalScroll ? fsGetWindowRect() : fsGetBodyRect();
  //   var rectToAttachTo = fsLocalToGlobal(sourceElement);
  //   var width = dialogContentElement.scrollWidth;
  //   var height = dialogContentElement.scrollHeight;
  //   var xOffset = 0;
  //   var yOffset = 0;

  //   // where is the arrow going to sit?
  //   var tallArrowBottomPos = rectToAttachTo.top + (rectToAttachTo.height / 2) + (WIDE_ARROW_WIDTH / 2);
  //   var wideArrowRightPos = rectToAttachTo.left + (rectToAttachTo.width / 2) + (WIDE_ARROW_WIDTH / 2);

  //   // If the callout goes to the left, where is the top of it?
  //   var leftRectTop = rectToAttachTo.top + (rectToAttachTo.height / 2) - (height / 2);

  //   // If the callout goes to the top, where is the left side?
  //   var topRectLeft = rectToAttachTo.left + (rectToAttachTo.width / 2) - (width / 2);

  //   // add an offset to pull it on screen if it will hang off
  //   if (leftRectTop < containingRect.top) {
  //     yOffset = containingRect.top - leftRectTop;
  //   } else if (leftRectTop + height > containingRect.bottom) {
  //     yOffset = containingRect.bottom - leftRectTop - height;
  //   }

  //   if (topRectLeft < containingRect.left) {
  //     xOffset = containingRect.left - topRectLeft;
  //   } else if (topRectLeft + width > containingRect.right) {
  //     xOffset = containingRect.right - topRectLeft - width;
  //   }

  //   // If the arrow will be outside of the dialog's inset we need to adjust the offset to compensate
  //   // This may move part of the dialog back off screen, but it's important that the arrow stays with the dialog
  //   if (leftRectTop + yOffset + height - TALL_ARROW_INSET < tallArrowBottomPos) {
  //     yOffset = tallArrowBottomPos - leftRectTop - height + TALL_ARROW_INSET;
  //   } else if (leftRectTop + yOffset + TALL_ARROW_INSET > tallArrowBottomPos - WIDE_ARROW_WIDTH) {
  //     yOffset = tallArrowBottomPos - WIDE_ARROW_WIDTH - leftRectTop - TALL_ARROW_INSET;
  //   }
  //   if (topRectLeft + xOffset + width - WIDE_ARROW_INSET < wideArrowRightPos) {
  //     xOffset = wideArrowRightPos - topRectLeft - width + WIDE_ARROW_INSET;
  //   } else if (topRectLeft + xOffset + WIDE_ARROW_INSET > wideArrowRightPos - WIDE_ARROW_WIDTH) {
  //     xOffset = wideArrowRightPos - WIDE_ARROW_WIDTH - topRectLeft - WIDE_ARROW_INSET;
  //   }

  //   // calculate the left and top positions for each rect
  //   var leftRectLeft = rectToAttachTo.left - (width + WIDE_ARROW_HEIGHT);
  //   var rightRectLeft = rectToAttachTo.right + WIDE_ARROW_HEIGHT;
  //   topRectLeft = topRectLeft + xOffset;
  //   var bottomRectLeft = topRectLeft;
  //   leftRectTop = leftRectTop + yOffset;
  //   var rightRectTop = leftRectTop;
  //   var topRectTop = rectToAttachTo.top - height - WIDE_ARROW_HEIGHT;
  //   var bottomRectTop = rectToAttachTo.bottom + WIDE_ARROW_HEIGHT;

  //   // get the new rects so we can calculate their scores
  //   var leftRect = new fsRect(leftRectLeft, leftRectTop, width, height);
  //   var rightRect = new fsRect(rightRectLeft, rightRectTop, width, height);
  //   var topRect = new fsRect(topRectLeft, topRectTop, width, height);
  //   var bottomRect = new fsRect(bottomRectLeft, bottomRectTop, width, height);

  //   // now calculate the percentage on screen for each
  //   // the scores will be between 0 and 1.
  //   scores.left = fsCalculatePercentageVisible(leftRect, containingRect);
  //   scores.right = fsCalculatePercentageVisible(rightRect, containingRect);
  //   scores.top = fsCalculatePercentageVisible(topRect, containingRect);
  //   scores.bottom = fsCalculatePercentageVisible(bottomRect, containingRect);

  //   return {scores: scores, xOffset: xOffset, yOffset: yOffset};
  // }

  // function fsCalculatePercentageVisible(rect, containingRect) {
  //   if (rect.left >= containingRect.left && rect.right <= containingRect.right && rect.top >= containingRect.top && rect.bottom <= containingRect.bottom) {
  //     // the entire rect is on screen
  //     return 1;
  //   } else {
  //     var area = rect.width * rect.height;
  //     var visibleWidth = rect.width;
  //     var visibleHeight = rect.height;
  //     var visibleArea;
  //     var score = 0;
  //     // where are the sides in relation to the containing rect?
  //     var left = rect.left - containingRect.left;
  //     var right = containingRect.right - rect.right;
  //     var top = rect.top - containingRect.top;
  //     var bottom = containingRect.bottom - rect.bottom;

  //     if (left < 0) {
  //       // it's hanging off the left side of the screen
  //       visibleWidth = visibleWidth + left;
  //     }
  //     if (right < 0) {
  //       // it's hanging off the right side of the screen
  //       visibleWidth = visibleWidth + right;
  //     }
  //     if (top < 0) {
  //       // it's hanging off the top of the screen
  //       visibleHeight = visibleHeight + top;
  //     }
  //     if (bottom < 0) {
  //       // it's hanging off the bottom of the screen
  //       visibleHeight = visibleHeight + bottom;
  //     }

  //     // if we have a negative visible width/height, reset to zero - it just means it's far off the screen.
  //     if (visibleWidth < 0) {
  //       visibleWidth = 0;
  //     }
  //     if (visibleHeight < 0) {
  //       visibleHeight = 0;
  //     }

  //     visibleArea = visibleWidth * visibleHeight;

  //     if (visibleArea === area) {
  //       score = 1;
  //     } else if (visibleArea < area) {
  //       score = visibleArea / area;
  //     }

  //     return score;
  //   }
  // }

  // function getScrollingParentOffsets(element) {
  //   var parent = element.offsetParent;
  //   var offsets = {yOffset: 0, xOffset: 0};
  //   if (parent) {
  //     // igonre if the offset parent is body
  //     if (parent === body()) {
  //       return offsets;
  //     }
  //     // if the offset parent scrolls, we need to adjust the offsets
  //     if (parent.scrollTop > 0 || parent.scrollLeft > 0) {
  //       offsets.yOffset = parent.scrollTop;
  //       offsets.xOffset = parent.scrollLeft;
  //     }
  //   }
  //   return offsets;
  // }

  function myWin() {
    return window.karmaWindow || window;
  }

  function body() {
    return window.karmaBody || document.body;
  }

  /********************/
  /* PUBLIC FUNCITONS */
  /********************/

  function fp2(value) {
    return Math.round(Number(value || 0)*100)/100;
  }

  //**********************************
  // fsRect Object
  // members: left, top, width, height
  // All values defult to 0
  function fsRect(left, top, width, height) {
    this.top    = fp2(top);
    this.height = fp2(height);
    this.bottom = fp2(this.top + this.height);

    this.left   = fp2(left);
    this.width  = fp2(width);
    this.right  = fp2(this.left + this.width);
  }

  // function fsGetBodyRect() {
  //   return new fsRect(body().scrollLeft + INSET, INSET, body().scrollWidth - body().scrollLeft - INSET2, body().scrollHeight - INSET2);
  // }

  function windowTop() {
    return myWin().pageYOffset || body().scrollTop;
  }

  function windowLeft() {
    return myWin().pageXOffset || body().scrollLeft;
  }

  function fsGetWindowRect() {
    var top = windowTop()+INSET;
    var left = windowLeft()+INSET;
    var width = myWin().innerWidth-INSET2;
    var height = myWin().innerHeight-INSET2;
    return new fsRect(left, top, width, height);
  }

  // Convert the fsRect from the local coordinates of $local to global coordinates
  // If 'rect' is null or not defined then use the bounding fsRect of $local
  function fsLocalToGlobal(localEl, rect) {
    var left, top, width, height;
    var globalRect = localEl.getBoundingClientRect();

    if (!rect) {
      left   = globalRect.left;
      top    = globalRect.top;
      width  = globalRect.width;
      height = globalRect.height;
    }
    else {
      // Convert from local to global coordinates
      left   = rect.left - globalRect.left;
      top    = rect.top  - globalRect.top;
      width  = rect.width;
      height = rect.height;
    }

    // Adjust for page scroll offsets
    left += windowLeft();
    top  += windowTop();

    // Create a new rect in global coordinates
    return new fsRect(left, top, width, height);
  }

  // Convert the fsRect from the global coordinates to local coordinates of $local
  // If 'rect' is null or not defined then use an empty fsRect
  function fsGlobalToLocal(localEl, rect) {
    var left, top, width, height, bodyLeftOffset;
    var globalRect = localEl.getBoundingClientRect();
    // Bug Fix: OFT-69340/TW-47 - Global flyout positioning does not take body offset into account when walkMeEx is enabled
    // bodyLeftOffset = (FS.showEx('walkMeEx') && localEl.isSameNode(body()) && !body().scrollLeft)? body().getBoundingClientRect().left : 0;
    bodyLeftOffset = (localEl.isSameNode(body()) && !body().scrollLeft)? body().getBoundingClientRect().left : 0;

    if (rect) {
      left   = rect.left;
      top    = rect.top;
      width  = rect.width;
      height = rect.height;
    }
    else {
      left   = 0;
      top    = 0;
      width  = 0;
      height = 0;
    }

    // Convert from global to local coordinates
    left -= (globalRect.left + windowLeft());
    left += bodyLeftOffset;
    top  -= (globalRect.top + windowTop());

    // Create a new rect in locale coordinates
    return new fsRect(left, top, width, height);
  }

  // Convert the fsRect from the local coordinates of $localSrc
  // to the local coordinates of $localDst.
  // If 'rect' is null or not defined then use the bounding fsRect for $localSrc
  function fsLocalToLocal(localSrcEl, localDstEl, rect) {
    rect = rect || null;
    rect = fsLocalToGlobal(localSrcEl, rect);
    return fsGlobalToLocal(localDstEl, rect);
  }

  FS.dialog.service.positioningObj = {
    fp2: fp2,
    fsRect: fsRect,
    // fsGetBodyRect: fsGetBodyRect,
    windowTop: windowTop,
    windowLeft: windowLeft,
    fsGetWindowRect: fsGetWindowRect,
    fsLocalToGlobal: fsLocalToGlobal,
    fsGlobalToLocal: fsGlobalToLocal,
    fsLocalToLocal: fsLocalToLocal
  };

})();
