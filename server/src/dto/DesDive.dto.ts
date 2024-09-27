import { Expose } from 'class-transformer';

export class DesDiveGet {
  @Expose() ID: string;
  @Expose() humanReadableID: string;
  @Expose() ddtipcon: string;
  @Expose() ddcodice: string;
  @Expose() ddcoddes: string;
  @Expose() ddnomdes: string | null;
  @Expose() ddindiri: string | null;
  @Expose() ddCap: string | null;
  @Expose() ddlocali: string | null;
  @Expose() ddprovin: string | null;
  @Expose() ddcodnaz: string | null;
  @Expose() ddperson: string | null;
  @Expose() ddNote: string | null;
  @Expose() ddtelefo: string | null;
  @Expose() ddEmail: string | null;
  @Expose() ddEmpec: string | null;
  @Expose() ddtiprif: string | null;
  @Expose() ddpredef: string | null;
  @Expose() dddtobso: Date | null;
  @Expose() ddnumfax: string | null;
  @Expose() ddmccodi: string | null;
  @Expose() ddmccodt: string | null;
  @Expose() ddrfdich: string | null;
  @Expose() ddtelfax: string | null;
  @Expose() ddtipinf: string | null;
  @Expose() cpupdtms: Date | null;
  @Expose() cpccchk: string | null;
}
