$(function(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      // console.log(info);
      var htmlStr = template("left_tpl",info);
      $('.lt_category_left ul').html(htmlStr);
      renderById(info.rows[0].id);
    }
  });
  $('.lt_category_left').on('click','a',function(){
    $(this).addClass('current').parent().siblings().find("a").removeClass("current");
    // 获取一级分类
    var id = $(this).data("id");
    renderById(id);
  })
  // 根据一级分类的id渲染二级分类
  function renderById(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("right_tpl",info);
        $('.lt_category_right').html(htmlStr);
      }
    })
  }

})