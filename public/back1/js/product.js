$(function () {
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var htmlStr = template("productTpl", info);
        $("tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.Page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  $("#addBtn").click(function () {
    $('#addModal').modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
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

  $('#form').bootstrapValidator({
    // 配置排序项, 默认会对隐藏域进行排除, 我们需要对隐藏域进行校验
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },

      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },

      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },

      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存数量"
          },
          // 正则校验, 非零开头的数字
          // \d =>  数字 0-9
          // * 表示出现 0 个 或 多个
          // ? 表示出现 0 个 或 1个
          // + 表示出现 1 个 或 多个
          // {m,n} 从 m 个 到 n 个
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非零开头的数字'
          }
        }
      },

      size: {
        validators: {
          notEmpty: {
            message: "请输入尺码"
          },
          // 校验需求: 必须是 xx-xx 的格式,  xx两位数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式,  xx两位数字'
          }
        }
      },

      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },

      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },

      // 专门用于标记文件上传是否满 3张 的
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }

    }
  });


  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    // 获取id设置给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val();
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);

      var picObj = data.result;
      var picUrl = picObj.picAddr;

      picArr.unshift(picObj);
      $('#imgBox').prepend('<img src="' + picUrl + '" style="height: 100px" alt="">');
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if(picArr.length === 3){
        $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID" );
      }
    }
  });
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var params = $('#form').serialize();
    // console.log(picArr);
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    // console.log(params);
    
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      dataType:"json",
      success: function(info){
        console.log(info);
        
        if(info.success){
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data("bootstrapValidator").resetForm(true);

          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  })
});