<script setup lang="ts">
import {toRefs, defineProps} from 'vue'
import {type Event} from '@/types'
// import { error } from 'console';

const props = defineProps<{
    event: Event
    id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {event} = toRefs(props)

</script>

<template>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>

</template>