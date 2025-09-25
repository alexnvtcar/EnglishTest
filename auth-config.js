// Конфигурация аутентификации Firebase
// ВАЖНО: Замените на ваши реальные ключи!

const firebaseConfig = {
    // ⚠️ ЗАМЕНИТЕ НА НОВЫЕ БЕЗОПАСНЫЕ КЛЮЧИ!
    apiKey: "YOUR_NEW_API_KEY_HERE",
    authDomain: "englishtest-5cc0a.firebaseapp.com",
    projectId: "englishtest-5cc0a",
    storageBucket: "englishtest-5cc0a.firebasestorage.app",
    messagingSenderId: "344120532870",
    appId: "1:344120532870:web:5b8e77637ff2eda8c69607",
    measurementId: "G-KNCDJLVTQN"
};

// Функции аутентификации
class FirebaseAuth {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
    }

    // Инициализация аутентификации
    async init() {
        try {
            // Импортируем Firebase Auth
            const { getAuth, signInAnonymously, onAuthStateChanged } = 
                await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js');
            
            this.auth = getAuth();
            
            // Слушаем изменения состояния аутентификации
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.user = user;
                    this.isAuthenticated = true;
                    console.log('✅ Пользователь аутентифицирован:', user.uid);
                } else {
                    this.user = null;
                    this.isAuthenticated = false;
                    console.log('❌ Пользователь не аутентифицирован');
                }
            });
            
            return true;
        } catch (error) {
            console.error('❌ Ошибка инициализации аутентификации:', error);
            return false;
        }
    }

    // Анонимная аутентификация (для вашего случая)
    async signInAnonymously() {
        try {
            const { signInAnonymously } = 
                await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js');
            
            const result = await signInAnonymously(this.auth);
            console.log('✅ Анонимный вход выполнен:', result.user.uid);
            return result.user;
        } catch (error) {
            console.error('❌ Ошибка анонимного входа:', error);
            throw error;
        }
    }

    // Получить токен для запросов
    async getToken() {
        if (this.user) {
            return await this.user.getIdToken();
        }
        return null;
    }
}

// Экспорт для использования в приложении
window.FirebaseAuth = FirebaseAuth;
