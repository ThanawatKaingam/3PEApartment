<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <div class="text-center">
      <vuetify-logo />
    </div>
    <template slot="progress">
      <v-progress-linear
        color="red lighten-2"
        height="10"
        indeterminate
      />
    </template>
    <v-card-text>
      <v-text-field
        v-model="username"
        label="Username"
        type="username"
        @input="save()"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      />
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn
        color="grey lighten-2"
        text
        @click="userLogin()"
      >
        login
      </v-btn>
    </v-card-actions>
    <v-card v-if="error">
      <v-card-text>
        {{ error }}
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
// eslint-disable-next-line no-unused-vars
import { db } from '~/plugins/firebaseConfig.js'
// eslint-disable-next-line no-unused-vars
import CollectionText from '~/components/CollectionText.vue'
import VuetifyLogo from '~/components/3PELogo.vue'
export default {
  components: {
    VuetifyLogo
  },
  layout: 'login',
  data: () => ({
    loading: false,
    username: '',
    password: '',

    error: null,
    userarray: {},
    isAdmin: false,
    user: null
  }),
  mounted () {
    this.getData()
    firebase.auth().signOut().then(function () {
      console.log('no user is login')
    })
  },
  methods: {
    userLogin () {
      this.error = null
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
        .then(
          console.log('login!!'))
        .catch((error) => {
        // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          this.error = errorCode + ' ' + errorMessage
        })
      if (!this.error) {
        if (this.username.toLowerCase() === 'admin3pe@3pe.com') {
          this.$router.replace('admin')
        } else {
          this.$router.replace('home')
        }
      }
    },
    getData () {
      db.collection('User').orderBy('title').onSnapshot((querySnapshot) => {
        const array = []
        querySnapshot.forEach((doc) => {
          array.push(doc.data())
        })
        console.log('array', array)
        this.userarray = array
        this.$store.commit('getData', this.userarray)
      })
    },
    save () {
      this.$store.commit('getMail', this.username)
      for (const i in this.userarray) {
        if (this.userarray[i].email === this.username) {
          console.log(this.userarray[i])
          this.$store.commit('getCurrent', this.userarray[i])
        }
      }
    }
  }
}
</script>
