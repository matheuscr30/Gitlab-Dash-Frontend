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
              <v-avatar color="yellow darken-2" size="32">
                <v-icon dark>code</v-icon>
              </v-avatar>

              <v-flex>
                <span>{{ commit.message }}</span>
                <br />
                <span class="grey--text">
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
              <v-avatar color="red" size="32">
                <v-icon dark>error_outline</v-icon>
              </v-avatar>

              <v-flex>
                <span>
                  <a :href="fixedIssue.webUrl" target="_blank">
                    #{{ fixedIssue.id }}
                  </a>
                  <span class="pl-1">
                    {{ fixedIssue.title }}
                  </span>
                </span>
                <br />
                <span class="grey--text">
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
              <v-avatar color="purple darken-1" size="32">
                <v-icon dark>merge_type</v-icon>
              </v-avatar>

              <v-flex>
                <span>
                  <a :href="mergeRequest.webUrl" target="_blank">
                    #{{ mergeRequest.id }}
                  </a>
                  {{ mergeRequest.title }}
                </span>
                <br />
                <span class="grey--text">
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
    moment: function(date) {
      return moment(date).fromNow()
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
  created() {
    console.log(this.user)
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

.timeline-header {
  margin-top: -25px !important;
}

.timeline-text {
  margin-top: -18px !important;
}
</style>
