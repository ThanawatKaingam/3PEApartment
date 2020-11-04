<template>
  <div text-center>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
      />
    </v-carousel>
    <v-container text-center fluid>
      <v-card>
        <v-card-text>
          Welcome
          {{ user.title }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="logout()">
            log out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container fluid>
      <h1>ประกาศ</h1>
      <v-row dense>
        <v-col
          v-for="notice in allnotice"
          :key="notice.name"
        >
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-card-title>เรื่อง : {{ notice.name }} </v-card-title>
            <v-card-text class="text--primary">
              <div>วันที่ {{ notice.date }} </div>
              <div> {{ notice.desc }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'admin',
  data: () => ({
    slides: [
      {
        src: 'https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.15752-9/123606251_3535946906493996_3029284368845932820_n.jpg?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_eui2=AeFfNCoc594AYP2NORESJTrsYa9cEzt4vKlhr1wTO3i8qVjPUDA1ljvlGIYKLoBK8NEwGLAFFbOEndzp9JdXw_zF&_nc_ohc=jgEjK0E2gMwAX-_ASB1&_nc_ht=scontent.fcnx3-1.fna&oh=27b48c5de7f439422cfed2a55ce1ee28&oe=5FC9B88E'
      },
      {
        src: 'https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.15752-9/123549069_409446670230233_4929225526950761618_n.jpg?_nc_cat=104&ccb=2&_nc_sid=ae9488&_nc_eui2=AeH3xdIK3MuQwCuMZ2V1O5R1vJeshv7ijSe8l6yG_uKNJ_FCPkeLHZBbsSDGpM8TZb5ahvTe-yJP8Z_uRq6uSA6F&_nc_ohc=y-m49hfQnmkAX9BpVHN&_nc_ht=scontent.fcnx3-1.fna&oh=ad4db633e4abcd9fa4317a28464fb630&oe=5FC86D64'
      },
      {
        src: 'https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.15752-9/123796418_654742828462899_2368553251728079750_n.jpg?_nc_cat=103&ccb=2&_nc_sid=ae9488&_nc_eui2=AeG0ghqQ8ju4TJIFENyeGtoX62BMhtyPF9frYEyG3I8X1w3Mbiz_k8jSrmj5JSq8ejFsolnY09Y8UDVgSooAcLj0&_nc_ohc=XhmmEG6_oJsAX8YLXSf&_nc_ht=scontent.fcnx3-1.fna&oh=e6bba985be9f905237055835c1052676&oe=5FC77B5A'
      },
      {
        src: 'https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.15752-9/123604410_692193574750750_4764481142830775225_n.jpg?_nc_cat=105&ccb=2&_nc_sid=ae9488&_nc_eui2=AeGLhAN3-1bjUJjGiVhpBJXpiEMrdbdLL4WIQyt1t0svhbiujNxaDcYqzAKK0Pc_GxZKhhpytm_cD_Z1j_39WTuX&_nc_ohc=M0lff_rRb_gAX-KW5pq&_nc_ht=scontent.fcnx3-1.fna&oh=89c5549d860a5b31cd4fe0ffec5a8e59&oe=5FC8D8FC'
      }
    ],
    user: [],
    allnotice: []
  }),
  mounted () {
    this.user = this.$store.state.currentUser
    this.getdata()
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/')
      }).catch(function (error) {
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
    }
  }
}
</script>
