'use client';
import { ContentState, SearchResultsListState } from '@/recoil/blobs/atoms';
import FolderIcon from '@mui/icons-material/Folder';
import { ListItemButton, ListItemIcon } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { getBlobText } from '../api/get-blob-text';

export const BlobListItem = ({ container, blob }: { container: string; blob: string }) => {
  const setContentState = useSetRecoilState(ContentState);
  const setSearchResult = useSetRecoilState(SearchResultsListState);
  const handleClick = useCallback(
    async (blob: string) => {
      const text = await getBlobText(container, blob);
      setContentState(text);
      setSearchResult([]);
    },
    [container, setContentState, setSearchResult],
  );
  return (
    <ListItemButton onClick={() => handleClick(blob)}>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={blob} />
    </ListItemButton>
  );
};
