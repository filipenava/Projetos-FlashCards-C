<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">🔑</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Recuperar Senha</h2>
        <p class="text-gray-600 mt-2">Digite seu email para receber instruções</p>
      </div>

      <!-- Card -->
      <div class="card">
        <!-- Sucesso -->
        <div v-if="success" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">✓</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Email Enviado!</h3>
          <p class="text-gray-600 mb-6">
            Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
          </p>
          <router-link to="/login" class="btn btn-primary w-full">
            Voltar para Login
          </router-link>
        </div>

        <!-- Formulário -->
        <form v-else @submit.prevent="handleResetPassword">
          <!-- Email -->
          <div class="mb-6">
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

          <!-- Mensagem de erro -->
          <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botão -->
          <button
            type="submit"
            class="w-full btn btn-primary py-3 text-lg mb-4"
            :disabled="loading"
          >
            <span v-if="!loading">Enviar Email</span>
            <span v-else>Enviando...</span>
          </button>

          <!-- Link voltar -->
          <router-link 
            to="/login" 
            class="block text-center text-gray-600 hover:text-gray-800"
          >
            ← Voltar para login
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const email = ref('')
const error = ref(null)
const loading = ref(false)
const success = ref(false)

async function handleResetPassword() {
  if (!email.value) {
    error.value = 'Digite seu email'
    return
  }

  loading.value = true
  error.value = null

  const result = await authStore.resetPassword(email.value)

  if (result.success) {
    success.value = true
  } else {
    error.value = result.error
  }

  loading.value = false
}
</script>
