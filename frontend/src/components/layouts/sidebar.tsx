'use client'
import StorageIcon from '@mui/icons-material/Storage'
import { Box } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'

interface Props {
  directories: string[]
}

export default function SideMenu(props: Props) {
  return (
    <Box height={'100vh'} position={'fixed'} minWidth={'250px'} bgcolor={blueGrey['900']}>
      <Toolbar />
      <List>
        {props.directories.map((text, i) => (
          <ListItem key={i}>
            <ListItemButton>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
