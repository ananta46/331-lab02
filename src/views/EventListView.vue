<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { isAwaitKeyword } from 'typescript'
const router = useRouter()

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
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
    EventService.getEvents(3, page.value)
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

const keyword = ref('')
function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value == '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }

  queryFunction
    .then((response) => {
      events.value = response.data
      console.log('events', events.value)

      totalEvents.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvents.value)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <h1 class="">Events For Good</h1>
  <div class="w-64 mx-auto mb-4">
    <BaseInput
      v-model="keyword"
      label="Search..."
      class="w-full"
      type="text"
      @input="updateKeyword"
    />
  </div>

  <!-- new element -->
  <div class="flex flex-col items-center text-red-500">
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
