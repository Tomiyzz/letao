
// 进度条
$(document).ajaxStart(function(){
  NProgress.start();
});

// 关闭进度条
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
})

$(function(){
  $('.lt_aside .category').click(function(){
    $(this).next().stop().slideToggle();
  });
  
})
