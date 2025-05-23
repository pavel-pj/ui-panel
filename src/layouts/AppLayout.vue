<template>
  <body class="grid grid-cols-12 max-w-7xl gap-4 h-screen mx-auto">
  <div class="col-span-2 bg-lime-200">
    Меню
  </div>
  <div class="col-span-8 bg-red-200">
    <slot></slot>
  </div>
  <div class="col-span-2 bg-blue-200">
    Праваое
  </div>
  </body>
</template>

<script setup lg="ts">
import { defineEmits } from 'vue';

const name = 'AppLayout';

defineOptions({
  name: 'AppLayout'
});
</script>
