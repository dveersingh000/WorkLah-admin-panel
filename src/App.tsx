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
import AddEmployer from "./pages/employers/AddEmployer";
import QRCodeManagement from "./pages/qrCode/QrCode";

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="login" element={<SignIn />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
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
          <Route path="edit-candidate-profile/:id" element={<EditCandidateProfile />} />

          {/* Employers pages */}
          <Route path="employers" element={<EmployerTable />} />
          <Route path="employers/add-employer" element={<AddEmployer />} />
          <Route path="employers/:id/outletDetails" element={<OutletDetail />} />
          <Route path="employers/:id" element={<ActiveJobPosting id={""} />} />
          <Route path="employers/add-employer" element={<AddEmployer />} />

          <Route path="hustle-heroes" element={<HustleHeroesList />} />
          <Route path="payments" element={<EmployeePayments />} />

          <Route path="qrCode" element={<QRCodeManagement />} />

        </Route>
      </Route>
    </Routes>
  );
};

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The main app component, which renders the AuthProvider and Router
/******  f561d04b-a663-47e8-8b66-0364932f600c  *******/const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
