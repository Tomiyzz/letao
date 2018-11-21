$(function () {
  // 一进来就要渲染页面
  render();
  // 封装本地存储,返回数组
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || "[]";
    // 将字符串转换成数组
    var arr = JSON.parse(jsonStr);
    return arr;
  }

  function render() {
    var arr = getHistory();
    var htmlStr = template("search_tpl", {
      list: arr
    });
    $(".lt_history").html(htmlStr);
    console.log(htmlStr);
    
  }
  $(".lt_history").on("click", ".btn_empty", function () {
    mui.confirm("你确定要清空历史记录嘛?", "文星提示", ["取消", "确认"], function (e) {

      // e.index 表示点击的按钮的下标 (索引)
      if (e.index === 1) {
        // 移除本地历史
        localStorage.removeItem("search_list");

        // 重新渲染
        render();

      }
    })
  });


  $(".search_btn").click(function () {
    var key = $(".search_input").val().trim();
    if (key === "") {
      mui.toast("请输入搜索关键字")
      return;
    }
    // 获取数组
    var arr = getHistory();
    var index = arr.indexOf(key);
    if (index != -1) {
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list", JSON.stringify(arr));
    render();
    $(".search_input").val("");
    location.href = "searchList.html?key=" + key;


  })
  $(".lt_history").on("click", ".btn_delete", function () {
    var index = $(this).data("index");
    var arr = getHistory();
    arr.splice(index, 1);
    localStorage.setItem("search_list", JSON.stringify(arr));
    render();
  })
});