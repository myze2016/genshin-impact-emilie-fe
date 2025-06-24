'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/utils/axios'
const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [partyContextId, setPartyContextId] = useState(null)
  const [characterSearchContext, setCharacterSearchContext] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    api.get('/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading, partyContextId, setPartyContextId, characterSearchContext, setCharacterSearchContext }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)


