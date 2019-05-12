<template>
  <v-flex class="timeline-text xs-timeline-item">
    <v-layout column wrap align-center>
      <div v-if="$isFullscreen" class="fullscreen-margin"></div>

      <div class="truncate-text--1 font-weight-medium">
        {{ action.project.name }}
      </div>

      <span>
        <v-avatar
          v-if="
            action.project.avatarUrl !== '' &&
              !projectFailedImages[action.project.id]
          "
          size="32"
          color="grey lighten-4"
          class="text-xs-center"
        >
          <img
            :src="action.project.avatarUrl"
            alt="avatar"
            @error="() => setFailedImage(action.project.id)"
          />
        </v-avatar>

        <v-avatar v-else :color="getColorType()" size="32">
          <span class="white--text title">
            {{ action.project.name.charAt(0).toUpperCase() }}
          </span>
        </v-avatar>
      </span>

      <v-flex v-if="actionType === 'commit'">
        <span class="truncate-text--4">
          <div v-if="action.issue" class="truncate-text--1 font-weight-bold">
            <a :href="action.issue.webUrl" target="_blank" class="linkIssue">
              {{ action.issue.title }}:
            </a>
          </div>

          <span class="timeline-item--title">
            {{ action.title | cleanTitle(action.issue) }}
          </span>
        </span>

        <span class="grey--text pt-3">
          {{ new Date(action.committedDate.seconds * 1000) | moment }}
        </span>
      </v-flex>

      <v-flex v-if="actionType === 'issue'">
        <span class="truncate-text--4">
          <a
            :href="action.webUrl"
            target="_blank"
            class="linkIssue font-weight-bold"
          >
            #{{ action.iid }}
          </a>
          <span class="pl-1">
            {{ action.title }}
          </span>
        </span>

        <span class="grey--text pt-3">
          {{ new Date(action.closedAt.seconds * 1000) | moment }}
        </span>
      </v-flex>

      <v-flex v-if="actionType === 'mergeRequest'">
        <span class="truncate-text--4">
          <div v-if="action.issue" class="truncate-text--1 font-weight-bold">
            <a :href="action.issue.webUrl" target="_blank" class="linkIssue">
              {{ action.issue.title }}:
            </a>
          </div>

          <span class="timeline-item--title">
            {{ action.title | cleanTitle(action.issue) }}
          </span>
        </span>

        <span class="grey--text pt-3">
          {{ new Date(action.createdAt.seconds * 1000) | moment }}
        </span>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import moment from 'moment'

export default {
  name: 'UserAction',
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
    action: {
      default: () => {
        return {}
      },
      type: Object
    },
    actionType: {
      default: undefined,
      type: String
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
    },
    getColorType() {
      if (this.actionType === 'commit') {
        return 'yellow darken-2'
      } else if (this.actionType === 'issue') {
        return 'red'
      } else if (this.actionType === 'mergeRequest') {
        return 'purple darken-1'
      }
    }
  }
}
</script>

<style lang="scss">
.timeline-text {
  margin-top: -38px !important;
}

.fullscreen-margin {
  margin-top: 7px;
}

.xs-timeline-item {
  flex-basis: 20%;
  flex-grow: 0;
  max-width: 20%;
}

.linkIssue {
  color: var(--v-greyDarken2-base) !important;
  font-size: 13.8px !important;
}

.timeline-item--title {
  font-size: 13px !important;
  line-height: 1.7;
}
</style>
