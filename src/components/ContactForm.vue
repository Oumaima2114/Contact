<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  contact: {
    type: Object,
    default: () => ({ name: '', email: '', phone: '' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({ ...props.contact })
const error = ref('')

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubmit = async () => {
  error.value = ''
  
  if (!formData.value.name || !formData.value.email || !formData.value.phone) {
    error.value = 'Tous les champs sont requis'
    return
  }

  if (!validateEmail(formData.value.email)) {
    error.value = 'Format d\'email invalide'
    return
  }

  emit('submit', formData.value)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="contact-form">
      <h2>{{ isEditing ? 'Modifier le contact' : 'Ajouter un contact' }}</h2>
      
      <div v-if="error" class="error">
        <span class="icon">⚠️</span>
        {{ error }}
      </div>
      
      <div class="form-group">
        <label for="name">
          <span class="icon">👤</span>
          Nom
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          placeholder="Entrez le nom"
        />
      </div>

      <div class="form-group">
        <label for="email">
          <span class="icon">📧</span>
          Email
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          placeholder="Entrez l'email"
        />
      </div>

      <div class="form-group">
        <label for="phone">
          <span class="icon">📱</span>
          Téléphone
        </label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          required
          placeholder="Entrez le numéro de téléphone"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">
          <span class="icon">{{ isEditing ? '💾' : '➕' }}</span>
          {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
        </button>
        <button type="button" @click="handleCancel" class="cancel-btn">
          <span class="icon">❌</span>
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.contact-form {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 30px var(--shadow-color);
}

h2 {
  color: var(--primary-color);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.error {
  background-color: rgba(214, 64, 69, 0.1);
  color: var(--danger-color);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--accent-dark);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: var(--accent-light);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-light);
  background-color: white;
  box-shadow: 0 0 0 3px rgba(107, 78, 113, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.submit-btn, .cancel-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.submit-btn {
  background-color: var(--primary-color);
  color: var(--text-light);
}

.submit-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.cancel-btn {
  background-color: var(--danger-color);
  color: var(--text-light);
}

.cancel-btn:hover {
  background-color: #c13136;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(214, 64, 69, 0.2);
}

.icon {
  font-size: 1.2rem;
}

@media (max-width: 640px) {
  .form-container {
    padding: 1rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .submit-btn, .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 