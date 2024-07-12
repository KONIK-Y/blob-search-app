import { Box, Container, Grid } from '@mui/material'
import { BlobList } from './components/blob-list'
import { ContentsDisplay } from './components/contents-display'
import { SearchInputArea } from './components/search-input'

export default function StorageMenu() {
  return (
    <Container
      style={{
        width: '100%',
        maxWidth: '100%',
        padding: '0',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} marginBottom={5}>
          <Box>
            <SearchInputArea />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <BlobList container="aoai-hr-rules" />
        </Grid>
        <Grid item xs={12} md={9}>
          <ContentsDisplay />
        </Grid>
      </Grid>
    </Container>
  )
}
