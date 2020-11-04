<template>
  <v-container>
    <h1>รับแจ้งชำรุด</h1>
    <v-data-table
      :headers="headers"
      :items="allfix"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-btn
          class="mx-2"
          dark
          color="red"
          @click="del(item)"
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
    allfix: [],
    error: null,
    headers: [
      {
        text: 'วันที่',
        align: 'start',
        sortable: false,
        value: 'date'
      },
      { text: 'ห้อง', value: 'title' },
      { text: 'คำอธิบาย', value: 'desc' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' }
    ],
    delitem: []
  }),
  mounted () {
    this.getdata()
  },
  methods: {
    getdata () {
      db.collection('fix')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allfix = data
        })
    },
    del (item) {
      this.delitem = item
      db.collection('fix').doc(`fix_${this.delitem.date}_${this.delitem.title}`).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  }

}
</script>
