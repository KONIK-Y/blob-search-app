'use server'

import { client } from '@/lib/axios'

interface BlobResponse {
  buffer: ArrayBuffer
}

const getBlobBufferKey = (container: string, blob: string) =>
  `/api/blob/file/${container}/${blob}`

export const getBlobBuffer = async (
  container: string,
  blob: string,
): Promise<ArrayBuffer> => {
  const res = await client.get<BlobResponse>(getBlobBufferKey(container, blob))
  const result = res.data.buffer
  return result
}
