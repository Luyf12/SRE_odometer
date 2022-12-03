import moment from "moment";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Repo";
import RepoInfo from "./RepoInfo";

const MyRepo = ({ _id, owner, name, stars, uploaded_time }) => {
  const { deleteRepo } = useAppContext();

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
          <RepoInfo icon={<Icon icon="entypo:star" />} text={stars} />
          <RepoInfo icon={<Icon icon="ci:calendar" />} text={date} />
        </div>
        <footer>
          <div className="actions">
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteRepo(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default MyRepo;
