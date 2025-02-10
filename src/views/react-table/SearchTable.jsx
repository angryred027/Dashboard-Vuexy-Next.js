"use client"

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

const SearchTable = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subreddit, setSubreddit] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!(subreddit && limit)) {
        toast.warning("Input search values correctly!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      const params = {
        subreddit: subreddit,
        limit: limit,
      }

      const response = await fetch('/api/search', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const result = await response.json();
        toast.error('Error fetching data: ' + result.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Error fetching data: ' + error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatData = (resData) => {
    const data = [];

    return data;
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between"
        sx={{ display: { md: 'block', lg: 'flex' } }} alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            Advanced Search
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}
          sx={{
            display: { md: 'block', lg: 'flex', }
          }}>
          <TextField
            label="SubReddit"
            variant="outlined"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            size="small"
            sx={{ marginY: '5px', width: '100%', minHeight: 40, }}
          />
          <TextField
            label="Limit"
            variant="outlined"
            select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            size="small"
            sx={{ marginY: '5px', width: '100%', minHeight: 40, }}
          >
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </TextField>
          <Box sx={{ marginY: '5px', display: 'flex', width: '100%', minHeight: 40, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => fetchData()}
              size="small"
              sx={{
                minWidth: 100,
                minHeight: 40,
                padding: "6px 16px",
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Search"
              )}
            </Button>
          </Box>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Karma / Post Title</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.karma || row.postTitle}</TableCell>
                <TableCell>
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {/* {row.url} */}
                    More details...
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SearchTable;
