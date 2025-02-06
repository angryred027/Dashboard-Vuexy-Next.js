'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import MyCourseHeader from './MyCourseHeader'
import Courses from './Courses'
import ColoredCards from './ColoredCards'
import FreeCourses from './FreeCourses'

const AcademyMyCourse = ({ courseData, mode }) => {
  // States
  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <MyCourseHeader mode={mode} searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Courses courseData={courseData} searchValue={searchValue} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ColoredCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FreeCourses />
      </Grid>
    </Grid>
  )
}

export default AcademyMyCourse
