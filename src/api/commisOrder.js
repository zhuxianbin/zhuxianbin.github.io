import request from '@/utils/request'

/**
 * 获取佣金结算单的数据
 * /commissionSettlementOrder/queryCommissionSettlementOrderDetail
 * @param {*}
 */
export function getCommissionSettlementOrder(params) {
  return request({
    url: '/commissionSettlementOrder/queryCommissionSettlementOrder',
    method: 'post',
    data: params
  })
}

/**
 * 获取佣金结算单明细
 * @param {*}
 */
export function getCommissionSettlementOrderDetai(params) {
  return request({
    url: '/commissionSettlementOrder/queryCommissionSettlementOrderDetail',
    method: 'post',
    data: params
  })
}

/**
 * 查看结算审核流程
 * @param {*}
 */
export function selectAuditFlowInfo(params) {
  return request({
    url: '/commissionSettlement/selectAuditFlowInfo',
    method: 'post',
    data: params
  })
}

/**
 * 审核提交的功能
 * @param {*}
 */
export function submitSettlementOrderAudit(params) {
  return request({
    url: '/commissionSettlement/submitSettlementOrderAudit',
    method: 'post',
    data: params
  })
}

/**
 * 获取结算对象的列表
 * @param {*}
 */
export function selectSettlementObjectList(params) {
  return request({
    url: '/commissionSettlement/selectSettlementObjectList',
    method: 'post',
    data: params
  })
}

/**
 * 查询结算对象的功能
 * @param {*}
 */
export function selectSettlementObjectByName(params) {
  return request({
    url: '/commissionSettlement/selectSettlementObjectByName',
    method: 'post',
    data: params
  })
}

/**
 * 获取关联体验店列表 commissionSettlement/addOrUpdateSettlementObject
 * @param {*}
 */
export function selectExperienceStoreTree(params) {
  return request({
    url: '/commissionSettlement/selectExperienceStoreTree',
    method: 'post',
    data: params
  })
}

/**
 * 新增/编辑结算对象
 * @param {*}
 */
export function addOrUpdateSettlementObject(params) {
  return request({
    url: '/commissionSettlement/addOrUpdateSettlementObject',
    method: 'post',
    data: params
  })
}

/**
 * 获取结算对象详情的数据
 * @param {*}
 */
export function selectSettlementObjectInfo(params) {
  return request({
    url: '/commissionSettlement/selectSettlementObjectInfo',
    method: 'post',
    data: params
  })
}

/**
 * 获取操作结算对象的列表
 * @param {*}
 */
export function selectOperateLogList(params) {
  return request({
    url: '/commissionSettlement/selectOperateLogList',
    method: 'post',
    data: params
  })
}
