<script setup>
const props = defineProps({
  contact: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'edit'])

const handleDelete = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
    emit('delete', props.contact.id)
  }
}

const handleEdit = () => {
  emit('edit', props.contact)
}
</script>

<template>
  <div class="contact-item">
    <div class="contact-info">
      <h3>{{ contact.name }}</h3>
      <div class="contact-details">
        <p>
          <span class="icon">📧</span>
          {{ contact.email }}
        </p>
        <p>
          <span class="icon">📱</span>
          {{ contact.phone }}
        </p>
      </div>
    </div>
    <div class="contact-actions">
      <button @click="handleEdit" class="edit-btn">
        <span class="icon">✏️</span>
        Modifier
      </button>
      <button @click="handleDelete" class="delete-btn">
        <span class="icon">🗑️</span>
        Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 20px var(--shadow-color);
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contact-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px var(--shadow-color);
}

.contact-info {
  flex: 1;
}

.contact-info h3 {
  color: var(--primary-color);
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-details p {
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.icon {
  font-size: 1.2rem;
}

.contact-actions {
  display: flex;
  gap: 0.75rem;
}

.edit-btn, .delete-btn {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: var(--primary-light);
  color: var(--text-light);
}

.edit-btn:hover {
  background-color: var(--primary-color);
  transform: translateY(-2px);
}

.delete-btn {
  background-color: var(--danger-color);
  color: var(--text-light);
}

.delete-btn:hover {
  background-color: #c13136;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .contact-item {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .contact-actions {
    justify-content: flex-end;
  }
}
</style> 