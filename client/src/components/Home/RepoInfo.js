import Wrapper from "../../assets/wrappers/RepoInfo";

const RepoInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default RepoInfo;
