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
      else {
        const res = await response.json();
        const data = [];
        data.push(getFormattedData(JSON.parse(res.data)));
        console.log(data);
        setData(data);
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

  const convert = (num) => {
    const str = "";
    const size = Number.parseInt(num);
    if (Number.isNaN(size)) {
      return 'N/A';
    }
    if (size > 1000000) return Math.floor(size / 1000000) + "M+";
    else if (size > 1000 && size < 1000000) return Math.floor(size / 1000) + "K+";
    else return size;
  }

  const getFormattedData = (data) => {
    const subreddit = `${data.subreddit}`;
    const age_Required = `${data.most_recent_user.days_since_registration ?? "N/A"}`;
    const comment_Karma = `${data.lowest_comment_karma_user.comment_karma ?? "N/A"}`;
    const nsfw_Status = `${data.lowest_link_karma_post.nsfw_status ?? "N/A"}`;
    const post_Karma = `${data.lowest_link_karma_post.link_karma ?? "N/A"}`;
    const size = `${convert(data.most_recent_user.num_members ?? "N/A")}`;
    const link = `${data.lowest_link_karma_post.post_url ?? "N/A"}`;

    const formattedData = {
      subreddit: subreddit,
      age_Required: age_Required ?? "N/A",
      comment_Karma: comment_Karma ?? "N/A",
      nsfw: nsfw_Status ?? "N/A",
      post_Karma: post_Karma ?? "N/A",
      size: size ?? "N/A",
      link: link,
    };

    return formattedData;
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between"
        sx={{ display: { sm: 'block', md: 'flex', lg: 'flex' } }} alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            Reddit Subreddit Search
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}
          sx={{
            display: { sm: 'block', md: 'flex', lg: 'flex', }
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
              <TableCell>Subreddit</TableCell>
              <TableCell>Age Required</TableCell>
              <TableCell>Comment Karma</TableCell>
              <TableCell>NSFW</TableCell>
              <TableCell>Post Karma</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.subreddit}</TableCell>
                <TableCell>{row.age_Required}</TableCell>
                <TableCell>{row.comment_Karma}</TableCell>
                <TableCell>{row.nsfw}</TableCell>
                <TableCell>{row.post_Karma}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>
                  <a href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "underline",
                      color: 'blue'
                    }}>
                    Link
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
