'use client'

import React, { useState } from 'react'
import { DataFromCollectionSlug } from 'payload'

import Autocomplete from '@mui/joy/Autocomplete'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Grid from '@mui/joy/Grid'

import AspectRatio from '@mui/joy/AspectRatio'
import Box, { BoxProps } from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardOverflow from '@mui/joy/CardOverflow'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Divider from '@mui/joy/Divider'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

import { split, Ingredient, GroceryHash } from '../utils/groceries'

export interface Suggestion {
  id: string | number
  label: string
}

export interface MealFinderProps {
  props: BoxProps
  meals: DataFromCollectionSlug<'meals'>[]
}

interface Groceries {
  needGroceries: GroceryHash
  checkGroceries: GroceryHash
}

const MealFinder = ({ props, meals }: MealFinderProps) => {
  const [mealList, setMealList] = useState<DataFromCollectionSlug<'meals'>[]>([])
  const [groceries, setGroceries] = useState<Groceries>({
    needGroceries: {},
    checkGroceries: {},
  })
  const [inputValue, setInputValue] = React.useState('')
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const onChange = (evt: React.SyntheticEvent<Element, Event>, suggestion: Suggestion | null) => {
    if (!suggestion) return
    const meal = meals.find((m) => m.id === Number(suggestion.id))
    if (!meal) return
    const newMealList = [...mealList, meal]
    setMealList(newMealList)
    setGroceries(
      split(newMealList.reduce((n, o) => n.concat(o.ingredients! || []), [] as Ingredient[])),
    )
    setTimeout(() => {
      setInputValue('')
    }, 1)
  }
  console.log('GROCERIES', groceries)

  // const groceryLink = mealList.reduce((o, m) => {
  //   return o + `${o ? '&' : '/groceries?'}id=${m.id}`
  // }, '')

  return (
    <Box
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(275px, 1fr) minmax(150px, 275px)',
            md: 'minmax(375px, 1fr) minmax(275px, 375px)',
          },
          height: '100%',
          width: '100%',
          flexGrow: 1,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box
        sx={[
          {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
            height: '100%',
            width: '100%',
            flexGrow: 1,
            alignItems: 'stretch',
          },
        ]}
      >
        {' '}
        <Grid
          sx={{
            borderRadius: 'sm',
            gridColumn: '1/-1',
            display: { xs: 'block' },
          }}
        >
          <FormControl size="lg">
            <FormLabel>Meal Finder</FormLabel>
            <Autocomplete
              variant="soft"
              name="meal"
              aria-label="Meal Selector"
              onChange={onChange}
              clearOnBlur={false}
              selectOnFocus
              disableClearable={true}
              inputValue={inputValue}
              onInputChange={(event, newInputValue, reason) => {
                console.log(reason, inputValue)
                if (event) setInputValue(newInputValue)
              }}
              options={meals.map((meal) => ({ id: meal.id, label: meal.name }))}
            />
          </FormControl>
        </Grid>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
        {mealList.map((meal, i) => (
          <Card key={i} variant="outlined" size="sm">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <Typography level="title-md">{meal.name}</Typography>
                {/* <Typography level="body-sm">2.4GB</Typography> */}
              </Box>
              <Dropdown>
                <MenuButton variant="plain" size="sm" sx={{ maxWidth: '32px', maxHeight: '32px' }}>
                  <IconButton component="span" variant="plain" color="neutral" size="sm">
                    <MoreVertRoundedIcon />
                  </IconButton>
                </MenuButton>
                <Menu
                  placement="bottom-end"
                  size="sm"
                  sx={{
                    zIndex: '99999',
                    p: 1,
                    gap: 1,
                    '--ListItem-radius': 'var(--joy-radius-sm)',
                  }}
                >
                  <MenuItem sx={{ textColor: 'danger.500' }}>
                    <EditRoundedIcon />
                    Edit
                  </MenuItem>
                  <MenuItem sx={{ textColor: 'danger.500' }}>
                    <DeleteRoundedIcon color="danger" />
                    Delete
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Box>
            <CardOverflow
              sx={{
                borderBottom: '1px solid',
                borderTop: '1px solid',
                borderColor: 'neutral.outlinedBorder',
              }}
            >
              <AspectRatio
                ratio="16/9"
                color="primary"
                sx={{ borderRadius: 0, color: 'primary.plainColor' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <InsertDriveFileRoundedIcon />
                </Box>
              </AspectRatio>
            </CardOverflow>
            <Typography level="body-xs">{days[i]}</Typography>
          </Card>
        ))}
        </Box>
      </Box>
      <Sheet
        sx={{
          display: { xs: 'none', sm: 'initial' },
          borderLeft: '1px solid',
          borderColor: 'divider',
          height: '100%',
          width: '100%',
          flexGrow: 1,
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Typography level="title-md" sx={{ flex: 1 }}>
            Groceries
          </Typography>
          <IconButton component="span" variant="plain" color="neutral" size="sm">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Divider />
        <Tabs>
          <TabList>
            <Tab sx={{ flexGrow: 1 }}>
              <Typography level="title-sm">Need</Typography>
            </Tab>
            <Tab sx={{ flexGrow: 1 }}>
              <Typography level="title-sm">Check</Typography>
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <List>
                {Object.values(groceries.needGroceries)?.map((g, i) => (
                  <ListItem key={i}>
                    <ListItemDecorator>{g.amount.toFixed(2)} </ListItemDecorator>{' '}
                    {g.ingredient.name}
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <List>
                {Object.values(groceries.checkGroceries)?.map((g, i) => (
                  <ListItem key={i}>
                    <ListItemDecorator>{g.amount.toFixed(2)} </ListItemDecorator>{' '}
                    {g.ingredient.name}
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanel>
        </Tabs>
      </Sheet>
    </Box>
  )
}

export default MealFinder
