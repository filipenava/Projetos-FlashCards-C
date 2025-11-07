<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-2xl text-white font-bold">C</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">FlashCards C</h1>
              <p class="text-sm text-gray-600">Sistema de Estudo Interativo</p>
            </div>
          </div>
          
          <nav class="flex gap-4 items-center">
            <router-link to="/" class="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Dashboard
            </router-link>
            <router-link to="/categories" class="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Categorias
            </router-link>
            <router-link 
              v-if="authStore.isAuthenticated" 
              to="/statistics" 
              class="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Estatísticas
            </router-link>

            <!-- Auth buttons -->
            <div v-if="authStore.isAuthenticated" class="flex items-center gap-2 ml-4 pl-4 border-l">
              <router-link 
                to="/profile" 
                class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {{ userInitial }}
                </div>
                <span class="font-semibold">{{ authStore.userDisplayName }}</span>
              </router-link>
            </div>
            <div v-else class="flex gap-2 ml-4 pl-4 border-l">
              <router-link to="/login" class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition">
                Entrar
              </router-link>
              <router-link to="/register" class="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-blue-50 transition">
                Cadastrar
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Progress Overview -->
      <div class="mb-8 card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">Seu Progresso</h2>
          <span class="text-3xl font-bold text-primary">{{ progressPercentage }}%</span>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            class="bg-gradient-to-r from-primary to-blue-600 h-4 rounded-full transition-all duration-500"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-2xl font-bold text-primary">{{ totalFlashcards }}</p>
            <p class="text-sm text-gray-600">Total de Cards</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-secondary">{{ learnedFlashcards }}</p>
            <p class="text-sm text-gray-600">Aprendidos</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-accent">{{ totalFlashcards - learnedFlashcards }}</p>
            <p class="text-sm text-gray-600">Restantes</p>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-4">Categorias de Estudo</h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="card hover:shadow-xl transition-shadow cursor-pointer group"
          @click="startStudy(category.id)"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-800 group-hover:text-primary transition">
                {{ category.name }}
              </h3>
              <p class="text-sm text-gray-600">{{ category.count }} flashcards</p>
            </div>
            
            <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <span class="text-2xl">📚</span>
            </div>
          </div>
          
          <div class="mb-3">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Progresso</span>
              <span class="font-semibold text-primary">
                {{ category.completed }}/{{ category.count }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-secondary h-2 rounded-full transition-all"
                :style="{ width: (category.completed / category.count * 100) + '%' }"
              ></div>
            </div>
          </div>
          
          <button class="w-full btn btn-primary mt-2">
            Estudar Agora
          </button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 grid md:grid-cols-2 gap-6">
        <div class="card bg-gradient-to-r from-primary to-blue-600 text-white">
          <h3 class="text-xl font-bold mb-2">🎯 Modo Prática</h3>
          <p class="mb-4 opacity-90">Continue seus estudos onde parou</p>
          <button class="btn bg-white text-primary hover:bg-gray-100">
            Continuar Estudando
          </button>
        </div>
        
        <div class="card bg-gradient-to-r from-accent to-orange-600 text-white">
          <h3 class="text-xl font-bold mb-2">⚡ Revisão Rápida</h3>
          <p class="mb-4 opacity-90">Revise cards marcados para revisar</p>
          <button class="btn bg-white text-accent hover:bg-gray-100">
            Iniciar Revisão
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white mt-12 py-6 border-t">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>FlashCards C - Sistema de Estudo © 2025</p>
        <p class="text-sm mt-1">Desenvolvido para ajudar no aprendizado de linguagem C</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFlashcardsStore } from '../stores/flashcards'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const store = useFlashcardsStore()
const authStore = useAuthStore()

const categories = computed(() => store.categories)
const totalFlashcards = computed(() => store.totalFlashcards)
const learnedFlashcards = computed(() => store.learnedFlashcards)
const progressPercentage = computed(() => store.progressPercentage)

const userInitial = computed(() => {
  const name = authStore.userDisplayName
  return name ? name.charAt(0).toUpperCase() : 'U'
})

function startStudy(categoryId) {
  router.push({ name: 'study', params: { categoryId } })
}
</script>
