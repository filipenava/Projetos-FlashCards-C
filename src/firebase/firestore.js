import { db } from './config'
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

// Coleções
const COLLECTIONS = {
  USERS: 'users',
  PROGRESS: 'user_progress',
  FLASHCARDS: 'flashcards',
  SESSIONS: 'study_sessions'
}

// ***** USER PROGRESS *****

// Salvar progresso do usuário
export async function saveUserProgress(userId, progress) {
  try {
    const progressRef = doc(db, COLLECTIONS.PROGRESS, userId)
    await setDoc(progressRef, {
      userId,
      progress,
      lastUpdated: new Date().toISOString()
    }, { merge: true })
    return { success: true }
  } catch (error) {
    console.error('Erro ao salvar progresso:', error)
    return { success: false, error }
  }
}

// Carregar progresso do usuário
export async function loadUserProgress(userId) {
  try {
    const progressRef = doc(db, COLLECTIONS.PROGRESS, userId)
    const progressSnap = await getDoc(progressRef)
    
    if (progressSnap.exists()) {
      return { success: true, data: progressSnap.data().progress }
    }
    return { success: true, data: {} }
  } catch (error) {
    // Silenciar erro de cliente offline no carregamento inicial
    if (error.code === 'unavailable' || error.message.includes('offline')) {
      console.warn('Cliente offline, usando dados locais')
      return { success: true, data: {} }
    }
    console.error('Erro ao carregar progresso:', error)
    return { success: false, error }
  }
}

// ***** STUDY SESSIONS *****

// Salvar sessão de estudo
export async function saveStudySession(userId, sessionData) {
  try {
    const sessionRef = doc(collection(db, COLLECTIONS.SESSIONS))
    await setDoc(sessionRef, {
      userId,
      ...sessionData,
      createdAt: new Date().toISOString()
    })
    return { success: true, sessionId: sessionRef.id }
  } catch (error) {
    console.error('Erro ao salvar sessão:', error)
    return { success: false, error }
  }
}

// Buscar sessões de estudo do usuário
export async function getUserSessions(userId, limitCount = 10) {
  try {
    const sessionsRef = collection(db, COLLECTIONS.SESSIONS)
    const q = query(
      sessionsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const sessions = []
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, data: sessions }
  } catch (error) {
    console.error('Erro ao buscar sessões:', error)
    return { success: false, error }
  }
}

// ***** FLASHCARDS *****

// Buscar todos os flashcards (opcional - caso queira armazenar no Firebase)
export async function getAllFlashcards() {
  try {
    const flashcardsRef = collection(db, COLLECTIONS.FLASHCARDS)
    const querySnapshot = await getDocs(flashcardsRef)
    const flashcards = []
    querySnapshot.forEach((doc) => {
      flashcards.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, data: flashcards }
  } catch (error) {
    console.error('Erro ao buscar flashcards:', error)
    return { success: false, error }
  }
}

// Adicionar flashcard
export async function addFlashcard(flashcardData) {
  try {
    const flashcardRef = doc(collection(db, COLLECTIONS.FLASHCARDS))
    await setDoc(flashcardRef, {
      ...flashcardData,
      createdAt: new Date().toISOString()
    })
    return { success: true, flashcardId: flashcardRef.id }
  } catch (error) {
    console.error('Erro ao adicionar flashcard:', error)
    return { success: false, error }
  }
}

// ***** USER DATA *****

// Criar/Atualizar perfil do usuário
export async function saveUserProfile(userId, userData) {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId)
    await setDoc(userRef, {
      ...userData,
      lastLogin: new Date().toISOString()
    }, { merge: true })
    return { success: true }
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
    return { success: false, error }
  }
}

// Buscar perfil do usuário
export async function getUserProfile(userId) {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() }
    }
    return { success: false, error: 'Usuário não encontrado' }
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return { success: false, error }
  }
}

export { COLLECTIONS }
