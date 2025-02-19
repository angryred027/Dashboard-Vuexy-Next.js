
"use client"

import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2'
import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { getSession } from "next-auth/react";
import classnames from 'classnames'
const data = [
  {
    title: 'Pending / 0',
    subtitle: 'Transactions',
    icon: 'tabler-check'
  },
  {
    title: '$0',
    subtitle: 'Total Amount',
    icon: 'tabler-currency-dollar'
  },
]

const TransactionsTable = ({ invoiceData }) => {
  const [transactions, setTransactions] = useState([]);
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session) {
        const userId = session.user?.id;
        console.log(userId)

        const apiUrl = `/api/transaction?userId=${userId}`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res && res.ok) {
          const obj = await res.json();
          const transactions = obj.data;
          setTransactions(transactions);
          console.log(transactions);
        }
      }
      else return;
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      {/* <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              {data.map((item, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 6 }}
                  key={index}
                  className={classnames({
                    '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                      isBelowMdScreen && !isBelowSmScreen,
                    '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                  })}
                >
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <Typography variant='h4'>{item.title}</Typography>
                      <Typography>{item.subtitle}</Typography>
                    </div>
                    <Avatar variant='rounded' className='is-[42px] bs-[42px]'>
                      <i className={classnames(item.icon, 'text-[26px]')} />
                    </Avatar>
                  </div>
                  {isBelowMdScreen && !isBelowSmScreen && index < data.length - 2 && (
                    <Divider
                      className={classnames('mbs-6', {
                        'mie-6': index % 2 === 0
                      })}
                    />
                  )}
                  {isBelowSmScreen && index < data.length - 1 && <Divider className='mbs-6' />}
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid size={{ xs: 12 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.transactionDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        /> */}
      </Grid>
    </Grid>
  )
}

export default TransactionsTable
