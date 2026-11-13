import { Navigate, Route, Routes } from "react-router";
import Layout from "@components/Layout/Layout";
import DocsLayout from "@components/DocsLayout/DocsLayout";
import RutaPrivata from "@components/RutaPrivata/RutaPrivata";
import Acasa from "@pages/Acasa/Acasa";
import Despre from "@pages/Despre/Despre";
import Contact from "@pages/Contact/Contact";
import DocsBunVenit from "@pages/DocsBunVenit/DocsBunVenit";
import Sectiune from "@pages/Sectiune/Sectiune";
import Pagina from "@pages/Pagina/Pagina";
import Comentarii from "@pages/Comentarii/Comentarii";
import Editare from "@pages/Editare/Editare";
import DocsNotFound from "@pages/DocsNotFound/DocsNotFound";
import Cauta from "@pages/Cauta/Cauta";
import Istoric from "@pages/Istoric/Istoric";
import Login from "@pages/Login/Login";
import NotFound from "@pages/NotFound/NotFound";
import date from "@data/docs.json";

const primaSectiune = date.sectiuni[0].id;

export default function App() {
  return (
    <Routes>
      {/* Rută layout fără path: header și footer comune */}
      <Route element={<Layout />}>
        <Route path="/" element={<Acasa />} />
        <Route path="despre" element={<Despre />} />
        <Route path="contact" element={<Contact />} />

        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsBunVenit />} />
          <Route
            path="start"
            element={<Navigate to={`/docs/${primaSectiune}`} replace />}
          />
          {/* /docs/privat/* este protejat de RutaPrivata */}
          <Route element={<RutaPrivata />}>
            <Route path=":sectiune" element={<Sectiune />} />
            <Route path=":sectiune/:paginaId" element={<Pagina />}>
              <Route path="comentarii" element={<Comentarii />} />
            </Route>
            <Route path=":sectiune/:paginaId/editare" element={<Editare />} />
          </Route>
          <Route path="*" element={<DocsNotFound />} />
        </Route>

        <Route path="cauta" element={<Cauta />} />
        <Route path="istoric" element={<Istoric />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
