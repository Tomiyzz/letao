// 进度条
// console.log(1111);

$( document ).ajaxStart(function() {
  NProgress.start();
});

$( document ).ajaxStop(function() {
 setTimeout(function(){
  NProgress.done();
 },500)
});

// console.log(111);
// 入口函数

$(function(){
  // 导航栏点击切换
  $('.lt_aside .category').click(function(){
    $(this).next().stop().slideToggle();
  });
  // 左侧的菜单列表切换功能
  $(".lt_topbar .icon_left").click(function(){
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
  })

  // 退出功能
  $('.lt_topbar .icon_right').click(function(){
    $('#logoutModal').modal("show");
  });

  $('#logoutBtn').click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        
        if(info.success){
          location.href = "login.html";
        }
      }
    });
  })
})
