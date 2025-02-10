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

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Divider from '@mui/joy/Divider'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Avatar from '@mui/joy/Avatar'
import AvatarGroup from '@mui/joy/AvatarGroup'
import Chip from '@mui/joy/Chip'

import { split, Ingredient } from '../utils/groceries'

export interface Suggestion {
  id: string | number
  label: string
}

export interface MealFinderProps {
  props: BoxProps
  meals: DataFromCollectionSlug<'meals'>[]
}

interface Groceries {
  needGroceries: DataFromCollectionSlug<'meals'>[]
  checkGroceries: DataFromCollectionSlug<'meals'>[]
}

const MealFinder = ({ props, meals }: MealFinderProps) => {
  const [mealList, setMealList] = useState<DataFromCollectionSlug<'meals'>[]>([])
  const [groceries, setGroceries] = useState<Groceries>({
    needGroceries: [],
    checkGroceries: [],
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

  const groceryLink = mealList.reduce((o, m) => {
    return o + `${o ? '&' : '/groceries?'}id=${m.id}`
  }, '')

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
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box
        sx={[
          {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 2,
            p: 2,
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
                event && setInputValue(newInputValue)
              }}
              options={meals.map((meal) => ({ id: meal.id, label: meal.name }))}
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
      <Sheet
        sx={{
          display: { xs: 'none', sm: 'initial' },
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Typography level="title-md" sx={{ flex: 1 }}>
            torres-del-paine.png
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
            {groceries.needGroceries?.map((g, i) => <li key={i}>{g.name}</li>)}
            <AspectRatio ratio="21/9">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format"
                srcSet="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format&dpr=2 2x"
              />
            </AspectRatio>
            <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography level="title-sm" sx={{ mr: 1 }}>
                Shared with
              </Typography>
              <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
                <Avatar
                  src="https://i.pravatar.cc/24?img=6"
                  srcSet="https://i.pravatar.cc/48?img=6 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=7"
                  srcSet="https://i.pravatar.cc/48?img=7 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=8"
                  srcSet="https://i.pravatar.cc/48?img=8 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=9"
                  srcSet="https://i.pravatar.cc/48?img=9 2x"
                />
              </AvatarGroup>
            </Box>
            <Divider />
            <Box
              sx={{
                gap: 2,
                p: 2,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                '& > *:nth-child(odd)': { color: 'text.secondary' },
              }}
            >
              <Typography level="title-sm">Type</Typography>
              <Typography level="body-sm" textColor="text.primary">
                Image
              </Typography>
              <Typography level="title-sm">Size</Typography>
              <Typography level="body-sm" textColor="text.primary">
                3,6 MB (3,258,385 bytes)
              </Typography>
              <Typography level="title-sm">Location</Typography>
              <Typography level="body-sm" textColor="text.primary">
                Travel pictures
              </Typography>
              <Typography level="title-sm">Owner</Typography>
              <Typography level="body-sm" textColor="text.primary">
                Michael Scott
              </Typography>
              <Typography level="title-sm">Modified</Typography>
              <Typography level="body-sm" textColor="text.primary">
                26 October 2016
              </Typography>
              <Typography level="title-sm">Created</Typography>
              <Typography level="body-sm" textColor="text.primary">
                5 August 2016
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ py: 2, px: 1 }}>
              <Button variant="plain" size="sm" endDecorator={<EditRoundedIcon />}>
                Add a description
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography level="title-md">This week</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/24?img=2"
                srcSet="https://i.pravatar.cc/48?img=2 2x"
              />
              <div>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                  <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                    You
                  </Typography>
                  <Typography level="body-sm">shared</Typography>
                  <Typography level="title-sm">torres-del-paine.png</Typography>
                </Box>
                <Chip variant="outlined" startDecorator={<ShareRoundedIcon />}>
                  Shared with 3 users
                </Chip>
                <Typography level="body-xs" sx={{ mt: 1 }}>
                  3 Nov 2023
                </Typography>
              </div>
            </Box>
            <Typography level="title-md">Older</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/24?img=2"
                srcSet="https://i.pravatar.cc/48?img=2 2x"
              />
              <div>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                  <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                    You
                  </Typography>
                  <Typography level="body-sm">edited</Typography>
                  <Typography level="title-sm">torres-del-paine.png</Typography>
                </Box>
                <Chip variant="outlined" startDecorator={<EditRoundedIcon />}>
                  Changed name
                </Chip>
                <Typography level="body-xs" sx={{ mt: 1 }}>
                  12 Apr 2021
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/24?img=2"
                srcSet="https://i.pravatar.cc/48?img=2 2x"
              />
              <div>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                  <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                    You
                  </Typography>
                  <Typography level="body-sm">created</Typography>
                  <Typography level="title-sm">torres-del-paine.png</Typography>
                </Box>
                <Chip variant="outlined" startDecorator={<EditRoundedIcon />}>
                  Added 5 Apr 2021
                </Chip>
                <Typography level="body-xs" sx={{ mt: 1 }}>
                  12 Apr 2021
                </Typography>
              </div>
            </Box>
          </TabPanel>
        </Tabs>
      </Sheet>
    </Box>
  )
}

export default MealFinder
