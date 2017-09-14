$('.navbar-nav li').on('click',function(evt){
  $('.active').toggleClass('active');
  $(evt.target).parent().toggleClass('active');
});
