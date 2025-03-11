'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export interface ConfirmDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    onConfirm: (taget: any) => boolean;
}

function ConfirmDialog(props: ConfirmDialogProps) {
    const { onClose, selectedValue, open, onConfirm } = props;

    const handleClose = () => {
        onClose(selectedValue);
      };
      const handleListItemClick = () => {
        onConfirm(selectedValue);
      };
      return (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Xác nhận"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc muốn thực hiện
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>

              <Button onClick={handleListItemClick} autoFocus>
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    
}