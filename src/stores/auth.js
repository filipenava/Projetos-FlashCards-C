import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '../firebase/config'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { saveUserProfile, getUserProfile } from '../firebase/firestore'
import { useFlashcardsStore } from './flashcards'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const userDisplayName = computed(() => user.value?.displayName || user.value?.email || 'Usuário')
  const userEmail = computed(() => user.value?.email || '')
  const userId = computed(() => user.value?.uid || null)

  // Inicializar listener de autenticação
  function initAuth() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          }
          
          // Sincronizar com store de flashcards
          const flashcardsStore = useFlashcardsStore()
          flashcardsStore.setUserId(firebaseUser.uid)
          
          // Carregar perfil do Firestore
          await loadUserProfile()
        } else {
          user.value = null
        }
        initialized.value = true
        resolve(firebaseUser)
      })
    })
  }

  // Login
  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      }
      
      // Sincronizar progresso
      const flashcardsStore = useFlashcardsStore()
      flashcardsStore.setUserId(userCredential.user.uid)
      
      return { success: true }
    } catch (err) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Cadastro
  async function register(email, password, displayName) {
    loading.value = true
    error.value = null
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Atualizar perfil
      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }
      
      user.value = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName || null,
        photoURL: null
      }
      
      // Salvar no Firestore
      await saveUserProfile(userCredential.user.uid, {
        email: email,
        displayName: displayName || '',
        createdAt: new Date().toISOString()
      })
      
      // Sincronizar progresso
      const flashcardsStore = useFlashcardsStore()
      flashcardsStore.setUserId(userCredential.user.uid)
      
      return { success: true }
    } catch (err) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Logout
  async function logout() {
    loading.value = true
    error.value = null
    
    try {
      await signOut(auth)
      user.value = null
      
      // Limpar ID do usuário na store de flashcards
      const flashcardsStore = useFlashcardsStore()
      flashcardsStore.setUserId(null)
      
      return { success: true }
    } catch (err) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Recuperar senha
  async function resetPassword(email) {
    loading.value = true
    error.value = null
    
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (err) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Atualizar perfil
  async function updateUserProfile(data) {
    if (!user.value) return { success: false, error: 'Usuário não autenticado' }
    
    loading.value = true
    error.value = null
    
    try {
      // Atualizar no Firebase Auth
      if (data.displayName !== undefined) {
        await updateProfile(auth.currentUser, { displayName: data.displayName })
        user.value.displayName = data.displayName
      }
      
      // Atualizar no Firestore
      await saveUserProfile(user.value.uid, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      
      return { success: true }
    } catch (err) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Carregar perfil do Firestore
  async function loadUserProfile() {
    if (!user.value) return
    
    try {
      const result = await getUserProfile(user.value.uid)
      if (result.success && result.data) {
        // Mesclar dados do Firestore com dados do Auth
        user.value = {
          ...user.value,
          ...result.data
        }
      }
    } catch (err) {
      console.error('Erro ao carregar perfil:', err)
    }
  }

  // Mensagens de erro amigáveis
  function getErrorMessage(code) {
    const messages = {
      'auth/email-already-in-use': 'Este email já está cadastrado',
      'auth/invalid-email': 'Email inválido',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
      'auth/invalid-credential': 'Email ou senha inválidos'
    }
    return messages[code] || 'Ocorreu um erro. Tente novamente'
  }

  return {
    user,
    loading,
    error,
    initialized,
    isAuthenticated,
    userDisplayName,
    userEmail,
    userId,
    initAuth,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    loadUserProfile
  }
})
