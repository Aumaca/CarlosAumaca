<script setup>
import { web, database, mobile, others, languages } from '../utils/knowledge'
</script>

<template>
  <section id="knowledge" class="mt-10 sm:px-28 md:px-16 xl:px-28">
    <div class="pb-5 ps-5">
      <h2 class="text-4xl text-left font-bold gradient-text title-slide">{{ $t('knowledge') }}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <!-- Category -->
      <div class="bg-white flex flex-col rounded-lg m-5 p-3">
        <h3 class="text-center p-3 font-bold">{{ $t('languages') }}</h3>
        <div class="tags flex justify-center py-3">
          <div class="flex flex-wrap justify-center gap-3">
            <img v-for="(image, index) in languages" v-bind:key="index" :src="image" class="w-10" />
          </div>
        </div>
      </div>

      <!-- Category -->
      <div class="bg-white flex flex-col rounded-lg m-5 p-3">
        <h3 class="text-center p-3 font-bold">{{ $t('webDevelopment') }}</h3>
        <div class="tags flex justify-center py-3">
          <div class="flex flex-wrap justify-center gap-3">
            <img v-for="(image, index) in web" v-bind:key="index" :src="image" class="w-10" />
          </div>
        </div>
      </div>

      <!-- Category -->
      <div class="bg-white flex flex-col rounded-lg m-5 p-3">
        <h3 class="text-center p-3 font-bold">Mobile</h3>
        <div class="tags flex justify-center py-3">
          <div class="flex flex-wrap justify-center gap-3">
            <img v-for="(image, index) in mobile" v-bind:key="index" :src="image" class="w-10" />
          </div>
        </div>
      </div>

      <!-- Category -->
      <div class="bg-white flex flex-col rounded-lg m-5 p-3">
        <h3 class="text-center p-3 font-bold">{{ $t('database') }}</h3>
        <div class="tags flex justify-center py-3">
          <div class="flex flex-wrap justify-center gap-3">
            <img v-for="(image, index) in database" v-bind:key="index" :src="image" class="w-10" />
          </div>
        </div>
      </div>

      <!-- Category -->
      <div class="bg-white flex flex-col rounded-lg m-5 p-3">
        <h3 class="text-center p-3 font-bold">{{ $t('others') }}</h3>
        <div class="tags flex justify-center py-3">
          <div class="flex flex-wrap justify-center gap-3">
            <img v-for="(image, index) in others" v-bind:key="index" :src="image" class="w-10" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <svg
    class="-mb-6 sm:-mb-10 md:-mb-12 lg:-mb-16 xl:-mb-26"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="#ffffff"
      fill-opacity="1"
      d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,170.7C672,171,768,213,864,197.3C960,181,1056,107,1152,101.3C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
</template>
