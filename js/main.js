/* jshint browser: true, devel: true, jquery: true */

;(function($, window, undefined) {
  'use strict';

  var $document = $(window.document);
  var $hulaVideo = $('.hula-video');

  function setAspectRatio() {
    var height;
    var width;
    var top;
    var left;

    var windowHeight = $(window).height();
    var windowWidth  = $(window).width();

    var windowAspectRatio = windowWidth/windowHeight;
    var videoAspectRatio  = 16/9;

    if (windowAspectRatio < videoAspectRatio) {
      height = windowHeight;
      width  = windowHeight * videoAspectRatio;
      top    = 0;
      left   = (windowWidth - width) / 2;
    } else {
      height = windowWidth / videoAspectRatio;
      width  = windowWidth;
      top    = (windowHeight - height) / 2;
      left   = 0;
    }

    $hulaVideo.css({
      'height': height,
      'width':  width,
      'top':    top,
      'left':   left
    });
  }

  $document.ready(function() {
    /* jshint -W101 */
    console.log('trying to fix or change something, only guarantees and perpetuates its existence.');

    setAspectRatio();
    $(window).resize(setAspectRatio);
  });

})(jQuery, window);

