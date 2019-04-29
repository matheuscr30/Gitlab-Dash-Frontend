<template>
  <v-app id="inspire">
    <v-navigation-drawer
      id="drawerMenu"
      v-model="drawerMenu"
      app
      dark
      floating
      :temporary="$isMobile"
      :stateless="!$isMobile"
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

          <v-divider class="mx-3 mb-1"></v-divider>

          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            :to="item.ref"
            active-class="success"
            avatar
            class="listTileDrawer white--text px-3 pb-1"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile>
        </v-layout>
      </v-img>
    </v-navigation-drawer>

    <v-toolbar
      clipped-left
      flat
      light
      height="55"
      color="background"
      :class="{ toolbarDesktop: !$isMobile }"
    >
      <v-toolbar-side-icon
        v-if="$isMobile"
        class="font-weight-thin"
        @click.stop="drawerMenu = !drawerMenu"
      />

      <v-toolbar-title class="title font-weight-thin">
        {{ toolbarTitle }}
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid grid-list-md class="pa-0">
        <main class="content">
          <nuxt-child
            :toolbarTitle="toolbarTitle"
            @changedTitle="toolbarTitle = $event"
          />
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
        },
        {
          icon: 'layers',
          ref: '/o/projects/',
          title: 'Projects'
        },
        {
          icon: 'person',
          ref: '/o/devs/',
          title: 'Devs'
        }
      ],
      toolbarTitle: 'Dashboard'
    }
  },
  watch: {
    $isMobile() {
      this.drawerMenu = !this.$isMobile
    }
  },
  created() {
    if (this.$route.name === 'o') this.$router.push({ name: 'o-dashboard' })
    if (this.$isMobile) this.drawerMenu = false
  }
}
</script>

<style>
.listTileDrawer .v-list__tile {
  border-radius: 6px;
}

.toolbarDesktop {
  margin-left: 260px;
}
</style>
