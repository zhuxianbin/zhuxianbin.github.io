export default {
  path: 'oamm',
  name: 'oamm',
  redirect: '/oamm/index',
  alwaysShow: true,
  component: () => import('@/views/oamm/layout'),
  meta: {
    title: '运维管理',
    icon: 'caiwutouzi',
    authority: 'HHR_FINANCIAL_MANAGEMENT'
  },
  children: [
    // 佣金列表
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/oamm'),
      meta: {
        title: '收费管理',
        icon: 'liebiao',
        authority: 'HHR_COMMISSION_AUDIT'
      }
    },
    {
      path: 'projects',
      name: 'projects',
      component: () => import('@/views/oamm/projects'),
      meta: {
        title: '收费项目',
        icon: 'liebiao',
        authority: 'HHR_COMMISSION_AUDIT'
      }
    }
  ]
}
