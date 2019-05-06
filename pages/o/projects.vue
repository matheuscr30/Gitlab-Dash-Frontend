<template>
  <v-container fill-height fluid>
    <v-layout wrap>
      <project
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </v-layout>
  </v-container>
</template>

<script>
import Project from '@/components/projects/Project'

export default {
  name: 'Projects',
  head() {
    return {
      title: 'SSYS - Projects'
    }
  },
  components: {
    project: Project
  },
  computed: {
    projects() {
      return this.$store.getters['projects/projects']
    }
  },
  async created() {
    this.$emit('changedTitle', 'Projects')

    if (this.projects.length === 0)
      await this.$store.dispatch('projects/loadProjects')
  }
}
</script>

<style scoped></style>
