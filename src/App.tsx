import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Battle } from "./pages/Battle";
import { CampaignMap } from "./pages/CampaignMap";
import { Course } from "./pages/Course";
import { Journal } from "./pages/Journal";
import { Login } from "./pages/Login";
import { TopicDetail } from "./pages/TopicDetail";
import { WarBattle } from "./pages/WarBattle";

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
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guerre/:warId"
          element={
            <ProtectedRoute>
              <WarBattle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secteur/:topicId"
          element={
            <ProtectedRoute>
              <TopicDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secteur/:topicId/cours"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secteur/:topicId/:exerciseId"
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
