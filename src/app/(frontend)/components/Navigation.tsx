import * as React from 'react'
// import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'

import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FastfoodIcon from '@mui/icons-material/Fastfood'
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

export default function Navigation() {
  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>Browse</ListSubheader>
        <List aria-labelledby="nav-list-browse" sx={{ '& .JoyListItemButton-root': { p: '8px' } }}>
          <ListItem>
            <ListItemButton component="a" selected href="/">
              <ListItemDecorator>
                <MenuBookIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Home</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="/meals">
              <ListItemDecorator>
                <FastfoodIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Meals</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="/groceries">
              <ListItemDecorator>
                <AddShoppingCartIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Groceries</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
      {/* <ListItem nested sx={{ mt: 2 }}>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>Tags</ListSubheader>
        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            '--ListItemDecorator-size': '32px',
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'primary.500',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Personal</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'danger.500',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Work</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'warning.400',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Travels</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'success.400',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Concert tickets</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem> */}
    </List>
  )
}
