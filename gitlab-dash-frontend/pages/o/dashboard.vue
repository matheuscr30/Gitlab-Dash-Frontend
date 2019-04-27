<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <span class="title font-weight-thin">Dashboard</span>
      </v-flex>

      <v-layout row wrap class="mt-4 ml-4">
        <v-flex xs12 sm6 md4 lg3>
          <stats-card
            color="green"
            icon="layers"
            title="Projects"
            :value="$store.getters['projects/projects'].length"
            sub-icon="calendar_today"
            sub-text="Last 24 Hours"
            offset="12"
            route="/o/projects/"
            :loading="loadingProjectsCard"
          />
        </v-flex>

        <v-flex xs12 sm6 md4 lg3>
          <stats-card
            color="blue"
            icon="person"
            title="Devs"
            :value="$store.getters['users/users'].length"
            offset="15"
            route="/o/devs/"
            :loading="loadingDevsCard"
          />
        </v-flex>

        <v-flex xs12 sm6 md4 lg3>
          <stats-card
            color="red"
            icon="error_outline"
            title="Issues"
            value="3500"
            sub-icon="more"
            sub-text="Tracked from GitLab"
            offset="15"
            :loading="loadingIssuesCard"
          />
        </v-flex>

        <v-flex xs12 sm6 md4 lg3>
          <stats-card
            color="green"
            icon="home"
            title="Groups"
            value="$34,245"
            sub-icon="calendar_today"
            sub-text="Last 24 Hours"
            offset="15"
          />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import StatsCard from '@/components/material/StatsCard'

export default {
  name: 'Dashboard',
  head() {
    return {
      title: 'SSYS - Dashboard'
    }
  },
  components: {
    'stats-card': StatsCard
  },
  data() {
    return {
      loadingProjectsCard: true,
      loadingDevsCard: true,
      loadingIssuesCard: true
    }
  },
  created() {
    if (this.$store.getters['projects/projects'].length === 0) {
      this.$store.dispatch('projects/loadProjects').then(() => {
        this.loadingProjectsCard = false
      })
    } else {
      this.loadingProjectsCard = false
    }

    if (this.$store.getters['users/users'].length === 0) {
      this.$store.dispatch('users/loadUsers').then(() => {
        this.loadingDevsCard = false
      })
    } else {
      this.loadingDevsCard = false
    }
  }
}
</script>

<style></style>
