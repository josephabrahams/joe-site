/* jshint browser: true, devel: true */
/* global Modernizr, YT */

;(function(window, document, undefined) {
  'use strict';

  var player;
  var playerFrame;
  var muteButton = document.getElementsByClassName('mute-button')[0];

  function getVideoProperties() {
    var height;
    var width;
    var top;
    var left;

    var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

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

    return {
      'height': height,
      'width':  width,
      'top':    top,
      'left':   left
    };
  }

  function repositionVideo() {
    var playerAttrs = getVideoProperties();

    playerFrame.style.height = playerAttrs.height + 'px';
    playerFrame.style.width  = playerAttrs.width  + 'px';
    playerFrame.style.top    = playerAttrs.top    + 'px';
    playerFrame.style.left   = playerAttrs.left   + 'px';
  }

  function toggleMute() {
    if (player.isMuted()) {
      player.unMute();
      muteButton.innerText = 'mute';
    } else {
      player.mute();
      muteButton.innerText = 'unmute';
    }
  }

  // start the show
  function onPlayerReady(event) {
    event.target.setVolume(50);
    event.target.mute();
    event.target.playVideo();

    playerFrame.className += ' show';
    muteButton.className  += ' show';
  }

  // loop the video
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  }

  // called once the YouTube iframe player downloads
  window.onYouTubeIframeAPIReady = function() {
    // makes an iframe from #player
    player = new YT.Player('player', {
      videoId: 'MR2V_3-B8y4',
      playerVars: {
        modestbranding: 1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });

    // create pointer to new YouTube iframe
    playerFrame = player.c;

    muteButton.onclick = toggleMute;
    window.onresize = repositionVideo;

    repositionVideo();
  };

  // define what mobile is
  var isMobile;
  if (Modernizr.mq('only all and (max-width: 1024px)') && Modernizr.touch) {
    isMobile = true;
  }

  // Load the YouTube player code asynchronously if not on mobile
  if (!isMobile) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  console.log('trying to fix or change something, only guarantees and perpetuates its existence.');

})(window, document);

