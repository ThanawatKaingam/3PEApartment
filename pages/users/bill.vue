<template>
  <v-container fluid>
    <h1>ค่าเช่าห้องพัก {{ user.title }}</h1>
    <v-row dense>
      <v-col
        v-for="bill in bills"
        :key="bill.date"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-card-title>ประจำ {{ bill.date }} </v-card-title>

          <v-card-text class="text--primary">
            <div>ค่าน้ำ {{ bill.water }} บาท</div>
            <div>ค่าไฟ {{ bill.elec }} บาท</div>
            <div>ค่าเช่า {{ bill.rent }} บาท</div>
            <h3>รวมทั้งหมด {{ bill.total }} บาท</h3>

            <div v-if="!bill.paid">
              กรุณาชำระที่บัญชีกรุงไทย เลขบัญชี 2541-5465-xxxxx แล้วยื่นสลิปที่ห้งสำนักงานหอพัก
            </div>
            <div v-else>
              จ่ายแล้ว
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-row />
    </v-row>
  </v-container>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    error: null,
    user: [],
    allbill: [],
    bills: [],
    picurl: '',
    mounth: null
  }),
  mounted () {
    this.user = this.$store.state.currentUser
    this.getdata()
    let today = new Date()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    today = mm + '-' + yyyy
    this.mounth = today
  },
  methods: {
    getdata () {
      db.collection('bill')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.allbill = data
          for (const i in this.allbill) {
            if (this.allbill[i].title === this.user.title) {
              this.bills.push(this.allbill[i])
            }
          }
        })
    }
  }
}
</script>
