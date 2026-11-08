<script setup>
import { onMounted, watch, ref, nextTick } from 'vue'

const props = defineProps({
  circles: Array,
  currentLanguage: String
})

const typewriter = {
  en: [
    'Hello! I am Carlos.',
    'I am a Developer...',
    'I like challenges :)',
    'I love to see work done! \\O/'
  ],
  pt: [
    'Olá! Eu sou Carlos.',
    'Sou um desenvolvedor...',
    'Eu gosto de desafios :)',
    'Eu amo ver o trabalho feito! \\O/'
  ]
}

let typewriterInstance = null
const typewriterKey = ref(0) // Use a key to force re-rendering

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

  var that = this
  var delta = 200 - Math.random() * 100

  if (this.isDeleting) {
    delta /= 2
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false
    this.loopNum++
    delta = 500
  }

  setTimeout(function () {
    that.tick()
  }, delta)
}

const initializeTypeWriter = async () => {
  if (typewriterInstance) {
    typewriterInstance = null
  }

  await nextTick()

  const elements = document.getElementsByClassName('typewrite')
  for (let i = 0; i < elements.length; i++) {
    const toRotate = typewriter[props.currentLanguage]
    const period = elements[i].getAttribute('data-period')

    if (toRotate) {
      try {
        typewriterInstance = new TxtType(elements[i], toRotate, period)
      } catch (error) {
        console.error('Failed to initialize typewriter:', error)
      }
    }
  }
}

const initializeCursorBlinking = () => {
  if (!document.querySelector('#typewriter-style')) {
    const css = document.createElement('style')
    css.id = 'typewriter-style'
    css.type = 'text/css'
    css.innerHTML = `
      .typewrite > .wrap {
          border-right: 0.08em solid #fff;
          animation: blink 0.7s step-end infinite;
      }
      @keyframes blink {
          50% { border-color: transparent; }
      }
    `
    document.body.appendChild(css)
  }
}

onMounted(() => {
  initializeCursorBlinking()
  setTimeout(() => {
    initializeTypeWriter()
  }, 2000)
})

watch(
  () => props.currentLanguage,
  () => {
    typewriterKey.value += 1
    initializeTypeWriter()
  }
)
</script>

<template>
  <main class="h-full w-full overflow-hidden my-auto flex flex-col items-center" id="about-me">
    <!-- Picture and Typewriter -->
    <div class="w-screen flex flex-col items-center gap-3 sm:gap-12 text-center my-auto pt-12">
      <p class="font-bold gradient-text text-5xl sm:text-6xl tracking-in-expand">
        {{ $t('welcome') }}
      </p>

      <!-- Picture -->
      <img src="../assets/media/eu.jpg" class="w-72 rounded-full profile-pic" alt="User Image" />

      <!-- Typewriter -->
      <p class="text-white mt-5">
        <a class="typewrite text-xl sm:text-3xl" data-period="1000" :key="typewriterKey">
          <span class="wrap"></span>
        </a>
      </p>
    </div>

    <div class="flex my-auto">
      <!-- Social Icons -->
      <div class="flex gap-6">
        <a href="https://github.com/Aumaca" target="_blank">
          <i class="fa-brands fa-github text-white text-4xl hover:text-black"></i>
        </a>
        <a href="https://www.linkedin.com/in/carlos-mariano-cardoso/" target="_blank">
          <i class="fa-brands fa-linkedin text-white text-4xl hover:text-sky-500"></i>
        </a>
        <a href="https://www.youtube.com/@_aumaca" target="_blank">
          <i class="fa-brands fa-youtube text-white text-4xl hover:text-red-500"></i>
        </a>
        <a href="https://stackoverflow.com/users/19912446/c-aumaca" target="_blank">
          <i class="fa-brands fa-stack-overflow text-white text-4xl hover:text-orange-500"></i>
        </a>
        <a
          href="https://judge.beecrowd.com/en/profile/878874"
          class="hover:animate-bounce"
          target="_blank"
        >
          <img src="../assets/media/bee.png" class="w-9 h-9" alt="Bee Crowd Badge" />
        </a>
      </div>
    </div>

    <!-- Arrow Down -->
    <div class="absolute bottom-0 right-0 p-5 text-2xl animate-arrow">
      <i class="fa-solid fa-angles-down text-white"></i>
    </div>
  </main>
</template>
