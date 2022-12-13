import moment from "moment";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Wrapper from "../../assets/wrappers/Repo";
import RepoInfo from "./RepoInfo";

const Repo = ({ _id, owner, name, uploader, stars, uploaded_time }) => {
  let date = moment(uploaded_time);
  date = date.format("MMM Do,YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{owner}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <Stack>
            <RepoInfo
              icon={<Icon icon="ic:outline-drive-folder-upload" />}
              text={uploader}
            />
            <RepoInfo icon={<Icon icon="entypo:star" />} text={stars} />
            <RepoInfo icon={<Icon icon="ci:calendar" />} text={date} />
          </Stack>
        </div>
        <footer>
          <div className="actions">
            <Link to={`/dashboard/${_id}`} className="btn edit-btn">
              View
            </Link>
            <Link to={`/analyze/${_id}`} className="btn edit-btn">
             analyze
            </Link>
            <Link to={`/contrast/${_id}`} className="btn edit-btn">
             contrast
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Repo;
