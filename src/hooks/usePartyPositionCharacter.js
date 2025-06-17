'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"


export const addPartyPositionCharacter = async (payload) => {
  try {
    const response = await api.post(`/party-position-character`, payload)
  } catch (error) {
  } 
}
