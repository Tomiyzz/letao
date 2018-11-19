$(function () {

  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;

  // 一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        // 生成 htmlStr, 将来进行渲染
        // 参数1: 模板id, 参数2: 数据对象
        // 在模板中, 可以直接访问传进去对象中的所有属性
        var htmlStr = template("tmp", info);

        $('tbody').html(htmlStr);


        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  // 给启动禁止按钮注册点击事件
  // 需要用事件委托
  $('.lt_content tbody').on("click",".btn",function(){
    // 显示模态框
    $('#userModal').modal("show");
    // 获取用户的Id
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1 ;
    console.log(isDelete);
    
  });

    $('#confirmBtn').click(function(){
      $.ajax({
        type:"post",
        url: "/user/updateUser",
        data:{
          id:currentId,
          isDelete:isDelete
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.success){
            $('#userModal').modal("hide");
            render();
          }
        }
      })
    })

})