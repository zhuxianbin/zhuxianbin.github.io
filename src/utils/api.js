import Vue from 'vue'

/**
 * 接口前缀
 * */
var contentPath = "http://60.205.115.216/aci.api/public";

var conmonAjax = function (url, param, type) {
    param = param || {};
    var defer = $.Deferred();
    $.ajax({
        url: contentPath + url,
        type: type || "post",
        data: param,
        dataType: "json",
        beforeSend: function (xhr) {
            if(url != "/api/login" && url != "/api/phone-captcha"){
                var userToken = $.cookie("userToken");
                console.log(userToken);
                console.log("!=====");
                if(userToken){
                    xhr.setRequestHeader('Token', userToken);
                }
            }
        },
        success: function (data) {
            if(data.code === 200){
                defer.resolve(data);
            }else{
                //alert(data.msg);
                //Vue.$message.error(data.msg, 2);
                Vue.$modal.error({
                    title: '接口错误提示',
                    content: '出错内容：' + data.msg
                });
                defer.reject();
            }
        }
    });
    return defer.promise();
};

export default {

    /**
     * 取得登陆验证码
     * URL (/api/phone-captcha) METHOD POST
     * @param phone
     * */
    getPhoneCaptcha: function (param) {
        return conmonAjax("/api/phone-captcha", param);
    },

    /**
     * 登陆
     * URL (/api/login) METHOD POST
     * @param phone
     * @param captcha 手机验证码 在测试环境中 先调用 phone-captcha 可以使用 1111 做为验证码
     * */
    doLogin: function (param) {
        return conmonAjax("/api/login", param);

    },

    /**
     * 用户基本信息
     * URL (/api/user) METHOD get
     * 无需参数，直接获取 ，注意要带上token
     * */
    getUserInfo: function (param) {
        return conmonAjax("/api/user", param, "get");

    },

    /**
     * 增写用户基本资料
     * URL (/api/user) METHOD POST
     * 接收参数如下：
     * cn_name en_name sex birthday college edu_num idcard
     * email contacts_phone addr period idcard_front idcard_reverse edu degree entry_form avatar
     * */
    addUserInfo: function (param) {
        return conmonAjax("/api/user", param);

    },

    /**
     * 取得已购课程
     * URL (/api/course/list) METHOD post
     * 无需参数，直接获取 ，注意要带上token
     * */
    getCourseList: function (param) {
        return conmonAjax("/api/course/list", param);
    },

    /**
     * 课程资料
     * URL (/api/course/information) METHOD post
     * 接收参数
     * pid 产品ID 必传 p 分页 必传 offset 每页显示的数量 默认为10
     * */
    getCourseInfo: function (param) {
        return conmonAjax("/api/course/information", param);
    },

    /**
     * 取得课程计划
     * URL (/api/course/plan) METHOD post
     * 接收参数
     * pid 产品ID 必传 p 分页 必传 offset 每页显示的数量 默认为10
     * */
    getCoursePlan: function (param) {
        return conmonAjax("/api/course/plan", param);
    },

    /**
     * 资源上传
     * URL (/api/file/upload) METHOD post
     * 接收参数
     * 上传名称为 file
     * */
    fileUpload: function (param) {
        return conmonAjax("/api/file/upload", param);
    },

    /**
     * 产品列表
     * URL (/api/product/list) METHOD POST
     * 接收参数
     * p 分页 必传 offset 每页显示的数量 默认为10
     * */
    getProductList: function (param) {
        return conmonAjax("/api/product/list", param);
    },

}
