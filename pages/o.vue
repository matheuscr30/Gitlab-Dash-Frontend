<template>
  <v-app id="inspire">
    <v-navigation-drawer
      id="drawerMenu"
      v-model="drawerMenu"
      app
      dark
      :permanent="!$isMobile"
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

    <v-toolbar app fixed flat light height="55" color="background">
      <v-toolbar-side-icon
        v-if="$isMobile"
        class="font-weight-thin"
        @click.stop="drawerMenu = !drawerMenu"
      />

      <v-toolbar-title class="title font-weight-thin">
        {{ toolbarTitle }}
      </v-toolbar-title>

      <v-spacer />

      <v-tooltip bottom>
        <v-btn slot="activator" icon @click="toggleFullscreen">
          <v-icon>fullscreen</v-icon>
        </v-btn>
        <span>Fullscreen Mode</span>
      </v-tooltip>
    </v-toolbar>

    <v-content>
      <v-container fluid grid-list-md class="pa-0">
        <main class="content">
          <nuxt-child @changedTitle="toolbarTitle = $event" />
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
      fullscreen: false,
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
      toolbarTitle: 'Dashboard',
      actualPosition: 1,
      statusScroll: 0,
      heightScreen: 0
    }
  },
  watch: {
    $isMobile() {
      this.drawerMenu = !this.$isMobile
    }
  },
  async asyncData({ store }) {
    await store.dispatch('requestToken')
  },
  created() {
    if (this.$route.name === 'o') this.$router.push({ name: 'o-dashboard' })
    if (this.$isMobile) this.drawerMenu = false
  },
  methods: {
    toggleFullscreen() {
      this.$fullscreen.toggle(this.$el.querySelector('.content'), {
        wrap: false,
        callback: this.fullscreenChange
      })
      this.$store.dispatch('setIsFullscreen', true)
    },
    fullscreenChange(fullscreen) {
      if (!fullscreen) {
        this.$store.dispatch('setIsFullscreen', false)
      }
      this.fullscreen = fullscreen
    }
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

.fullscreen {
  overflow-y: auto;
}
</style>
