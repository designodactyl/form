$(document).ready(function(){


  //////////////////////////////////////////
  // Back button. Close, update URL & presrve page position
  $('.close').click(function(){
		parent.history.back();
		return false;
	});

  //////////////////////////////////////////
  // Slider hover and open states
  var $infoBar = $('.sideways-bar-info');
  var $infoButton = $('.info-circle');
  var $info = $('.right-info');
  var $projectBar = $('.sideways-bar-project');
  var $project = $('.project-wrapper');
  var $sideways = $('.sideways');
  var $left = $('.left');
  var $popImage = $('.pop-up-image img');
  var $closer = $('.closer');

  function open(i){
    $(i).addClass('open');
  }

  function toggleOpen(i){
    $(i).toggleClass('open');
  }

  function close(i){
    $(i).removeClass('open');
  }

  function opacity(i){
    $(i).toggleClass('opacity');
  }

  function removeOpacity(i){
    $(i).removeClass('opacity');
  }

  function nudge(i){
    $(i).toggleClass('nudge');
  }

  function blur(i){
    $(i).toggleClass('blur');
  }

  function removeBlur(i){
    $(i).removeClass('blur');
  }


  $(window).on('resize', function(){
      var win = $(this); //this = window

      if (win.width() >= 1024) {
        removeOpacity($closer);
        removeBlur($left);
      }
});

  //////////////////////////////////////////
  // Hover states and clicks for menu. Have to be written like this to work with AJX calls later
  // Document .on works with AJAX
  // Hover states
  $(document).on({
    mouseenter: function () {
        nudge('.right-info');
    },
    mouseleave: function () {
        nudge('.right-info');
    }
  }, '.sideways-bar-info', '.sideways-bar-project' );

  //////////////////////////////////////////
  // Hover nudges
  $(document).on({
    mouseenter: function () {
        nudge('.project-wrapper');
    },
    mouseleave: function () {
        nudge('.project-wrapper');
    }
  }, '.sideways-bar-project' );

  //////////////////////////////////////////
  // Click sliders for information
  $('.sideways-bar-info, .info-circle').on('click',  function () {
    toggleOpen($info);
    removeOpacity('.project-loadspot');
      if (parseInt($(window).width()) < 1024) {
        opacity($closer);
        blur($left);
        $('body').toggleClass('stopper');
      }
  });

  ////////////////////////////////////////
  //Click sliders for information + close project
  $(document).on('click', '.info-link', function () {
    removeOpacity('.project-loadspot');
    open($info);
    close($project);
    $('.project-list-item').removeClass('selected');
      // if (parseInt($(window).width()) < 768) {
      //   blur($left);
      // }
  });

  //////////////////////////////////////////
  // Click header to close project
  $(document).on('click', 'header', function () {
    removeOpacity('.project-loadspot');
    close($project);
    $('.project-list-item').removeClass('selected');
    $('video').each(function() {
      $(this).get(0).pause();
    });
  });

  //////////////////////////////////////////
  // Click closer to close things
  $(document).on('click', '.closer, .close-circle', function () {
    removeOpacity('.project-loadspot');
    close($project);
    close($info);
    opacity($closer);
    blur($left);
    $('.project-list-item').removeClass('selected');
    $('body').removeClass('stopper');
    $('video').each(function() {
      $(this).get(0).pause();
    });
  });

  function projectOpener(){
    // Update list item active states
    $('.project-list-item').removeClass('selected');
    // Make title slide out
    $('.sideways-title').addClass('move');
    // Delay images loading for aesthetics
    var loadDelay;
    loadDelay =  window.setTimeout(function () {
      opacity('.project-loadspot');
      // Make title slide in
      $('.sideways-title').addClass('stay');
    }, 750);
      // If slider is not open
    if (!$('.project-wrapper').hasClass('open')){
        // Open the Slider
        open($project);
      } else {
        // Stop default action
        removeOpacity('.project-loadspot');
        }
    if (parseInt($(window).width()) < 1024) {
      opacity($closer);
      blur($left);
    }
  }

  //////////////////////////////////////////
  // Project list open slider, load project
  $('.project-list-item').click(function(e) {
    if ($(this).hasClass('hide-me')){
      // Stop default action
      e.preventDefault();
    } else {
    // Stop default action
    e.preventDefault();
    // Run the function
    projectOpener();
    // update the link
    $(this).toggleClass('selected');
    // Take this links HREf and load it into div
    $('.project-wrapper').load($(this).attr('href'));
    }
  });


  //////////////////////////////////////////
  // Project list open slider, load project
  $('.pop-up-image img').dblclick(function(e) {
    if ($(this).hasClass('hide-me')){
      // Stop default action
      e.preventDefault();
    } else {
    // Stop default action
    e.preventDefault();
    // Run the function
    projectOpener();
    // update the link
    $(this).toggleClass('selected');
    // Take this links HREf and load it into div
    $('.project-wrapper').load($(this).attr('href'));
  }
  });


//////////////////////////////////////////////////////////////////
// Hover for image pop up
// First, create a counter to hold z-index values
var counter = 0;
// Hover function (using .on to work with AJAX calls)
  $(document).on({
    mouseenter: function () {
      if (!$('.project-wrapper').hasClass('open') && !$('.right-info').hasClass('open') ){
        if (parseInt($(window).width()) > 900) {
          // Get hover'd ID
          var title = $(this).attr('id');
          // Increase counter
          counter++;
          // Show image, increase z-index, hide circle
          $('.' + title + ' img').addClass('show-image');
          $('.' + title).css('z-index', counter );
          $('.circle').addClass('hide');
        }
      }
    },
    mouseleave: function () {
      // $(this).find('.pop-up-image img').hide();
    }
  }, '.project-list-item' );


  ////////////////////////////////////////////////////////////////////
  // Hover function to increase z-index of pop up images
    $(document).on({
      mouseenter: function () {
          counter++;
          $(this).css('z-index', counter );
      }
    }, '.pop-up-image' );


  ////////////////////////////////////////////////////////////////////
  // Random position of pop up images
  $('.pop-up-image img').each(function(i, el){
    var divWidth = $('.selected-work-images').width();
    var divHeight = $('.selected-work-images').height();
    var randPosX = Math.floor((Math.random() * (divWidth * 0.5)));
    var randPosY  = Math.floor((Math.random() * (divHeight * 0.75)));
    $(el).css({left: randPosX, top: randPosY});
  });


  ////////////////////////////////////////////////////////////////////
  // Draggable pop up images
  $('.pop-up-image img').draggable({ containment: ".selected-work-images", scroll: false, cursor: "move" });


  //////////////////////////////////////////
  // Click clear-cirle for to remove pop up images
  $(document).on('click', '.clear-circle', function () {
    $('.pop-up-image img').removeClass('show-image');
    $('.circle').removeClass('hide');
  });


  //////////////////////////////////////////
  // Tooltip hover
  var tooltips = document.querySelectorAll('.tooltip span');
  // var imgTooltips = document.querySelectorAll('.pop-up-image span');

  window.onmousemove = function (e) {
      var x = (e.clientX - 60) + 'px',
          y = (e.clientY - 30) + 'px';
      for (var i = 0; i < tooltips.length; i++) {
          tooltips[i].style.top = y;
          tooltips[i].style.left = x;
      }
  };

  $(document).ajaxComplete(function () {

    $(".video-container").each(function () {
      var video = $(this).find("video");
      var plainVideo = video.get(0);/*DOM video object, unwrapped from jQuery*/
      var playBtn = $(this).find("button");
      // var fullScreen = $(this).find("span");
      var controls = $(this).find(".video-controls");

      playBtn.click(function () {
        if (plainVideo.paused == true) {
          video.get(0).play();
          $(playBtn).children('.play').hide();
          $(playBtn).children('.pause').show();
          $(controls).toggleClass('hide-controls');
        } else{
          video.get(0).pause();
          $(playBtn).children('.play').show();
          $(playBtn).children('.pause').hide();
          $(controls).removeClass('hide-controls');
        }
      });

      video.on('ended',function(){
        $(playBtn).children('.play').show();
        $(playBtn).children('.pause').hide();
        $(controls).removeClass('hide-controls');
       });

      // fullScreen.click(function () {
      //   if (plainVideo.requestFullscreen) {
      //     plainVideo.requestFullscreen();
      //   } else if (plainVideo.mozRequestFullScreen) {
      //     plainVideo.mozRequestFullScreen(); // Firefox
      //   } else if (plainVideo.webkitRequestFullscreen) {
      //     plainVideo.webkitRequestFullscreen(); // Chrome and Safari
      //   }
      // });
    });

  });


});
