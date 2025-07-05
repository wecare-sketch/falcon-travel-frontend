"use client";

import { useState } from "react";
import { CustomSelect } from "../shared/CustomSelect";
import { CustomSearchInput } from "../shared/CustomSearchInput";
import { CustomButton } from "../shared/CustomButton";
import { CustomDivider } from "../shared/CustomDivider";

interface SearchFiltersProps {
  readonly onSearch?: (query: string, host: string, status: string) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSearch = () => {
    onSearch?.(searchQuery, selectedHost, selectedStatus);
  };

  const hostOptions = [
    { label: "All Hosts", value: "allHost" },
    { label: "Host 1", value: "host1" },
    { label: "Host 2", value: "host2" },
  ];

  const statusOptions = [
    { label: "All Status", value: "allStatus" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-5 mt-5 justify-end">
        <CustomSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Event..."
        />

        <CustomSelect
          label="Search By Host"
          value={selectedHost}
          onChange={(value) => setSelectedHost(value)}
          options={hostOptions}
        />

        <CustomSelect
          label="Payment Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={statusOptions}
        />

        <CustomButton label="Search" onClick={handleSearch} />
      </div>

      <CustomDivider />
    </>
  );
}
