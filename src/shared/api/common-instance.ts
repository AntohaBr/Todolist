import axios from 'axios'

export const commonInstance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'f1636098-c65e-4218-94e5-e10509868ae3'
  },
})
