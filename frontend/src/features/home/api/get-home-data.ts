import { api } from '../../../api/client'
import type { HomeResponse } from '../../../types/home'

export async function getHomeData() {
  const response = await api.get<HomeResponse>('/home')

  return response.data
}