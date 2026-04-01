<template>
  <v-container fluid class="pa-6">
    <!-- Welcome Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <BaseCard :elevation="2" class="gradient-card">
          <template #content>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-h4 font-weight-bold mb-2">
                  {{ t('app.welcome', { name: 'Глеб' }) }}
                </div>
                <div class="text-subtitle-1 text-grey-lighten-1">
                  {{ t('app.welcomeSubtitle') }}
                </div>
              </div>
              <v-chip color="secondary" size="large" variant="flat">
                <v-icon start icon="mdi-calendar" />
                {{ currentDate }}
              </v-chip>
            </div>
          </template>
        </BaseCard>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row>
      <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" md="3">
        <StatCard
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
          :progress="stat.progress"
        />
      </v-col>
    </v-row>

    <!-- Quick Stats Section -->
    <v-row>
      <v-col cols="12" md="6">
        <BaseCard :elevation="2">
          <template #header>
            <v-icon icon="mdi-chart-box" class="mr-2" />
            <span class="text-h6">{{ t('analytics.overallStats') }}</span>
          </template>
          
          <template #content>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-playlist-check" color="info" />
                </template>
                <v-list-item-title>{{ t('stats.activeTasks') }}</v-list-item-title>
                <template v-slot:append>
                  <div class="text-h6 font-weight-bold">{{ activeTasksCount }}</div>
                </template>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-check-circle" color="success" />
                </template>
                <v-list-item-title>{{ t('stats.completed') }}</v-list-item-title>
                <template v-slot:append>
                  <div class="text-h6 font-weight-bold">{{ completedTasksCount }}</div>
                </template>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-chart-progress" color="secondary" />
                </template>
                <v-list-item-title>{{ t('stats.overallProgress') }}</v-list-item-title>
                <template v-slot:append>
                  <div class="text-h6 font-weight-bold">{{ overallProgress }}%</div>
                </template>
              </v-list-item>
            </v-list>
            
            <v-progress-linear 
              :model-value="overallProgress" 
              color="primary"
              height="8"
              rounded
              class="mt-4"
            />
          </template>
        </BaseCard>
      </v-col>

      <v-col cols="12" md="6">
        <BaseCard :elevation="2">
          <template #header>
            <v-icon icon="mdi-flag" class="mr-2" />
            <span class="text-h6">{{ t('analytics.byPriority') }}</span>
          </template>
          
          <template #content>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-flag" color="error" />
                </template>
                <v-list-item-title>{{ t('tasks.high') }}</v-list-item-title>
                <template v-slot:append>
                  <div class="text-h6 font-weight-bold">{{ highPriorityCount }}</div>
                </template>
                <v-progress-linear 
                  :model-value="(highPriorityCount / totalTasks) * 100" 
                  color="error"
                  height="4"
                  class="mt-2"
                />
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-flag" color="warning" />
                </template>
                <v-list-item-title>{{ t('tasks.medium') }}</v-list-item-title>
                <template v-slot:append>
                  <div class="text-h6 font-weight-bold">{{ mediumPriorityCount }}</div>
                </template>
                <v-progress-linear 
                  :model-value="(mediumPriorityCount / totalTasks) * 100" 
                  color="warning"
                  height="4"
                  class="mt-2"
                />
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-flag" color="success" />
                </template>
                <v-list-item-title>{{ t('tasks.low') }}</v-list-item-title>
                <template v-slot:append>
                  <div class="text-h6 font-weight-bold">{{ lowPriorityCount }}</div>
                </template>
                <v-progress-linear 
                  :model-value="(lowPriorityCount / totalTasks) * 100" 
                  color="success"
                  height="4"
                  class="mt-2"
                />
              </v-list-item>
            </v-list>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import BaseCard from '../components/BaseCard.vue'
import StatCard from '../components/StatCard.vue'

const store = useStore()
const { t } = useI18n()

const tasks = computed(() => store.getters['tasks/allTasks'])
const totalTasks = computed(() => store.getters['tasks/totalCount'])
const activeTasksCount = computed(() => store.getters['tasks/activeCount'])
const completedTasksCount = computed(() => store.getters['tasks/completedCount'])
const overallProgress = computed(() => store.getters['tasks/completionRate'])
const highPriorityCount = computed(() => store.getters['tasks/highPriorityCount'])
const mediumPriorityCount = computed(() => store.getters['tasks/mediumPriorityCount'])
const lowPriorityCount = computed(() => store.getters['tasks/lowPriorityCount'])

const stats = computed(() => [
  { title: t('stats.totalProjects'), value: '12', icon: 'mdi-folder', color: 'primary', progress: null },
  { title: t('stats.activeTasks'), value: activeTasksCount.value, icon: 'mdi-playlist-check', color: 'info', progress: null },
  { title: t('stats.completed'), value: completedTasksCount.value, icon: 'mdi-check-circle', color: 'success', progress: null },
  { title: t('stats.overallProgress'), value: `${overallProgress.value}%`, icon: 'mdi-chart-progress', color: 'secondary', progress: overallProgress.value }
])

const currentDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
})
</script>

<style scoped>
.gradient-card {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  color: white;
}
</style>