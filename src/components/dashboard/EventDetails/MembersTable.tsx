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
import { useIsMobile } from "@/hooks/useIsMobile"
import { CustomDivider } from "@/components/shared/CustomDivider"

export interface Member {
  id: string
  name: string
  phoneNumber: string
  email: string
  equityAmount: number
  depositedAmount: number
  dueAmount: number
  paymentStatus: "Paid" | "Pending" | "Overdue"
}

interface MembersTableProps {
  members: Member[] | undefined;
}

export function MembersTable({ members }: MembersTableProps) {
  const isMobile = useIsMobile()

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

  return isMobile ? (
    <Box>
      <Typography variant="h6" fontWeight={500} mb={2} color="#101010">
        Members of Event
      </Typography>
      {members?.map((member) => (
        <Box
          key={member.id}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #E0E0E0",
            padding: 2,
            mb: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {/* Member Name */}
          <Box>
            <Typography fontSize={12} fontWeight={600} color="#345794">
              Member Name:
            </Typography>
            <Typography fontSize={14} color="#000000">{member.name}</Typography>
          </Box>
          <CustomDivider/>
          <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"5px"}}>
            <Box mb={1}>
              <Typography fontSize={12} fontWeight={600} color="#345794">
                Phone Number:
              </Typography>
              <Typography fontSize={14} color="#000000">{member.phoneNumber}</Typography>
              <Typography fontSize={12} fontWeight={600} color="#345794">
                Email:
              </Typography>
              <Typography fontSize={14} color="#000000">{member.email}</Typography>
            </Box>
            <Box mb={1}>
              <Typography fontSize={12} fontWeight={600} color="#345794">
                Equity Amount:
              </Typography>
              <Typography fontSize={14} color="#000000">${member.equityAmount}</Typography>
              <Typography fontSize={12} fontWeight={600} color="#345794">
                Deposited Amount:
              </Typography>
              <Typography fontSize={14} color="#000000">${member.depositedAmount}</Typography>
              <Typography fontSize={12} fontWeight={600} color="#345794">
                Due Amount:
              </Typography>
              <Typography fontSize={14} color="#000000">${member.dueAmount}</Typography>
              <Typography fontSize={12} fontWeight={600} color="#345794">
                Payment Status:
              </Typography>
              <Typography
                fontSize={14}
                sx={{
                  ...getStatusColor(member.paymentStatus),
                  px: 1,
                  py: 0.5,
                  borderRadius: "6px",
                  display: "inline-block",
                  fontWeight: 600,
                }}
              >
                {member.paymentStatus}
              </Typography>
            </Box>

          </Box>

        </Box>
      ))}
    </Box>
  ) : (
    // Desktop layout
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
          paddingLeft: "30px",
          marginBottom: "24px",
          color: "#333",
          background: "#F1F6FF",
        }}
      >
        Members of event
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["Member Name", "Phone Number", "Email Address", "Equity Amount", "Deposited Amount", "Due Amount", "Payment Status"].map((text) => (
                <TableCell
                  key={text}
                  sx={{
                    color: "#4A5F8A",
                    fontSize: "12px",
                    fontWeight: 600,
                    borderBottom: "2px solid #E0E0E0",
                    padding: "12px 16px",
                  }}
                >
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((member) => (
              <TableRow
                key={member.id}
                sx={{ "&:hover": { backgroundColor: "#F8F9FA" } }}
              >
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <ProfileImage />
                    <Typography variant="body2" sx={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>
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
                  <AmountCell amount={member.equityAmount} />
                </TableCell>
                <TableCell sx={{ padding: "16px", borderBottom: "1px solid #F0F0F0" }}>
                  <AmountCell amount={member.depositedAmount} />
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
