import { createAction, props } from "@ngrx/store";
import { DeviceType } from "../models/device-type";

export enum AnalyticsStateActionTypes {
  GET_DEVICE_TYPES = '[Analytics] Get Device Types',
  GET_DEVICE_TYPES_RES = '[Analytics] Get Device Types Results',
  GET_DEVICE_TYPES_ERR = '[Analytics] Get Device Types Error',
}

export const GetDeviceTypes = createAction(AnalyticsStateActionTypes.GET_DEVICE_TYPES);
export const GetDeviceTypesResults = createAction(AnalyticsStateActionTypes.GET_DEVICE_TYPES_RES, props<{ deviceTypeList: DeviceType[] }>());
export const GetDeviceTypesError = createAction(AnalyticsStateActionTypes.GET_DEVICE_TYPES_ERR, props<{ message: string }>());