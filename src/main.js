import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronRight, faChevronDown, faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
library.add(faChevronRight, faChevronDown, faXmark, faTriangleExclamation)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
