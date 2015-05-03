/* jshint browser: true, devel: true, jquery: true */
/* global Modernizr, YT */

;(function($, window, undefined) {
  'use strict';

  var $document = $(window.document);
  var player;
  var $videoPlayer;
  var $muteButton = $('.mute-button');

  function getVideoProperties() {
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

    return {
      'height': height,
      'width':  width,
      'top':    top,
      'left':   left
    };
  }

  function repositionVideo() {
    $videoPlayer.css(getVideoProperties());
  }

  var isMobile;
  if (Modernizr.mq('only all and (max-width: 1024px)') && Modernizr.touch) {
    isMobile = true;
  }

  if (!isMobile) {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    console.log('Video not available on mobile');
  }

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  window.onYouTubeIframeAPIReady = function() {
    var playerAttrs = getVideoProperties();

    player = new YT.Player('video-player', {
      height: playerAttrs.height,
      width: playerAttrs.width,
      videoId: 'MR2V_3-B8y4',
      playerVars: {
        modestbranding: 1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });

    $videoPlayer = $(player.c);

    $videoPlayer.css({
      top:  playerAttrs.top,
      left: playerAttrs.left
    });
  };

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.setVolume(50);
    event.target.mute();
    event.target.playVideo();
    $videoPlayer.addClass('visible');
    $muteButton.removeClass('hidden');
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  }

  function toggleMute() {
    if (player.isMuted()) {
      player.unMute();
      $muteButton.text('mute');
    } else {
      player.mute();
      $muteButton.text('unmute');
    }
  }

  $document.ready(function() {
    $muteButton.click(function() {
      toggleMute();
    });
    $(window).resize(repositionVideo);
  });

  console.log('trying to fix or change something, only guarantees and perpetuates its existence.');

})(jQuery, window);

