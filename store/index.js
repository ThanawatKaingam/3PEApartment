export const state = () => ({
  data: [],
  headers: [
    {
      text: 'ชื่อผู้ใช้',
      align: 'start',
      sortable: false,
      value: 'username'
    },
    {
      text: 'รหัสผ่าน',
      align: 'start',
      sortable: false,
      value: 'password'
    }

  ],
  isLogin: false,
  currentUser: null,
  mail: null
})
export const mutations = {
  login (state) {
    state.isLogin = true
  },
  getCurrent (state, data) {
    state.currentUser = data
  },
  getData (state, data) {
    state.data = data
  },
  getMail (state, email) {
    state.mail = email
  }
}
