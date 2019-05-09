<template>
  <v-flex xs12 class="mt-5" :class="{ 'ml-2': $isMobile, 'ml-4': !$isMobile }">
    <div class="timeline"></div>

    <v-layout row wrap class="timeline-item">
      <v-flex xs2 class="timeline-header">
        <v-layout column wrap align-center>
          <v-avatar size="45" color="grey lighten-4" class="text-xs-center">
            <img :src="user.avatarUrl" alt="avatar" />
          </v-avatar>

          <v-flex>
            <div class="body-1 font-weight-medium">{{ user.name }}</div>
            <div>
              <span class="yellow--text text--darken-2 body-2 font-weight-bold">
                {{ user.numberOfCommits }}
              </span>
              <span class="body-1">Commits</span>
            </div>

            <div>
              <span class="red--text body-2 font-weight-bold">
                {{ user.numberOfIssues }}
              </span>
              <span class="body-1">Fixed Issues</span>
            </div>

            <div>
              <span class="purple--text text--darken-1 body-2 font-weight-bold">
                {{ user.numberOfMergeRequests }}
              </span>
              <span class="body-1">Merge Requests</span>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex v-if="timelineOption === 0" xs10>
        <v-layout row wrap>
          <v-flex
            v-for="commit in user.commitsList.slice(0, 5)"
            :key="commit.id"
            class="timeline-text xs-timeline-item"
          >
            <v-layout column wrap align-center>
              <div v-if="$isFullscreen" class="fullscreen-margin"></div>

              <div class="truncate-text--1 font-weight-medium">
                {{ commit.project.name }}
              </div>

              <span>
                <v-avatar
                  v-if="
                    commit.project.avatarUrl !== '' &&
                      !projectFailedImages[commit.project.id]
                  "
                  size="32"
                  color="grey lighten-4"
                  class="text-xs-center"
                >
                  <img
                    :src="commit.project.avatarUrl"
                    alt="avatar"
                    @error="() => setFailedImage(commit.project.id)"
                  />
                </v-avatar>

                <v-avatar v-else color="yellow darken-2" size="32">
                  <span class="white--text title">
                    {{ commit.project.name.charAt(0).toUpperCase() }}
                  </span>
                </v-avatar>
              </span>

              <v-flex>
                <span class="truncate-text--4">
                  <span v-if="commit.issue">
                    <a :href="commit.issue.webUrl" target="_blank">
                      {{ commit.issue.title }}
                    </a>
                    : &nbsp;
                  </span>

                  {{ commit.title | cleanTitle(commit.issue) }}
                </span>

                <span class="grey--text pt-3">
                  {{ new Date(commit.committedDate.seconds * 1000) | moment }}
                </span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex v-if="timelineOption === 1" xs10>
        <v-layout row wrap>
          <v-flex
            v-for="fixedIssue in user.issuesList.slice(0, 5)"
            :key="fixedIssue.id"
            class="timeline-text xs-timeline-item"
          >
            <v-layout column wrap align-center>
              <div v-if="$isFullscreen" class="fullscreen-margin"></div>

              <div class="truncate-text--1 font-weight-medium">
                {{ fixedIssue.project.name }}
              </div>

              <span>
                <v-avatar
                  v-if="
                    fixedIssue.project.avatarUrl !== '' &&
                      !projectFailedImages[fixedIssue.project.id]
                  "
                  size="32"
                  color="grey lighten-4"
                  class="text-xs-center"
                >
                  <img
                    :src="fixedIssue.project.avatarUrl"
                    alt="avatar"
                    @error="() => setFailedImage(fixedIssue.project.id)"
                  />
                </v-avatar>

                <v-avatar v-else color="red" size="32">
                  <span class="white--text title">
                    {{ fixedIssue.project.name.charAt(0).toUpperCase() }}
                  </span>
                </v-avatar>
              </span>

              <v-flex>
                <span class="truncate-text--4">
                  <a :href="fixedIssue.webUrl" target="_blank">
                    #{{ fixedIssue.iid }}
                  </a>
                  <span class="pl-1">
                    {{ fixedIssue.title }}
                  </span>
                </span>

                <span class="grey--text pt-3">
                  {{ new Date(fixedIssue.closedAt.seconds * 1000) | moment }}
                </span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex v-if="timelineOption === 2" xs10>
        <v-layout row wrap>
          <v-flex
            v-for="mergeRequest in user.mergeRequestsList.slice(0, 5)"
            :key="mergeRequest.id"
            class="timeline-text xs-timeline-item"
          >
            <v-layout column wrap align-center>
              <div v-if="$isFullscreen" class="fullscreen-margin"></div>

              <div class="truncate-text--1 font-weight-medium">
                {{ mergeRequest.project.name }}
              </div>

              <span>
                <v-avatar
                  v-if="
                    mergeRequest.project.avatarUrl !== '' &&
                      !projectFailedImages[mergeRequest.project.id]
                  "
                  size="32"
                  color="grey lighten-4"
                  class="text-xs-center"
                >
                  <img
                    :src="mergeRequest.project.avatarUrl"
                    alt="avatar"
                    @error="() => setFailedImage(mergeRequest.project.id)"
                  />
                </v-avatar>

                <v-avatar v-else color="purple darken-1" size="32">
                  <span class="white--text title">
                    {{ mergeRequest.project.name.charAt(0).toUpperCase() }}
                  </span>
                </v-avatar>
              </span>

              <v-flex>
                <span class="truncate-text--4">
                  <span v-if="mergeRequest.issue">
                    <a :href="mergeRequest.issue.webUrl" target="_blank">
                      {{ mergeRequest.issue.title }}
                    </a>
                    :
                  </span>

                  <span class="timeline-item--title">
                    {{ mergeRequest.title | cleanTitle(mergeRequest.issue) }}
                  </span>
                </span>

                <span class="grey--text pt-3">
                  {{ new Date(mergeRequest.createdAt.seconds * 1000) | moment }}
                </span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import moment from 'moment'

export default {
  name: 'User',
  filters: {
    moment(date) {
      return moment(date).fromNow()
    },
    cleanTitle(title, issue) {
      if (issue) {
        title = title.replace(/.*#([0-9]+)./, '')
        // title = title.replace(issue.title, '')

        if (title) return title
        return ''
      } else {
        return title
      }
    }
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object
    },
    timelineOption: {
      default: undefined,
      type: Number
    }
  },
  computed: {
    projectFailedImages() {
      return this.$store.getters['projects/projectFailedImages']
    }
  },
  methods: {
    setFailedImage(projectId) {
      this.$store.dispatch('projects/addProjectFailedImage', projectId)
    }
  }
}
</script>

<style>
.xs-timeline-item {
  flex-basis: 20%;
  flex-grow: 0;
  max-width: 20%;
}

.timeline {
  background: rgba(0, 0, 0, 0.12);
  height: 2px;
}

.timeline-item--title {
  font-size: 13.7px !important;
  line-height: 1.7;
}

.timeline-header {
  margin-top: -25px !important;
}

.timeline-text {
  margin-top: -38px !important;
}

.fullscreen-margin {
  margin-top: 7px;
}
</style>
