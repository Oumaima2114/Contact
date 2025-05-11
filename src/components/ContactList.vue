<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import ContactItem from './ContactItem.vue'
import { getAllContacts, deleteContact } from '../api/contacts'

const contacts = ref([])
const loading = ref(true)
const error = ref(null)

const emit = defineEmits(['edit'])

const fetchContacts = async () => {
  try {
    loading.value = true
    contacts.value = await getAllContacts()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id) => {
  try {
    await deleteContact(id)
    contacts.value = contacts.value.filter(contact => contact.id !== id)
  } catch (err) {
    error.value = err.message
  }
}

const handleEdit = (contact) => {
  emit('edit', contact)
}

onMounted(() => {
  fetchContacts()
})

// Expose fetchContacts method
defineExpose({
  fetchContacts
})
</script>

<template>
  <div class="contact-list">
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="contacts.length === 0" class="empty">Aucun contact trouvé</div>
    <div v-else class="contacts">
      <ContactItem
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>

<style scoped>
.contact-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error, .empty {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}

.error {
  color: red;
}

.contacts {
  display: grid;
  gap: 20px;
}
</style> 