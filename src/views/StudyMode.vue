<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <button @click="$router.back()" class="text-primary hover:text-blue-700 mb-2">
            ← Voltar
          </button>
          <h1 class="text-3xl font-bold">{{ currentCategory?.name || 'Estudar' }}</h1>
          <p class="text-gray-600 mt-1">
            Card {{ currentIndex + 1 }} de {{ flashcards.length }}
          </p>
        </div>
        
        <div class="text-right">
          <p class="text-sm text-gray-600">Sessão Atual</p>
          <p class="text-2xl font-bold text-secondary">✓ {{ correctCount }}</p>
          <p class="text-2xl font-bold text-red-500">✗ {{ incorrectCount }}</p>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div 
            class="bg-primary h-3 rounded-full transition-all duration-300"
            :style="{ width: ((currentIndex + 1) / flashcards.length * 100) + '%' }"
          ></div>
        </div>
      </div>

      <!-- Flashcard -->
      <div v-if="currentCard" class="max-w-4xl mx-auto mb-8">
        <div 
          class="flip-card cursor-pointer"
          :class="{ flipped: isFlipped }"
          @click="flipCard"
          style="height: 500px;"
        >
          <div class="flip-card-inner h-full">
            <!-- Front -->
            <div class="flip-card-front">
              <div class="card h-full flex flex-col justify-center items-center text-center p-8">
                <div class="mb-4">
                  <span class="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-semibold">
                    {{ currentCard.difficulty === 'beginner' ? '🟢 Iniciante' : 
                       currentCard.difficulty === 'intermediate' ? '🟡 Intermediário' : '🔴 Avançado' }}
                  </span>
                </div>
                
                <h2 class="text-3xl font-bold mb-6 text-gray-800">
                  {{ currentCard.question }}
                </h2>
                
                <p class="text-gray-500 italic">Clique para ver a resposta</p>
                
                <div class="flex gap-2 mt-6">
                  <span 
                    v-for="tag in currentCard.tags" 
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Back -->
            <div class="flip-card-back">
              <div class="card h-full overflow-y-auto p-8">
                <div class="mb-4">
                  <h3 class="text-xl font-bold text-primary mb-3">💡 Conceito</h3>
                  <p class="text-gray-700 leading-relaxed">{{ currentCard.answer.concept }}</p>
                </div>

                <div v-if="currentCard.answer.syntax" class="mb-4">
                  <h3 class="text-xl font-bold text-primary mb-3">📝 Sintaxe</h3>
                  <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{{ currentCard.answer.syntax }}</code></pre>
                </div>

                <div v-if="currentCard.answer.example" class="mb-4">
                  <h3 class="text-xl font-bold text-primary mb-3">🔧 Exemplo</h3>
                  <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{{ currentCard.answer.example }}</code></pre>
                </div>

                <div v-if="currentCard.answer.useCases?.length" class="mb-4">
                  <h3 class="text-xl font-bold text-primary mb-3">✅ Casos de Uso</h3>
                  <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li v-for="(useCase, idx) in currentCard.answer.useCases" :key="idx">
                      {{ useCase }}
                    </li>
                  </ul>
                </div>

                <div v-if="currentCard.answer.commonErrors?.length" class="mb-4">
                  <h3 class="text-xl font-bold text-red-600 mb-3">⚠️ Erros Comuns</h3>
                  <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li v-for="(error, idx) in currentCard.answer.commonErrors" :key="idx">
                      {{ error }}
                    </li>
                  </ul>
                </div>

                <div v-if="currentCard.answer.tips" class="mb-4">
                  <h3 class="text-xl font-bold text-secondary mb-3">💚 Dica</h3>
                  <p class="text-gray-700 bg-green-50 p-3 rounded-lg">{{ currentCard.answer.tips }}</p>
                </div>

                <p class="text-center text-gray-500 italic mt-4">Clique para voltar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div v-if="currentCard && isFlipped" class="max-w-4xl mx-auto">
        <div class="card">
          <p class="text-center mb-4 font-semibold">Você entendeu este conceito?</p>
          <div class="flex gap-4 justify-center">
            <button 
              @click="markCard('incorrect')"
              class="btn bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
            >
              ❌ Não Entendi
            </button>
            <button 
              @click="markCard('review')"
              class="btn bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-2"
            >
              🔄 Revisar Depois
            </button>
            <button 
              @click="markCard('correct')"
              class="btn bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
            >
              ✅ Entendi!
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="max-w-4xl mx-auto mt-6 flex justify-between">
        <button 
          @click="previousCard"
          :disabled="currentIndex === 0"
          class="btn btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        >
          ← Anterior
        </button>
        
        <button 
          @click="nextCard"
          :disabled="currentIndex === flashcards.length - 1"
          class="btn btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === flashcards.length - 1 }"
        >
          Próximo →
        </button>
      </div>

      <!-- Completion Modal -->
      <div v-if="showCompletionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="card max-w-md mx-4">
          <h2 class="text-2xl font-bold mb-4 text-center">🎉 Parabéns!</h2>
          <p class="text-center mb-6">Você completou esta sessão de estudos!</p>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="text-center p-4 bg-green-100 rounded-lg">
              <p class="text-3xl font-bold text-secondary">{{ correctCount }}</p>
              <p class="text-sm text-gray-600">Acertos</p>
            </div>
            <div class="text-center p-4 bg-red-100 rounded-lg">
              <p class="text-3xl font-bold text-red-600">{{ incorrectCount }}</p>
              <p class="text-sm text-gray-600">Para Revisar</p>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button @click="$router.push('/')" class="btn btn-primary flex-1">
              Voltar ao Início
            </button>
            <button @click="restartSession" class="btn btn-secondary flex-1">
              Estudar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFlashcardsStore } from '../stores/flashcards'

const route = useRoute()
const store = useFlashcardsStore()

const categoryId = ref(route.params.categoryId)
const currentIndex = ref(0)
const isFlipped = ref(false)
const correctCount = ref(0)
const incorrectCount = ref(0)
const showCompletionModal = ref(false)

const flashcards = computed(() => {
  return store.flashcards.filter(card => card.category === categoryId.value)
})

const currentCard = computed(() => flashcards.value[currentIndex.value])

const currentCategory = computed(() => {
  return store.categories.find(cat => cat.id === categoryId.value)
})

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function nextCard() {
  if (currentIndex.value < flashcards.value.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  }
}

function previousCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isFlipped.value = false
  }
}

function markCard(result) {
  const cardId = currentCard.value.id
  
  if (result === 'correct') {
    correctCount.value++
    store.updateCardProgress(cardId, 'learned', true)
    store.recordAnswer(true, cardId)
  } else if (result === 'incorrect') {
    incorrectCount.value++
    store.updateCardProgress(cardId, 'learning', false)
    store.recordAnswer(false, cardId)
  } else if (result === 'review') {
    store.updateCardProgress(cardId, 'review', null)
    store.recordAnswer(null, cardId)
  }
  
  if (currentIndex.value < flashcards.value.length - 1) {
    nextCard()
  } else {
    finishSession()
  }
}

async function finishSession() {
  await store.endStudySession()
  showCompletionModal.value = true
}

function restartSession() {
  currentIndex.value = 0
  isFlipped.value = false
  correctCount.value = 0
  incorrectCount.value = 0
  showCompletionModal.value = false
  store.startStudySession(categoryId.value)
}

onMounted(() => {
  store.startStudySession(categoryId.value)
})
</script>
