import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import IssueFreqChart from "./IssueFreqChart";

export default function IssueFreqTab(data) {

  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    if (newValue == "1") {
      localStorage.setItem("issueInterval", "week");
    } else if (newValue == "2") {
      localStorage.setItem("issueInterval", "month");
    } else if (newValue == "3") {
      localStorage.setItem("issueInterval", "year");
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
          <IssueFreqChart data={data}/>
        </TabPanel>
        <TabPanel value="2">
          <IssueFreqChart data={data}/>
        </TabPanel>
        <TabPanel value="3">
          <IssueFreqChart data={data}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
