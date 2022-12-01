import {
  AppBar,
  Stack,
  Box,
  Toolbar,
  Button,
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
import { useState, useEffect } from "react";
import Alert from "../Alert";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext";
import { Icon } from "@iconify/react";

const initialRepoInfo = {
  owner: "",
  repoName: "",
};

const SearchContainer = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [repoInfo, setRepoInfo] = useState(initialRepoInfo);
  const {
    showAlert,
    isLoading,
    viewMyRepos,
    handleChange,
    importRepo,
    search,
    getRepos,
  } = useAppContext();

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
    importRepo(repoInfo);
    setRepoInfo(initialRepoInfo);
    setOpen(false);
  };
  const toggleRepos = () => {
    handleChange({ name: "viewMyRepos", value: !viewMyRepos });
  };
  const handleKeyword = (e) => {
    if (isLoading) return;
    setKeyword(e.target.value);
  };
  const handleSubmit = () => {
    handleChange({ name: "search", value: keyword });
  };

  useEffect(() => {
    getRepos();
  }, [search]);

  return (
    <>
      {showAlert && <Alert sx={{ mb: 2 }} />}
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
            <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
              <InputLabel>Search  </InputLabel>
              <OutlinedInput
                id="search-repos"
                type="text"
                value={keyword}
                onChange={handleKeyword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      onClick={handleSubmit}
                      edge="end"
                    >
                      <Icon icon="eva:search-outline" color="#2cb1bc" />
                    </IconButton>
                  </InputAdornment>
                }
                label="SearchRepos"
              />
            </FormControl>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={2}>
              <IconButton onClick={handleClickOpen}>
                <Icon icon="bx:bx-import" color="#2cb1bc" />
              </IconButton>
              <Button color="primary" onClick={toggleRepos}>
                {viewMyRepos ? "view all repos" : "view my repos"}
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Import Repo</DialogTitle>
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
    </>
  );
};

export default SearchContainer;
