<script setup>
import { ref  } from "vue";
const iter =  ref(1);

const add = ()=> {
  iter.value += 1;
}
</script>

<template>
  <div class="h-24 w-24 m-6 bg-red-400">
    Hellorrwer
  </div>
  <button @click="add">
    Увеличить
  </button>
  <div>{{ iter }}</div>
  qwer
</template>