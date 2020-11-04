<template>
  <div text-center>
    <v-container>
      <h1>แจ้งพัสดุ</h1>
      <v-col sm="6">
        <v-text-field
          :value="date"
          label="วันที่"
          outlined
          readonly
          hint="Read Only"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="room"
          :items="items"
          label="ห้อง"
          outlined
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model.number="qty"
          label="จำนวน"
          type="number"
          outlined
          hint="จำนวนพัสดุ "
        />
      </v-col>
      <v-textarea
        v-model="desc"
        label="Description"
        value=""
        hint="ขนาดพัสดุ รูปร่าง ข้อมูลจำเพาะอื่นๆ"
        outlined
      />
      <v-btn @click="save()">
        save
        <p>{{ error }}</p>
      </v-btn>
      <v-row> <h1>พัสดุทั้งหมด</h1> </v-row>
      <v-data-table
        :headers="headers"
        :items="allmail"
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
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'admin',
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
      { text: 'จำนวน', value: 'qty' },
      { text: 'คำอธิบาย', value: 'desc' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' }
    ],

    date: '',
    items: ['A101', 'A102', 'A103', 'A201', 'A202', 'A203', 'A301', 'A302', 'A303'],
    room: null,
    qty: 0,
    desc: null,
    error: null,
    allmail: [],
    delitem: []
  }),
  mounted () {
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
        title: this.room,
        qty: this.qty,
        desc: this.desc
      }
      db.collection('mail').doc(`mail_${this.date}_${this.room}`)
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
      db.collection('mail')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allmail = data
        })
    },
    dele (item) {
      this.delitem = item
      db.collection('mail').doc(`mail_${this.delitem.date}_${this.delitem.title}`).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  }
}

</script>
