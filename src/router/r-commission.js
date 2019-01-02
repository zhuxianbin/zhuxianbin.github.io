export default {
  path: 'commissionGM',
  name: 'commissionGM',
  redirect: '/commissionGM/commisSet',
  component: () => import('@/views/commissionGM'),
  meta: { title: '佣金管理', icon: 'yongjin', authority: 'HHR_COMMISSION_MANAGEMENT' },
  children: [
    // 佣金订单
    {
      path: 'commisOrder',
      name: 'commisOrder',
      component: () => import('@/views/commisOrder'),
      meta: { title: '佣金结算单', icon: 'liebiao', authority: 'HHR_COMMISSION_SETTLEMENT_ORDER' }
    },
    // 结算对象
    {
      path: 'commisSettlement',
      name: 'commisSettlement',
      component: () => import('@/views/commisSettlement'),
      meta: { title: '结算对象', icon: 'liebiao', authority: 'HHR_SETTLEMENT_OBJECT'}
    }
  ]
}
