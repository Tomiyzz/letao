
$(function(){
  var key = getSearch("key");
  // console.log(key);
  
  $('.search_input').val(key);

  // 渲染页面
  render();
  $('.search_btn').click(function(){
    // 渲染页面
    render();
  });
  $('.lt_sort a[data-type]').click(function() {
    if($(this).hasClass("current")){
      $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
      
    }
    else{
      $(this).addClass("current").siblings().removeClass("current");
    }
    // 重新渲染页面
    render();
  })
  // console.log(1111);
  
  function render(){
    $('.lt_product').html('<div class="loading"></div>');
    var params = {};
    params.proName = $('.search_input').val();
    params.page = 1;
    params.pageSize = 100;
    var $current = $('.lt_sort a.current');
    if($current.length === 1){
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-down")?2:1;
      params[sortName] = sortValue;
    }
    // console.log(222);
    
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:params,
        dataType:"json",
        success:function(info){
          console.log(info);
          
          var htmlStr = template("productTpl",info);
          $('.lt_product').html(htmlStr);
        }
      });
    }, 500);
  }
})