"use client";

import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  onSearch?: (query: string, host: string, status: string) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSearch = () => {
    onSearch?.(searchQuery, selectedHost, selectedStatus);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-8 mt-5 md:pl-40">
        {/* Search Input */}
        <div className="relative" style={{ flex: "1 1 238px", maxWidth: "300px" }}>
          <TextField
            variant="outlined"
            placeholder="Search Event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "100%",
              height: "40.24px",
              borderRadius: "6px",
              background: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                height: "40.24px",
                paddingRight: "40px",
                "& fieldset": {
                  borderColor: "#E4E6EE",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#4A5F8A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4A5F8A",
                },
              },
              input: {
                padding: "8px 9px 8px 12px",
                fontSize: "15px",
              },
            }}
            InputProps={{
              endAdornment: null,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "32px",
              height: "32px",
              background: "#E9F1FB",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Host Filter */}
        <FormControl
          sx={{
            minWidth: 200,
            height: "40.24px",
            background: "#fff",
            borderRadius: "6px",
            border: "1px solid #E4E6EE",
          }}
        >
          <InputLabel id="host-select-label" sx={{ top: "-4px" }}>
            Search By Host
          </InputLabel>
          <Select
            labelId="host-select-label"
            value={selectedHost}
            label="Search By Host"
            onChange={(e) => setSelectedHost(e.target.value)}
            sx={{
              height: "40.24px",
              borderRadius: "6px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E4E6EE",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4A5F8A",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4A5F8A",
              },
            }}
          >
            <MenuItem value="">All Hosts</MenuItem>
            <MenuItem value="host1">Host 1</MenuItem>
            <MenuItem value="host2">Host 2</MenuItem>
          </Select>
        </FormControl>

        {/* Payment Status Filter */}
        <FormControl
          sx={{
            minWidth: 200,
            height: "40.24px",
            background: "#fff",
            borderRadius: "6px",
            border: "1px solid #E4E6EE",
          }}
        >
          <InputLabel id="status-select-label" sx={{ top: "-4px" }}>
            Payment Status
          </InputLabel>
          <Select
            labelId="status-select-label"
            value={selectedStatus}
            label="Payment Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{
              height: "40.24px",
              borderRadius: "6px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E4E6EE",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4A5F8A",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4A5F8A",
              },
            }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#2957A4",
            color: "#fff",
            borderRadius: "6px",
            height: "40.24px",
            minWidth: "120px",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#1d417a",
              boxShadow: "none",
            },
          }}
        >
          Search
        </Button>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "95%",
          height: "1px",
          background: "#E4E6EE",
          marginTop: "12px",
          marginLeft: "40px",
        }}
      />
    </>
  );
}
