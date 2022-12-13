import * as React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Toolbar,
  Button,
  Card,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Compare from "./Compare";
import Compare1 from "./Compare1";
import Compare2 from "./Compare2";
import Companyconstar from "./Companycon";
import Companyconstar1 from "./Companycon1";
import Companyconstar2 from "./Companycon2";
export default function BasicSelect() {
  const [age, setage] = React.useState(2);

  const handleChange = (event) => {
    setage(event.target.value);
  };
  let Mes;
  let Mes1;
  if (age == 1) {
    Mes = <Compare total={age} />;
    Mes1 = <Companyconstar />;
  } else if (age == 2) {
    Mes = <Compare1 total={age} />;
    Mes1 = <Companyconstar1 />;
  } else if (age == 3) {
    Mes = <Compare2 total={age} />;
    Mes1 = <Companyconstar2 />;
  }
  return (
    <Box sx={{ minWidth: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">repo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="repo"
              onChange={handleChange}
            >
              <MenuItem value={1}>ASdepthmodel</MenuItem>
              <MenuItem value={2}>SDautolayout</MenuItem>
              <MenuItem value={3}>TinyG</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Card>{Mes}</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Card>{Mes1}</Card>
        </Grid>
      </Grid>
    </Box>
  );
}
