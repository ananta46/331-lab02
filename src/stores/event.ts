import type { EventState, Event } from '@/types'
import { defineStore } from 'pinia'
export const useEventStore = defineStore('message', {
  state: (): EventState => ({
    event: null
  }),
  actions: {
    setEvent(event: Event): void{
        this.event = event
    }
  }
})