<script setup lang="ts">
import type { Event, Organizer } from '@/types'
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id: 0,
    name: ''
  }
})
const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
const router = useRouter()
const store = useMessageStore()

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      //store.updateMessage('You are successfully add a new event for ' + response.data.title)
      //   setTimeout(() => {
      //     store.resetMessage()
      //   }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent">
      <!-- <label>Category</label>
      <input v-model="event.category" type="text" placeholder="Category" class="field" />
       -->
      <BaseInput v-model="event.category" type="text" label="Category" />

      <h3>Name & describe your event</h3>
      <!-- <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" class="field" /> -->
      <BaseInput v-model="event.title" type="text" label="Title" />

      <!-- <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Description" class="field" /> -->
      <BaseInput v-model="event.description" type="text" label="Description" />

      <h3>Where is your event?</h3>
      <!-- <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" class="field" /> -->
      <BaseInput v-model="event.location" type="text" label="location" />

      <h3>Who is your organizer?</h3>
      <label>Select an Organizer</label>
      <select v-model="event.organizer.id">
        <option
          v-for="option in organizers"
          :value="option.id"
          :key="option.id"
          :selected="option.id === event.organizer.id"
        >
          {{ option.name }}
        </option>
      </select>

      <button class="button" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
/* Container for the form */
div {
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
}

/* Form headers */
h1 {
  font-size: 2em;
  margin-bottom: 1em;
  color: #222;
}

h3 {
  font-size: 1.4em;
  margin-top: 1.5em;
  color: #444;
}

/* Labels and inputs */
label {
  font-weight: 600;
  font-size: 1em;
  margin-bottom: 0.3em;
  display: block;
  color: #222;
}

input[type='text'],
select {
  width: 100%;
  padding: 12px;
  margin: 0.6em 0 1.2em 0;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type='text']:focus,
select:focus {
  border-color: #0078ff;
  outline: none;
}

/* Submit button */
button.button {
  display: inline-block;
  padding: 12px 25px;
  background-color: #0078ff;
  color: #fff;
  font-size: 1.1em;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1.2em;
}

button.button:hover {
  background-color: #0054b8;
}

/* Debug display for event data */
pre {
  background-color: #f2f2f2;
  padding: 12px;
  border-radius: 5px;
  font-size: 0.9em;
  color: #333;
  margin-top: 1.5em;
}
</style>
