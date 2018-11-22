$(function(){
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/cart/queryCart",
      dataType:"json",
      success:function(info){
        if(info.error){
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        // console.log({list:info});
        var htmlStr = template("cartTpl",{list:info})
        $('.lt_main .mui-scroll').html(htmlStr);
      }
    });
  }
  // console.log(222);
  
  $('lt_main').on("click",".btn_delete",function(){
    var id = $(this).data("id");
    $.ajax({
      type:"get",
      url:"/cart/deleteCart",
      data:{
        id:[id]
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          render();
        }
      }
    })
  })
})