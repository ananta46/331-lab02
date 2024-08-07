<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})
const props = defineProps({
  limit: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const maxEvent = computed(() => props.limit)

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(maxEvent.value, page.value)
      .then((response) => {
        // console.log(response.data)
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <!-- <EventOrg v-for="event in events" :key="event.id" :event="event" /> -->
  </div>
  <div class="pagination">
    <RouterLink
      :to="{ name: 'event-list-view', query: { page: page - 1, limit: limit } }"
      rel="prev"
      v-if="page != 1"
      >&#60; Prev Page
    </RouterLink>
    <RouterLink
      :to="{ name: 'event-list-view', query: { page: page + 1, limit: limit } }"
      rel="next"
      v-if="hasNextPage"
      >Next Page &#62;
    </RouterLink>
  </div>
</template>
<style scope>
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: right;
}
</style>
