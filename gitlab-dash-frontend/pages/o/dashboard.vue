<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-layout row wrap class="mt-4 px-3">
        <v-flex xs12 sm6 md4 lg3>
          <stats-card
            color="green"
            icon="layers"
            title="Projects"
            :value="projects.length"
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
            :value="users.length"
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
            :value="numberOfFixedIssues"
            sub-icon="more"
            sub-text="Tracked from GitLab"
            offset="15"
            :loading="loadingIssuesCard"
          />
        </v-flex>

        <v-flex xs12 sm6 md4 lg3>
          <stats-card
            color="orange darken-1"
            icon="group"
            title="Groups"
            :value="groups.length"
            sub-text="Our Dev Groups"
            offset="15"
            :loading="loadingGroupsCard"
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
      loadingIssuesCard: true,
      loadingGroupsCard: true,
      numberOfFixedIssues: 0
    }
  },
  computed: {
    users() {
      return this.$store.getters['users/users']
    },
    projects() {
      return this.$store.getters['projects/projects']
    },
    projectFixedIssues() {
      return this.$store.getters['projects/projectFixedIssues']
    },
    groups() {
      return this.$store.getters['groups/groups']
    }
  },
  created() {
    this.$emit('changedTitle', 'Dashboard')

    const loadProjects = async () => {
      if (this.projects.length === 0)
        await this.$store.dispatch('projects/loadProjects')

      this.loadingProjectsCard = false

      if (Object.entries(this.projectFixedIssues).length === 0)
        await this.$store.dispatch('projects/loadAllFixedIssues')

      for (let i = 0; i < this.projects.length; i++) {
        const project = this.projects[i]
        this.numberOfFixedIssues += this.projectFixedIssues[project.id].length
      }

      this.loadingIssuesCard = false
    }
    loadProjects()

    if (this.users.length === 0) {
      this.$store.dispatch('users/loadUsers').then(() => {
        this.loadingDevsCard = false
      })
    } else {
      this.loadingDevsCard = false
    }

    if (this.groups.length === 0) {
      this.$store.dispatch('groups/loadGroups').then(() => {
        this.loadingGroupsCard = false
      })
    } else {
      this.loadingGroupsCard = false
    }
  }
}
</script>

<style></style>
