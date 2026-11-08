<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { roundedPath } from '@/utils/geometry'

const WIDTH = 1600
const HEIGHT = 240
const CENTER = WIDTH / 2
const SPREAD = 150
const REACH = 5
const NODE_Y = HEIGHT - 8
const FAN_RADIUS = 170
const FAN_STEP = (15 * Math.PI) / 180

// Traces start spread across the page, then fan into the node. Outer traces turn lower, so none cross.
const traces = Array.from({ length: REACH * 2 + 1 }, (_, position) => {
  const step = position - REACH
  const distance = Math.abs(step)
  const startX = CENTER + step * SPREAD
  const fanX = CENTER + FAN_RADIUS * Math.sin(step * FAN_STEP)
  const turnY = NODE_Y - FAN_RADIUS * Math.cos(step * FAN_STEP)

  return {
    id: step,
    path: roundedPath(
      step === 0
        ? [
            [startX, 0],
            [CENTER, NODE_Y]
          ]
        : [
            [startX, 0],
            [startX, turnY],
            [fanX, turnY],
            [CENTER, NODE_Y]
          ],
      14
    ),
    duration: 3.8 + (distance % 3) * 0.8,
    delay: -((position * 0.73) % 4)
  }
})

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
  <div ref="root" class="signal" :class="{ 'is-active': isActive }" aria-hidden="true">
    <svg :viewBox="`0 0 ${WIDTH} ${HEIGHT}`" preserveAspectRatio="xMidYMax slice">
      <path v-for="trace in traces" :key="trace.id" class="signal__trace" :d="trace.path" />

      <path
        v-for="trace in traces"
        :key="`pulse-${trace.id}`"
        class="signal__pulse"
        :d="trace.path"
        pathLength="1"
        :style="{ animationDuration: `${trace.duration}s`, animationDelay: `${trace.delay}s` }"
      />

      <circle class="signal__halo" :cx="CENTER" :cy="NODE_Y" r="8" />
      <circle class="signal__node" :cx="CENTER" :cy="NODE_Y" r="3.5" />
    </svg>
  </div>
</template>

<style scoped>
.signal {
  height: clamp(130px, 16vw, 240px);
  -webkit-mask: linear-gradient(180deg, transparent, #000 40%);
  mask: linear-gradient(180deg, transparent, #000 40%);
}

.signal svg {
  width: 100%;
  height: 100%;
}

.signal__trace,
.signal__pulse {
  fill: none;
}

.signal__trace {
  stroke: rgba(255, 255, 255, 0.13);
  stroke-width: 1;
}

.signal__pulse {
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 0.04 0.96;
  stroke-dashoffset: 1;
  animation: signal-flow linear infinite;
  animation-play-state: paused;
}

.signal__node {
  fill: var(--text);
}

.signal__halo {
  fill: none;
  stroke: var(--text);
  stroke-width: 1;
  transform-box: fill-box;
  transform-origin: center;
  animation: signal-halo 3s var(--ease) infinite;
  animation-play-state: paused;
}

.is-active .signal__pulse,
.is-active .signal__halo {
  animation-play-state: running;
}

@keyframes signal-flow {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes signal-halo {
  from {
    opacity: 0.6;
    transform: scale(0.6);
  }
  to {
    opacity: 0;
    transform: scale(2.6);
  }
}
</style>
