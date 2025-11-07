<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <button @click="$router.back()" class="text-primary hover:text-blue-700 mb-4">
        ← Voltar
      </button>
      
      <h1 class="text-3xl font-bold mb-8">Todas as Categorias</h1>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="card hover:shadow-xl transition-all cursor-pointer group"
          @click="startStudy(category.id)"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-primary transition">
                {{ category.name }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">{{ category.count }} flashcards disponíveis</p>
            </div>
            
            <div class="text-3xl">📚</div>
          </div>
          
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600">Progresso</span>
              <span class="font-semibold text-primary">
                {{ Math.round((category.completed / category.count) * 100) }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-secondary to-green-600 h-3 rounded-full transition-all"
                :style="{ width: (category.completed / category.count * 100) + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex justify-between items-center text-sm mb-4">
            <span class="text-gray-600">
              {{ category.completed }} / {{ category.count }} completos
            </span>
            <span class="text-gray-600">
              {{ category.count - category.completed }} restantes
            </span>
          </div>
          
          <button class="w-full btn btn-primary group-hover:bg-blue-700">
            {{ category.completed === category.count ? '🎉 Revisar' : '▶ Estudar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFlashcardsStore } from '../stores/flashcards'

const router = useRouter()
const store = useFlashcardsStore()

const categories = computed(() => store.categories)

function startStudy(categoryId) {
  router.push({ name: 'study', params: { categoryId } })
}
</script>
