<template>
  <div class="toolbar-wrapper">
    <div class="d-flex align-center justify-space-between pa-4">
      <div class="d-flex align-center">
        <v-icon :icon="icon" class="mr-2" />
        <span class="text-h6">{{ title }}</span>
      </div>
      
      <div class="d-flex align-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>
    <v-divider></v-divider>
    
    <slot name="filters"></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'mdi-view-dashboard'
  }
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>