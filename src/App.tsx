import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Battle } from "./pages/Battle";
import { CampaignMap } from "./pages/CampaignMap";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/connexion" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CampaignMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secteur/:topicId"
          element={
            <ProtectedRoute>
              <Battle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppShell>
  );
}
