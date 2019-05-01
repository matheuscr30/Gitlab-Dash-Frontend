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

        <v-flex shrink :class="{ xs6: collapsed, xs12: !collapsed }">
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

          <v-fade-transition leave-absolute>
            <v-layout v-if="!collapsed" row wrap class="mt-3 mb-2">
              <v-flex xs8 sm9>
                <v-card
                  color="red"
                  class="elevation-4 v-card--material__chart"
                  dark
                >
                  <chartist
                    :data="issuesChart.data"
                    :options="issuesChart.options"
                    :responsive-options="issuesChart.responsiveOptions"
                    color="red"
                    type="Bar"
                  />
                </v-card>
              </v-flex>

              <v-flex xs4 sm3 class="text-xs-center">
                <v-btn-toggle
                  v-model="issuesChart.choice"
                  style="flex-direction: column"
                  mandatory
                >
                  <v-btn flat value="day">
                    Per day
                  </v-btn>
                  <v-btn flat value="week">
                    Per week
                  </v-btn>
                  <v-btn flat value="month">
                    Per month
                  </v-btn>
                  <v-btn flat value="dev">
                    Per Dev
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-fade-transition>
        </v-flex>

        <v-flex shrink :class="{ xs6: collapsed, xs12: !collapsed }">
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

          <v-fade-transition leave-absolute>
            <v-layout v-if="!collapsed" row wrap class="mt-3 mb-2">
              <v-flex xs8 sm9>
                <v-card
                  color="blue"
                  class="elevation-4 v-card--material__chart"
                  dark
                >
                  <chartist
                    :data="membersChart.data"
                    :options="membersChart.options"
                    :responsive-options="membersChart.responsiveOptions"
                    color="blue"
                    type="Line"
                  />
                </v-card>
              </v-flex>

              <v-flex xs4 sm3 class="text-xs-center">
                <v-btn-toggle
                  v-model="membersChart.choice"
                  style="flex-direction: column"
                  mandatory
                >
                  <v-btn flat value="commit">
                    Per commit
                  </v-btn>
                  <v-btn flat value="fixedIssue">
                    Per fixed issue
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-fade-transition>
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
      <v-btn
        class="btnAction"
        flat
        small
        color="success"
        @click="collapsed = !collapsed"
      >
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
  },
  data() {
    return {
      collapsed: true,
      auxiliaryCharts: {
        dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        weekLabels: ['1º Week', '2º Week', '3º Week', '4º Week'],
        monthLabels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      issuesChart: {
        choice: 0,
        data: {
          labels: [
            'Ja',
            'Fe',
            'Ma',
            'Ap',
            'Mai',
            'Ju',
            'Jul',
            'Au',
            'Se',
            'Oc',
            'No',
            'De'
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 15,
            right: 10,
            bottom: 0,
            left: 10
          }
        },
        responsiveOptions: [
          [
            'screen and (max-width: 640px)',
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0]
                }
              }
            }
          ]
        ]
      },
      membersChart: {
        choice: 0
      }
    }
  },
  watch: {
    collapsed() {
      if (!this.collapsed) {
        // this.configIssueCharts()
        this.configMemberCharts()
        this.configCommitCharts()
        this.configBranchCharts()
      }
    },
    'issuesChart.choice'() {},
    'membersCharts.choice'() {},
    'commitsCharts.choice'() {},
    'branchesCharts.choice'() {}
  },
  methods: {
    configIssueCharts() {
      console.log('q')
      console.log(this.issuesChart.choice)
      if (this.issuesChart.choice === 0) {
        this.issuesChart.data.labels = this.auxiliaryCharts.dayLabels

        for (const issue in this.fixedIssues) {
          console.log(issue)
        }

        this.issuesChart.data.series = [[]]
      } else if (this.issuesChart.choice === 1) {
        this.issuesChart.data.labels = this.auxiliaryCharts.weekLabels
      } else if (this.issuesChart.choice === 2) {
        this.issuesChart.data.labels = this.auxiliaryCharts.monthLabels
      }
    },
    configMemberCharts() {},
    configCommitCharts() {},
    configBranchCharts() {}
  }
}
</script>

<style lang="scss">
.v-card--material-project {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .v-card--material__chart {
    .ct-label {
      color: inherit;
      opacity: 0.7;
      font-size: 0.975rem;
      font-weight: 100;
    }

    .ct-grid {
      stroke: rgba(255, 255, 255, 0.2);
    }

    .ct-series-a .ct-point,
    .ct-series-a .ct-line,
    .ct-series-a .ct-bar,
    .ct-series-a .ct-slice-donut {
      stroke: rgba(255, 255, 255, 0.8);
      stroke-width: 10px;
    }

    .ct-series-a .ct-slice-pie,
    .ct-series-a .ct-area {
      fill: rgba(255, 255, 255, 0.4);
    }
  }

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
