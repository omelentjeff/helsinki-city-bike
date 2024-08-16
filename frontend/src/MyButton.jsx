import React from "react";
import Button from "@mui/material/Button";

export default function MyButton({ label, onClick }) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginRight: 1 }}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
}
