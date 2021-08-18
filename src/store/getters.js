const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name, 
  dialogVisible: state => state.end.dialogVisible,
  dialogForUpdateVisible: state => state.end.dialogForUpdateVisible,
  dialogForLogVisible: state => state.end.dialogForLogVisible
}
export default getters
