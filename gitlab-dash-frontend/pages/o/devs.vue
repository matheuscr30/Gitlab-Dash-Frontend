<template>
  <v-container fill-height fluid>
    <v-layout row wrap>
      <user v-for="user in users" :key="user.id" :user="user" />
    </v-layout>
  </v-container>
</template>

<script>
import User from '@/components/users/User'

export default {
  name: 'Devs',
  head() {
    return {
      title: 'SSYS - Devs'
    }
  },
  components: {
    user: User
  },
  computed: {
    users() {
      return this.$store.getters['users/users']
    },
    projects() {
      return this.$store.getters['projects/projects']
    }
  },
  async created() {
    this.$emit('changedTitle', 'Devs')

    if (this.users.length === 0) this.$store.dispatch('users/loadUsers')

    if (this.projects.length === 0)
      await this.$store.dispatch('projects/loadProjects')

    this.$store.dispatch('projects/loadAllMembers')
    this.$store.dispatch('projects/loadAllCommits')
    this.$store.dispatch('projects/loadAllFixedIssues')
  }
}
</script>

<style scoped></style>
