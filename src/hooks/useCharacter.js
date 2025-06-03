'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"

export const getCharacters = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/character?search=${search}`)
        console.log('response?.data?.characters', response?.data?.characters)
        setData(response?.data?.characters)
      } catch (error) {
        console.log(error)
      } 
    }

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const getCharacterPerks = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
       const character_id = payload?.character_id || ''
       const response = await api.get(`/character-perk?character_id=${character_id}&search=${search}`);
        setData(response?.data?.character_perks)
      } catch (error) {
        console.log(error)
      } 
    }

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const addCharacter = async (payload) => {
  try {
    const response = await api.post(`/character`, payload)
  } catch (error) {
    console.log(error)
  } 
}

export const addCharacterApi = async (payload) => {
  try {
    const response = await api.post(`/character/create/api`, payload)
  } catch (error) {
    console.log(error)
  } 
}


export const addCharacterPerk = async (payload) => {
  try {
    const response = await api.post(`/character-perk`, payload)
  } catch (error) {
    console.log(error)
  } 
}

export const deleteCharacterPerk = async (payload) => {
  try {
    const response = await api.post(`/character-perk/delete-by-character`, payload)
  } catch (error) {
    console.log(error)
  } 
}


export const addPartyPosition = async (payload) => {
  try {
    const response = await api.post(`/party-position`, payload)
  } catch (error) {
    console.log(error)
  } 
}


export const addPartyPositionCharacter = async (payload) => {
  try {
    const response = await api.post(`/party-position-character`, payload)
  } catch (error) {
    console.log(error)
  } 
}
