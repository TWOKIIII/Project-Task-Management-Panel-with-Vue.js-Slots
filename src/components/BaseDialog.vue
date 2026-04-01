<template>
  <v-dialog v-model="dialogVisible" :max-width="maxWidth" persistent>
    <v-card>
      <!-- Слот для заголовка -->
      <v-card-title :class="titleClass">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <v-spacer></v-spacer>
        <v-btn icon variant="text" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-divider></v-divider>
      
      <!-- Слот для содержимого -->
      <v-card-text class="pa-4">
        <slot name="content">
          <slot></slot>
        </slot>
      </v-card-text>
      
      <v-divider></v-divider>
      
      <!-- Слот для действий -->
      <v-card-actions class="pa-4">
        <slot name="actions">
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="close">{{ cancelText }}</v-btn>
          <v-btn color="primary" @click="confirm">{{ confirmText }}</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: [Number, String],
    default: 500
  },
  titleColor: {
    type: String,
    default: 'primary'
  },
  cancelText: {
    type: String,
    default: 'Отмена'
  },
  confirmText: {
    type: String,
    default: 'Подтвердить'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const titleClass = computed(() => `bg-${props.titleColor} pa-4 d-flex align-center justify-space-between`)

const close = () => {
  dialogVisible.value = false
  emit('close')
}

const confirm = () => {
  emit('confirm')
  close()
}
</script>