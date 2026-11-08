<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { roundedPath } from '@v2/utils/geometry'

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
    duration: 3.4 + (distance % 3) * 0.7,
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
      <defs>
        <linearGradient
          id="signal-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          :y2="HEIGHT"
        >
          <stop offset="0" stop-color="#84fab0" />
          <stop offset="1" stop-color="#8fd3f4" />
        </linearGradient>
      </defs>

      <path v-for="trace in traces" :key="trace.id" class="signal__trace" :d="trace.path" />

      <path
        v-for="trace in traces"
        :key="`pulse-${trace.id}`"
        class="signal__pulse"
        :d="trace.path"
        pathLength="1"
        :style="{ animationDuration: `${trace.duration}s`, animationDelay: `${trace.delay}s` }"
      />

      <circle class="signal__node-halo" :cx="CENTER" :cy="HEIGHT - 8" r="8" />
      <circle class="signal__node" :cx="CENTER" :cy="HEIGHT - 8" r="4" />
    </svg>
  </div>
</template>

<style scoped>
.signal {
  height: clamp(130px, 16vw, 240px);
  margin-top: clamp(-2.5rem, -3vw, -1rem);
  -webkit-mask: linear-gradient(180deg, transparent, #000 30%);
  mask: linear-gradient(180deg, transparent, #000 30%);
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
  stroke: rgba(160, 200, 225, 0.24);
  stroke-width: 1.25;
}

.signal__pulse {
  stroke: url(#signal-gradient);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 0.05 0.95;
  stroke-dashoffset: 1;
  filter: drop-shadow(0 0 5px rgba(132, 250, 176, 0.7));
  animation: signal-flow linear infinite;
  animation-play-state: paused;
}

.is-active .signal__pulse {
  animation-play-state: running;
}

.signal__node {
  fill: var(--mint);
}

.signal__node-halo {
  fill: none;
  stroke: var(--mint);
  stroke-width: 1;
  transform-box: fill-box;
  transform-origin: center;
  animation: signal-halo 2.6s var(--ease-soft) infinite;
  animation-play-state: paused;
}

.is-active .signal__node-halo {
  animation-play-state: running;
}

@keyframes signal-flow {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes signal-halo {
  from {
    opacity: 0.8;
    transform: scale(0.6);
  }
  to {
    opacity: 0;
    transform: scale(2.6);
  }
}
</style>
