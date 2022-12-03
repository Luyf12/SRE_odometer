import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "../Loading";
import Repo from "./Repo";
import MyRepo from "./MyRepo";
import PageBtnContainer from "../PageBtnContainer";
import Wrapper from "../../assets/wrappers/AllRepos";
import Alert from "../Alert";
const AllRepos = () => {
  var {
    user,
    getRepos,
    repos,
    viewMyRepos,
    isLoading,
    search,
    page,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getRepos();
  }, [page, viewMyRepos]);

  if (isLoading) {
    return <Loading center />;
  }
  if (viewMyRepos) repos = repos.filter((repo) => repo.uploader === user);
  if (repos.length === 0 && search === "") {
    return (
      <Wrapper>
        {/* {showAlert && <Alert />} */}
        <h2>
          {viewMyRepos
            ? "You have not imported projects."
            : "No repos to display..."}
        </h2>
      </Wrapper>
    );
  }
  if (repos.length === 0 && search !== "") {
    return (
      <Wrapper>
        {/* {showAlert && <Alert />} */}
        <h2>
          {viewMyRepos
            ? "You have no such repos...."
            : "No such repos to display..."}
        </h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {repos.length} repo{repos.length > 1 && "s"} found in{" "}
        {viewMyRepos ? "your" : "all"} repos
      </h5>
      <div className="repos">
        {repos.map((repo) => {
          if (!viewMyRepos) return <Repo key={repo._id} {...repo} />;
          else if (repo.uploader === user)
            return <MyRepo key={repo._id} {...repo} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default AllRepos;
