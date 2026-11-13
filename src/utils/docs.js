import date from "@data/docs.json";

export const { sectiuni, pagini } = date;

export const paginiDinSectiune = (sectiuneId) =>
  pagini.filter((p) => p.sectiune === sectiuneId);

export const gasestePagina = (sectiuneId, paginaId) =>
  pagini.find((p) => p.sectiune === sectiuneId && p.id === paginaId);

const ETICHETE_FIXE = {
  editare: "Editare",
  comentarii: "Comentarii",
};

// Transformă segmentele URL-ului în etichete lizibile pentru breadcrumb și istoric.
export const etichetaSegment = (segmente, index) => {
  const segment = segmente[index];
  if (index === 0) return "Docs";
  if (index === 1) {
    return sectiuni.find((s) => s.id === segment)?.titlu ?? segment;
  }
  if (index === 2) {
    return gasestePagina(segmente[1], segment)?.titlu ?? segment;
  }
  return ETICHETE_FIXE[segment] ?? segment;
};

export const formateazaData = (iso) =>
  new Date(iso).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
