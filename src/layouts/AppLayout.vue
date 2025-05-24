<template>
<body class="h-screen bg-slate-100">
    <div class="grid grid-cols-6 h-full gap-4 p-6">
      <div class="col-span-1 pt-4">
        <div class="text-left font-bold">Admin Panel</div>
      </div>
      <div class="col-span-5 ">
        <div class="bg-white rounded-xl h-full shadow-md">
          <main>
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>
</body>
</template>
