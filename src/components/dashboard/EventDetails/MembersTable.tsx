"use client"

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Phone, Mail } from "lucide-react"
import { ProfileImage } from "./ui/ProfileImage"
import { MemberInfoCell } from "./ui/MemberInfoCell"
import { AmountCell } from "./ui/AmountCell"
import { StatusChip } from "./ui/StatusChip"

interface Member {
  id: string
  name: string
  phoneNumber: string
  email: string
  dueAmount: number
  userStatus: "Host" | "Co-Host" | "Guest"
  paymentStatus: "Paid" | "Pending" | "Overdue"
}

interface MembersTableProps {
  members: Member[]
}

export function MembersTable({ members }: MembersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return { backgroundColor: "#E8F5E8", color: "#2E7D32" }
      case "Pending":
        return { backgroundColor: "#FFF3E0", color: "#F57C00" }
      case "Overdue":
        return { backgroundColor: "#FFEBEE", color: "#D32F2F" }
      default:
        return { backgroundColor: "#F5F5F5", color: "#666" }
    }
  }


  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E0E0E0",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          fontSize: "23px",
          paddingLeft:"30px",
          marginBottom: "24px",
          color: "#333",
          background:"#F1F6FF"
        }}
      >
        Members of event
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#4A5F8A",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderBottom: "2px solid #E0E0E0",
                  padding: "12px 16px",
                }}
              >
                Member Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#4A5F8A",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderBottom: "2px solid #E0E0E0",
                  padding: "12px 16px",
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  color: "#4A5F8A",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderBottom: "2px solid #E0E0E0",
                  padding: "12px 16px",
                }}
              >
                Email Address
              </TableCell>
              <TableCell
                sx={{
                  color: "#4A5F8A",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderBottom: "2px solid #E0E0E0",
                  padding: "12px 16px",
                }}
              >
                Due Amount
              </TableCell>
              <TableCell
                sx={{
                  color: "#4A5F8A",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderBottom: "2px solid #E0E0E0",
                  padding: "12px 16px",
                }}
              >
                Payment Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#F8F9FA",
                  },
                }}
              >
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <ProfileImage />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#333",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {member.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <MemberInfoCell icon={<Phone className="w-4 h-4 text-gray-400" />} value={member.phoneNumber} />
                </TableCell>
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <MemberInfoCell icon={<Mail className="w-4 h-4 text-gray-400" />} value={member.email} />
                </TableCell>
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <AmountCell amount={member.dueAmount} />
                </TableCell>
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <StatusChip label={member.paymentStatus} sx={getStatusColor(member.paymentStatus)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
