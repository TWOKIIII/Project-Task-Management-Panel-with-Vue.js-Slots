<template>
  <BaseCard :hoverable="true" @click="$emit('click')">
    <template #header>
      <div class="d-flex align-center justify-space-between">
        <slot name="title">
          <span class="text-subtitle-1 text-grey-lighten-1">{{ title }}</span>
        </slot>
        <v-icon :icon="icon" :color="color" size="32" />
      </div>
    </template>
    
    <template #content>
      <div class="d-flex align-center justify-space-between mt-2">
        <slot name="value">
          <span class="text-h4 font-weight-bold">{{ value }}</span>
        </slot>
        <slot name="extra"></slot>
      </div>
      <v-progress-linear 
        v-if="progress !== undefined"
        :model-value="progress" 
        :color="color"
        height="6"
        class="mt-3"
      />
    </template>
    
    <template #actions>
      <slot name="actions"></slot>
    </template>
  </BaseCard>
</template>

<script setup>
import BaseCard from './BaseCard.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: ''
  },
  icon: {
    type: String,
    default: 'mdi-chart-box'
  },
  color: {
    type: String,
    default: 'primary'
  },
  progress: {
    type: Number,
    default: undefined
  }
})

defineEmits(['click'])
</script>