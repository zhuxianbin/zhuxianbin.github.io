import request from "@/utils/request";

/**
 * 取得课程分类
 * URL (/api/course/cateogry) METHOD GET
 * 接收参数 无
 * */
export function getCategory(param) {
    return request.get("/api/category/list", param);
}

/**
 * 产品列表
 * URL (/api/product/list) METHOD POST
 * 接收参数
 * p 分页 必传 offset 每页显示的数量 默认为10
 * */
export function getProductList(param) {
    return request.post("/api/product/list", param);
}

/**
 * 产品列表
 * URL (/api/product/info) METHOD POST
 * 接收参数
 * p 分页 必传 offset 每页显示的数量 默认为10
 * */
export function getProductInfo(param) {
    return request.post("api/product/info", param);
}

export function getTeacherList(params) {
    return request.post("/api/teacher/list", params);
}

/**
 * 用户基本信息
 * URL (/api/user) METHOD get
 * 无需参数，直接获取 ，注意要带上token
 * */
export function getUserInfo(params) {
    return request.get("/api/user", params);
}
