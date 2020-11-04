<template>
  <v-container>
    <h1>
      บิล
    </h1>
    <v-col sm="6">
      <v-text-field
        :value="mounth"
        label="ประจำเดือน"
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
        v-model.number="water"
        label="ค่าน้ำ"
        type="number"
        outlined
        hint="บาท"
        @input="caltotal()"
      />
    </v-col>
    <v-col sm="6">
      <v-text-field
        v-model.number="elec"
        label="ค่าไฟ"
        type="number"
        outlined
        hint="บาท "
        @input="caltotal()"
      />
    </v-col>
    <v-col sm="6">
      <v-text-field
        v-model.number="rent"
        label="ค่าเช่า"
        type="number"
        outlined
        hint="บาท"
        @input="caltotal()"
      />
    </v-col>
    <v-col sm="6">
      <v-text-field
        v-model.number="total"
        label="รวม"
        type="number"
        outlined
        hint="บาท"
        readonly
      />
    </v-col>
    <v-btn @click="save()">
      Save
    </v-btn>

    <v-row> <h1>บิลทั้งหมด</h1> </v-row>
    <v-data-table
      :headers="headers"
      :items="allbill"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.slip="{ item }">
        <v-btn
          v-if="!item.paid"
          class="mx-2"
          dark
          color="red"
          @click="paid(item)"
        >
          confirm
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'admin',
  data: () => ({
    error: null,
    total: 0,
    room: null,
    rent: 0,
    water: 0,
    elec: 0,
    items: ['A101', 'A102', 'A103', 'A201', 'A202', 'A203', 'A301', 'A302', 'A303'],
    mounth: null,
    headers: [
      {
        text: 'เดือนที่',
        align: 'start',
        sortable: false,
        value: 'date'
      },
      { text: 'ห้อง', value: 'title' },
      { text: 'ค่ำน้ำ', value: 'water' },
      { text: 'ค่าไฟ', value: 'elec' },
      { text: 'ค่าเช่า', value: 'rent' },
      { text: 'รวม', value: 'total' },
      { text: 'จ่ายแล้ว', value: 'paid' },
      { text: 'Slip', value: 'slip', sortable: false, align: 'center' }
    ],
    allbill: [],
    delitem: []
  }),
  mounted () {
    this.getdata()
    let today = new Date()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    today = mm + '-' + yyyy
    this.mounth = today
  },
  methods: {
    caltotal () {
      this.total = 0
      this.total = this.rent + this.water + this.elec
    },
    save () {
      const data = {
        date: this.mounth,
        title: this.room,
        water: this.water,
        elec: this.elec,
        total: this.total,
        rent: this.rent,
        paid: false
      }
      db.collection('bill').doc(`bill_${this.mounth}_${this.room}`)
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
      db.collection('bill')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allbill = data
        })
    },
    paid (item) {
      this.delitem = item
      db.collection('bill').doc(`bill_${this.delitem.date}_${this.delitem.title}`).update({
        paid: true
      })
        .then(function () {
          console.log('Document successfully updated!')
        }).catch(function (error) {
          console.error('Error updating document: ', error)
        })
    }
  }
}
</script>
