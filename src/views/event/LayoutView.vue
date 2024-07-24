<script setup lang="ts">
import {ref, onMounted, defineProps} from 'vue'
import EventService from '@/services/EventService';
import {type Event} from '@/types'
import { useRouter } from 'vue-router';


const event = ref<Event | null>(null)
const router = useRouter()
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

onMounted(()=>{
    EventService.getEvent(parseInt(props.id))
    .then((response) => {
        event.value = response.data
    })
    .catch((error) => {
        if(error.response && error.response.status === 404){
            router.push({
            name: '404-resource-view',
            params: {resource: 'event'}
        })
        }else{
            router.push({name: 'network-error-view'})
        }
       
       
    })
})


</script>
<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
       <nav>
            <router-link :to="{ name: 'event-detail-view'}">
                >Details 
            </router-link> |
            <router-link :to="{ name: 'event-register-view'}">
                >Register 
            </router-link> |
            <router-link :to="{ name: 'event-edit-view'}">
                >Edit
            </router-link> 
        </nav>
       <RouterView :event="event"></RouterView>
    </div>
</template>