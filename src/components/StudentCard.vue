<script setup lang="ts">
import type { Student } from '@/types'
defineProps<{
    student: Student
}>()
</script>

<template>
    <div class="student-class">
       <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp">
           <h2>{{ student.name }} {{ student.surname }}</h2>
           <p>{{ student.gpa }}</p>
       </div>
    </div>
   </template>
