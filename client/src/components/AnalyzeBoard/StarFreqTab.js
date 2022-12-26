import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

import StarFreqChart from "./StarFreqChart";

export default function StarFreqTab(data) {
  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    if (newValue == "1") {
      localStorage.setItem("starInterval", "week");
    } else if (newValue == "2") {
      localStorage.setItem("starInterval", "month");
    } else if (newValue == "3") {
      localStorage.setItem("starInterval", "year");
    }
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Week" value="1" />
            <Tab label="Month" value="2" />
            <Tab label="Year" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <StarFreqChart data={data} />
        </TabPanel>

        <TabPanel value="2">
          <StarFreqChart data={data} />
        </TabPanel>

        <TabPanel value="3">
          <StarFreqChart data={data} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
