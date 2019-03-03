$(document).ready(function() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player,
      playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
  var vid = [{'videoId': '3wPZTHybWnY'}],
    currVid = '3wPZTHybWnY';

  $('.hi em:last-of-type').html(vid.length);

  /*function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: '3wPZTHybWnY',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 0,
        loop: 1,
        mute: 1,
        rel: 0,
        playlist: "3wPZTHybWnY"
      }
    });
  }*/


  function onYouTubePlayerAPIReady(){
  player = new YT.Player('player', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, 'playerVars': playerDefaults});
  }

  function onPlayerReady(){
    player.loadVideoById(vid[currVid]);
    player.mute();
  }

  function onPlayerStateChange(e) {
    if (e.data === 1){
      $('#player').addClass('active');
      $('.hi em:nth-of-type(2)').html(currVid + 1);
    } else if (e.data === 2){
      $('#player').removeClass('active');
      if(currVid === vid.length - 1){
        currVid = 0;
      } else {
        currVid++;
      }
      player.loadVideoById(vid[currVid]);
      player.seekTo(vid[currVid].startSeconds);
    }
  }

  function vidRescale(){

    var w = $(window).width()+200,
      h = $(window).height()+200;

    if (w/h > 16/9){
      player.setSize(w, w/16*9);
      $('.player .overlay').css({'left': '0px'});
    } else {
      player.setSize(h/9*16, h);
      $('.player .overlay').css({'left': -($('.player .overlay').outerWidth()-w)/2});
    }
  }

  $(window).on('load resize', function(){
    vidRescale();
  });

  $('.hi span:first-of-type').on('click', function(){
    $('#player').toggleClass('mute');
    $('.hi em:first-of-type').toggleClass('hidden');
    if($('#player').hasClass('mute')){
      player.mute();
    } else {
      player.unMute();
    }
  });

  $('.hi span:last-of-type').on('click', function(){
    $('.hi em:nth-of-type(2)').html('~');
    player.pauseVideo();

  
});
