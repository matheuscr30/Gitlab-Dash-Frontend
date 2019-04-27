<template>
  <div></div>
</template>

<script>
export default {
  name: 'Projects',
  head() {
    return {
      title: 'SSYS - Projects'
    }
  },
  created() {
    this.$emit('changedTitle', 'Projects')
  }
}
</script>

<style scoped></style>
