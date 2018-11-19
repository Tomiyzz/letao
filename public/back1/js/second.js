$(function () {
  var currentPage = 1;
  var pageSize = 5;
  // console.log(1212);

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",

      success: function (info) {
        // console.log(info);
        var htmlStr = template("secondTpl", info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (event, originalEvent, type, page) {

            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 点击添加按钮,显示模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });


  $('.dropdown-menu').on("click", "a", function () {
    // 获取 a 的文本
    var txt = $(this).text();
    // 将文本设置给 按钮
    $('#dropdownText').text(txt);

    // 获取 id, 设置给准备好的 input
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);

    // $('[name="categoryId"]').trigger("input");

    // 手动将 name="categoryId" 的校验状态, 改成 VALID 校验成功
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
  });

  // 进行文本上传初始化
  $('#fileupload').fileupload({
    dataType: "json",
    done: function (e, data) {
      // console.log(data);

      var result = data.result;
      var picUrl = result.picAddr;
      $('#imgBox img').attr("src", picUrl);
      $('[name = "brandLogo"]').val(picUrl);

      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  $('#form').bootstrapValidator({

    // 配置排序项, 默认会对隐藏域进行排除, 我们需要对隐藏域进行校验
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },

      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },

      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  })

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请选择一级分类');
          $('#imgBox img').attr("src", "./images/none.png");
        }
      }
    })
});


})