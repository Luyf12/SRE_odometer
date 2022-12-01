import { Outlet, Navigate } from "react-router-dom";
import { Navbar, BigSidebar, SmallSidebar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { useAppContext } from "../../context/appContext";

const SharedLayout = () => {
  const { user } = useAppContext();
  return (
    <>
      {!user && <Navigate to="/landing" />}
      <Wrapper>
       
        <main className="dashboard">
          <BigSidebar />
         
          <SmallSidebar />
          <div> 
            <Navbar />
           
            <div className="dashboard-page">
            <Outlet />
            
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
