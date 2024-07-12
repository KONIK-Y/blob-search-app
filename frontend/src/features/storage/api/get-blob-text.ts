'use server'

import { client } from '@/lib/axios'

interface BlobResponse {
  text: string
}

const getBlobTextKey = (container: string, blob: string) =>
  `/api/blob/file_contents/${container}/${blob}`

export const getBlobText = async (
  container: string,
  blob: string,
): Promise<string> => {
  if (!container || !blob) {
    throw new Error('container and filepath is required')
  }
  const res = await client.get<BlobResponse>(getBlobTextKey(container, blob))
  const result = res.data.text
  return result
}
