<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12">
        <BaseCard :elevation="2">
          <template #header>
            <Toolbar :title="t('tasks.myTasks')" icon="mdi-format-list-checkbox">
              <template #actions>
                <v-btn color="primary" variant="flat" prepend-icon="mdi-plus" @click="openTaskDialog">
                  {{ t('tasks.addTask') }}
                </v-btn>
              </template>
            </Toolbar>
          </template>
          
          <template #content>
            <v-list lines="two">
              <TaskItem
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @toggle="toggleTask"
                @delete="deleteTask"
              />
            </v-list>
            
            <v-card-actions v-if="tasks.length === 0" class="justify-center pa-4">
              <div class="text-center text-grey">
                <v-icon icon="mdi-check-all" size="48" />
                <div class="mt-2">{{ t('tasks.noTasks') }}</div>
                <v-btn color="primary" variant="text" class="mt-2" @click="openTaskDialog">
                  {{ t('tasks.createFirst') }}
                </v-btn>
              </div>
            </v-card-actions>
          </template>
        </BaseCard>
      </v-col>
    </v-row>

    <BaseDialog
      v-model="dialog"
      :title="t('tasks.createTask')"
      title-color="primary"
      :confirm-text="t('tasks.create')"
      :cancel-text="t('tasks.cancel')"
      @confirm="addTask"
    >
      <template #content>
        <v-text-field
          v-model="newTask.title"
          :label="t('tasks.taskTitle')"
          variant="outlined"
          :rules="[v => !!v || t('tasks.taskTitle') + ' обязательно']"
        />
        
        <v-select
          v-model="newTask.priority"
          :label="t('tasks.priority')"
          :items="priorityOptions"
          variant="outlined"
        />
        
        <v-text-field
          v-model="newTask.dueDate"
          :label="t('tasks.dueDate')"
          type="date"
          variant="outlined"
        />
      </template>
    </BaseDialog>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import BaseCard from '../components/BaseCard.vue'
import BaseDialog from '../components/BaseDialog.vue'
import TaskItem from '../components/TaskItem.vue'
import Toolbar from '../components/Toolbar.vue'

const store = useStore()
const { t } = useI18n()
const tasks = computed(() => store.getters['tasks/allTasks'])

const dialog = ref(false)

const newTask = ref({
  title: '',
  priority: 'medium',
  dueDate: ''
})

const priorityOptions = computed(() => [
  { title: t('tasks.high'), value: 'high' },
  { title: t('tasks.medium'), value: 'medium' },
  { title: t('tasks.low'), value: 'low' }
])

const toggleTask = (taskId) => {
  store.dispatch('tasks/toggleTask', taskId)
}

const deleteTask = (taskId) => {
  store.dispatch('tasks/deleteTask', taskId)
}

const openTaskDialog = () => {
  newTask.value = { title: '', priority: 'medium', dueDate: '' }
  dialog.value = true
}

const addTask = () => {
  if (!newTask.value.title) return
  
  const task = {
    id: Date.now(),
    title: newTask.value.title,
    completed: false,
    priority: newTask.value.priority,
    dueDate: newTask.value.dueDate || new Date().toISOString().split('T')[0]
  }
  
  store.dispatch('tasks/addTask', task)
  dialog.value = false
}
</script>