export default {
      path: 'partnerGM',
      name: 'partnerGM',
      redirect: '/partnerGM/partnerList',
      component: () => import('@/views/partnerGM'),
      meta: { title: '合伙人管理', icon: 'partner', authority: 'HHR_PARTNER_MANAGEMENT' },
      children: [
        // 合伙人列表
        {
          path: 'partnerList',
          name: 'partnerList',
          component: () => import('@/views/partnerList'),
          meta: { title: '合伙人列表', icon: 'myOrder', authority: 'HHR_PARTNER_LIST'}
        },
        // 奖励金设置
        {
          path: 'rewardSet',
          name: 'rewardSet',
          component: () => import('@/views/rewardSet'),
          meta: { title: '奖励金设置', icon: 'award', authority: 'HHR_REWARD_SETTING'}
        },
        // 长短租奖金发放明细
        {
          path: 'cdzRewardDetails',
          name: 'cdzRewardDetails',
          component: () => import('@/views/cdzRewardDetails'),
          meta: { title: '长短租奖励金发放明细', icon: 'aaFF', authority: 'HHR_LONGSHORT_REWARD_DETAIL' }
        },
        // 整租奖金发放明细
        {
          path: 'zzRewardDetails',
          name: 'zzRewardDetails',
          component: () => import('@/views/zzRewardDetails'),
          meta: { title: '整租奖励金发放明细', icon: 'aaFF', authority: 'HHR_WHOLE_REWARD_DETAIL' }
        },
        // // 会员详情
        {
         path: 'partnerDetails',
         name: 'partnerDetails',
         hidden: true,
         component: () => import('@/views/partnerDetails'),
         meta: { title: '会员详情', tag: true}
        },
        // +受邀人列表
        {
          path: 'invitee',
          name: 'invitee',
          component: () => import('@/views/invitee'),
          meta: { title: '受邀人列表', icon: 'share', authority: 'HHR_INVITED_PERSON_LIST' }
         },
         // 分享管理
        {
          path: 'shareSet',
          name: 'shareSet',
          component: () => import('@/views/shareSet'),
          meta: { title: '分享管理', icon: 'shareSet', authority: 'HHR_SHARE_MANAGEMENT'}
         },
         // 分享设置
         {
          path: 'updateShare',
          name: 'updateShare',
          hidden: true,
          component: () => import('@/views/updateShare'),
          meta: { title: '任务管理', icon: 'shareSet'}
         },
         // 合伙人设置
         {
          path: 'marketing',
          name: 'marketing',
          component: () => import('@/views/marketing'),
          meta: { title: '合伙人设置', icon: 'sharegm', authority: 'HHR_PARTNER_SETTING' }
         },
         // 兑换管理
         {
          path: 'exchangeM1',
          name: 'exchangeM1',
          component: () => import('@/views/exchangeM1'),
          meta: { title: '兑换管理', icon: 'duihuan', authority: 'HHR_EXCHANGE_MANAGEMENT' }
         }
      ]
}
