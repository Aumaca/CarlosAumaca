<script setup>
defineProps({
  currentLanguage: String,
  changeLanguage: {
    type: Function
  }
})
</script>

<template>
  <div
    class="fixed flex flex-col gap-3 top-1/2 transform -translate-y-1/2 ml-1 z-10 bg-white bg-opacity-70 p-3 pr-1 rounded-xl slide-in"
  >
    <!-- Flag EN -->
    <div class="flex">
      <span
        class="fi fi-us text-3xl rounded-lg cursor-pointer mt-2"
        @click="changeLanguage('en')"
      ></span>
      <div v-if="currentLanguage === 'en'" class="z-10 -ml-2">
        <i class="fa-solid fa-circle-check text-green-500"></i>
      </div>
    </div>
    <!-- Flag BR -->
    <div class="flex">
      <span
        class="fi fi-br text-3xl rounded-lg cursor-pointer mt-2"
        @click="changeLanguage('pt')"
      ></span>
      <div v-if="currentLanguage === 'pt'" class="z-10 -ml-2">
        <i class="fa-solid fa-circle-check text-green-500"></i>
      </div>
    </div>
  </div>
</template>

<style>
.slide-in {
  animation: slide-in 1s forwards;
}

@keyframes slide-in {
  0% {
    transform: translate(-100%, -100%); /* Start off-screen to the left */
    opacity: 0; /* Start transparent */
  }
  100% {
    transform: translate(0%, -100%); /* Move to its original position */
    opacity: 1; /* Fully visible */
  }
}
</style>
