const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.username,
  group: state => state.user.group,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  errorLogs: state => state.errorLog.logs,
  company: state => state.company,
  partner: state => state.partner,
  maintenance: state => state.maintenance
}
export default getters
