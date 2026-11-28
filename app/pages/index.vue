<script setup lang="ts">
import { ref } from 'vue';


const imageError = ref(false);
const props = defineProps<{
  poster: {
    url: string
    width: number
    height: number
  }
}>()



watch(

  () => props.poster ? url,
  () => {
    imageError.value = false
  }


)


</script>

<template>

  <div class="poster">


    <NuxtImg v-if="poster?.url && !imageError" :src="poster.url" alt="Movie poster" class="poster-image" loading="lazy"
      @error="imageError = true" />



    <div v-else class="poster-placeholder">
      <span>Poster unavailable</span>
    </div>
  </div>



</template>

<style scoped></style>