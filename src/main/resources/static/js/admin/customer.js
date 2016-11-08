var ThisApp = function () {
    var table = null;
    var initTable = function () {
            table = $('#dataTable').DataTable({
                processing: true,
                serverSide: true,
                filter: true,
                stateSave: true,
                ajax: {
                    dataType: "json",
                    url: "/admin/customer/list",
                    type: "post",
                    date: {},
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(header, token);
                    }
                },
                lengthMenu: [[15, 30, 60, -1], [15, 30, 60, "All"]],
                pageLength: 30,
                pagingType: "bootstrap_full_number",
                order: [[0, "desc"]],
                language: Amaz.dataTableLang,
                columns: [{
                    data: id,
                    data: "id",
                    visible: false
                }, {
                    data: "nickName"
                }, {
                    data: "userName"
                }, {
                    data: "remark"
                }, {
                    data: "status",
                    render: function (data, type, obj) {
                        var html = "";
                        if (data) {
                            html = '<button type="button" class="btn btn-xs green btn-circle fun-status" value="1" data-id="' + obj.id + '"><i class="fa fa-unlock"></i></button>';
                        } else {
                            html = '<button type="button" class="btn btn-xs red btn-circle fun-status" value="0" data-id="' + obj.id + '"><i class="fa fa-lock"></i></button>';

                        }
                        return html;
                    },
                    class: "text-center",
                    width: 80
                }, {
                    data: function (obj) {
                        var html = '<a href="/admin/customer/' + obj.id + '/edit" class="btn btn-xs blue"><i class="fa fa-edit"></i></a> ' +
                            '<a href="javascript:;" class="btn btn-xs red fun-del" data-id="' + obj.id + '"><i class="fa fa-remove"></i></a>';

                        return html;
                    },
                    sortable: false,
                    width: 60,
                    class: "text-center"
                }]
            });
            $('#dataTable_length select').select2();
            $('#dataTable_filter').html($('.portlet-body .hide').html());
            $('.portlet-body .hide').html("");
            $("#dataTable_filter .fun-search").on('click', function () {
                table.draw();
            });
        },
        addData = function () {
            $("#add").click(function () {
                window.location.href = '/admin/customer/new';
            });
        },
        delData = function () {
            $('body').on('click', '.fun-del', function () {
                var id = $(this).attr('data-id');
                bootbox.confirm("确定要删除数据?", function (result) {
                    if (result) {
                        Amaz.xhrPost('/admin/customer/' + id, {_method: 'delete'}, function () {
                            table.draw();
                        });
                    }
                });
            });
        },
        statusData = function () {
            $('body').on('click', '.fun-status', function () {
                var id = $(this).attr('data-id');
                bootbox.confirm("确定要改变状态吗?", function (result) {
                    if (result) {
                        Amaz.xhrPost('/admin/customer/' + id + '/status', {_method: 'put'}, function () {
                            table.draw();
                        });
                    }
                })
            });
        },
        validForm = function () {
            var form = $('#dataForm');
            if (form.length == 0) {
                return;
            }
            form.validate({
                errorElement: 'span',
                errorClass: 'help-block help-block-error',
                focusInvalid: false,
                ignore: "",
                rules: {
                    nickName: {
                        required: true
                    },
                    userName: {
                        required: true
                    },
                    password: {
                        required: true
                    }
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
                        error: function (request) {
                            bootbox.alert("Connection error");
                            $(form).find(".form-actions button").show();
                        },
                        success: function (data) {
                            if (data == "create") {
                                bootbox.confirm("提交成功,继续新增吗？", function (result) {
                                    if (result) {
                                        Amaz.setRedirect("/admin/customer/new");
                                    } else {
                                        Amaz.setRedirect("/admin/customer");
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
        };
    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            initTable();
            addData();
            delData();
            validForm();
            statusData();
        }

    };
}();

jquery(document).ready(function () {

    ThisApp.init();
});