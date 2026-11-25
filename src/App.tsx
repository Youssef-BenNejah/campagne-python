import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Battle } from "./pages/Battle";
import { CampaignMap } from "./pages/CampaignMap";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<CampaignMap />} />
        <Route path="/secteur/:topicId" element={<Battle />} />
      </Routes>
    </AppShell>
  );
}
