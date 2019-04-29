<template>
  <material-card
    v-bind="$attrs"
    class="v-card--material-project"
    v-on="$listeners"
  >
    <v-card
      slot="offset"
      :class="`elevation-${elevation}`"
      color="light-blue lighten-2"
      class="pa-4"
      dark
    >
      <v-avatar color="light-blue lighten-2">
        <span class="white--text headline">{{ project.name.charAt(0) }}</span>
      </v-avatar>
    </v-card>

    <div slot="title" class="containerTitle">
      <a :href="project.url" target="_blank" class="category">
        {{ project.name }}
      </a>
      <br />
      <span class="grey--text font-weight-light">
        {{ project.name_with_namespace }}
      </span>
    </div>

    <div>
      <v-layout row wrap>
        <v-flex v-if="project.description" xs12 class="mb-2">
          <span>{{ project.description }}</span>
        </v-flex>

        <v-flex xs6>
          <v-avatar color="red" size="40">
            <v-icon dark>
              error_outline
            </v-icon>
          </v-avatar>

          <span class="ml-2">
            <v-progress-circular
              v-if="loadingFixedIssues"
              indeterminate
              size="25"
              color="red"
            ></v-progress-circular>

            <span v-else>
              <span class="red--text subheading font-weight-bold pr-1">
                {{ fixedIssues.length }}
              </span>
              Fixed Issues
            </span>
          </span>
        </v-flex>

        <v-flex xs6>
          <v-avatar color="blue" size="40">
            <v-icon dark>
              person
            </v-icon>
          </v-avatar>

          <span class="ml-2">
            <v-progress-circular
              v-if="loadingMembers"
              indeterminate
              size="25"
              color="blue"
            ></v-progress-circular>

            <span v-else>
              <span class="blue--text subheading font-weight-bold pr-1">
                {{ members.length }}
              </span>
              Members
            </span>
          </span>
        </v-flex>

        <v-flex xs6>
          <v-avatar color="yellow darken-2" size="40">
            <v-icon dark>
              code
            </v-icon>
          </v-avatar>

          <span class="ml-2">
            <v-progress-circular
              v-if="loadingFixedIssues"
              indeterminate
              size="25"
              color="yellow darken-2"
            ></v-progress-circular>

            <span v-else>
              <span
                class="yellow--text text--darken-2 subheading font-weight-bold pr-1"
              >
                {{ commits.length }}
              </span>
              Commits
            </span>
          </span>
        </v-flex>

        <v-flex xs6>
          <v-avatar color="deep-orange lighten-1" size="40">
            <v-icon dark>
              call_split
            </v-icon>
          </v-avatar>

          <span class="ml-2">
            <v-progress-circular
              v-if="loadingBranches"
              indeterminate
              size="25"
              color="deep-orange"
            ></v-progress-circular>

            <span v-else>
              <span
                class="deep-orange--text text--lighten-1 subheading font-weight-bold pr-1"
              >
                {{ branches.length }}
              </span>
              Branches
            </span>
          </span>
        </v-flex>
      </v-layout>
    </div>

    <template slot="actions">
      <v-spacer />
      <v-btn class="btnAction" flat small color="success">
        MORE DETAILS
      </v-btn>
    </template>
  </material-card>
</template>

<script>
import MaterialCard from '@/components/material/MaterialCard'

export default {
  name: 'ProjectCard',
  components: {
    'material-card': MaterialCard
  },
  inheritAttrs: false,
  props: {
    ...MaterialCard.props,
    project: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loadingFixedIssues: {
      type: Boolean,
      default: false
    },
    loadingMembers: {
      type: Boolean,
      default: false
    },
    loadingCommits: {
      type: Boolean,
      default: false
    },
    loadingBranches: {
      type: Boolean,
      default: false
    },
    fixedIssues: {
      type: Array,
      default: () => {
        return []
      }
    },
    members: {
      type: Array,
      default: () => {
        return []
      }
    },
    commits: {
      type: Array,
      default: () => {
        return []
      }
    },
    branches: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.v-card--material-project {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .btnAction {
    padding-right: 15px;
  }

  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 16px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__title {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;

    .containerTitle {
      padding-left: 130px;
    }
  }

  .v-card__text {
    padding-top: 0px;
  }

  .v-card__actions {
    flex: 1 0 100%;
    padding-right: 5px !important;
  }
}
</style>
