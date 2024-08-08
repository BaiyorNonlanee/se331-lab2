<script setup lang="ts">
import {toRefs} from 'vue'
import {type Event} from '@/types'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
    event: Event
    id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {event} = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
    store.updateMessage('You are succesfully registered for '+props.event.title)
    setTimeout(() => {
        store.resetMessage()
    }, 3000)
    router.push({name: 'event-detail-view', params: {id: props.event.id}})
}
</script>
<template>
   
        <p>Register event here</p>
        <button @click="register" class="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">Register</button>
      
</template>