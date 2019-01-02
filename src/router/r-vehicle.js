export default {
  path: 'vehicleGM',
  name: 'vehicleGM',
  redirect: '/vehicleGM/tending',
  alwaysShow: true,
  component: () => import('@/views/vehicleGM'),
  meta: {
    title: '资源管理',
    icon: 'v-main',
    authority: 'HHR_RESOURCE_MANAGEMENT'
  },
  children: [
    // 车辆保养
    {
      path: 'tending',
      name: 'tending',
      component: () => import('@/views/vehicleGM/tending'),
      meta: {
        title: '保养监控',
        icon: 'v-tending',
        authority: 'HHR_MAINTAIN_MONITOR'
      }

    },
    // 网点预警
    {
      path: 'network-alert',
      name: 'networkAlert',
      component: () => import('@/views/network-alert'),
      meta: {
        title: '网点预警',
        icon: 'ditu',
        authority: 'HHR_NETWORK_WARNING'
      }
    },
    // 热力图
    {
      path: 'thermal-map',
      name: 'thermalMap',
      component: () => import('@/views/thermal-map'),
      meta: {
        title: '热力图',
        icon: 'relitu',
        authority: 'HHR_NETWORK_WARNING'
      }
    }
  ]
}
