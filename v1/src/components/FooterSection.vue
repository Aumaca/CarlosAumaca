<template>
  <footer class="w-100 border-t-4 border-emerald-300">
    <div class="bg-black p-3 flex flex-col justify-center gap-3">
      <div class="flex items-center justify-center gap-3">
        <i class="fa-solid fa-code text-blue-500"></i>
        <p class="text-center text-white text-xs">{{ $t('developedBy') }}</p>
      </div>
      <p class="text-white text-center text-xs">&copy; {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>
