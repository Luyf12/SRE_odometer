import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  Error,
  Register,
  DashboardApp,
  Analyzeboard,
  Contrastboard,
  Companyboard,
} from "./pages";
import { Repos, SharedLayout } from "./pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Repos />} />
            <Route path="/dashboard/:id" element={<DashboardApp />} />
            <Route path="/company/:owner/:name" element={<Companyboard />} />
            <Route path="/contrast/:id" element={<Contrastboard />} />
            <Route path="/analyze" element={<Analyzeboard />} />
          </Route>
          <Route path="/login" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
