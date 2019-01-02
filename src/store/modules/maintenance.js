const maintenance = {
  state: {
    aresArr: [], // 所属区域
    maintainPeriods: {}, // 保期类型
    carTayes: [], // 车辆类型
    projects: {} // 维护项目
  },
  mutations: {
    ADD_ares_arr: (state, log) => {
      state.aresArr = log
    },
    ADD_maintain_periods: (state, log) => {
      state.maintainPeriods = log
    },
    ADD_car_tayes: (state, log) => {
      state.carTayes = log
    },
    ADD_projects: (state, log) => {
      state.projects = log
    }
  },
  actions: {
    addAresArr({ commit }, log) {
      commit('ADD_ares_arr', log);
    },
    addMaintainPeriods({ commit }, log) {
      commit('ADD_maintain_periods', log);
    },
    addCarTayes({ commit }, log) {
      commit('ADD_car_tayes', log);
    },
    addProjects({ commit }, log) {
      commit('ADD_projects', log);
    }
  }
}

export default maintenance
