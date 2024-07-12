'use server'

import { client } from '@/lib/axios'

interface ListBlobResponse {
  blobs: string[]
}

const getAllBlobKey = (container: string) => `/api/blob/list/${container}`

export const getAllBlob = async (container: string): Promise<string[]> => {
  const res = await client.get<ListBlobResponse>(getAllBlobKey(container))
  const results = res.data.blobs
  return results
}
