<template>
  <v-app id="inspire">
    <v-navigation-drawer
      id="drawerMenu"
      v-model="drawerMenu"
      app
      dark
      floating
      persistent
      mobile-break-point="991"
      width="260"
    >
      <v-img src="/sidebar_image.jpg" height="100%">
        <v-layout id="layoutDrawer" class="fill-height" column>
          <v-list-tile avatar class="pa-2">
            <v-list-tile-avatar>
              <v-img src="/ssys_logo.png" height="34" contain />
            </v-list-tile-avatar>
            <v-list-tile-title class="title white--text">
              SSYS
            </v-list-tile-title>
          </v-list-tile>
          <v-divider class="mx-3"></v-divider>
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            :to="item.ref"
            active-class="success"
            avatar
            class="listTileDrawer white--text pa-3"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile>
        </v-layout>
      </v-img>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid grid-list-md class="pa-0">
        <main class="content">
          <nuxt-child />
        </main>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'O',
  data() {
    return {
      drawerMenu: true,
      items: [
        {
          icon: 'dashboard',
          ref: '/o/dashboard/',
          title: 'Dashboard'
        }
      ]
    }
  },
  created() {
    this.$router.push({ name: 'o-dashboard' })
  }
}
</script>

<style>
.listTileDrawer .v-list__tile {
  border-radius: 6px;
}
</style>
