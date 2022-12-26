import { useState, useEffect } from "react";
import FormRow from "../components/FormRow";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { id } from "date-fns/locale";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Toolbar,
  Button,
  AppBar,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Card, CardHeader } from "@mui/material";
import { Icon } from "@iconify/react";
import StarFreqTab from "../components/AnalyzeBoard/StarFreqTab";
import CommitFreqTab from "../components/AnalyzeBoard/CommitFreqTab";
import IssueFreqTab from "../components/AnalyzeBoard/IssueFreqTab";
import PrDesignChart from "../components/AnalyzeBoard/PrDesignChart";
import TopicBarChart from "../components/AnalyzeBoard/TopicBarChart";
import TopicPieChart from "../components/AnalyzeBoard/TopicPieChart";
import TopicWorldCloud from "../components/AnalyzeBoard/TopicWorldCloud";
import KeyuserTab from "../components/AnalyzeBoard/KeyuserTab";
export default function Analyzeboard() {
  const _owner = "pytorch";
  const _name = "pytorch";
  const owner = "pytorch";
  const repoName = "pytorch";
  useEffect(() => {
    getFrequency(_owner, _name);
  }, []);
  const { isLoading, detail, getFrequency, importAnalyze } = useAppContext();
  const {
    committers,
    pullers,
    star_frequency,
    commit_frequency,
    issue_frequency,
  } = detail;
  console.log(detail);

  const initialRepoInfo = {
    owner: "",
    repoName: "",
  };
  const [open, setOpen] = useState(false);
  const [repoInfo, setRepoInfo] = useState(initialRepoInfo);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setRepoInfo(initialRepoInfo);
    setOpen(false);
  };
  const handleInput = (e) => {
    setRepoInfo({ ...repoInfo, [e.target.name]: e.target.value });
  };
  const handleImport = () => {
    importAnalyze(repoInfo);
    setRepoInfo(initialRepoInfo);
    setOpen(false);
  };

  if (isLoading) {
    return <Loading center />;
  } else {
    localStorage.setItem("starInterval", "month");
    localStorage.setItem("commitInterval", "month");
    localStorage.setItem("issueInterval", "month");

    return (
      <Container maxWidth="xl">
        <Box>
          <Box sx={{ flexGrow: 1, mt: 2 }}>
            <AppBar
              position="static"
              color=""
              sx={{
                borderRadius: 2,
                height: 90,
              }}
            >
              <Toolbar sx={{ mt: 1 }}>
                <Stack direction="row" spacing={6}>
                  <IconButton onClick={handleClickOpen}>
                    <Icon icon="bx:bx-import" color="#2cb1bc" />
                  </IconButton>
                </Stack>
                <Stack direction="row" spacing={6}>
                  <span className="text">Repo: pytorch/pytorch</span>
                  <span className="text">
                    Last update: 2022-12-13T00:45:14.000Z
                  </span>
                </Stack>
              </Toolbar>
            </AppBar>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Update Analyze Data</DialogTitle>
              <DialogContent>
                <Stack direction="row" spacing={2}>
                  <FormRow
                    type="text"
                    name="owner"
                    value={repoInfo.owner}
                    handleChange={handleInput}
                  />
                  <FormRow
                    type="text"
                    name="repoName"
                    value={repoInfo.repoName}
                    handleChange={handleInput}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleImport}>
                  Import
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Core users" />
              <Card>
                <KeyuserTab data={detail} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Stars Frequency" />
              <Card>
                <StarFreqTab data={star_frequency} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Commits Frequency" />
              <Card>
                <CommitFreqTab data={commit_frequency} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Issues Frequency" />
              <Card>
                <IssueFreqTab data={issue_frequency} />
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Design Discussions" />
              <Card>
                <PrDesignChart />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Design Topics" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <TopicPieChart />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <TopicWorldCloud />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Top Design Topics" />
              <Card>
                <TopicBarChart />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}
