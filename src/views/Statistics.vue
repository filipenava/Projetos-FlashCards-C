<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <button @click="$router.back()" class="text-primary hover:text-blue-700 mb-4">
        ← Voltar
      </button>
      
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Estatísticas de Estudo</h1>
        <button @click="resetProgress" class="btn bg-red-500 text-white hover:bg-red-600">
          Resetar Progresso
        </button>
      </div>

      <!-- Overview Cards -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="card text-center">
          <p class="text-4xl font-bold text-primary mb-2">{{ totalFlashcards }}</p>
          <p class="text-gray-600">Total de Cards</p>
        </div>
        
        <div class="card text-center">
          <p class="text-4xl font-bold text-secondary mb-2">{{ learnedFlashcards }}</p>
          <p class="text-gray-600">Aprendidos</p>
        </div>
        
        <div class="card text-center">
          <p class="text-4xl font-bold text-accent mb-2">{{ reviewCards }}</p>
          <p class="text-gray-600">Para Revisar</p>
        </div>
        
        <div class="card text-center">
          <p class="text-4xl font-bold text-purple-600 mb-2">{{ progressPercentage }}%</p>
          <p class="text-gray-600">Completude</p>
        </div>
      </div>

      <!-- Progress by Category -->
      <div class="card mb-8">
        <h2 class="text-2xl font-bold mb-6">Progresso por Categoria</h2>
        
        <div class="space-y-6">
          <div v-for="category in categories" :key="category.id">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-lg">{{ category.name }}</h3>
              <span class="text-sm text-gray-600">
                {{ category.completed }} / {{ category.count }} 
                ({{ Math.round((category.completed / category.count) * 100) }}%)
              </span>
            </div>
            
            <div class="w-full bg-gray-200 rounded-full h-4">
              <div 
                class="bg-gradient-to-r from-primary to-blue-600 h-4 rounded-full transition-all flex items-center justify-end pr-2"
                :style="{ width: (category.completed / category.count * 100) + '%' }"
              >
                <span v-if="category.completed / category.count > 0.15" class="text-xs text-white font-semibold">
                  {{ Math.round((category.completed / category.count) * 100) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <h2 class="text-2xl font-bold mb-6">Atividade Recente</h2>
        
        <div v-if="recentCards.length > 0" class="space-y-3">
          <div 
            v-for="card in recentCards" 
            :key="card.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p class="font-semibold">{{ card.question }}</p>
              <p class="text-sm text-gray-600">{{ card.categoryName }}</p>
            </div>
            <div class="text-right">
              <span 
                class="px-3 py-1 rounded-full text-sm font-semibold"
                :class="{
                  'bg-green-100 text-secondary': card.progress.status === 'learned',
                  'bg-yellow-100 text-yellow-700': card.progress.status === 'review',
                  'bg-blue-100 text-primary': card.progress.status === 'learning'
                }"
              >
                {{ getStatusText(card.progress.status) }}
              </span>
              <p class="text-xs text-gray-500 mt-1">
                {{ formatDate(card.progress.lastStudied) }}
              </p>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 text-gray-500">
          <p class="text-5xl mb-4">📚</p>
          <p>Nenhuma atividade ainda</p>
          <p class="text-sm">Comece a estudar para ver seu progresso aqui!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFlashcardsStore } from '../stores/flashcards'

const store = useFlashcardsStore()

const totalFlashcards = computed(() => store.totalFlashcards)
const learnedFlashcards = computed(() => store.learnedFlashcards)
const progressPercentage = computed(() => store.progressPercentage)
const categories = computed(() => store.categories)

const reviewCards = computed(() => {
  return Object.values(store.userProgress).filter(p => p.status === 'review').length
})

const recentCards = computed(() => {
  const cardsWithProgress = store.flashcards
    .map(card => ({
      ...card,
      progress: store.getCardProgress(card.id)
    }))
    .filter(card => card.progress.lastStudied)
    .sort((a, b) => new Date(b.progress.lastStudied) - new Date(a.progress.lastStudied))
    .slice(0, 10)
  
  return cardsWithProgress
})

function getStatusText(status) {
  const statusMap = {
    'learned': 'Aprendido',
    'learning': 'Estudando',
    'review': 'Revisar',
    'not-studied': 'Não estudado'
  }
  return statusMap[status] || status
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `${minutes}min atrás`
  if (hours < 24) return `${hours}h atrás`
  if (days < 7) return `${days}d atrás`
  
  return date.toLocaleDateString('pt-BR')
}

function resetProgress() {
  store.resetProgress()
}
</script>
