import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CommitFreqChart from "./CommitFreqChart";

export default function CommitFreqTab(data) {
  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    if (newValue == "1") {
      localStorage.setItem("commitInterval", "week");
    } else if (newValue == "2") {
      localStorage.setItem("commitInterval", "month");
    } else if (newValue == "3") {
      localStorage.setItem("commitInterval", "year");
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
          <CommitFreqChart data={data}/>
        </TabPanel>
        <TabPanel value="2">
          <CommitFreqChart data={data}/>
        </TabPanel>
        <TabPanel value="3">
          <CommitFreqChart data={data}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
