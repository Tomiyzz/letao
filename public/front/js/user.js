$(function(){
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    dataType:"json",
    success:function (info){
      console.log(info);
      if(info.error === 400){
        location.href = "login.html";
        return;
      }
      var htmlStr = template("infoTpl",info);
      $("#userInfo").html(htmlStr);
    }
  })
  $('#logout').click(function(){
    $.ajax({
      type:"get",
      url:"/user/logout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
})