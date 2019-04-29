<template>
  <v-flex xs11 offset-xs1 sm10 offset-sm1>
    <project-card
      :project="project"
      :loadingFixedIssues="loadingFixedIssues"
      :loadingMembers="loadingMembers"
      :loadingCommits="loadingCommits"
      :loadingBranches="loadingBranches"
      :fixedIssues="fixedIssues"
      :members="members"
      :commits="commits"
      :branches="branches"
    ></project-card>
  </v-flex>
</template>

<script>
import ProjectCard from '@/components/projects/ProjectCard'

export default {
  name: 'Project',
  components: {
    'project-card': ProjectCard
  },
  props: {
    project: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      loadingFixedIssues: true,
      loadingMembers: true,
      loadingCommits: true,
      loadingBranches: true
    }
  },
  computed: {
    fixedIssues() {
      return this.$store.getters['projects/projectFixedIssues'][this.project.id]
    },
    members() {
      return this.$store.getters['projects/projectMembers'][this.project.id]
    },
    commits() {
      return this.$store.getters['projects/projectCommits'][this.project.id]
    },
    branches() {
      return this.$store.getters['projects/projectBranches'][this.project.id]
    }
  },
  created() {
    if (typeof this.fixedIssues === 'undefined') {
      this.$store
        .dispatch('projects/loadFixedIssues', this.project.id)
        .then(() => {
          this.loadingFixedIssues = false
        })
    } else {
      this.loadingFixedIssues = false
    }

    if (typeof this.members === 'undefined') {
      this.$store.dispatch('projects/loadMembers', this.project.id).then(() => {
        this.loadingMembers = false
      })
    } else {
      this.loadingMembers = false
    }

    if (typeof this.commits === 'undefined') {
      this.$store.dispatch('projects/loadCommits', this.project.id).then(() => {
        this.loadingCommits = false
      })
    } else {
      this.loadingCommits = false
    }

    if (typeof this.branches === 'undefined') {
      this.$store
        .dispatch('projects/loadBranches', this.project.id)
        .then(() => {
          this.loadingBranches = false
        })
    } else {
      this.loadingBranches = false
    }
  }
}
</script>

<style scoped></style>
