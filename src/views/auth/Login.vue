<script setup lang="ts">
/*
import { ref } from 'vue';
import { useRouter } from 'vue-router';
 */
import  AuthForm  from '@/components/auth/AuthForm.vue';

//const router = useRouter();
const isReg = false;
</script>

<template>

  <AuthForm :isReg="isReg">

  </AuthForm>


</template>
