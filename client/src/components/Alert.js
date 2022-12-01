import { useAppContext } from "../context/appContext";
import { Alert } from "@mui/material";

const MyAlert = () => {
  const { alertType, alertText } = useAppContext();
  return <Alert severity={alertType}>{alertText}</Alert>;
};

export default MyAlert;
