<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import Event from '@types/Event'
import { ref,onMounted } from 'vue'
import EventService from '@/services/EventService.ts'
import type { AxiosResponse } from 'axios';

const events = ref<Event[]>(null)

const props = defineProps({
  page:{
    type: Number,
    required: true
  }
})
EventService.getEvents(2,props.page).then((response: AxiosResponse<EventItem[]>) =>{
  events.value = response.data
})
</script>

<template>
  <h1>Events For Good</h1>
 
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


