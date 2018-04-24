import Vue from "vue";
import storage from "./storage";

/**
 * 接口前缀
 * */
var contentPath =
    "http://101.201.222.8:8081" || "http://aci-api.chaozhiedu.com";

var conmonAjax = function(url, param, type) {
    param = param || {};
    var defer = $.Deferred();
    let headers = {};
    $.ajax({
        url: contentPath + url,
        type: type || "post",
        data: param,
        headers,
        dataType: "json",
        beforeSend: function(xhr) {
            if (url != "/api/login" && url != "/api/phone-captcha") {
                var userToken = storage.get("userToken").token;
                // console.log(userToken);
                // console.log("!=====");
                if (userToken) {
                    xhr.setRequestHeader("Token", userToken);
                }
            }
        },
        success: function(data) {
            //console.log(data);

            if (data.code >= 600 && data.code < 700) {
                storage.remove("userToken");
                window.location.href = "./index.html#/login";
                return;
            }

            defer.resolve(data);
            // if (data.code === 200) {
            //     defer.resolve(data);
            // } else {
            //     //alert(data.msg);
            //     //Vue.$message.error(data.msg, 2);
            //     // Vue.$modal.error({
            //     //     title: '接口错误提示',
            //     //     content: '出错内容：' + data.msg
            //     // });
            //     defer.reject(data);
            // }
        }
    });
    return defer.promise();
};

// let conmonAjax = function (url, param, type) {
//     //let headers = {};
//     //var userToken = $.cookie("userToken");
//     return fetch();
// }

export default {
    /**
     * 取得登陆验证码
     * URL (/api/phone-captcha) METHOD POST
     * @param phone
     * */
    getPhoneCaptcha: function(param) {
        return conmonAjax("/api/phone-captcha", param);
    },

    /**
     * 登陆
     * URL (/api/login) METHOD POST
     * @param phone
     * @param captcha 手机验证码 在测试环境中 先调用 phone-captcha 可以使用 1111 做为验证码
     * */
    doLogin: function(param) {
        return conmonAjax("/api/login", param);
    },

    /**
     * 用户基本信息
     * URL (/api/user) METHOD get
     * 无需参数，直接获取 ，注意要带上token
     * */
    getUserInfo: function(param) {
        return conmonAjax("/api/user", param || {}, "get");
    },

    /**
     * 保存用户基本资料
     * URL (/api/user) METHOD POST
     * 接收参数如下：
     * cn_name en_name sex birthday college edu_num idcard
     * email contacts_phone addr period idcard_front idcard_reverse edu degree entry_form avatar
     * */
    addUserInfo: function(param) {
        return conmonAjax("/api/user", param);
    },

    /**
     * 提交用户基本资料
     * URL (/api/user) METHOD POST
     * 接收参数如下：
     * cn_name en_name sex birthday college edu_num idcard
     * email contacts_phone addr period idcard_front idcard_reverse edu degree entry_form avatar
     * */
    submitUserInfo: function(param) {
        return conmonAjax("/api/user/submit", param);
    },

    /**
     * 取得已购课程
     * URL (/api/course/list) METHOD post
     * 无需参数，直接获取 ，注意要带上token
     * */
    getCourseList: function(param) {
        return conmonAjax("/api/course/list", param);
    },

    /**
     * 课程资料
     * URL (/api/course/information) METHOD post
     * 接收参数
     * pid 产品ID 必传 p 分页 必传 offset 每页显示的数量 默认为10
     * */
    getCourseInfo: function(param) {
        return conmonAjax("/api/course/information", param);
    },

    /**
     * 取得课程计划
     * URL (/api/course/plan) METHOD post
     * 接收参数
     * pid 产品ID 必传 p 分页 必传 offset 每页显示的数量 默认为10
     * */
    getCoursePlan: function(param) {
        return conmonAjax("/api/course/plan", param);
    },

    /**
     * 资源上传
     * URL (/api/file/upload) METHOD post
     * 接收参数
     * 上传名称为 file
     * */
    fileUpload: function(param) {
        return conmonAjax("/api/file/upload", param);
    },

    /**
     * 产品列表
     * URL (/api/product/list) METHOD POST
     * 接收参数
     * p 分页 必传 offset 每页显示的数量 默认为10
     * */
    getProductList: function(param) {
        return conmonAjax("/api/product/list", param);
    },

    /**
     * 获取订单状态
     * URL (/api/get-pay-info) METHOD POST
     * 接收参数
     * product_id 产品列表的ID字段
     * */
    getPayInfo: function(param) {
        return conmonAjax("/api/get-pay-info", param);
    },

    /**
     * 刷新订单金额
     * URL (/api/pay/refresh-price/{TOKEN} ) METHOD GET
     * 接收参数
     * token 直接拼在url后
     * 示例: /api/pay/refresh-price/1802055004745729
     * */
    refreshPrice: function(param) {
        return conmonAjax(
            "/api/pay/refresh-price/" + param.token,
            param,
            "get"
        );
    },

    /**
     * 订单下单
     * URL (/api/pay) METHOD POST
     * 接收参数
     * product_id 产品列表的ID字段 channel 支付渠道 wechat,alipay
     * */
    pay: function(param) {
        return conmonAjax("/api/pay", param);
    },

    /**
     * 取得课程分类
     * URL (/api/course/cateogry) METHOD GET
     * 接收参数 无
     * */
    getCategory: function(param) {
        return conmonAjax("/api/course/category", param, "get");
    },

    /**
     * 取得课程分类
     * URL (/api/course/cateogry) METHOD GET
     * 接收参数 无
     * */
    getPayResult: function(param) {
        return conmonAjax(`/api/pay/result/${param.token}`, param, "get");
    },
    /**
     * 支付报名费
     * URL (/api/user/paysingup) METHOD GET
     * 接收参数 无
     * */
    paySingup: function(param) {
        return conmonAjax(`/api/user/paysingup`, param, "get");
    }
};
