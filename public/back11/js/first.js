$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render();
  // console.log(1111);

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var htmlStr = template("firstTpl", info);
        $('tbody').html(htmlStr);
        // 分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),

          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  };

  $('#addBtn').click(function () {
    $('#addModal').modal("show");
  });
  console.log(111);

  // 表单校验功能
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },


    // 字段列表
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    console.log(111111);
    

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#addModal').modal("hide");
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  });


})