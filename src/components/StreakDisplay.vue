<template>
  <div class="flex items-center gap-4">
    <!-- Current Streak -->
    <div class="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-lg">
      <span class="text-2xl">🔥</span>
      <div>
        <p class="text-xs text-gray-600">Sequência Atual</p>
        <p class="text-xl font-bold text-yellow-600">{{ currentStreak }}</p>
      </div>
    </div>

    <!-- Longest Streak (opcional, pode ser removido da header) -->
    <div class="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
      <span class="text-2xl">👑</span>
      <div>
        <p class="text-xs text-gray-600">Melhor Sequência</p>
        <p class="text-xl font-bold text-purple-600">{{ longestStreak }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFlashcardsStore } from '../stores/flashcards'

const store = useFlashcardsStore()

const currentStreak = computed(() => store.currentStreak)
const longestStreak = computed(() => store.longestStreak)
</script>

<style scoped>
/* Sem estilos adicionais necessários */
</style>
