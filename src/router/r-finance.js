export default {
  path: 'financeGM',
  name: 'financeGM',
  redirect: '/financeGM/commisSet',
  alwaysShow: true,
  component: () => import('@/views/financeGM'),
  meta: { title: '财务管理', icon: 'caiwutouzi', authority: 'HHR_FINANCIAL_MANAGEMENT' },
  children: [
    // 佣金列表
    {
      path: 'commisSet',
      name: 'commisSet',
      component: () => import('@/views/commisOrder/second.vue'),
      meta: { title: '佣金审核', icon: 'liebiao', authority: 'HHR_COMMISSION_AUDIT' }
    }
  ]
}
