const partner = {
  state: {
    details: {},
    permission: {}
  },
  mutations: {
    change_partner_details: (state, log) => {
      state.details = log;
    },
    change_partner_permission: (state, log) => {
      state.permission = log;
    }
  },
  actions: {
    changePartnerDetails({ commit }, log) {
      commit('change_partner_details', log);
    },
    changePartnerPermission({ commit }, log) {
      commit('change_partner_permission', log);
    }
  }
}

export default partner
