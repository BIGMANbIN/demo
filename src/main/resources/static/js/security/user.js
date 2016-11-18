var ThisApp = function () {

    var table = null;
    var initTable = function () {
        table = $("#dataTable").DataTable({
            processing: true,
            serverSide: true,
            stateSave: true,
            filter: false,
            ajax:{
                type:'post',
                dataType:'json',
                url:'security/user/list'
            },
            language: Amaz.dataTableLang,
            dom: "<'row'<'col-md-10 col-sm-12 text-left'f><'col-md-2 col-sm-12'l>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            lengthMenu: [[15, 30, 60, -1], [15, 30, 60, "All"]],
            pageLength: 30,
            pagingType: "bootstrap_full_number",
            order: [[0, "desc"]],
            column:[{
                data:'id',
                visible:false
            },{
                data:'userName'
            },{
                data:'password'
            },{
                data:'email'
            },{
                data:'tel'
            },{
                data:'nickName'
            },{
                data:function(obj) {
                    var html = '<a href="/security/user/' + obj.id + '/edit" class="btn btn-xs blue"><i class="fa fa-edit"></i></a> ' +
                        '<a href="javascript:;" class="btn btn-xs red fun-del" data-id="' + obj.id + '"><i class="fa fa-remove"></i></a>';

                    return html;
                },
                sortable: false,
                width: 60,
                class: "text-center"
            }]
        });
        $('#dataTable_length select').select2();
        $('#dataTable_filter').html($('.portlet-body .hide')).html();
        $('.portlet-body .hide').html("");
        $("#dataTable_filter .fun-search").on('click', function () {
            table.draw();
        });
    },
    addData = function(){
        $("#add").click(function(){
            window.location.href="security/user/new";
        })
    };

    delData = function(){
        $('body').on('click','.fun-del', function (){
            var id = $(this).attr('data-id');
            bootbox.confirm("确定要删除吗?",function(result) {
                if (result) {
                    Amaz.xhrPost('/security/user/' + id, {_method: 'delete'}, function () {
                        table.draw();
                    });
                }
            });
        })
    };

    validForm = function(){
        var form = $('#dataForm');
        if(form.length == 0) {
            return;
        }

        form.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {

            },
            errorPlacement: function (error, element) {
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) {
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) {
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },

            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },

            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function (form) {
                $(form).find(".form-actions button").hide();
                $.ajax({
                    url: form.action,
                    type: "POST",
                    data: $(form).serialize(),
                    error: function () {
                        bootbox.alert("Connection error");
                        $(form).find(".form-actions button").show();
                    },
                    success: function (data) {
                        if (data == "create") {
                            bootbox.confirm("提交成功,继续新增吗？", function (result) {
                                if (result) {
                                    Amaz.setRedirect("/security/user/new");
                                } else {
                                    Amaz.setRedirect("/security/user");
                                }
                            });
                        } else if (data == "update") {
                            bootbox.alert("修改成功");
                        } else {
                            bootbox.alert(data);
                        }
                        $(form).find(".form-actions button").show();
                    }
                });
            }
        });
        $(".form-actions button.default").click(function () {
            history.go(-1);
        });

    };
    return {
        init:function(){
            addData();
            delData();
            validForm();
        }
    }

}();

jQuery(document).ready(function(){
    ThisApp.init();
});