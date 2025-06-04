'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"

export const getCommons = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await api.get(`/common`);
        setData(response?.data?.commons)
      } catch (error) {
        console.log(error)
      } 
    }

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const addCommon = async (payload) => {
  try {
    const response = await api.post(`/common`, payload)
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
