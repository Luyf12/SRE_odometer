import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CompanyList from "./CompanyListstar";
import CompanyList1 from "./CompanyListissue";
import CompanyList2 from "./CompanyListstarcommit";
import CommitFreqChart from "./CommitFreqChart";
import LineBarChart from "./CompanyChartissue";
import LineBarChart1 from "./CompanyChartstar";
import LineBarChart2 from "./CompanyChartcommit";
export default function Companytab() {
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
          <LineBarChart1 />
          <CompanyList />
        </TabPanel>

        <TabPanel value="2">
          <LineBarChart />
          <CompanyList1 />
        </TabPanel>
        <TabPanel value="3">
          <LineBarChart2 />
          <CompanyList2 />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
