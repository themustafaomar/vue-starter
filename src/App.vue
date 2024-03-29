<template>
  <v-app>
    <!-- Don't modify this unless you know what you're doing -->
    <!-- This applied to all pages of the app, no matter which layout you're using.. -->
    <RouterView />
  </v-app>
</template>

<script setup>
import { nextTick, watch, onBeforeMount } from 'vue'
import { useTheme, useLocale } from 'vuetify'
import { useAppStore } from './stores/app'

const appStore = useAppStore()
const { current } = useLocale()
const theme = useTheme()

onBeforeMount(() => {
  theme.global.name.value = appStore.mode
  current.value = appStore.locale.current
})

watch(theme.global.name, () => themeTransition())

// Source: Vuetify docs
function themeTransition() {
  const x = performance.now()
  for (let i = 0; i++ < 1e7; (i << 9) & ((9 % 9) * 9 + 9));
  if (performance.now() - x > 10) return

  const el = document.querySelector('[data-v-app]')
  if (!el) return
  const children = el.querySelectorAll('*')

  children.forEach((el) => {
    if (hasScrollbar(el)) {
      el.dataset.scrollX = String(el.scrollLeft)
      el.dataset.scrollY = String(el.scrollTop)
    }
  })

  const copy = el.cloneNode(true)
  copy.classList.add('app-copy')
  const rect = el.getBoundingClientRect()
  copy.style.top = rect.top + 'px'
  copy.style.left = rect.left + 'px'
  copy.style.width = rect.width + 'px'
  copy.style.height = rect.height + 'px'

  const targetEl = document.activeElement
  const targetRect = targetEl.getBoundingClientRect()
  const left = targetRect.left + targetRect.width / 2 + window.scrollX
  const top = targetRect.top + targetRect.height / 2 + window.scrollY
  el.style.setProperty('--clip-pos', `${left}px ${top}px`)
  el.style.removeProperty('--clip-size')

  nextTick(() => {
    el.classList.add('app-transition')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.setProperty(
          '--clip-size',
          Math.hypot(window.innerWidth, window.innerHeight) + 'px'
        )
      })
    })
  })

  document.body.append(copy)

  copy.querySelectorAll('[data-scroll-x], [data-scroll-y]').forEach((el) => {
    el.scrollLeft = +el.dataset.scrollX
    el.scrollTop = +el.dataset.scrollY
  })

  function onTransitionend(e) {
    if (e.target === e.currentTarget) {
      copy.remove()
      el.removeEventListener('transitionend', onTransitionend)
      el.removeEventListener('transitioncancel', onTransitionend)
      el.classList.remove('app-transition')
      el.style.removeProperty('--clip-size')
      el.style.removeProperty('--clip-pos')
    }
  }

  el.addEventListener('transitionend', onTransitionend)
  el.addEventListener('transitioncancel', onTransitionend)
}

function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return (
    style.overflowY === 'scroll' ||
    (style.overflowY === 'auto' && el.scrollHeight > el.clientHeight)
  )
}
</script>

<style lang="sass">
// Vuetify adds a scrollbar by default
// we don't do that here :]
html
  overflow-y: auto !important

// Theme transition
.app-copy
  position: fixed !important
  z-index: -1 !important
  pointer-events: none !important
  contain: size style !important
  overflow: clip !important

.app-transition
  --clip-size: 0
  --clip-pos: 0 0
  clip-path: circle(var(--clip-size) at var(--clip-pos))
  transition: clip-path .35s ease-out
</style>
