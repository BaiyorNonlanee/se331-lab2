<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import {type Event} from '@/types'
import { useRoute, RouterLink } from 'vue-router'
import {ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[]>([])
const totalEvents = ref<number>(0)

//2.9
const route = useRoute()
const pageSize = computed(() => parseInt(route.query.size as string) || 2)

const props = defineProps({
  page:{
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)

watchEffect(() => {
  // Reset events to prevent stale data
  events.value = []
  
  // Fetch events based on page size and current page

  EventService.getEvents(pageSize.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

// onMounted(() => {
//   watchEffect(() => {
//     EventService.getEvents(6, page.value)
//     .then((response) =>{
//       events.value = response.data
//       totalEvents.value = response.headers['x-total-count']
//     })
//     .catch((error) =>{
//       console.error('There was an error!',error)
//     })
//   })
// })

const hasNextPage = computed(() =>{
  // first calculate the total page
  const totalPages = Math.ceil(totalEvents.value/pageSize.value)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
 
  <div class="flex flex-col items-center">
    
    <EventCard v-for="event in events" :key="event.id" :event="event"/>

    <div class="flex justify-between w-[290px] mt-4">
      <RouterLink 
        v-if="page != 1" 
        :to="{name: 'event-list-view', query: {page: page - 1, size: pageSize}}" 
        rel="prev" 
        class="text-green-500 hover:text-green-700"
      >
        &#60; Prev Page
      </RouterLink>
      <div v-else></div> <!-- Empty div to maintain spacing -->

      <RouterLink 
        v-if="hasNextPage" 
        :to="{name: 'event-list-view', query: {page: page + 1, size: pageSize}}" 
        rel="next" 
        class="text-green-500 hover:text-green-700 text-right"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>



