// Tenant unions by INE province code, from their public contact pages (checked October 2026).
// Provinces without one fall back to the national confederation.

export interface TenantUnion {
  name: string;
  email: string;
}

const CATALUNYA: TenantUnion = { name: 'Sindicat de Llogateres de Catalunya', email: 'sindicat@sindicatdellogateres.org' };

const BY_PROVINCE: Record<string, TenantUnion> = {
  '03': { name: "Sindicat d'Inquilines d'Alacant", email: 'inquilinesalacant@gmail.com' },
  '04': { name: 'Sindicato de Inquilinas de Almería', email: 'almeria.sindicatoinquilinas@gmail.com' },
  '07': { name: 'Sindicat de Llogateres de Mallorca', email: 'sindicat@llogateresmallorca.org' },
  '08': CATALUNYA,
  '11': { name: 'Sindicato de Inquilinas de Cádiz', email: 'info@inquilinatocadiz.org' },
  '14': { name: 'Sindicato de Inquilinas de Córdoba', email: 'sindicatodeinquilinasdecordoba@gmail.com' },
  '15': { name: 'Sindicato de Vivenda da Coruña', email: 'sindi@revolteira.gal' },
  '17': CATALUNYA,
  '25': CATALUNYA,
  '28': { name: 'Sindicato de Inquilinas de Madrid', email: 'sumate@inquilinato.org' },
  '29': { name: 'Sindicato de Inquilinas de Málaga', email: 'info@inquilinatomalaga.org' },
  '30': { name: 'Sindicato de Vivienda de Murcia', email: 'sindicatoviviendamurcia@proton.me' },
  '33': { name: 'Sindicato de Inquilinas de Asturias', email: 'inquilinastur@gmail.com' },
  '36': { name: 'Sindicato de Inquilinas de Vigo', email: 'info@sindicatoinquilinasvigo.org' },
  '41': { name: 'Sindicato de Inquilinas de Sevilla', email: 'inquilinatosevilla@gmail.com' },
  '43': CATALUNYA,
  '46': { name: 'Sindicat de Llogateres de València', email: 'sindicat@llogateresvalencia.org' },
  '50': { name: 'Sindicato de Inquilinas de Zaragoza', email: 'sindicatoinquilinaszgz@gmail.com' },
};

const NATIONAL: TenantUnion = { name: 'Confederación de Sindicatos de Inquilinas', email: 'organizate@poderinquilino.org' };

export function tenantUnionFor(province: string | null): TenantUnion {
  return (province && BY_PROVINCE[province]) || NATIONAL;
}
