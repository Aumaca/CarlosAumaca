import { onBeforeUnmount, ref } from 'vue'

export function useTypewriter({ hold = 1500, gap = 420, startDelay = 1000 } = {}) {
  const text = ref('')
  let timer = 0
  let lines = []
  let lineIndex = 0

  const stop = () => clearTimeout(timer)

  const tick = (deleting) => {
    const full = lines[lineIndex % lines.length]
    text.value = deleting
      ? full.substring(0, text.value.length - 1)
      : full.substring(0, text.value.length + 1)

    if (!deleting && text.value === full) {
      timer = setTimeout(() => tick(true), hold)
    } else if (deleting && text.value === '') {
      lineIndex += 1
      timer = setTimeout(() => tick(false), gap)
    } else {
      const delay = deleting ? 28 + Math.random() * 18 : 58 + Math.random() * 56
      timer = setTimeout(() => tick(deleting), delay)
    }
  }

  const start = (nextLines, delay = startDelay) => {
    stop()
    lines = nextLines
    lineIndex = 0
    text.value = ''

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      text.value = lines[0]
      return
    }

    timer = setTimeout(() => tick(false), delay)
  }

  onBeforeUnmount(stop)

  return { text, start }
}
