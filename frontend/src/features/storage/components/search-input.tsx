'use client';
import { SearchResultsListState } from '@/recoil/blobs/atoms';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { KeyboardEvent, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { postSimpleSearch } from '../api/simple-search';

export const SearchInputArea = () => {
  const [query, setQuery] = useState('');
  const setSearchResult = useSetRecoilState(SearchResultsListState);

  const sendQuery = useCallback(async () => {
    const result = await postSimpleSearch(query);
    setSearchResult(result);
  }, [query, setSearchResult]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendQuery();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        m: 'auto',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={query}
        onKeyDown={(e) => {
          handleKeyPress(e);
        }}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索ワードを入力してください"
        inputProps={{ 'aria-label': '検索ワードを入力してください' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={sendQuery}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
