'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import AddCategoryDrawer from './AddCategoryDrawer'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const categoryData = [
  {
    id: 1,
    categoryTitle: 'Smart Phone',
    description: 'Choose from wide range of smartphones online at best prices.',
    totalProduct: 12548,
    totalEarning: 98784,
    image: '/images/apps/ecommerce/product-1.png'
  },
  {
    id: 2,
    categoryTitle: 'Clothing, Shoes, and jewellery',
    description: 'Fashion for a wide selection of clothing, shoes, jewellery and watches.',
    totalProduct: 4689,
    totalEarning: 45627,
    image: '/images/apps/ecommerce/product-9.png'
  },
  {
    id: 3,
    categoryTitle: 'Home and Kitchen',
    description: 'Browse through the wide range of Home and kitchen products.',
    totalProduct: 11297,
    totalEarning: 51097,
    image: '/images/apps/ecommerce/product-10.png'
  },
  {
    id: 4,
    categoryTitle: 'Beauty and Personal Care',
    description: 'Explore beauty and personal care products, shop makeup and etc.',
    totalProduct: 9474,
    totalEarning: 74829,
    image: '/images/apps/ecommerce/product-19.png'
  },
  {
    id: 5,
    categoryTitle: 'Books',
    description: 'Over 25 million titles across categories such as business  and etc.',
    totalProduct: 10257,
    totalEarning: 63618,
    image: '/images/apps/ecommerce/product-25.png'
  },
  {
    id: 6,
    categoryTitle: 'Games',
    description: 'Every month, get exclusive in-game loot, free games, a free subscription.',
    totalProduct: 14501,
    totalEarning: 65920,
    image: '/images/apps/ecommerce/product-12.png'
  },
  {
    id: 7,
    categoryTitle: 'Baby Products',
    description: 'Buy baby products across different categories from top brands.',
    totalProduct: 8624,
    totalEarning: 38838,
    image: '/images/apps/ecommerce/product-14.png'
  },
  {
    id: 8,
    categoryTitle: 'Growsari',
    description: 'Shop grocery Items through at best prices in India.',
    totalProduct: 7389,
    totalEarning: 72652,
    image: '/images/apps/ecommerce/product-26.png'
  },
  {
    id: 9,
    categoryTitle: 'Computer Accessories',
    description: 'Enhance your computing experience with our range of computer accessories.',
    totalProduct: 9876,
    totalEarning: 65421,
    image: '/images/apps/ecommerce/product-17.png'
  },
  {
    id: 10,
    categoryTitle: 'Fitness Tracker',
    description: 'Monitor your health and fitness goals with our range of advanced fitness trackers.',
    totalProduct: 1987,
    totalEarning: 32067,
    image: '/images/apps/ecommerce/product-10.png'
  },
  {
    id: 11,
    categoryTitle: 'Smart Home Devices',
    description: 'Transform your home into a smart home with our innovative smart home devices.',
    totalProduct: 2345,
    totalEarning: 87654,
    image: '/images/apps/ecommerce/product-11.png'
  },
  {
    id: 12,
    categoryTitle: 'Audio Speakers',
    description: 'Immerse yourself in rich audio quality with our wide range of speakers.',
    totalProduct: 5678,
    totalEarning: 32145,
    image: '/images/apps/ecommerce/product-2.png'
  }
]

// Column Definitions
const columnHelper = createColumnHelper()

const ProductCategoryTable = () => {
  // States
  const [addCategoryOpen, setAddCategoryOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[categoryData])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('categoryTitle', {
        header: 'Categories',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <img src={row.original.image} width={38} height={38} className='rounded bg-actionHover' />
            <div className='flex flex-col items-start'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.categoryTitle}
              </Typography>
              <Typography variant='body2'>{row.original.description}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('totalProduct', {
        header: 'Total Products',
        cell: ({ row }) => <Typography>{row.original.totalProduct.toLocaleString()}</Typography>
      }),
      columnHelper.accessor('totalEarning', {
        header: 'Total Earning',
        cell: ({ row }) => (
          <Typography>
            {row.original.totalEarning.toLocaleString('en-IN', { style: 'currency', currency: 'USD' })}
          </Typography>
        )
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                { text: 'Download', icon: 'tabler-download' },
                {
                  text: 'Delete',
                  icon: 'tabler-trash',
                  menuItemProps: { onClick: () => setData(data.filter(category => category.id !== row.original.id)) }
                },
                { text: 'Duplicate', icon: 'tabler-copy' }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search'
            className='max-sm:is-full'
          />
          <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:is-full'>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='flex-auto max-sm:is-full sm:is-[70px]'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='15'>15</MenuItem>
              <MenuItem value='25'>25</MenuItem>
            </CustomTextField>
            <Button
              variant='contained'
              className='max-sm:is-full'
              onClick={() => setAddCategoryOpen(!addCategoryOpen)}
              startIcon={<i className='tabler-plus' />}
            >
              Add Category
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddCategoryDrawer
        open={addCategoryOpen}
        categoryData={data}
        setData={setData}
        handleClose={() => setAddCategoryOpen(!addCategoryOpen)}
      />
    </>
  )
}

export default ProductCategoryTable
