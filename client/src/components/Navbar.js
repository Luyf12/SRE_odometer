import { useState } from "react";
import { Icon } from "@iconify/react";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
const Navbar = () => {
  const { user, logoutUser, toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
      <button className="toggle-btn" onClick={() => toggleSidebar()}>
          <Icon icon="ant-design:align-left-outlined" />
        </button>
        <div>
        <Logo className="logo" />
          <h3 className="logo-text">dashboard</h3>
        </div>
        {user && (
          <div className="btn-container">
            <button className="btn" onClick={() => setShowLogout(!showLogout)}>
              <Icon icon="carbon:user-avatar-filled" />
              {user}
              <Icon icon="ant-design:caret-down-filled" />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
              <button onClick={() => logoutUser()} className="dropdown-btn">
                logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
