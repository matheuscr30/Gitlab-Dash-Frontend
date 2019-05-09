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
        <span class="white--text headline">
          {{ project.name.charAt(0).toUpperCase() }}
        </span>
      </v-avatar>
    </v-card>

    <div slot="title" class="containerTitle">
      <a :href="project.url" target="_blank" class="category">
        {{ project.name }}
      </a>
      <br />
      <span class="grey--text font-weight-light">
        {{ project.nameWithNamespace }}
      </span>
    </div>

    <div>
      <v-layout row wrap>
        <v-flex v-if="project.description" xs12 class="mb-2">
          <span>{{ project.description }}</span>
        </v-flex>

        <v-flex xs6>
          <v-avatar color="blue" size="40">
            <v-icon dark>
              person
            </v-icon>
          </v-avatar>

          <span class="ml-2">
            <span>
              <span class="blue--text subheading font-weight-bold pr-1">
                {{ project.numberOfMembers }}
              </span>
              Members
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
            <v-layout
              v-if="!collapsed && fixedIssues.length !== 0"
              row
              wrap
              class="mt-3 mb-2"
            >
              <v-flex xs8 sm10>
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
                    ratio=""
                    type="Bar"
                  />
                </v-card>
              </v-flex>

              <v-flex xs4 sm2 class="text-xs-center">
                <v-btn-toggle
                  v-model="issuesChart.choice"
                  style="flex-direction: column"
                  mandatory
                >
                  <v-btn flat>
                    Per hour
                  </v-btn>
                  <v-btn flat>
                    Per day
                  </v-btn>
                  <v-btn flat>
                    Per month
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-fade-transition>
        </v-flex>

        <v-flex shrink :class="{ xs6: collapsed, xs12: !collapsed }">
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

          <v-fade-transition leave-absolute>
            <v-layout
              v-if="!collapsed && commits.length !== 0"
              row
              wrap
              class="mt-3 mb-2"
            >
              <v-flex xs8 sm10>
                <v-card
                  color="yellow darken-2"
                  class="elevation-4 v-card--material__chart"
                  dark
                >
                  <chartist
                    :data="commitsChart.data"
                    :options="commitsChart.options"
                    :responsive-options="commitsChart.responsiveOptions"
                    color="yellow darken-2"
                    ratio=""
                    type="Bar"
                  />
                </v-card>
              </v-flex>

              <v-flex xs4 sm2 class="text-xs-center">
                <v-btn-toggle
                  v-model="commitsChart.choice"
                  style="flex-direction: column"
                  mandatory
                >
                  <v-btn flat>
                    Per hour
                  </v-btn>
                  <v-btn flat>
                    Per day
                  </v-btn>
                  <v-btn flat>
                    Per month
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-fade-transition>
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
        <span v-if="collapsed">MORE DETAILS</span>
        <span v-else>LESS DETAILS</span>
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
        hourLabels: [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23'
        ],
        dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1,
          height: 200,
          onlyInteger: true,
          chartPadding: {
            top: 25,
            right: 10,
            bottom: 0,
            left: 0
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
      commitsChart: {
        choice: 0,
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1,
          height: 200,
          onlyInteger: true,
          chartPadding: {
            top: 25,
            right: 10,
            bottom: 0,
            left: 0
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
      }
    }
  },
  watch: {
    collapsed() {
      if (!this.collapsed) {
        this.configIssueCharts()
        this.configCommitCharts()
      }
    },
    'issuesChart.choice'() {
      this.configIssueCharts()
    },
    'commitsChart.choice'() {
      this.configCommitCharts()
    }
  },
  methods: {
    configIssueCharts() {
      switch (this.issuesChart.choice) {
        case 0:
          const issuesPerHour = new Array(24).fill(0)
          for (let i = 0; i < this.fixedIssues.length; i++) {
            const closedDate = new Date(
              this.fixedIssues[i].closedAt.seconds * 1000
            )
            issuesPerHour[closedDate.getHours()] += 1
          }

          this.issuesChart.data.labels = this.auxiliaryCharts.hourLabels
          this.issuesChart.options.high = Math.max(...issuesPerHour)
          this.issuesChart.data.series = [issuesPerHour]
          break

        case 1:
          const issuesPerDay = new Array(7).fill(0)
          for (let i = 0; i < this.fixedIssues.length; i++) {
            const closedDate = new Date(
              this.fixedIssues[i].closedAt.seconds * 1000
            )
            issuesPerDay[closedDate.getDay()] += 1
          }

          this.issuesChart.data.labels = this.auxiliaryCharts.dayLabels
          this.issuesChart.options.high = Math.max(...issuesPerDay)
          this.issuesChart.data.series = [issuesPerDay]
          break

        case 2:
          const issuesPerMonth = new Array(12).fill(0)
          for (let i = 0; i < this.fixedIssues.length; i++) {
            const closedDate = new Date(
              this.fixedIssues[i].closedAt.seconds * 1000
            )
            issuesPerMonth[closedDate.getMonth() + 1] += 1
          }

          this.issuesChart.data.labels = this.auxiliaryCharts.monthLabels
          this.issuesChart.options.high = Math.max(...issuesPerMonth)
          this.issuesChart.data.series = [issuesPerMonth]
          break
      }
    },
    configCommitCharts() {
      switch (this.commitsChart.choice) {
        case 0:
          const commitsPerHour = new Array(24).fill(0)
          for (let i = 0; i < this.commits.length; i++) {
            const closedDate = new Date(
              this.commits[i].committedDate.seconds * 1000
            )
            commitsPerHour[closedDate.getHours()] += 1
          }

          this.commitsChart.data.labels = this.auxiliaryCharts.hourLabels
          this.commitsChart.options.high = Math.max(...commitsPerHour)
          this.commitsChart.data.series = [commitsPerHour]
          break

        case 1:
          const commitsPerDay = new Array(7).fill(0)
          for (let i = 0; i < this.commits.length; i++) {
            const closedDate = new Date(
              this.commits[i].committedDate.seconds * 1000
            )
            commitsPerDay[closedDate.getDay()] += 1
          }

          this.commitsChart.data.labels = this.auxiliaryCharts.dayLabels
          this.commitsChart.options.high = Math.max(...commitsPerDay)
          this.commitsChart.data.series = [commitsPerDay]
          break

        case 2:
          const commitsPerMonth = new Array(13).fill(0)
          for (let i = 0; i < this.commits.length; i++) {
            const closedDate = new Date(
              this.commits[i].committedDate.seconds * 1000
            )
            commitsPerMonth[closedDate.getMonth() + 1] += 1
          }

          this.commitsChart.data.labels = this.auxiliaryCharts.monthLabels
          this.commitsChart.options.high = Math.max(...commitsPerMonth)
          this.commitsChart.data.series = [commitsPerMonth]
          break
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
