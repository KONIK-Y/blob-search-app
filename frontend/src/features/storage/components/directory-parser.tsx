'use client';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';

export const FileTree = ({ blobs }: { blobs: any }) => {
  return (
    <>
      {Object.entries(blobs).map(([key, value]) => {
        if (key === 'files') {
          return (value as any[]).map((file, index) => (
            <ListItemButton key={index} style={{ marginLeft: '1rem' }}>
              <ListItemIcon style={{ padding: '0 5px' }}>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary={file} />
            </ListItemButton>
          ));
        } else {
          return (
            <List key={key}>
              <FolderNode name={key} content={value} />
            </List>
          );
        }
      })}
    </>
  );
};

export const FolderNode = ({ name, content }: { name: string; content: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <ListItemButton onClick={toggleOpen} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
      {isOpen && <FileTree blobs={content} />}
    </>
  );
};
