<template>
  <v-list-item :class="{ 'completed-task': task.completed }" class="task-item">
    <template v-slot:prepend>
      <slot name="checkbox" :task="task">
        <v-checkbox 
          :model-value="task.completed"
          :color="task.priority === 'high' ? 'error' : 'primary'"
          hide-details
          @change="$emit('toggle', task.id)"
        />
      </slot>
    </template>
    
    <v-list-item-title :class="{ 'text-decoration-line-through': task.completed }" class="font-weight-medium">
      <slot name="title" :task="task">
        {{ task.title }}
      </slot>
    </v-list-item-title>
    
    <v-list-item-subtitle>
      <slot name="subtitle" :task="task">
        <div class="d-flex align-center mt-1">
          <v-chip :color="priorityColor" size="small" class="mr-2">
            {{ priorityText }}
          </v-chip>
          <span class="text-caption">
            <v-icon icon="mdi-calendar" size="12" class="mr-1" />
            {{ task.dueDate }}
          </span>
        </div>
      </slot>
    </v-list-item-subtitle>
    
    <template v-slot:append>
      <slot name="actions" :task="task">
        <v-btn icon variant="text" size="small" @click="$emit('delete', task.id)">
          <v-icon icon="mdi-delete" size="18" />
        </v-btn>
      </slot>
    </template>
  </v-list-item>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'delete'])

const priorityColor = computed(() => {
  const colors = { high: 'error', medium: 'warning', low: 'success' }
  return colors[props.task.priority]
})

const priorityText = computed(() => {
  const texts = { high: 'Высокий', medium: 'Средний', low: 'Низкий' }
  return texts[props.task.priority]
})
</script>

<style scoped>
.task-item {
  transition: background-color 0.2s ease;
}

.task-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.completed-task {
  opacity: 0.7;
}
</style>