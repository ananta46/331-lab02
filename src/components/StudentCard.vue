<script setup lang="ts">
import { ref } from 'vue'
import { type Student } from '@/types'
defineProps<{
  student: Student
}>()
// {
//     "id": 1,
//     "studentId": "SE-001",
//     "name": "Prayuth",
//     "surname": "The minister",
//     "gpa": 3.59,
//     "image": "https://firebasestorage.googleapis.com/v0/b/publicimage-41deb.appspot.com/o/tu.jpg?alt="penAmount": 15,
//     "description": "The great man ever!!!!"
// },
</script>

<template>
  <div class="student-class">
    <div class="student-card">
      <h4>{{ student.id }} : {{ student.studentId }}</h4>
      <h2>{{ student.name }}</h2>
      <span>"{{ student.description }}"</span><br />
      <span>gpa : {{ student.gpa }}</span>
    </div>
  </div>
</template>

<style scoped>
.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
