export const baseUrl = 'http://localhost:8000/api';

//catalog
export function catalogURL() {
  return `${baseUrl}/catalogs`;
}

export function catalogCreateURL() {
  return `${baseUrl}/catalogs`;
}


//Удаление rкаталога
export function deleteCatalogURL(id: string) {
  return `${baseUrl}/catalogs/${id}`;
}