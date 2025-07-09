import React from "react";
import { CustomButton } from "../../shared/CustomButton";
import Image from "next/image";
import { Dialog, DialogContent, DialogActions, Typography } from "@mui/material";

interface FeedbackSuccessDialogProps{
    open:boolean;
    onClose:()=>void;
}

export function FeedbackSuccessDialog({open,onClose}:FeedbackSuccessDialogProps)
{

    return(
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogContent sx={{ display:"flex", alignItems:"center",textAlign:"center", alignContent:"center",flexDirection:"column", py: 5,borderRadius:"10px" }}>
          <Image src="/images/tick.png" className="mb-4" alt="tick" width={120} height={100}/>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Your Feedback submit Successfully
          </Typography>
          <DialogActions sx={{ justifyContent: "center" }}>
            <CustomButton
              label="OK"
              width="200px"
              height="50px"
              sx={{ background: "#345794" }}
              onClick={onClose}
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
}