const API_BASE_URL = 'http://localhost:3000'

// Fonction pour récupérer tous les contacts
export const getAllContacts = async () => {
  const response = await fetch(`${API_BASE_URL}/contacts`)
  if (!response.ok) throw new Error('Erreur lors de la récupération des contacts')
  return response.json()
}

// Fonction pour créer un nouveau contact
export const createContact = async (contactData) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  })
  if (!response.ok) throw new Error('Erreur lors de la création du contact')
  return response.json()
}

// Fonction pour mettre à jour un contact
export const updateContact = async (id, contactData) => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  })
  if (!response.ok) throw new Error('Erreur lors de la mise à jour du contact')
  return response.json()
}

// Fonction pour supprimer un contact
export const deleteContact = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Erreur lors de la suppression du contact')
  return true
} 