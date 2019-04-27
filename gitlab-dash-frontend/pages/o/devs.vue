<template>
  <div></div>
</template>

<script>
export default {
  name: 'Devs',
  head() {
    return {
      title: 'SSYS - Devs'
    }
  },
  created() {
    this.$emit('changedTitle', 'Devs')
  }
}
</script>

<style scoped></style>
