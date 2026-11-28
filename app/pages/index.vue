<script setup lang="ts">
import { ref , watch } from 'vue';


const imageError = ref(false);
const props = defineProps<{
  poster: {
    url: string
    width: number
    height: number
  }
}>()



watch(
  () => props.poster?.url,
  () => {
    imageError.value = false
  }
)


</script>

<template>
  <div
    class="group relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 transition duration-300 hover:ring-red-600/60 hover:shadow-lg hover:shadow-red-900/30"
  >
    <NuxtImg
      v-if="poster?.url && !imageError"
      :src="poster.url"
      :width="poster.width"
      :height="poster.height"
      alt="پوستر فیلم"
      loading="lazy"
      class="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none"
      @error="imageError = true"
    />

    <!-- حالت خطا یا نبودن پوستر -->
    <div
      v-else
      role="img"
      aria-label="پوستر در دسترس نیست"
      class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-900 to-black p-4 text-center text-zinc-500"
    >
      <svg
        class="h-10 w-10 text-red-600/70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
      </svg>
      <span class="text-sm">پوستر در دسترس نیست</span>
    </div>

    <!-- سایه‌ی ملایم پایین برای خوانایی متن‌هایی که بعداً روی پوستر می‌گذارید -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped></style>