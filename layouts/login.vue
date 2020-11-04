<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" color="grey darken-3" fixed app>
      <v-spacer />
      <v-toolbar-title class="flex text-xs-center light-grey--text font-weight-bold" v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      title: '3PE Apartment'
    }
  }
}
</script>
<style>
@import url(https://fonts.googleapis.com/css2?family=Athiti&family=Rajdhani&display=swap);
.theme--dark.v-application {
  background-image: url(https://wallpapercave.com/wp/wp3194552.png);
  background-size: contain;
}
.font-weight-medium {
  font-family: 'Athiti', sans-serif;
  color:grey ;
  font-size: 50px;
}
.font {
  font-family: 'Athiti', sans-serif;
  color: grey ;
  font-size: 30px;
}
.s {
  font-family: 'Athiti', sans-serif;
}
.mr-4 {
  font-family: 'Rajdhani', sans-serif;
}
</style>
