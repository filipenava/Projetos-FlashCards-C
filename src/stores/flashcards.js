import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { flashcardsData } from '../data/flashcards'
import { saveUserProgress, loadUserProgress, saveStudySession } from '../firebase/firestore'

export const useFlashcardsStore = defineStore('flashcards', () => {
  // Estado
  const flashcards = ref(flashcardsData)
  const userProgress = ref(loadProgress())
  const currentCategory = ref(null)
  const currentUserId = ref(null)
  const syncEnabled = ref(true)
  const studySession = ref({
    correct: 0,
    incorrect: 0,
    startTime: null,
    categoryId: null,
    cardsStudied: []
  })

  // Getters
  const categories = computed(() => {
    const cats = {}
    flashcards.value.forEach(card => {
      if (!cats[card.category]) {
        cats[card.category] = {
          id: card.category,
          name: card.categoryName,
          count: 0,
          completed: 0
        }
      }
      cats[card.category].count++
      if (userProgress.value[card.id]?.status === 'learned') {
        cats[card.category].completed++
      }
    })
    return Object.values(cats)
  })

  const getFlashcardsByCategory = computed(() => (categoryId) => {
    return flashcards.value.filter(card => card.category === categoryId)
  })

  const totalFlashcards = computed(() => flashcards.value.length)
  
  const learnedFlashcards = computed(() => {
    return Object.values(userProgress.value).filter(p => p.status === 'learned').length
  })

  const progressPercentage = computed(() => {
    return Math.round((learnedFlashcards.value / totalFlashcards.value) * 100)
  })

  // Actions
  function loadProgress() {
    const saved = localStorage.getItem('flashcards-progress')
    return saved ? JSON.parse(saved) : {}
  }

  async function saveProgress() {
    localStorage.setItem('flashcards-progress', JSON.stringify(userProgress.value))
    
    if (syncEnabled.value && currentUserId.value) {
      try {
        await saveUserProgress(currentUserId.value, userProgress.value)
      } catch (error) {
        console.error('Erro ao sincronizar progresso com Firebase:', error)
      }
    }
  }

  async function syncProgressFromFirebase() {
    if (!currentUserId.value) return
    
    try {
      const result = await loadUserProgress(currentUserId.value)
      if (result.success && result.data) {
        userProgress.value = result.data
        localStorage.setItem('flashcards-progress', JSON.stringify(userProgress.value))
      }
    } catch (error) {
      console.error('Erro ao carregar progresso do Firebase:', error)
    }
  }

  function setUserId(userId) {
    currentUserId.value = userId
    if (userId) {
      syncProgressFromFirebase()
    }
  }

  function updateCardProgress(cardId, status, correct = null) {
    if (!userProgress.value[cardId]) {
      userProgress.value[cardId] = {
        status: 'not-studied',
        attempts: 0,
        correctCount: 0,
        lastStudied: null
      }
    }

    const progress = userProgress.value[cardId]
    progress.attempts++
    progress.lastStudied = new Date().toISOString()
    
    if (correct !== null) {
      if (correct) progress.correctCount++
    }
    
    if (status) {
      progress.status = status
    }

    saveProgress()
  }

  function startStudySession(categoryId) {
    currentCategory.value = categoryId
    studySession.value = {
      correct: 0,
      incorrect: 0,
      startTime: new Date(),
      categoryId: categoryId,
      cardsStudied: []
    }
  }

  function recordAnswer(isCorrect, cardId) {
    if (isCorrect) {
      studySession.value.correct++
    } else {
      studySession.value.incorrect++
    }
    
    if (cardId && !studySession.value.cardsStudied.includes(cardId)) {
      studySession.value.cardsStudied.push(cardId)
    }
  }

  async function endStudySession() {
    if (!studySession.value.startTime) return
    
    const sessionData = {
      categoryId: studySession.value.categoryId,
      correct: studySession.value.correct,
      incorrect: studySession.value.incorrect,
      startTime: studySession.value.startTime.toISOString(),
      endTime: new Date().toISOString(),
      duration: Math.round((new Date() - studySession.value.startTime) / 1000),
      cardsStudied: studySession.value.cardsStudied.length
    }
    
    if (syncEnabled.value && currentUserId.value) {
      try {
        await saveStudySession(currentUserId.value, sessionData)
      } catch (error) {
        console.error('Erro ao salvar sessão no Firebase:', error)
      }
    }
    
    return sessionData
  }

  function getCardProgress(cardId) {
    return userProgress.value[cardId] || {
      status: 'not-studied',
      attempts: 0,
      correctCount: 0,
      lastStudied: null
    }
  }

  function resetProgress() {
    if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
      userProgress.value = {}
      saveProgress()
    }
  }

  return {
    flashcards,
    userProgress,
    currentCategory,
    studySession,
    currentUserId,
    syncEnabled,
    categories,
    getFlashcardsByCategory,
    totalFlashcards,
    learnedFlashcards,
    progressPercentage,
    updateCardProgress,
    startStudySession,
    recordAnswer,
    endStudySession,
    getCardProgress,
    resetProgress,
    setUserId,
    syncProgressFromFirebase
  }
})
