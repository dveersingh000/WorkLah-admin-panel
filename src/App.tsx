import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import JobManagement from "./pages/JobManagement";
import EmployerDetailPage from "./pages/employers/EmployerDetailPage";
import CandidatesTable from "./pages/employers/CandidatesTable";
import JobDetailsPage from "./pages/jobManagemant/JobDetailsPage";
import CandidateProfile from "./pages/jobManagemant/CandidateProfile";
import EmployerTable from "./pages/employers/Employers";
import ActiveJobPosting from "./pages/employers/ActiveJobPosting";
import HustleHeroesList from "./pages/hustleHeroes/HustleHeroesList";
import EditCandidateProfile from "./pages/jobManagemant/EditCandidateProfile";
import EmployeePayments from "./pages/payments/EmployeePayments";
import OutletDetail from "./pages/employers/OutletDetail";
import SignIn from "./pages/auth/SignIn";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { useAuth, AuthProvider } from "./context/AuthContext";
import NewJob from "./pages/jobManagemant/NewJob";
import ModifyJob from "./pages/jobManagemant/ModifyJob";

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="login" element={<SignIn />} />

      {/* Protected Routes */}
      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* Job Management */}
          <Route path="jobs/job-management" element={<JobManagement />} />
          <Route path="jobs/create-job" element={<NewJob />} />
          <Route path="jobs/:jobId/outlate-attendnce" element={<EmployerDetailPage />} />
          <Route path="jobs/:jobId/candidates" element={<CandidatesTable />} />
          <Route path="jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="jobs/:jobId/modify" element={<ModifyJob />} />
          <Route path="jobs/:jobId/candidates/:id" element={<CandidateProfile />} />
          <Route path="edit-candidate-profile" element={<EditCandidateProfile />} />

          {/* Employers pages */}
          <Route path="employers" element={<EmployerTable />} />
          <Route path="employers/:id/outletDetails" element={<OutletDetail />} />
          <Route path="employers/:id" element={<ActiveJobPosting id={""} />} />

          <Route path="hustle-heroes" element={<HustleHeroesList />} />
          <Route path="payments" element={<EmployeePayments />} />
        </Route>
      {/* </Route> */}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
