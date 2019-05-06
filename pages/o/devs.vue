<template>
  <v-container fill-height fluid>
    <v-layout row wrap class="mb-4">
      <v-flex xs12 :class="{ 'ml-2': $isMobile, 'ml-4': !$isMobile }">
        <span class="subheading mr-2">Timeline Options</span>
        <v-btn-toggle v-model="timelineOption" mandatory>
          <v-btn flat color="yellow darken-2">
            <span>Commit</span>
            <v-icon>code</v-icon>
          </v-btn>

          <v-btn flat color="red">
            <span>Fixed Issue</span>
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
import { EventBus } from '@/mixins/modules/eventBus'

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
      return this.$store.getters['users/users']
    }
  },
  async created() {
    this.$emit('changedTitle', 'Devs')

    EventBus.$on('openFullscreen', () => {
      this.startScroll()
    })

    EventBus.$on('closeFullscreen', () => {
      this.stopScroll = true
    })

    if (this.$route.query.timeline_option === 'commit') this.timelineOption = 0
    else if (this.$route.query.timeline_option === 'fixed_issue')
      this.timelineOption = 1
    else if (this.$route.query.timeline_option === 'merge_request')
      this.timelineOption = 2

    if (this.users.length === 0) await this.$store.dispatch('users/loadUsers')
  },
  methods: {
    startScroll() {
      let start = -1
      const end = this.users.length

      const f = () => {
        if (this.stopScroll) return

        const element = document.getElementById('timeline-' + start.toString())
        element.scrollIntoView({ behavior: 'smooth' })
        start++

        if (start === end - 3) start = -1
        setTimeout(f, 1000)
      }
      f()
    }
  }
}
</script>

<style scoped></style>
