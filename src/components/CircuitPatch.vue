<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref(null)
const isActive = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    isActive.value = entry.isIntersecting
  })
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="root" class="patch" :class="{ 'is-active': isActive }" aria-hidden="true">
    <div class="patch__traces"></div>
    <div class="patch__live">
      <div class="patch__signal"></div>
    </div>
  </div>
</template>

<style scoped>
/* A fading island of the circuit pattern. The parent decides where it sits and how large it is. */
.patch {
  position: absolute;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask: radial-gradient(closest-side, #000 15%, transparent);
  mask: radial-gradient(closest-side, #000 15%, transparent);
}

.patch__traces,
.patch__live {
  position: absolute;
  inset: 0;
}

.patch__traces {
  background: url('../assets/circuit.svg') center / 304px 304px;
  opacity: 0.05;
}

.patch__live {
  -webkit-mask: url('../assets/circuit.svg') center / 304px 304px;
  mask: url('../assets/circuit.svg') center / 304px 304px;
}

.patch__signal {
  position: absolute;
  top: 0;
  left: 0;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.2), transparent);
  will-change: transform;
  animation: patch-drift 22s ease-in-out infinite alternate;
  animation-play-state: paused;
}

.is-active .patch__signal {
  animation-play-state: running;
}

@keyframes patch-drift {
  from {
    transform: translate3d(-20%, -10%, 0);
  }
  to {
    transform: translate3d(110%, 60%, 0);
  }
}
</style>
