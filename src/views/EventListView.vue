<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventOrg from '@/components/EventOrg.vue'

import Event from '@/types/Event'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'
const events = ref<Event[]>(null)
onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      // console.log(response.data)
      events.value = response.data
      console.log(events.value)
    })
    .catch((error) => {
      console.log('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventOrg v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
<style scope>
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
