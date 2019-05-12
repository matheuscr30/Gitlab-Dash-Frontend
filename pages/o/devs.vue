<template>
  <v-container fill-height fluid>
    <v-layout row wrap class="mb-4">
      <v-flex xs12 :class="{ 'ml-2': $isMobile, 'ml-4': !$isMobile }">
        <span class="subheading mr-2">Timeline Options</span>
        <v-btn-toggle v-model="timelineOption" mandatory>
          <v-btn flat color="deep-orange darken-1">
            <span>All</span>
            <v-icon>style</v-icon>
          </v-btn>

          <v-btn flat color="yellow darken-2">
            <span>Commit</span>
            <v-icon>code</v-icon>
          </v-btn>

          <v-btn flat color="red">
            <span>Issue</span>
            <v-icon>priority_high</v-icon>
          </v-btn>

          <v-btn flat color="purple darken-1">
            <span>Merge Request</span>
            <v-icon>merge_type</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>

      <div id="timeline--1"></div>

      <user
        v-for="(user, index) in users"
        :id="`timeline-${index}`"
        :key="user.id"
        :user="user"
        :timelineOption="timelineOption"
      />
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
  data() {
    return {
      timelineOption: 0,
      stopScroll: false
    }
  },
  computed: {
    users() {
      let usersAux = [...this.$store.getters['users/users']]

      if (this.timelineOption === 0) {
        usersAux = usersAux.sort((a, b) =>
          a.numberOfCommits + a.numberOfIssues + a.numberOfMergeRequests >
          b.numberOfCommits + b.numberOfIssues + b.numberOfMergeRequests
            ? -1
            : 1
        )
      } else if (this.timelineOption === 1) {
        usersAux = usersAux.sort((a, b) =>
          a.numberOfCommits > b.numberOfCommits ? -1 : 1
        )
      } else if (this.timelineOption === 2) {
        usersAux = usersAux.sort((a, b) =>
          a.numberOfIssues > b.numberOfIssues ? -1 : 1
        )
      } else {
        usersAux = usersAux.sort((a, b) =>
          a.numberOfMergeRequests > b.numberOfMergeRequests ? -1 : 1
        )
      }
      return usersAux
    }
  },
  watch: {
    $isFullscreen() {
      if (this.$isFullscreen) {
        this.startScroll()
      } else {
        this.stopScroll = true
      }
    }
  },
  async created() {
    this.$emit('changedTitle', 'Devs')

    if (this.$route.query.timeline_option === 'all') this.timelineOption = 0
    else if (this.$route.query.timeline_option === 'commit')
      this.timelineOption = 1
    else if (this.$route.query.timeline_option === 'issue')
      this.timelineOption = 2
    else if (this.$route.query.timeline_option === 'merge_request')
      this.timelineOption = 3

    if (this.users.length === 0) await this.$store.dispatch('users/loadUsers')
  },
  methods: {
    startScroll() {
      let start = -1
      const end = this.users.length

      const f = () => {
        if (this.stopScroll) return

        const element = document.getElementById('timeline-' + start.toString())

        if (start === -1) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          const timelineItem = element.getElementsByClassName(
            'xs-timeline-item'
          )[0]
          timelineItem.scrollIntoView({ behavior: 'smooth' })
        }
        start++

        if (start === end - 3) start = -1
        setTimeout(f, 5000)
      }
      f()
    }
  }
}
</script>

<style scoped></style>
