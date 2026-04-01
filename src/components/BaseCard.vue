<template>
  <v-card :elevation="elevation" :class="cardClass" @click="$emit('click')">
    <!-- Слот для заголовка -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    
    <v-divider v-if="$slots.header && $slots.content"></v-divider>
    
    <!-- Слот для основного содержимого -->
    <div v-if="$slots.content" class="card-content">
      <slot name="content"></slot>
    </div>
    
    <v-divider v-if="$slots.content && $slots.actions"></v-divider>
    
    <!-- Слот для действий -->
    <div v-if="$slots.actions" class="card-actions">
      <slot name="actions"></slot>
    </div>
    
    <!-- Слот по умолчанию -->
    <v-card-text v-if="$slots.default">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  elevation: {
    type: [Number, String],
    default: 2
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const cardClass = computed(() => ({
  'hoverable-card': props.hoverable
}))
</script>

<style scoped>
.card-header {
  padding: 16px;
  font-weight: 500;
  font-size: 1.25rem;
}

.card-content {
  padding: 16px;
}

.card-actions {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.hoverable-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hoverable-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
</style>