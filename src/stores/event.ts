import type { EventState, Event } from '@/types'
import { defineStore } from 'pinia'
export const useEventStore = defineStore('message', {
  state: (): EventState => ({
    event: null
  }),
  actions: {
    updateEvent(event: Event): void{
        this.event = event
    },
    resetEvent():void {
        this.event = null
    }
  }
})