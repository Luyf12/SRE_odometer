import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CompanyListStar from "./CompanyListstar";
import CompanyListIssue from "./CompanyListissue";
import CompanyListCommit from "./CompanyListcommit";

import BubbleStar from "./CompanyChartstar";
import BubbleIssue from "./CompanyChartissue";
import BubbleCommit from "./CompanyChartcommit";

export default function Companytab(data) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
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
            <Tab label="Stars" value="1" />
            <Tab label="Issues" value="2" />
            <Tab label="Commits" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BubbleStar data={data} />
          <CompanyListStar data={data} />
        </TabPanel>

        <TabPanel value="2">
          <BubbleIssue data={data} />
          <CompanyListIssue data={data} />
        </TabPanel>

        <TabPanel value="3">
          <BubbleCommit data={data} />
          <CompanyListCommit data={data} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
