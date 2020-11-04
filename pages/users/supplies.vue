<template>
  <v-container>
    <h1>รับแจ้งพัสดุ</h1>
    <h2>ห้อง {{ user.title }}</h2>
    <v-data-table
      :headers="headers"
      :items="mail"
      :items-per-page="5"
      class="elevation-1"
    />
  </v-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    data: [],
    headers: [
      {
        text: 'วันที่',
        align: 'start',
        sortable: true,
        value: 'date'
      },
      { text: 'ห้อง', value: 'title' },
      { text: 'จำนวน', value: 'qty' },
      { text: 'คำอธิบาย', value: 'desc' }
    ],
    allmail: null,
    user: [],
    error: null,
    mail: []
  }),
  mounted () {
    this.user = this.$store.state.currentUser
    this.getdata()
  },
  methods: {
    getdata () {
      db.collection('mail')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allmail = data
          for (const i in this.allmail) {
            if (this.allmail[i].title === this.user.title) {
              this.mail.push(this.allmail[i])
            }
          }
        })
    }
  }
}
</script>
