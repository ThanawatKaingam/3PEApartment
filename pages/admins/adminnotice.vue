<template>
  <v-container fluid>
    <h1>โพสท์ประกาศ</h1>
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
    <v-col sm="6">
      <v-text-field
        v-model="name"
        label="เรื่อง"
        outlined
        hint="ชื่อเรื่องที่จะประกาศ"
      />
    </v-col>
    <v-textarea
      v-model="desc"
      label="Description"
      value=""
      hint="คำอธิบาย"
      outlined
    />
    <v-btn @click="save()">
      save
      <p>{{ error }}</p>
    </v-btn>
    <v-row> <h1>ประกาศทั้งหมด</h1> </v-row>
    <v-data-table
      :headers="headers"
      :items="allnotice"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-btn
          class="mx-2"
          fab
          dark
          color="red"
          @click="dele(item)"
        >
          delete
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'admin',
  data: () => ({
    user: [],
    error: null,
    name: null,
    date: null,
    desc: null,
    allnotice: [],
    headers: [
      {
        text: 'วันที่',
        align: 'start',
        sortable: false,
        value: 'date'
      },
      { text: 'ห้อง', value: 'title' },
      { text: 'เรื่อง', value: 'name' },
      { text: 'คำอธิบาย', value: 'desc' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' }
    ],
    delitem: []
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
        name: this.name,
        desc: this.desc
      }
      db.collection('notice').doc(`notice_${this.date}_${this.user.title}_${this.name}`)
        .set(data)
        .then(() => {
          console.log('Document successfully written! ')
          this.$router.replace('/admin')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
          this.error = error
        })
    },
    getdata () {
      db.collection('notice')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allnotice = data
        })
    },
    dele (item) {
      this.delitem = item
      db.collection('notice').doc(`notice_${this.delitem.date}_${this.delitem.title}_${this.delitem.name}`).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  }
}
</script>
