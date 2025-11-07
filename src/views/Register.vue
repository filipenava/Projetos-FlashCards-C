<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl text-white font-bold">C</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Criar Conta</h2>
        <p class="text-gray-600 mt-2">Cadastre-se para salvar seu progresso na nuvem</p>
      </div>

      <!-- Card de Cadastro -->
      <div class="card">
        <form @submit.prevent="handleRegister">
          <!-- Nome -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              Nome completo
            </label>
            <input
              id="name"
              v-model="displayName"
              type="text"
              required
              placeholder="Seu nome"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :disabled="loading"
            />
          </div>

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
              minlength="6"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :disabled="loading"
            />
            <p class="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
          </div>

          <!-- Confirmar Senha -->
          <div class="mb-6">
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :disabled="loading"
            />
          </div>

          <!-- Mensagem de sucesso -->
          <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <span class="text-xl">✓</span>
            <span>Conta criada com sucesso! Redirecionando...</span>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botão -->
          <button
            type="submit"
            class="w-full btn btn-primary py-3 text-lg mb-4"
            :disabled="loading || success"
          >
            <span v-if="success">✓ Conta Criada!</span>
            <span v-else-if="loading">Criando conta...</span>
            <span v-else>Criar Conta</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">ou</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Link para Login -->
        <div class="text-center">
          <p class="text-gray-600">
            Já tem uma conta?
            <router-link to="/login" class="text-primary hover:text-blue-700 font-semibold">
              Faça login
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

const displayName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const loading = ref(false)
const success = ref(false)

async function handleRegister() {
  error.value = null
  success.value = false

  // Validações
  if (!displayName.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Preencha todos os campos'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem'
    return
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  loading.value = true

  const result = await authStore.register(email.value, password.value, displayName.value)

  loading.value = false

  if (result.success) {
    success.value = true
    // Redireciona após mostrar mensagem de sucesso
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } else {
    error.value = result.error
  }
}
</script>
