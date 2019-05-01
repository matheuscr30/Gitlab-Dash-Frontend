<template>
  <v-container fill-height fluid>
    <v-layout row wrap class="ml-2">
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
    projectFixedIssues() {
      return this.$store.getters['projects/projectFixedIssues']
    },
    projectCommits() {
      return this.$store.getters['projects/projectCommits']
    }
  },
  async created() {
    this.$emit('changedTitle', 'Devs')

    if (this.users.length === 0) await this.$store.dispatch('users/loadUsers')
  }
}
</script>

<style scoped></style>
