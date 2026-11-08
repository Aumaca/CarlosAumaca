<script setup>
import { onMounted } from 'vue'
import { tns } from 'tiny-slider'

const props = defineProps({
  index: Number,
  project: {
    name: String,
    url: String,
    badges: Array,
    desktopImages: Array,
    mobileImages: Array,
    description: {
      en: String,
      pt: String
    }
  },
  getDescription: {
    type: Function
  }
})

let totalImages = 0
if (props.project.desktopImages.length > 0) totalImages += props.project.desktopImages.length
if (props.project.mobileImages.length > 0) totalImages += props.project.mobileImages.length

const getImageUrl = (name) => {
  return new URL(`../assets/media/${name}`, import.meta.url).href
}

onMounted(() => {
  tns({
    container: `.my-slider${props.index + 1}`,
    items: totalImages,
    slideBy: 1,
    autoplay: true,
    autoWidth: true,
    nav: false,
    controls: false,
    autoplayButtonOutput: false,
    mouseDrag: true
  })
})
</script>

<template>
  <div class="p-3">
    <!-- Slider -->
    <div :class="'my-slider' + (index + 1) + ' w-full h-64'">
      <!-- Desktop Images -->
      <img
        v-for="(image, imgIndex) in project.desktopImages"
        :key="imgIndex"
        :src="getImageUrl(image)"
        :alt="'Slide ' + (imgIndex + 1)"
        class="w-full h-full object-cover rounded-t-lg"
      />

      <!-- Mobile Images -->
      <img
        v-for="(image, imgIndex) in project.mobileImages"
        :key="imgIndex"
        :src="getImageUrl(image)"
        :alt="'Slide ' + (imgIndex + 1)"
        class="w-full h-full object-contain"
      />
    </div>

    <div class="content bg-white p-3 rounded-bl-lg rounded-br-lg">
      <!-- Name -->
      <a v-if="project.url" :href="project.url" target="_blank">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-bold">{{ project.name }}</h3>
          <i v-if="project.url" class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
        </div>
      </a>

      <!-- Name -->
      <div v-else>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-bold">{{ project.name }}</h3>
        </div>
      </div>

      <!-- Tags -->
      <div class="tags flex py-3">
        <ul class="flex flex-wrap gap-2">
          <template v-for="(badgeUrl, index) in project.badges" :key="index">
            <li class="tag">
              <img :src="badgeUrl" alt="Badge" />
            </li>
          </template>
        </ul>
      </div>

      <!-- Description -->
      <template
        v-for="(paragraph, index) in getDescription(project.description).split('\n')"
        :key="index"
      >
        <p>{{ paragraph }}</p>
        <br v-if="index !== project.description.en.split('\n').length - 1" />
      </template>

      <!-- Download APK -->
      <div v-if="project.file" class="pt-3 w-fit">
        <a :href="project.file" target="_blank">
          <button class="bg-green-500 p-3 rounded">
            <p class="flex items-center font-bold text-white">
              Download APK <span class="text-xs px-1 pe-4">(Google Drive)</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="vertical-align: middle; margin-right: 5px"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
