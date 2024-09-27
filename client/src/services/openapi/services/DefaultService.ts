/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentiView } from "../models/AgentiView";
import type { AllegatiBasic } from "../models/AllegatiBasic";
import type { AllegatiPart } from "../models/AllegatiPart";
import type { ArticoliView } from "../models/ArticoliView";
import type { ByID } from "../models/ByID";
import type { ByNumericID } from "../models/ByNumericID";
import type { Clienti } from "../models/Clienti";
import type { ClientiView } from "../models/ClientiView";
import type { ComodatoContrattiEdit } from "../models/ComodatoContrattiEdit";
import type { ComodatoContrattiMastEdit } from "../models/ComodatoContrattiMastEdit";
import type { ComodatoContrattiMastView } from "../models/ComodatoContrattiMastView";
import type { ConsumometrBasic } from "../models/ConsumometrBasic";
import type { ContiBasicGet } from "../models/ContiBasicGet";
import type { ContiGet } from "../models/ContiGet";
import type { DocBasicLookup } from "../models/DocBasicLookup";
import type { DocDettBasicGet } from "../models/DocDettBasicGet";
import type { DocLookup } from "../models/DocLookup";
import type { FamArtiBasic } from "../models/FamArtiBasic";
import type { FamArtiConInterventi } from "../models/FamArtiConInterventi";
import type { GeneratedID } from "../models/GeneratedID";
import type { GeneratedNumero } from "../models/GeneratedNumero";
import type { GrupmercView } from "../models/GrupmercView";
import type { InterventiMastBasicEdit } from "../models/InterventiMastBasicEdit";
import type { InterventiMasterEdit } from "../models/InterventiMasterEdit";
import type { InterventiMastView } from "../models/InterventiMastView";
import type { KeyArtView } from "../models/KeyArtView";
import type { ListaInterventiBasic } from "../models/ListaInterventiBasic";
import type { MagazzinoView } from "../models/MagazzinoView";
import type { MatricolaBasicGet } from "../models/MatricolaBasicGet";
import type { ScontiContrattiDettView } from "../models/ScontiContrattiDettView";
import type { ScontiContrattiEdit } from "../models/ScontiContrattiEdit";
import type { ScontiContrattiMastBasicLookup } from "../models/ScontiContrattiMastBasicLookup";
import type { ScontiContrattiMastEdit } from "../models/ScontiContrattiMastEdit";
import type { ScontiContrattiMastView } from "../models/ScontiContrattiMastView";
import type { ScontiMaturatiEdit } from "../models/ScontiMaturatiEdit";
import type { ScontiMaturatiView } from "../models/ScontiMaturatiView";
import type { ScontiModelliBasicLookup } from "../models/ScontiModelliBasicLookup";
import type { ScontiModelliEdit } from "../models/ScontiModelliEdit";
import type { ScontiModelliLookup } from "../models/ScontiModelliLookup";
import type { ScontiModelliView } from "../models/ScontiModelliView";
import type { TecniciBasic } from "../models/TecniciBasic";
import type { TecniciInputView } from "../models/TecniciInputView";
import type { TecniciView } from "../models/TecniciView";
import type { TestGetQueryParams } from "../models/TestGetQueryParams";
import type { TipologieInterventoCreate } from "../models/TipologieInterventoCreate";
import type { TipologieInterventoEdit } from "../models/TipologieInterventoEdit";
import type { TipologieInterventoLookup } from "../models/TipologieInterventoLookup";
import type { TipologieInterventoView } from "../models/TipologieInterventoView";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DefaultService {
  /**
   * @returns ContiBasicGet
   * @throws ApiError
   */
  public static contiControllerSearchConti({
    searchValue,
    skip,
    take,
    antipcon,
  }: {
    searchValue: string;
    skip: number;
    take: number;
    antipcon: string;
  }): CancelablePromise<Array<ContiBasicGet>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/conti/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
        antipcon: antipcon,
      },
    });
  }

  /**
   * @returns ContiGet
   * @throws ApiError
   */
  public static contiControllerGetConto({
    id,
  }: {
    id: string;
  }): CancelablePromise<ContiGet> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/conti/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ArticoliView
   * @throws ApiError
   */
  public static articoliControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<ArticoliView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/articoli/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns ArticoliView
   * @throws ApiError
   */
  public static articoliControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<ArticoliView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/articoli/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ArticoliView
   * @throws ApiError
   */
  public static articoliControllerGetByKeyArt({
    id,
  }: {
    id: string;
  }): CancelablePromise<ArticoliView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/articoli/get-articolo-by-key-art",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ScontiModelliView
   * @throws ApiError
   */
  public static scontiModelliControllerList(): CancelablePromise<
    Array<ScontiModelliView>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-modelli/list",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiModelliControllerCreate({
    requestBody,
  }: {
    requestBody: ScontiModelliEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/sconti-modelli/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiModelliControllerUpdate({
    requestBody,
  }: {
    requestBody: ScontiModelliEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/sconti-modelli/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiModelliControllerDelete({
    requestBody,
  }: {
    requestBody: ByID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/sconti-modelli/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns ScontiModelliBasicLookup
   * @throws ApiError
   */
  public static scontiModelliControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<ScontiModelliBasicLookup>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-modelli/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns ScontiModelliLookup
   * @throws ApiError
   */
  public static scontiModelliControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<ScontiModelliLookup> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-modelli/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ScontiModelliEdit
   * @throws ApiError
   */
  public static scontiModelliControllerGetForEdit({
    id,
  }: {
    id: string;
  }): CancelablePromise<ScontiModelliEdit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-modelli/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ScontiContrattiMastView
   * @throws ApiError
   */
  public static scontiContrattiControllerList({
    codiceModello,
    alsoClosed,
  }: {
    codiceModello?: string;
    alsoClosed?: boolean;
  }): CancelablePromise<Array<ScontiContrattiMastView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-contratti/list",
      query: {
        codiceModello: codiceModello,
        alsoClosed: alsoClosed,
      },
    });
  }

  /**
   * @returns GeneratedID
   * @throws ApiError
   */
  public static scontiContrattiControllerGenerateNewId(): CancelablePromise<GeneratedID> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-contratti/generateNewId",
    });
  }

  /**
   * @returns ScontiContrattiMastEdit
   * @throws ApiError
   */
  public static scontiContrattiControllerGetForEdit({
    id,
  }: {
    id: string;
  }): CancelablePromise<ScontiContrattiMastEdit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-contratti/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiContrattiControllerCreate({
    requestBody,
  }: {
    requestBody: ScontiContrattiEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/sconti-contratti/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiContrattiControllerUpdate({
    requestBody,
  }: {
    requestBody: ScontiContrattiEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/sconti-contratti/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiContrattiControllerDelete({
    requestBody,
  }: {
    requestBody: ByID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/sconti-contratti/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns ScontiContrattiMastBasicLookup
   * @throws ApiError
   */
  public static scontiContrattiControllerGetSearchContrattiByConto({
    id,
  }: {
    id: string;
  }): CancelablePromise<Array<ScontiContrattiMastBasicLookup>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-contratti/contratti-by-conto",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ScontiContrattiDettView
   * @throws ApiError
   */
  public static scontiContrattiControllerGetRigheContratto({
    id,
  }: {
    id: string;
  }): CancelablePromise<Array<ScontiContrattiDettView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/sconti-contratti/righe-contratto",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ScontiMaturatiView
   * @throws ApiError
   */
  public static scontiMaturatiControllerList(): CancelablePromise<
    Array<ScontiMaturatiView>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/maturati/list",
    });
  }

  /**
   * @returns ScontiMaturatiEdit
   * @throws ApiError
   */
  public static scontiMaturatiControllerGetForEdit({
    id,
  }: {
    id: number;
  }): CancelablePromise<ScontiMaturatiEdit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/maturati/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiMaturatiControllerCreate({
    requestBody,
  }: {
    requestBody: ScontiMaturatiEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/maturati/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiMaturatiControllerUpdate({
    requestBody,
  }: {
    requestBody: ScontiMaturatiEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/maturati/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static scontiMaturatiControllerDelete({
    requestBody,
  }: {
    requestBody: ByNumericID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/maturati/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static testControllerTest({
    requestBody,
  }: {
    requestBody: TestGetQueryParams;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/test/post",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns GrupmercView
   * @throws ApiError
   */
  public static gruppoMerceologicoControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<GrupmercView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/gruppo-merceologico/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns GrupmercView
   * @throws ApiError
   */
  public static gruppoMerceologicoControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<GrupmercView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/gruppo-merceologico/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns TipologieInterventoView
   * @throws ApiError
   */
  public static tipologieInterventoControllerList(): CancelablePromise<
    Array<TipologieInterventoView>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tipologie-intervento/list",
    });
  }

  /**
   * @returns TipologieInterventoEdit
   * @throws ApiError
   */
  public static tipologieInterventoControllerGetForEdit({
    id,
  }: {
    id: string;
  }): CancelablePromise<TipologieInterventoEdit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tipologie-intervento/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static tipologieInterventoControllerCreate({
    requestBody,
  }: {
    requestBody: TipologieInterventoCreate;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/tipologie-intervento/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static tipologieInterventoControllerUpdate({
    requestBody,
  }: {
    requestBody: TipologieInterventoEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/tipologie-intervento/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static tipologieInterventoControllerDelete({
    requestBody,
  }: {
    requestBody: ByID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/tipologie-intervento/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns TipologieInterventoLookup
   * @throws ApiError
   */
  public static tipologieInterventoControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<TipologieInterventoLookup>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tipologie-intervento/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns TipologieInterventoLookup
   * @throws ApiError
   */
  public static tipologieInterventoControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<TipologieInterventoLookup> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tipologie-intervento/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns FamArtiBasic
   * @throws ApiError
   */
  public static attrezzatureControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<FamArtiBasic>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/attrezzature/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns FamArtiConInterventi
   * @throws ApiError
   */
  public static attrezzatureControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<FamArtiConInterventi> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/attrezzature/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns MatricolaBasicGet
   * @throws ApiError
   */
  public static matricoleControllerSearchConti({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<MatricolaBasicGet>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/matricole/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns MatricolaBasicGet
   * @throws ApiError
   */
  public static matricoleControllerGetConto({
    id,
  }: {
    id: string;
  }): CancelablePromise<MatricolaBasicGet> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/matricole/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns InterventiMastView
   * @throws ApiError
   */
  public static interventiMasterControllerList({
    tipoAttrezzatura,
    idCliente,
    idArticolo,
    idMatricola,
  }: {
    tipoAttrezzatura?: string;
    idCliente?: string;
    idArticolo?: string;
    idMatricola?: string;
  }): CancelablePromise<Array<InterventiMastView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/interventi-master/list",
      query: {
        tipoAttrezzatura: tipoAttrezzatura,
        idCliente: idCliente,
        idArticolo: idArticolo,
        idMatricola: idMatricola,
      },
    });
  }

  /**
   * @returns InterventiMastBasicEdit
   * @throws ApiError
   */
  public static interventiMasterControllerGetForEdit({
    id,
  }: {
    id: number;
  }): CancelablePromise<InterventiMastBasicEdit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/interventi-master/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static interventiMasterControllerCreate({
    requestBody,
  }: {
    requestBody: InterventiMasterEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/interventi-master/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static interventiMasterControllerUpdate({
    requestBody,
  }: {
    requestBody: InterventiMasterEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/interventi-master/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static interventiMasterControllerDelete({
    requestBody,
  }: {
    requestBody: ByNumericID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/interventi-master/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns GeneratedNumero
   * @throws ApiError
   */
  public static interventiMasterControllerGenerateNewNumero(): CancelablePromise<GeneratedNumero> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/interventi-master/generateNewNumero",
    });
  }

  /**
   * @returns DocBasicLookup
   * @throws ApiError
   */
  public static docControllerSearch({
    causali,
    searchValue,
    skip,
    take,
    idConto,
  }: {
    causali: string | null;
    searchValue: string;
    skip: number;
    take: number;
    idConto: string;
  }): CancelablePromise<Array<DocBasicLookup>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/doc/search",
      query: {
        causali: causali,
        searchValue: searchValue,
        skip: skip,
        take: take,
        idConto: idConto,
      },
    });
  }

  /**
   * @returns DocLookup
   * @throws ApiError
   */
  public static docControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<DocLookup> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/doc/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns DocDettBasicGet
   * @throws ApiError
   */
  public static docControllerGetDettagiDoc({
    id,
  }: {
    id: string;
  }): CancelablePromise<Array<DocDettBasicGet>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/doc/dettagli-doc",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns DocBasicLookup
   * @throws ApiError
   */
  public static docControllerGetDocByConto({
    causali,
    id,
  }: {
    causali: string | null;
    id: string;
  }): CancelablePromise<Array<DocBasicLookup>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/doc/doc-by-conto",
      query: {
        causali: causali,
        ID: id,
      },
    });
  }

  /**
   * @returns ComodatoContrattiMastView
   * @throws ApiError
   */
  public static comodatoContrattiControllerList({
    idCliente,
    idDestinazione,
    idMatricola,
    codiceArticolo,
    alsoClosed,
  }: {
    idCliente?: string;
    idDestinazione?: string;
    idMatricola?: string;
    codiceArticolo?: string;
    alsoClosed?: boolean;
  }): CancelablePromise<Array<ComodatoContrattiMastView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/comodato-contratti/list",
      query: {
        idCliente: idCliente,
        idDestinazione: idDestinazione,
        idMatricola: idMatricola,
        codiceArticolo: codiceArticolo,
        alsoClosed: alsoClosed,
      },
    });
  }

  /**
   * @returns ComodatoContrattiMastEdit
   * @throws ApiError
   */
  public static comodatoContrattiControllerGetForEdit({
    id,
  }: {
    id: number;
  }): CancelablePromise<ComodatoContrattiMastEdit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/comodato-contratti/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static comodatoContrattiControllerCreate({
    requestBody,
  }: {
    requestBody: ComodatoContrattiEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/comodato-contratti/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static comodatoContrattiControllerUpdate({
    requestBody,
  }: {
    requestBody: ComodatoContrattiEdit;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/comodato-contratti/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static comodatoContrattiControllerDelete({
    requestBody,
  }: {
    requestBody: ByNumericID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/comodato-contratti/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns GeneratedNumero
   * @throws ApiError
   */
  public static comodatoContrattiControllerGenerateNewNumero(): CancelablePromise<GeneratedNumero> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/comodato-contratti/generateNewNumero",
    });
  }

  /**
   * @returns KeyArtView
   * @throws ApiError
   */
  public static keyArtControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<KeyArtView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/key-art/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns KeyArtView
   * @throws ApiError
   */
  public static keyArtControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<KeyArtView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/key-art/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns MagazzinoView
   * @throws ApiError
   */
  public static magazzinoControllerSearch({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<MagazzinoView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/magazzino/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns MagazzinoView
   * @throws ApiError
   */
  public static magazzinoControllerGet({
    id,
  }: {
    id: string;
  }): CancelablePromise<MagazzinoView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/magazzino/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns ListaInterventiBasic
   * @throws ApiError
   */
  public static listaInterventiControllerList(): CancelablePromise<
    Array<ListaInterventiBasic>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lista-interventi/list",
    });
  }

  /**
   * @returns ListaInterventiBasic
   * @throws ApiError
   */
  public static listaInterventiControllerGetByMatricola({
    matricola,
  }: {
    matricola: string;
  }): CancelablePromise<ListaInterventiBasic> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lista-interventi/getByMatricola",
      query: {
        matricola: matricola,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static maturazioniControllerList({
    registrato,
    dataStart,
    dataEnd,
    dataDoc,
    codAgeStart,
    codAgeEnd,
  }: {
    registrato: string;
    dataStart?: string;
    dataEnd?: string;
    dataDoc?: string;
    codAgeStart?: string;
    codAgeEnd?: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/maturazioni/list",
      query: {
        dataStart: dataStart,
        dataEnd: dataEnd,
        dataDoc: dataDoc,
        codAgeStart: codAgeStart,
        codAgeEnd: codAgeEnd,
        registrato: registrato,
      },
    });
  }

  /**
   * @returns AllegatiBasic
   * @throws ApiError
   */
  public static allegatiControllerGet({
    collegamentoATabella,
    collegamentoACampo,
    valoreCampo,
  }: {
    collegamentoATabella: string;
    collegamentoACampo: string;
    valoreCampo: string;
  }): CancelablePromise<Array<AllegatiBasic>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/allegati/list",
      query: {
        collegamentoATabella: collegamentoATabella,
        collegamentoACampo: collegamentoACampo,
        valoreCampo: valoreCampo,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static allegatiControllerGetFile(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/allegati/files/{filename}",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static allegatiControllerCreate({
    requestBody,
  }: {
    requestBody: AllegatiPart;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/allegati/files",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static allegatiControllerUpdate({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: AllegatiPart;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/allegati/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static allegatiControllerRemove({
    id,
  }: {
    id: number;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/allegati/delete/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns AgentiView
   * @throws ApiError
   */
  public static agentiControllerGet(): CancelablePromise<AgentiView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/agenti/list",
    });
  }

  /**
   * @returns ClientiView
   * @throws ApiError
   */
  public static clientiControllerGet(): CancelablePromise<Array<ClientiView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/clienti/list",
    });
  }

  /**
   * @returns ClientiView
   * @throws ApiError
   */
  public static clientiControllerGetForEdit({
    id,
  }: {
    id: string;
  }): CancelablePromise<ClientiView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/clienti/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns Clienti
   * @throws ApiError
   */
  public static clientiControllerCreate({
    requestBody,
  }: {
    requestBody: ClientiView;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/clienti/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static clientiControllerUpdate({
    requestBody,
  }: {
    requestBody: ClientiView;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/clienti/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static clientiControllerDelete({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/clienti/delete",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static consumometrControllerGetFile({
    filename,
  }: {
    filename: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/files/file",
      query: {
        filename: filename,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static consumometrControllerUploadFile({
    requestBody,
  }: {
    requestBody: ConsumometrBasic;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/files/upload",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static mopDettControllerUpdate({
    requestBody,
  }: {
    requestBody: Array<string>;
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/mop-dett/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static materialiDocTuttiControllerList({
    mtcodmat,
  }: {
    mtcodmat: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/materiali-doc-tutti/view",
      query: {
        MTCODMAT: mtcodmat,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static situazioneMaterialiControllerList({
    ragioneSociale,
    inUso,
  }: {
    ragioneSociale: string;
    inUso: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/materiali/view",
      query: {
        ragione_sociale: ragioneSociale,
        In_Uso: inUso,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static listiniControllerList({
    codiceListino,
  }: {
    codiceListino: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/listini/view",
      query: {
        codice_listino: codiceListino,
      },
    });
  }

  /**
   * @returns TecniciBasic
   * @throws ApiError
   */
  public static tecniciControllerSearchTecnici({
    searchValue,
    skip,
    take,
  }: {
    searchValue: string;
    skip: number;
    take: number;
  }): CancelablePromise<Array<TecniciBasic>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tecnici/search",
      query: {
        searchValue: searchValue,
        skip: skip,
        take: take,
      },
    });
  }

  /**
   * @returns TecniciInputView
   * @throws ApiError
   */
  public static tecniciControllerGetTecnico({
    id,
  }: {
    id: string;
  }): CancelablePromise<TecniciInputView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tecnici/get",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns TecniciView
   * @throws ApiError
   */
  public static tecniciControllerList(): CancelablePromise<Array<TecniciView>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tecnici/list",
    });
  }

  /**
   * @returns TecniciView
   * @throws ApiError
   */
  public static tecniciControllerGetForEdit({
    id,
  }: {
    id: string;
  }): CancelablePromise<TecniciView> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tecnici/getForEdit",
      query: {
        ID: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static tecniciControllerCreate({
    requestBody,
  }: {
    requestBody: TecniciView;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/tecnici/create",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static tecniciControllerUpdate({
    requestBody,
  }: {
    requestBody: TecniciView;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/tecnici/update",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static tecniciControllerDelete({
    requestBody,
  }: {
    requestBody: ByID;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/tecnici/delete",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
