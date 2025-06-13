<script setup lang="ts">
import LeftSideBar from '@/components/LeftSideBar.vue';
import TopPanel from '@/components/TopPanel.vue';
</script>
<template>
<body class="h-screen bg-slate-100">
    <div class="grid grid-cols-6 h-full gap-4 p-6">
      <div class="col-span-1 pt-4">
        <div class="text-left font-bold">
           <LeftSideBar />
        </div>
      </div>
      <div class="col-span-5 ">
        <div class="bg-white rounded-xl h-full shadow-md border-bottom-1">
          <main >
            <div class="border-b-1 border-gray-300">
            <TopPanel />
          </div>
              <section class="p-8">
              <router-view></router-view>
          </section>
          </main>
        </div>
      </div>
    </div>
    <Toast />
   <ConfirmDialog></ConfirmDialog>
</body>
</template>
