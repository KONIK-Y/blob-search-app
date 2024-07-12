'use server'

import { client } from '@/lib/axios'
import type { SimpleSearcResult } from '@/models/models'

export interface SimpleSearchResponse {
  results: SimpleSearcResult[]
}

const postSimpleSearchKey = () => `/api/search/simple`

export const postSimpleSearch = async (query: string): Promise<SimpleSearcResult[]> => {
  const res = await client.post<SimpleSearchResponse>(postSimpleSearchKey(), {
    query,
  })
  const results = res.data.results
  return results
}
