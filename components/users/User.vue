<template>
  <v-flex xs12 class="mt-5" :class="{ 'ml-2': $isMobile, 'ml-4': !$isMobile }">
    <div class="timeline"></div>

    <v-layout row wrap class="timeline-item">
      <v-flex v-if="timelineOption === 0" xs10>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <user-action
            v-for="action in allActions.slice(0, 5)"
            :key="action.id + action.title"
            :action="action"
            :actionType="calculateType(action)"
          >
          </user-action>
        </v-layout>
      </v-flex>

      <v-flex v-if="timelineOption === 1" xs10>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <user-action
            v-for="commit in user.commitsList.slice(0, 5)"
            :key="commit.id"
            :action="commit"
            actionType="commit"
          >
          </user-action>
        </v-layout>
      </v-flex>

      <v-flex v-if="timelineOption === 2" xs10>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <user-action
            v-for="issue in user.issuesList.slice(0, 5)"
            :key="issue.id"
            :action="issue"
            actionType="issue"
          >
          </user-action>
        </v-layout>
      </v-flex>

      <v-flex v-if="timelineOption === 3" xs10>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <user-action
            v-for="mergeRequest in user.mergeRequestsList.slice(0, 5)"
            :key="mergeRequest.id"
            :action="mergeRequest"
            actionType="mergeRequest"
          >
          </user-action>
        </v-layout>
      </v-flex>

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
    </v-layout>
  </v-flex>
</template>

<script>
import UserAction from '@/components/users/UserAction'

export default {
  name: 'User',
  components: {
    'user-action': UserAction
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
    allActions() {
      const auxActions = this.user.commitsList.concat(
        this.user.issuesList,
        this.user.mergeRequestsList
      )
      return auxActions.sort(this.sortAllActions)
    }
  },
  methods: {
    calculateType(action) {
      if ('iid' in action) {
        return 'issue'
      } else if ('committedDate' in action) {
        return 'commit'
      } else {
        return 'mergeRequest'
      }
    },
    getDateByType(action) {
      if ('iid' in action) {
        return action.closedAt
      } else if ('committedDate' in action) {
        return action.committedDate
      } else {
        return action.createdAt
      }
    },
    sortAllActions(a, b) {
      const dateA = new Date(this.getDateByType(a).seconds * 1000)
      const dateB = new Date(this.getDateByType(b).seconds * 1000)

      return dateA < dateB ? -1 : 1
    }
  }
}
</script>

<style lang="scss">
.timeline {
  background: rgba(0, 0, 0, 0.12);
  height: 2px;
}

.timeline-header {
  margin-top: -25px !important;
}
</style>
