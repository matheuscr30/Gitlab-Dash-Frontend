<template>
  <v-flex
    xs12
    sm12
    class="mt-4 ml-4"
    :class="{ 'ml-3': $isMobile, 'ml-5': !$isMobile }"
  >

  </v-flex>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      numberOfCommits: 167,
      numberOfFixedIssues: 25,
      projectCommitsByUser: {}
    }
  },
  computed: {
    userProjects() {
      return this.$store.getters['users/userProjects'][this.user.id]
    },
    projectFixedIssues() {
      return this.$store.getters['projects/projectFixedIssues']
    },
    projectCommits() {
      return this.$store.getters['projects/projectCommits']
    }
  }
}
</script>

<style>
.v-timeline:before {
  content: '';
  height: 2px;
  width: 100%;
  left: 0;
  position: absolute;
}
</style>
