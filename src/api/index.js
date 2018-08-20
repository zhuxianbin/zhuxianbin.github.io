import request from "@/utils/request";

/**
 * 取得课程分类
 * URL (/api/course/cateogry) METHOD GET
 * 接收参数 无
 * */
export function getCategory(param) {
    return request.get("/api/course/category", param);
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
