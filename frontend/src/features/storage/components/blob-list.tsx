'use server';
import { Box, List } from '@mui/material';
import { getAllBlob } from '../api/list-blobs';
import { groupByFolder } from '../utils/path-parser';
import { BlobListItem } from './blob-listitem';

export const BlobList = async ({ container }: { container: string }) => {
  const blobs = await getAllBlob(container);
  const groupedBlobs = groupByFolder(blobs);
  console.log(groupedBlobs);

  return (
    <Box>
      <List>
        {blobs.map((blob, i) => (
          <BlobListItem key={i} container={container} blob={blob} />
        ))}
      </List>
    </Box>
  );
};
