<template>
  <div text-center>
    <v-container>
      <h1>แจ้งชำรุด</h1>
      <v-col sm="6">
        <v-text-field
          :value="date"
          label="วันที่"
          outlined
          readonly
          hint="Read Only"
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          :value="user.title"
          label="ห้อง"
          outlined
          readonly
          hint="Read Only"
        />
      </v-col>
      <v-textarea
        v-model="desc"
        label="คำธิบาย"
        value=""
        hint="อะไรเสียบ้าง เสียยังไง เสียเพราะอะไร ถ้าแจ้งซ้ำในวันเดียวกันกรุณาแจ้งรวมกับอันเก่าด้วย"
        outlined
      />
      <v-btn @click="save()">
        save
        <p>{{ error }}</p>
      </v-btn>
      <v-row> <h1>การแจ้งชำรุด</h1> </v-row>
      <v-data-table
        :headers="headers"
        :items="fix"
        :items-per-page="5"
        class="elevation-1"
      />
    </v-container>
  </div>
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
        sortable: false,
        value: 'date'
      },
      { text: 'ห้อง', value: 'title' },
      { text: 'คำอธิบาย', value: 'desc' }
    ],

    date: '',
    desc: null,
    error: null,
    allfix: [],
    fix: [],
    user: []
  }),
  mounted () {
    this.user = this.$store.state.currentUser
    this.getdata()
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    today = dd + '-' + mm + '-' + yyyy
    this.date = today
  },
  methods: {
    save () {
      const data = {
        date: this.date,
        title: this.user.title,
        desc: this.desc
      }
      db.collection('fix').doc(`fix_${this.date}_${this.user.title}`)
        .set(data)
        .then(() => {
          console.log('Document successfully written! ')
          this.$router.replace('/home')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
          this.error = error
        })
    },
    getdata () {
      db.collection('fix')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allfix = data
          for (const i in this.allfix) {
            if (this.allfix[i].title === this.user.title) {
              this.fix.push(this.allfix[i])
            }
          }
        })
    }

  }
}

</script>
