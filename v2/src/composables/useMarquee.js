import { onBeforeUnmount } from 'vue'

const MAX_THROW = 1100

/**
 * Endless, draggable image strip.
 * Runs on transforms only, eases in and out of hover, and sleeps while off-screen.
 * `track` must hold two identical children.
 */
export function useMarquee(viewport, track, { speed = 28 } = {}) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cruise = reduced ? 0 : speed

  let raf = 0
  let lastFrame = 0
  let offset = 0
  let velocity = cruise
  let target = cruise
  let loopWidth = 0
  let dragging = false
  let pointerX = 0
  let pointerTime = 0
  let throwVelocity = 0
  let visibility = null
  let resize = null

  const paint = () => {
    if (!track.value || loopWidth <= 0) return
    offset = ((offset % loopWidth) + loopWidth) % loopWidth
    track.value.style.transform = `translate3d(${-offset}px, 0, 0)`
  }

  const frame = (now) => {
    const dt = Math.min((now - lastFrame) / 1000, 0.05)
    lastFrame = now

    if (!dragging) {
      velocity += (target - velocity) * (1 - Math.exp(-dt * 3.5))
      offset += velocity * dt
    }

    paint()
    raf = requestAnimationFrame(frame)
  }

  const run = () => {
    if (raf) return
    lastFrame = performance.now()
    raf = requestAnimationFrame(frame)
  }

  const sleep = () => {
    cancelAnimationFrame(raf)
    raf = 0
  }

  const onPointerEnter = (event) => {
    if (event.pointerType === 'mouse') target = 0
  }

  const onPointerLeave = (event) => {
    if (event.pointerType === 'mouse' && !dragging) target = cruise
  }

  const onPointerDown = (event) => {
    dragging = true
    pointerX = event.clientX
    pointerTime = event.timeStamp
    throwVelocity = 0
    velocity = 0
    viewport.value.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!dragging) return
    const dx = event.clientX - pointerX
    const dt = Math.max(event.timeStamp - pointerTime, 1) / 1000
    offset -= dx
    throwVelocity = -dx / dt
    pointerX = event.clientX
    pointerTime = event.timeStamp
  }

  const onPointerUp = (event) => {
    if (!dragging) return
    dragging = false
    const idle = event.timeStamp - pointerTime > 90
    velocity = idle ? 0 : Math.max(-MAX_THROW, Math.min(MAX_THROW, throwVelocity))
    if (event.pointerType !== 'mouse') target = cruise
  }

  const start = () => {
    const firstGroup = track.value?.firstElementChild
    if (!firstGroup) return

    resize = new ResizeObserver(() => {
      loopWidth = firstGroup.getBoundingClientRect().width
    })
    resize.observe(firstGroup)

    visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) run()
      else sleep()
    })
    visibility.observe(viewport.value)
  }

  onBeforeUnmount(() => {
    sleep()
    resize?.disconnect()
    visibility?.disconnect()
  })

  return {
    start,
    handlers: {
      pointerenter: onPointerEnter,
      pointerleave: onPointerLeave,
      pointerdown: onPointerDown,
      pointermove: onPointerMove,
      pointerup: onPointerUp,
      pointercancel: onPointerUp
    }
  }
}
