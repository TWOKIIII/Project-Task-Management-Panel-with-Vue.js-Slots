import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'flag-icons/css/flag-icons.min.css'

// Импорт компонентов со слотами
import BaseCard from './components/BaseCard.vue'
import BaseDialog from './components/BaseDialog.vue'
import StatCard from './components/StatCard.vue'
import TaskItem from './components/TaskItem.vue'
import Toolbar from './components/Toolbar.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#6200EE',
          secondary: '#03DAC6',
          background: '#121212',
          surface: '#1E1E1E',
          error: '#CF6679',
          success: '#4CAF50',
          warning: '#FB8C00',
          info: '#2194F3'
        }
      },
      light: {
        dark: false,
        colors: {
          primary: '#6200EE',
          secondary: '#03DAC6',
          background: '#F5F5F5',
          surface: '#FFFFFF',
          error: '#B00020',
          success: '#4CAF50',
          warning: '#FB8C00',
          info: '#2194F3'
        }
      }
    }
  }
})

const app = createApp(App)

// Глобальная регистрация компонентов (опционально)
app.component('BaseCard', BaseCard)
app.component('BaseDialog', BaseDialog)
app.component('StatCard', StatCard)
app.component('TaskItem', TaskItem)
app.component('Toolbar', Toolbar)

app.use(vuetify)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')