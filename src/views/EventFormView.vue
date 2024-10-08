<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: ''
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
      <label>Category</label>
      <input v-model="event.category" type="text" placeholder="Category" class="field" />

      <h3>Name & describe your event</h3>
      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" class="field" />

      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Description" class="field" />

      <h3>Where is your event?</h3>
      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" class="field" />

      <button class="button" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
/* General Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
}

h1,
h3 {
  color: #333;
}

form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input.field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input.field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.button {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

pre {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  font-family: 'Courier New', monospace;
}

pre code {
  font-size: 14px;
  color: #333;
}
</style>
