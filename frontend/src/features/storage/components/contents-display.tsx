'use client'
import { ContentState, SearchResultsListState } from '@/recoil/blobs/atoms'
import { Container } from '@mui/material'
import Markdown from 'react-markdown'
import { useRecoilValue } from 'recoil'
import remarkGfm from 'remark-gfm'
import { SearchResultsList } from './search-result'

export const ContentsDisplay = () => {
  const blobContent = useRecoilValue(ContentState)
  const searchResults = useRecoilValue(SearchResultsListState)
  return (
    <Container>
      {searchResults.length > 0 ? (
        <SearchResultsList />
      ) : (
        <Markdown remarkPlugins={[remarkGfm]}>{blobContent}</Markdown>
      )}
    </Container>
  )
}
