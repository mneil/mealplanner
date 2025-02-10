'use client'

import React, { useState } from 'react'
import { DataFromCollectionSlug } from 'payload'

import Autocomplete from '@mui/joy/Autocomplete'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Grid from '@mui/joy/Grid'

import AspectRatio from '@mui/joy/AspectRatio'
import Box, { BoxProps } from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardOverflow from '@mui/joy/CardOverflow'
import CardCover from '@mui/joy/CardCover'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

export interface Suggestion {
  id: string | number
  label: string
}

export interface MealFinderProps extends BoxProps {
  meals: DataFromCollectionSlug<'meals'>[]
}

const MealFinder = (props: MealFinderProps) => {
  const [mealList, setMealList] = useState<DataFromCollectionSlug<'meals'>[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const onChange = (evt: React.SyntheticEvent<Element, Event>, suggestion: Suggestion | null) => {
    if (!suggestion) return
    const meal = props.meals.find((m) => m.id === Number(suggestion.id))
    if (!meal) return
    setMealList((mealList) => [...mealList, meal])
    setTimeout(() => {
      setInputValue('')
    }, 1)
  }

  const groceryLink = mealList.reduce((o, m) => {
    return o + `${o ? '&' : '/groceries?'}id=${m.id}`
  }, '')

  return (
    <Box
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 2,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
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
              event && setInputValue(newInputValue)
            }}
            options={props.meals.map((meal) => ({ id: meal.id, label: meal.name }))}
          />
        </FormControl>
      </Grid>
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
  )
}

export default MealFinder
