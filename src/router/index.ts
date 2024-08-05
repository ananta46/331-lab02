import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventDetailView from '@/views/EventDetailView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        limit: parseInt(route.query.limit?.toString() || '1'),
        page: parseInt(route.query.page?.toString() || '1')
      })
    },
    {
      path: '/event/:id',
      name: 'event-detail-view',
      component: EventDetailView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentListView
    }
  ]
})

export default router
