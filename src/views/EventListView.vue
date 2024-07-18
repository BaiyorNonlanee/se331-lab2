<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import Event from '@types/Event'
import { computed, ref,watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import EventService from '@/services/EventService.ts'
import type { AxiosResponse } from 'axios';

const events = ref<Event[]>(null)

const totalEvent = ref<number>(0)

//2.9
const route = useRoute()

const page = computed(() => parseInt(route.query.page as string) || 1)
const pageSize = computed(() => parseInt(route.query.size as string) || 2)

const props = defineProps({
  page:{
    type: Number,
    required: true
  }
})
EventService.getEvents(2,props.page).then((response: AxiosResponse<EventItem[]>) =>{
  events.value = response.data
})
// watchEffect(() =>{
//   EventService.getEvents(2,props.page).then((response: AxiosResponse<EventItem[]>) =>{
//   events.value = response.data
//   totalEvent.value = response.headers['x-total-count']
// })
// })

const fetchEvents = () => {
    EventService.getEvents(pageSize.value, page.value).then((response: AxiosResponse<EventItem[]>) => {
        events.value = response.data
        totalEvent.value = parseInt(response.headers['x-total-count'])
    })
}

watchEffect(() => {
    fetchEvents()
})
const hasNextPage = computed(() =>{
  // first calculate the total page
  const totalPages = Math.ceil(totalEvent.value)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
 
  <div class="events">
    
  <EventCard v-for="event in events" :key="event.id" :event="event"/>

  <div class="pagination">
   
    <RouterLink :to="{name: 'event-list-view', query: {page: page - 1,size: pageSize}}" rel="prev" v-if="page != 1" id="page-prev">
      Prev Page
    </RouterLink>
    <RouterLink :to="{name: 'event-list-view', query: {page: page + 1,size: pageSize}}" rel="next" v-if="hasNextPage" id="page-next">
      Next Page
    </RouterLink>
  </div>
</div>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination{
  display: flex;
  width: 290px;
}
.pagination a{
  flex: 1;
  text-decoration: none;
  color: #2c3e50
}
#page-prev{
  text-align: left;
}
#page-next{
  text-align: right;
}
</style>


