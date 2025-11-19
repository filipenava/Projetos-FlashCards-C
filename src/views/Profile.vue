<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <button @click="$router.back()" class="text-primary hover:text-blue-700 mb-4">
        ← Voltar
      </button>

      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Meu Perfil</h1>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Card de Perfil -->
          <div class="card md:col-span-1">
            <div class="text-center">
              <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-4xl text-white font-bold">
                  {{ userInitial }}
                </span>
              </div>
              <h2 class="text-xl font-bold text-gray-900">{{ authStore.userDisplayName }}</h2>
              <p class="text-gray-600 text-sm mt-1">{{ authStore.userEmail }}</p>
              
              <button 
                @click="handleLogout" 
                class="mt-6 w-full btn bg-red-500 text-white hover:bg-red-600"
              >
                Sair da Conta
              </button>
            </div>
          </div>

          <!-- Estatísticas -->
          <div class="md:col-span-2 space-y-6">
            <!-- Streak Display -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">🔥 Sua Sequência</h3>
              <StreakDisplay />
            </div>

            <!-- Resumo de Progresso -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">📊 Seu Progresso</h3>
              
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="text-center p-4 bg-blue-50 rounded-lg">
                  <p class="text-3xl font-bold text-primary">{{ flashcardsStore.totalFlashcards }}</p>
                  <p class="text-sm text-gray-600 mt-1">Total de Cards</p>
                </div>
                <div class="text-center p-4 bg-green-50 rounded-lg">
                  <p class="text-3xl font-bold text-secondary">{{ flashcardsStore.learnedFlashcards }}</p>
                  <p class="text-sm text-gray-600 mt-1">Aprendidos</p>
                </div>
                <div class="text-center p-4 bg-purple-50 rounded-lg">
                  <p class="text-3xl font-bold text-purple-600">{{ flashcardsStore.progressPercentage }}%</p>
                  <p class="text-sm text-gray-600 mt-1">Completude</p>
                </div>
              </div>

              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-gradient-to-r from-primary to-blue-600 h-3 rounded-full transition-all"
                  :style="{ width: flashcardsStore.progressPercentage + '%' }"
                ></div>
              </div>
            </div>

            <!-- Editar Perfil -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">✏️ Editar Perfil</h3>
              
              <form @submit.prevent="handleUpdateProfile">
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    v-model="displayName"
                    type="text"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    :disabled="updating"
                  />
                </div>

                <div v-if="updateError" class="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                  {{ updateError }}
                </div>

                <div v-if="updateSuccess" class="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                  Perfil atualizado com sucesso!
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="updating"
                >
                  <span v-if="!updating">Salvar Alterações</span>
                  <span v-else>Salvando...</span>
                </button>
              </form>
            </div>

            <!-- Progresso por Categoria -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">📚 Progresso por Categoria</h3>
              
              <div class="space-y-4">
                <div v-for="category in flashcardsStore.categories" :key="category.id">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">{{ category.name }}</span>
                    <span class="text-sm text-gray-600">
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
              </div>
            </div>

            <!-- Configurações -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">⚙️ Configurações</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-semibold">Sincronização com Nuvem</p>
                    <p class="text-sm text-gray-600">Salvar progresso no Firebase</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="flashcardsStore.syncEnabled" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <hr class="border-gray-200">

                <button 
                  @click="handleResetProgress"
                  class="text-red-600 hover:text-red-700 font-semibold"
                >
                  🗑️ Resetar Todo o Progresso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useFlashcardsStore } from '../stores/flashcards'
import StreakDisplay from '../components/StreakDisplay.vue'

const router = useRouter()
const authStore = useAuthStore()
const flashcardsStore = useFlashcardsStore()

const displayName = ref('')
const updating = ref(false)
const updateError = ref(null)
const updateSuccess = ref(false)

const userInitial = computed(() => {
  const name = authStore.userDisplayName
  return name ? name.charAt(0).toUpperCase() : 'U'
})

onMounted(() => {
  displayName.value = authStore.userDisplayName
})

async function handleUpdateProfile() {
  updating.value = true
  updateError.value = null
  updateSuccess.value = false

  const result = await authStore.updateUserProfile({
    displayName: displayName.value
  })

  if (result.success) {
    updateSuccess.value = true
    setTimeout(() => {
      updateSuccess.value = false
    }, 3000)
  } else {
    updateError.value = result.error
  }

  updating.value = false
}

async function handleLogout() {
  if (confirm('Tem certeza que deseja sair?')) {
    await authStore.logout()
    router.push('/login')
  }
}

function handleResetProgress() {
  flashcardsStore.resetProgress()
}
</script>
