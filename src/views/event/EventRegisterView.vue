<script setup lang="ts">
import {ref} from 'vue'
import {type EventItem} from '@/type'
import type { PropType } from 'vue';

const props = defineProps({
    event:{
        type: Object as PropType<EventItem>,
            require: true
    }
})
</script>
<template>

       <p>Registration from here</p>
 
</template>