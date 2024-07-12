import { Filepath } from '@/models/models';
import { ContentState, SearchResultsListState } from '@/recoil/blobs/atoms';
import { Button, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { useCallback } from 'react';
import Markdown from 'react-markdown';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getBlobText } from '../api/get-blob-text';
import '../styles/search-result.css';

export const SearchResultsList = () => {
  const [searchResults, setSearchResult] = useRecoilState(SearchResultsListState);
  const setContentState = useSetRecoilState(ContentState);
  const handleClick = useCallback(
    async (filepath: Filepath) => {
      setSearchResult([]);
      const newContent = await getBlobText(filepath.container, filepath.directory);
      setContentState(newContent);
    },
    [setContentState, setSearchResult],
  );
  return (
    <List>
      {searchResults &&
        searchResults.map((result, i) => (
          <>
            <ListItem key={i} className="search-result">
              <Grid container mx={6} py={3}>
                <Grid item xs={12} md={12} marginBottom={'1rem'}>
                  <Typography variant="h3" fontSize={'18px'} fontWeight={'bold'} lineHeight={2}>
                    {result.filepath.filename}
                  </Typography>
                  <Typography fontSize={'12px'}>score: {result.score}</Typography>
                </Grid>
                <Grid item xs={12} md={12} marginBottom={'2rem'}>
                  <Markdown>
                    {result.chunk.length > 150 ? result.chunk.substring(0, 150) + '...' : result.chunk}
                  </Markdown>
                </Grid>
                <Grid item xs={12} md={12} justifyContent={'end'}>
                  <Button
                    style={{
                      width: '150px',
                      fontSize: '18px',
                      display: 'block',
                      color: 'white',
                      backgroundColor: 'steelblue',
                      marginLeft: 'auto',
                    }}
                    onClick={() => handleClick(result.filepath)}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </>
        ))}
    </List>
  );
};
