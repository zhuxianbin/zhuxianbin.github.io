const company = {
  state: {
    arr: [],
    comp: [],
    areasInfo: []
  },
  mutations: {
    ADD_company_arr: (state, log) => {
      state.arr = optCompany(log);
    },
    ADD_company_comp: (state, log) => {
      state.comp = log;
    },
    ADD_areas_info: (state, log) => {
      state.areasInfo = log;
    }
  },
  actions: {
    addCompanys({ commit }, log) {
      commit('ADD_company_arr', log);
    },
    addCompanyComp({ commit }, log) {
      commit('ADD_company_comp', log);
    },
    addAreasInfo({ commit }, log) {
      commit('ADD_areas_info', log);
    }
  }
}
// 处理公司的办法
function optCompany(obj) {
  const options = [];
  const companys = obj.list;
  const companySn = obj.companySn; // obj.companySn
  if (companys) {
    const parent = {label: '', value: '', children: []};
    const ar0 = companys.filter(ele => {
      return ele.parentId == -1;
    })
    parent.label = '小灵狗总公司';
    parent.value = ar0[0].sn;
    parent.companyId = ar0[0].id;
    const com = recursionCompany(companys, 1, parent, companySn);
    options.push(com);
  }
  return options
}
 // 递归函数处理公司
 function recursionCompany(arr, pId, obj, sn) {
  // const parent = {label: '', value: '', children: []};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentId == pId) {
      const t = !compareLength(sn, arr[i].sn);
      const o = {
        value: arr[i].sn,
        label: arr[i].companyName,
        companyId: arr[i].id,
        children: [],
        disabled: t
      }
      if (o.value) {
        obj.children.push(o);
      }
      recursionCompany(arr, arr[i].id, o, sn);
    }
  }
  return obj;
}
// 比较字符串的长短
function compareLength(a, b) {
  let t = false;
  if (a.length >= b.length) {
   t = a.includes(b);
  } else {
   t = b.includes(a);
  }
  return t;
}

export default company
