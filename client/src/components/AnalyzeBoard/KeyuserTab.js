import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Keyuser from "./KeyuserCommit";
import KeyuserPR from "./KeyuserPR";


export default function KeyuserTab(data) {
  console.log(data);

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
            <Tab label="Commit" value="1" />
            <Tab label="Pull Request" value="2" />
       
          </TabList>
        </Box>
        <TabPanel value="1">
          <Keyuser data={data.data.committers}/>
        </TabPanel>

        <TabPanel value="2">
          <KeyuserPR data={data.data.pullers}/>
        </TabPanel>
        
       
      </TabContext>
    </Box>
  );
}
