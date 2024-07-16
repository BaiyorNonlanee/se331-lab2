<script setup lang="ts">
import {ref} from 'vue'
import Event from '@/types/Event'
defineProps<{
    event: Event
}>()
</script>

<template>
 <RouterLink class="event-link" :to="{name: 'event-detail',params:{id: event?.id}}">
    <div class="event-class">
        <div class="event-card">
            <span>@{{ event?.time }} on {{ event?.date }}</span>
            <h4>{{ event.title }}</h4>
        </div>
    </div>
</RouterLink>
 <div class="eventDetails">
    <h2>{{ event.category }}</h2>
    <p>{{ event.organizer }}</p>
 </div>
</template>

<style scoped>
.event-card, .eventDetails{
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
}
.event-card:hover, .eventDetails:hover{
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.2);
}

.event-link{
    color: #2c3e50;
    text-decoration: none;
}

</style>