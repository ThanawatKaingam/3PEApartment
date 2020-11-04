<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      color="grey darken-3"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="grey darken-3" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'หน้าแรก',
          to: 'admin'
        },
        {
          icon: 'mdi-tools',
          title: 'รับแจ้งชำรุด',
          to: 'tool'
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'แจ้งพัสดุ',
          to: 'sub'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
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
  color:grey lighten-5;
  font-size: 50px;
}
.font {
  font-family: 'Athiti', sans-serif;
  color: grey lighten-5;
  font-size: 30px;
}
.s {
  font-family: 'Athiti', sans-serif;
}
.mr-4 {
  font-family: 'Rajdhani', sans-serif;
}
</style>
