// Loader de contenido por idioma.
//
// La base de datos tendrá los idiomas separados (columna `locale`);
// estos JSON calcan ese modelo: un archivo por idioma.
// Para agregar un idioma: crea `xx.json` con la misma estructura,
// impórtalo abajo y agrégalo a LOCALES_CONTENIDO.
import es from './es.json';
import en from './en.json';

export const LOCALES_CONTENIDO = ['es', 'en'];
export const DEFAULT_CONTENIDO = 'es';

const CONTENIDO = { es, en };

export function getContenido(locale) {
  return CONTENIDO[locale] || CONTENIDO[DEFAULT_CONTENIDO];
}
