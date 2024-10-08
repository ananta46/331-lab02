<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
import EventService from '@/services/EventService'
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

      <button class="button" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
/* Container for the form */
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Form header */
h1 {
  font-size: 1.8em;
  margin-bottom: 1em;
  color: #333;
}

h3 {
  font-size: 1.2em;
  margin-top: 1.5em;
  color: #555;
}

/* Labels and inputs */
label {
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 0.2em;
  display: block;
  color: #333;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  margin: 0.5em 0 1em 0;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s ease;
}

input[type='text']:focus {
  border-color: #007bff;
  outline: none;
}

/* Submit button */
button.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1em;
}

button.button:hover {
  background-color: #0056b3;
}

/* Debug display for event data */
pre {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #333;
  margin-top: 1em;
}
</style>
