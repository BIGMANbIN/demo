var Amaz = function() {
    return {
        setRedirect : function (url) {
            window.location.href = url;
        },
        xhrPost : function (url,data,funSuccess,funError) {
            $.ajax({
                url : url,
                type : "post",
                data : data,
                success : funSuccess,
                error:funError,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(header, token);
                }
            });
        },
        dataTableLang : {
            "sProcessing" : "处理中...",
            "sLengthMenu" : "_MENU_",
            "sZeroRecords" : "没有匹配结果",
            "sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix" : "",
            "sSearch" : "搜索:",
            "sUrl" : "",
            "sEmptyTable" : "表中数据为空",
            "sLoadingRecords" : "载入中...",
            "sInfoThousands" : ",",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "上页",
                "sNext" : "下页",
                "sLast" : "末页"
            },
            "oAria" : {
                "sSortAscending" : ": 以升序排列此列",
                "sSortDescending" : ": 以降序排列此列"
            }
        },
        defaultDate : function() {
            $('.defaultDate').datetimepicker({
                language : 'zh-CN',
                todayHighlight : 1,
                startView : 2,
                minView : 2,
                autoclose: true,
                isRTL: App.isRTL(),
                format: "yyyy-mm-dd",
                pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
            });
        }
    };
}();

(function($) {
    $.fn.datetimepicker.dates['zh-CN'] = {
        days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
        daysShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
        daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
        months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        today : "今天",
        suffix : [],
        meridiem : [ "上午", "下午" ]
    };
}(jQuery));

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
$.extend( $.validator.messages, {
    required: "这是必填字段",
    remote: "请修正此字段",
    email: "请输入有效的电子邮件地址",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
    minlength: $.validator.format( "最少要输入 {0} 个字符" ),
    rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符串" ),
    range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
    max: $.validator.format( "请输入不大于 {0} 的数值" ),
    min: $.validator.format( "请输入不小于 {0} 的数值" )
} );

// (function($) {
//     $.fn.datetimepicker.dates['zh-CN'] = {
//         days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
//         daysShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
//         daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
//         months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
//         monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
//         today : "今天",
//         suffix : [],
//         meridiem : [ "上午", "下午" ]
//     };
// }(jQuery));


$(function() {
    $("#logout").click(function () {
        Amaz.xhrPost("/security/logout",{},function (e) {
            window.location.href="/security/login";
        });
    });
    document.onkeydown = check;
    document.onkeypress = check;
    function check(e) {
        var ev = e || window.event;
        var obj = ev.target || ev.srcElement;
        var t = obj.type || obj.getAttribute('type');
        if (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") {
            return false;
        }
    }

    var m = $("#MENU:hidden").val();
    if (m != null) {
        var menu = $(".page-sidebar-menu a[href*='m=" + m + "']");
        menu.parents("li").addClass("active");
    }
    $(".color-panel .inline li").click(function() {
        if (!$(this).hasClass("current")) {
            var theme = $(this).attr("data-style");
            $("select[name=theme]").each(function() {
                theme = theme + "," + $(this).val();
            });
            $.post(ctx + "/profile/theme", {
                theme : theme
            });
        }
    });

    $(".numberbox").css("ime-mode", "disabled");
    $(".numberbox").unbind(".numberbox");
    $(".numberbox").on("keypress.numberbox", function(e) {
        if (e.which == 45) {
            if ($(this).attr("precision") == undefined || parseInt($(this).attr("min")) >= 0) {
                return false;
            }
            return true;
        }
        if (e.which == 46) {
            if ($(this).attr("precision") == undefined || parseInt($(this).attr("precision")) == 0) {
                return false;
            }
            return true;
        } else {
            if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                return true;
            } else {
                if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }).on("paste.numberbox", function() {
        if (window.clipboardData) {
            var s = clipboardData.getData("text");
            if (!/\D/.test(s)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }).on("dragenter.numberbox", function() {
        return false;
    }).on("blur.numberbox", function() {
        if ($(this).attr("precision") == undefined) {
            $(this).val($(this).val().replace(/[^\d]/g, ''));
        } else {
            validate_numberbox($(this));
        }
    });
    function validate_numberbox(e) {
        var opt = data(e);
        var v = parseFloat(e.val()).toFixed(opt.precision);
        if (isNaN(v)) {
            e.val("");
            return;
        }
        if (opt.min != null && opt.min != undefined && (opt.min).toString() != "" && v < opt.min) {
            e.val(opt.min.toFixed(opt.precision));
        } else {
            if (opt.max != null && opt.max != undefined && (opt.max).toString() != "" && v > opt.max) {
                e.val(opt.max.toFixed(opt.precision));
            } else {
                e.val(v);
            }
        }
    }
    data = function(e) {
        return {
            min : (e.attr("min") == "0" ? 0 : parseFloat(e.attr("min")) || undefined),
            max : (e.attr("max") == "0" ? 0 : parseFloat(e.attr("max")) || undefined),
            precision : (parseInt(e.attr("precision")) || undefined)
        };
    };
});
if($('.select2').length!=0) {
    $('.select2').select2();
}

$("[maxlength]").maxlength({
    alwaysShow: true,
    limitReachedClass: "label label-danger"
})


function getUrlSearch(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function getUrlHash(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.hash.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

var header = $("meta[name='_csrf_header']").attr("content");
var token = $("meta[name='_csrf']").attr("content");