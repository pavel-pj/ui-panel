export const baseUrl = 'http://localhost:8000/api';

//catalog
export function catalogURL() {
  return `${baseUrl}/catalogs`;
}

export function catalogCreateURL() {
  return `${baseUrl}/catalogs`;
}

export function catalogItemShowURL(id: any) {
  return `${baseUrl}/catalogs/${id}`;
}

//Удаление раздела каталога
export function deleteCatalogURL(id: string) {
  return `${baseUrl}/catalogs/${id}`;
}