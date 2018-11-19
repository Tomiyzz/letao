// 入口函数
$(function () {
  //使用表单校验插件
  $('#form').bootstrapValidator({

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2~6之间'
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码必须是6~12位'
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  // console.log(111);
  
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    // console.log(222);
    
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      
      success: function(info){
        console.log(info);
        
        if( info.success ){
          location.href = "index.html";
        }
        if( info.error === 1000 ){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if( info.error === 1001 ){
          $('#form').data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
        }
      }
    })
  });

  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })
});

