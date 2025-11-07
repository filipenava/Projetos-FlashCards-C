<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl text-white font-bold">C</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Entrar no FlashCards</h2>
        <p class="text-gray-600 mt-2">Acesse sua conta para sincronizar seu progresso</p>
      </div>

      <!-- Card de Login -->
      <div class="card">
        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="seu@email.com"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :disabled="loading"
            />
          </div>

          <!-- Senha -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :disabled="loading"
            />
          </div>

          <!-- Link Esqueci a senha -->
          <div class="flex justify-end mb-6">
            <router-link 
              to="/forgot-password" 
              class="text-sm text-primary hover:text-blue-700"
            >
              Esqueceu a senha?
            </router-link>
          </div>

          <!-- Mensagem de sucesso -->
          <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <span class="text-xl">✓</span>
            <span>Login realizado! Redirecionando...</span>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botão Login -->
          <button
            type="submit"
            class="w-full btn btn-primary py-3 text-lg"
            :disabled="loading || success"
          >
            <span v-if="success">✓ Sucesso!</span>
            <span v-else-if="loading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">ou</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Link para Cadastro -->
        <div class="text-center">
          <p class="text-gray-600">
            Não tem uma conta?
            <router-link to="/register" class="text-primary hover:text-blue-700 font-semibold">
              Cadastre-se
            </router-link>
          </p>
        </div>
      </div>

      <!-- Link voltar -->
      <div class="text-center mt-6">
        <router-link to="/" class="text-gray-600 hover:text-gray-800">
          ← Voltar para o início
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const success = ref(false)

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Preencha todos os campos'
    return
  }

  loading.value = true
  error.value = null
  success.value = false

  const result = await authStore.login(email.value, password.value)

  loading.value = false

  if (result.success) {
    success.value = true
    // Redireciona após breve delay
    setTimeout(() => {
      router.push('/')
    }, 500)
  } else {
    error.value = result.error
  }
}
</script>
