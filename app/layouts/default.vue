<template>
  <section dir="rtl" class="flex min-h-screen flex-col bg-black text-right text-zinc-100">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-red-600 focus:px-4 focus:py-2 focus:text-white"
    >
      پرش به محتوا
    </a>

    <!-- هدر بی‌رنگ با خط درخشان پایین -->
    <header class="sticky top-0 z-40 bg-transparent">
      <nav
        aria-label="منوی اصلی"
        class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4"
      >
        <!-- لوگو -->
        <NuxtLink
          to="/"
          class="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <span class="relative flex h-3 w-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/60 motion-reduce:animate-none"></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
          </span>
          <span class="text-xl font-black tracking-tight text-white transition group-hover:text-red-400">
            لوگو
          </span>
        </NuxtLink>

        <!-- دسکتاپ -->
        <ul class="hidden flex-1 items-center gap-8 md:flex">
          <li v-for="item in links" :key="item.to">
            <NuxtLink
              :to="item.to"
              exact-active-class="!text-white after:!w-full"
              :class="item.cta ? ctaClass : linkClass"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- دکمه منوی موبایل -->
        <button
          ref="toggleBtn"
          type="button"
          class="group flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 transition hover:border-red-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:hidden"
          :aria-expanded="isOpen"
          aria-controls="mobile-drawer"
          aria-label="باز کردن منو"
          @click="openMenu"
        >
          <span class="h-0.5 w-5 rounded bg-white transition group-hover:bg-red-400"></span>
          <span class="h-0.5 w-3 self-end rounded bg-red-500 transition-all group-hover:w-5 ml-3"></span>
          <span class="h-0.5 w-5 rounded bg-white transition group-hover:bg-red-400"></span>
        </button>
      </nav>

      <!-- خط درخشان زیر هدر -->
      <div class="h-px w-full bg-gradient-to-l from-transparent via-red-600/70 to-transparent"></div>
    </header>

    <!-- پس‌زمینه تیره‌ی منو (بیرون از header تا backdrop-filter مشکل ایجاد نکند) -->
    <div
      class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:hidden"
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      aria-hidden="true"
      @click="closeMenu"
    ></div>

    <!-- منوی کشویی از راست -->
    <aside
      id="mobile-drawer"
      ref="drawer"
      role="dialog"
      aria-modal="true"
      aria-label="منوی اصلی موبایل"
      :inert="!isOpen"
      class="fixed inset-y-0 right-0 z-[60] flex w-[82%] max-w-sm flex-col overflow-hidden border-l border-red-600/30 bg-zinc-950 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden"
      :class="isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'"
      @keydown.esc="closeMenu"
      @keydown.tab="trapFocus"
    >
      <!-- درخشش قرمز پس‌زمینه -->
      <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl"></div>

      <!-- نوار فیلم در لبه‌ی چپ -->
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-3 opacity-40"
        style="background-image: repeating-linear-gradient(to bottom, transparent 0 10px, #dc2626 10px 18px, transparent 18px 28px); background-size: 6px 28px; background-repeat: repeat-y; background-position: center;"
        aria-hidden="true"
      ></div>

      <!-- سربرگ منو -->
      <div class="relative flex items-center justify-between px-6 pb-4 pt-5">
        <span class="text-xs font-medium tracking-widest text-red-500">منو</span>
        <button
          ref="closeBtn"
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-200 transition hover:rotate-90 hover:border-red-500 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 motion-reduce:hover:rotate-0"
          aria-label="بستن منو"
          @click="closeMenu"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <!-- لینک‌ها -->
      <ul class="relative flex flex-1 flex-col justify-center gap-1 px-6">
        <li
          v-for="(item, i) in links.filter((l) => !l.cta)"
          :key="item.to"
          class="transition-all duration-500 motion-reduce:transition-none"
          :class="isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'"
          :style="{ transitionDelay: isOpen ? `${150 + i * 70}ms` : '0ms' }"
        >
          <NuxtLink
            :to="item.to"
            exact-active-class="!text-white [&_.num]:!text-red-500"
            class="group flex items-baseline gap-4 rounded-xl border-b border-white/5 py-4 text-3xl font-extrabold text-zinc-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span class="num text-sm font-medium text-zinc-600 transition group-hover:text-red-500">
              {{ toFa(i + 1) }}
            </span>
            <span class="transition-transform group-hover:-translate-x-2 motion-reduce:transform-none">
              {{ item.label }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <!-- دکمه‌ی قرمز پایین منو -->
      <div
        class="relative px-6 pb-8 pt-4 transition-all duration-500 motion-reduce:transition-none"
        :class="isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        :style="{ transitionDelay: isOpen ? '500ms' : '0ms' }"
      >
        <NuxtLink
          v-for="item in links.filter((l) => l.cta)"
          :key="item.to"
          :to="item.to"
          :class="ctaClass + ' flex w-full items-center justify-center gap-2 py-3 text-base'"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.4 1 4.2 2.3h2.8c.8-1.3 2.2-2.3 4.2-2.3 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
          </svg>
          {{ item.label }}
        </NuxtLink>
      </div>
    </aside>

    <main id="main" class="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
      <slot />
    </main>

    <footer>
      <div class="h-px w-full bg-gradient-to-l from-transparent via-red-600/40 to-transparent"></div>
      <nav
        aria-label="منوی پایین صفحه"
        class="mx-auto flex max-w-7xl flex-wrap items-center justify-start gap-x-8 gap-y-2 px-4 py-6 text-sm text-zinc-400"
      >
        <NuxtLink to="/about" class="rounded transition hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">درباره پروژه</NuxtLink>
        <NuxtLink to="/" class="rounded transition hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">لینک صفحات اصلی</NuxtLink>
        <NuxtLink to="/credits" class="rounded transition hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">توضیح منابع</NuxtLink>
      </nav>
    </footer>
  </section>
</template>

<script setup>
const links = [
  { label: 'خانه', to: '/' },
  { label: 'فیلم‌ها', to: '/movies' },
  { label: 'سریال‌ها', to: '/series' },
  { label: 'جستجو', to: '/search' },
  { label: 'مورد علاقه‌ها', to: '/favorites', cta: true },
]

const isOpen = ref(false)
const toggleBtn = ref(null)
const closeBtn = ref(null)
const drawer = ref(null)
const route = useRoute()

const toFa = (n) => String(n).padStart(2, '0').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])

const openMenu = async () => {
  isOpen.value = true
  await nextTick()
  closeBtn.value?.focus()
}

const closeMenu = () => {
  if (!isOpen.value) return
  isOpen.value = false
  toggleBtn.value?.focus()
}

// نگه داشتن فوکوس کیبورد داخل منو
const trapFocus = (e) => {
  const focusables = drawer.value?.querySelectorAll('a[href], button:not([disabled])')
  if (!focusables?.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

// قفل اسکرول صفحه وقتی منو بازه
watch(isOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})

// با تغییر صفحه منو بسته شود
watch(() => route.fullPath, () => { isOpen.value = false })

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const linkClass =
  'relative rounded-md py-1 text-sm font-medium text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 after:absolute after:-bottom-1 after:right-0 after:h-0.5 after:w-0 after:rounded after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full'
const ctaClass =
  'rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500 active:scale-95 active:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
</script>
