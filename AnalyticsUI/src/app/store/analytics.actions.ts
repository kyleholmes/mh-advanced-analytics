import { createAction, props } from "@ngrx/store";
import { SimpleCount } from "../models/simple-count";

export enum AnalyticsStateActionTypes {
  GET_DEVICE_TYPES = '[Analytics] Get Device Types',
  GET_DEVICE_TYPES_RES = '[Analytics] Get Device Types Results',
  GET_DEVICE_TYPES_ERR = '[Analytics] Get Device Types Error',

  GET_SCREEN_SIZES = '[Analytics] Get Screen Sizes',
  GET_SCREEN_SIZES_RES = '[Analytics] Get Screen Sizes Results',
  GET_SCREEN_SIZES_ERR = '[Analytics] Get Screen Sizes Error',

  GET_POWER_USERS = '[Analytics] Get Power Users',
  GET_POWER_USERS_RES = '[Analytics] Get Power Users Results',
  GET_POWER_USERS_ERR = '[Analytics] Get Power Users Error',

  GET_LAST_WEEK_ERRORS = '[Analytics] Get Last Week Errors',
  GET_LAST_WEEK_ERRORS_RES = '[Analytics] Get Last Week Errors Results',
  GET_LAST_WEEK_ERRORS_ERR = '[Analytics] Get Last Week Errors Error',

  GET_PAGE_LOADS = '[Analytics] Get Page Loads',
  GET_PAGE_LOADS_RES = '[Analytics] Get Page Loads Results',
  GET_PAGE_LOADS_ERR = '[Analytics] Get Page Loads Error',
}

export const GetDeviceTypes = createAction(AnalyticsStateActionTypes.GET_DEVICE_TYPES);
export const GetDeviceTypesResults = createAction(AnalyticsStateActionTypes.GET_DEVICE_TYPES_RES, props<{ deviceTypeList: SimpleCount[] }>());
export const GetDeviceTypesError = createAction(AnalyticsStateActionTypes.GET_DEVICE_TYPES_ERR, props<{ message: string }>());

export const GetScreenSizes = createAction(AnalyticsStateActionTypes.GET_SCREEN_SIZES);
export const GetScreenSizesResults = createAction(AnalyticsStateActionTypes.GET_SCREEN_SIZES_RES, props<{ screenSizesList: SimpleCount[] }>());
export const GetScreenSizesError = createAction(AnalyticsStateActionTypes.GET_SCREEN_SIZES_ERR, props<{ message: string }>());

export const GetPowerUsers = createAction(AnalyticsStateActionTypes.GET_POWER_USERS);
export const GetPowerUsersResults = createAction(AnalyticsStateActionTypes.GET_POWER_USERS_RES, props<{ powerUsers: SimpleCount[] }>());
export const GetPowerUsersError = createAction(AnalyticsStateActionTypes.GET_POWER_USERS_ERR, props<{ message: string }>());

export const GetLastWeekErrors = createAction(AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS);
export const GetLastWeekErrorsResults = createAction(AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_RES, props<{ lastWeekErrors: SimpleCount[] }>());
export const GetLastWeekErrorsError = createAction(AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_ERR, props<{ message: string }>());

export const GetPageLoads = createAction(AnalyticsStateActionTypes.GET_PAGE_LOADS);
export const GetPageLoadsResults = createAction(AnalyticsStateActionTypes.GET_PAGE_LOADS_RES, props<{ pageLoads: SimpleCount[] }>());
export const GetPageLoadsError = createAction(AnalyticsStateActionTypes.GET_PAGE_LOADS_ERR, props<{ message: string }>());