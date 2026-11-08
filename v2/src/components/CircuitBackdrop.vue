<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const spot = ref(null)

let raf = 0
let x = 0
let y = 0
let targetX = 0
let targetY = 0

const SPOT_RADIUS = 280

const follow = () => {
  x += (targetX - x) * 0.09
  y += (targetY - y) * 0.09
  spot.value.style.transform = `translate3d(${x - SPOT_RADIUS}px, ${y - SPOT_RADIUS}px, 0)`
  raf = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.4 ? requestAnimationFrame(follow) : 0
}

const onPointerMove = (event) => {
  targetX = event.clientX
  targetY = event.clientY
  spot.value.style.opacity = 1
  if (!raf) raf = requestAnimationFrame(follow)
}

const canFollow = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (!canFollow()) return
  x = targetX = window.innerWidth / 2
  y = targetY = window.innerHeight / 2
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <div class="backdrop" aria-hidden="true">
    <div class="backdrop__glow"></div>
    <div class="backdrop__traces"></div>

    <!-- Lights travelling through the same circuit pattern -->
    <div class="backdrop__live">
      <div class="backdrop__signal backdrop__signal--a"></div>
      <div class="backdrop__signal backdrop__signal--b"></div>
      <div ref="spot" class="backdrop__spot"></div>
    </div>

    <div class="backdrop__vignette"></div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.backdrop__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(70% 55% at 50% -12%, rgba(37, 91, 255, 0.2), transparent 70%),
    radial-gradient(45% 40% at 100% 100%, rgba(132, 250, 176, 0.035), transparent 70%);
}

.backdrop__traces,
.backdrop__live {
  position: absolute;
  inset: 0;
}

.backdrop__traces {
  background: url('../assets/circuit.svg') 0 0 / 304px 304px;
  opacity: 0.045;
}

.backdrop__live {
  -webkit-mask: url('../assets/circuit.svg') 0 0 / 304px 304px;
  mask: url('../assets/circuit.svg') 0 0 / 304px 304px;
}

.backdrop__signal,
.backdrop__spot {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform;
}

.backdrop__signal {
  width: 44vmax;
  height: 44vmax;
  opacity: 0.2;
}

.backdrop__signal--a {
  background: radial-gradient(closest-side, rgba(132, 250, 176, 0.55), transparent);
  animation: drift-a 26s ease-in-out infinite alternate;
}

.backdrop__signal--b {
  background: radial-gradient(closest-side, rgba(143, 211, 244, 0.5), transparent);
  animation: drift-b 34s ease-in-out infinite alternate;
}

.backdrop__spot {
  width: 560px;
  height: 560px;
  opacity: 0;
  background: radial-gradient(closest-side, rgba(132, 250, 176, 0.4), transparent);
  transition: opacity 0.6s ease;
}

.backdrop__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(6, 7, 11, 0.75));
}

@keyframes drift-a {
  from {
    transform: translate3d(-18vmax, -10vmax, 0);
  }
  to {
    transform: translate3d(72vw, 44vh, 0);
  }
}

@keyframes drift-b {
  from {
    transform: translate3d(80vw, 62vh, 0);
  }
  to {
    transform: translate3d(-12vmax, 8vh, 0);
  }
}
</style>
