"use client";

import { useState } from "react";
import { CustomSelect } from "../shared/CustomSelect";
import { CustomSearchInput } from "../shared/CustomSearchInput";
import { CustomButton } from "../shared/CustomButton";
import { CustomDivider } from "../shared/CustomDivider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Filter } from "lucide-react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface SearchFiltersProps {
  readonly onSearch?: (query: string, host: string, status: string) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHost, setSelectedHost] = useState("allHost");
  const [selectedStatus, setSelectedStatus] = useState("allStatus");
  const [showFilter, setShowFilter] = useState(false);
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (onSearch) {
      if (trimmedQuery === ""|| trimmedQuery === undefined) {
        onSearch("", selectedHost, selectedStatus); 
      } else {
        onSearch(trimmedQuery, selectedHost, selectedStatus); 
      }
    }
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const hostOptions = [
    { label: "All Hosts", value: "allHost" },
    { label: "Host 1", value: "host" },
    { label: "Host 2", value: "cohost" },
  ];

  const statusOptions = [
    { label: "All Status", value: "allStatus" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
  ];

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
    handleSearch(query); 
  };

  return isMobile ? (
    <>
      <div className="flex justify-end mb-4">
        <Button
          variant="outlined"
          onClick={handleFilterClick}
          startIcon={<Filter className="w-4 h-4" />}
          sx={{
            borderColor: "#E0E0E0",
            color: "#666",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "20px",
            "&:hover": {
              borderColor: "#4A5F8A",
              color: "#4A5F8A",
              backgroundColor: "transparent",
            },
          }}
        >
          Filter
        </Button>
      </div>
      <Dialog
        open={showFilter}
        onClose={handleFilterClick}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiDialog-paper": {
            maxHeight: 400,
            overflowY: "auto",
          },
        }}
      >
        <DialogTitle>Filter Events</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: 20 }}>
            <CustomSearchInput
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search Event..."
              maxWidth="100%"
              handleSearch={handleSearch} 
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <CustomSelect
              label="Search By Host"
              value={selectedHost}
              onChange={setSelectedHost}
              options={hostOptions}
              maxWidth="100%"
            />
          </div>
          <CustomSelect
            label="Payment Status"
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={statusOptions}
            maxWidth="100%"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterClick} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSearch(searchQuery); 
              handleFilterClick();
            }}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <>
      <div className="flex flex-wrap gap-4 mb-5 mt-5 justify-end">
        <CustomSearchInput
          value={searchQuery}
          onChange={handleInputChange} 
          placeholder="Search Event..."
          maxWidth={300}
          handleSearch={handleSearch} 
        />
        <CustomSelect
          label="Search By Host"
          value={selectedHost}
          onChange={setSelectedHost}
          options={hostOptions}
          maxWidth={300}
        />
        <CustomSelect
          label="Payment Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={statusOptions}
          maxWidth={300}
        />
        <CustomButton
          label="Search"
          onClick={() => handleSearch(searchQuery)} 
        />
      </div>
      <CustomDivider />
    </>
  );
}
