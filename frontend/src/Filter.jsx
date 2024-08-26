import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function NativeSelectDemo() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Sort
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "sort",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>Name</option>
          <option value={20}>Address</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
