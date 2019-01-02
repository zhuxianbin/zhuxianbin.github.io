export default {
  path: "marketingGM",
  name: "marketingGM",
  redirect: '/marketingGM/coupon',
  alwaysShow: true,
  component: () => import('@/views/marketingGM'),
  meta: { title: '营销管理', icon: 'yxgm', authority: 'HHR_PROMOTION_MANAGEMENT' },
  children: [
    // 优惠券管理
    {
      path: 'coupon',
      name: 'coupon',
      component: () => import('@/views/coupon/index'),
      meta: { title: '优惠券管理', icon: 'coupon', authority: 'HHR_COUPONS_MANAGEMENT'}
    },
    // 添加优惠券
    {
      path: 'add-coupon',
      name: 'addCoupon',
      hidden: true,
      component: () => import('@/views/coupon/add'),
      meta: { title: '添加优惠券', icon: '', tag: true }
    },
    // 编辑优惠券
    {
      path: 'modify-coupon',
      name: 'modifyCoupon',
      hidden: true,
      component: () => import('@/views/coupon/edit'),
      meta: { title: '编辑优惠券', icon: '', tag: true}
    },
     // 复制优惠券
     {
      path: 'copy-coupon',
      name: 'copyCoupon',
      hidden: true,
      component: () => import('@/views/coupon/copy'),
      meta: { title: '复制优惠券', icon: '', tag: true}
    }
  ]
}
