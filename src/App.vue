<script setup>
import { ref } from 'vue'
import ContactList from './components/ContactList.vue'
import ContactForm from './components/ContactForm.vue'
import { createContact, updateContact } from './api/contacts'

const API_BASE_URL = 'http://localhost:3000'

const showForm = ref(false)
const editingContact = ref(null)
const contactListRef = ref(null)

const handleAddContact = async (contactData) => {
  try {
    await createContact(contactData)
    showForm.value = false
    if (contactListRef.value) {
      contactListRef.value.fetchContacts()
    }
  } catch (err) {
    console.error(err)
  }
}

const handleEditContact = async (contactData) => {
  try {
    await updateContact(contactData.id, contactData)
    showForm.value = false
    editingContact.value = null
    if (contactListRef.value) {
      contactListRef.value.fetchContacts()
    }
  } catch (err) {
    console.error(err)
  }
}

const handleFormSubmit = (contactData) => {
  if (editingContact.value) {
    handleEditContact({ ...contactData, id: editingContact.value.id })
  } else {
    handleAddContact(contactData)
  }
}

const handleFormCancel = () => {
  showForm.value = false
  editingContact.value = null
}

const handleEdit = (contact) => {
  editingContact.value = contact
  showForm.value = true
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Gestionnaire de Contacts</h1>
      <button @click="showForm = true" class="add-btn">
        <span class="btn-icon">+</span>
        Ajouter un contact
      </button>
    </header>

    <main>
      <ContactList
        v-if="!showForm"
        ref="contactListRef"
        @edit="handleEdit"
      />
      <ContactForm
        v-else
        :contact="editingContact"
        :is-editing="!!editingContact"
        @submit="handleFormSubmit"
        @cancel="handleFormCancel"
      />
    </main>
  </div>
</template>

<style>
:root {
  --primary-color: #6B4E71;
  --primary-light: #8B6F91;
  --primary-dark: #4B2E51;
  --accent-color: #F2E6D8;
  --accent-light: #FFF7ED;
  --accent-dark: #E5D6C8;
  --text-dark: #2C1810;
  --text-light: #FFF;
  --danger-color: #D64045;
  --success-color: #4CAF50;
  --shadow-color: rgba(107, 78, 113, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, var(--accent-light), var(--accent-color));
  color: var(--text-dark);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 30px var(--shadow-color);
}

h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.add-btn {
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--text-light);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--shadow-color);
}

.add-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }

  header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
