import { createAction, props } from "@ngrx/store";
import { SimpleCount } from "../models/simple-count";
import { User } from "../models/user";
import { Page } from "../models/page";
import { Error } from "../models/error";
import { Activity } from "../models/activity";
import { ErrorDetail } from "../models/error-detail";

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

  GET_USER_LOGINS = '[Analytics] Get User Logins',
  GET_USER_LOGINS_RES = '[Analytics] Get User Logins Results',
  GET_USER_LOGINS_ERR = '[Analytics] Get User Logins Error',

  GET_ALL_USERS = '[Analytics] Get All Users',
  GET_ALL_USERS_RES = '[Analytics] Get All Users Results',
  GET_ALL_USERS_ERR = '[Analytics] Get All Users Error',

  GET_ALL_PAGES = '[Analytics] Get All Pages',
  GET_ALL_PAGES_RES = '[Analytics] Get All Pages Results',
  GET_ALL_PAGES_ERR = '[Analytics] Get All Pages Error',

  GET_USER = '[Analytics] Get User',
  GET_USER_RES = '[Analytics] Get User Results',
  GET_USER_ERR = '[Analytics] Get User Error',

  GET_USER_ERRORS = '[Analytics] Get User Errors',
  GET_USER_ERRORS_RES = '[Analytics] Get User Errors Results',
  GET_USER_ERRORS_ERR = '[Analytics] Get User Errors Error',

  GET_USER_ACTIVITY = '[Analytics] Get User Activity',
  GET_USER_ACTIVITY_RES = '[Analytics] Get User Activity Results',
  GET_USER_ACTIVITY_ERR = '[Analytics] Get User Activity Error',

  GET_PAGE = '[Analytics] Get Page',
  GET_PAGE_RES = '[Analytics] Get Page Results',
  GET_PAGE_ERR = '[Analytics] Get Page Error',

  GET_PAGE_AVERAGE_LOAD_TIME = '[Analytics] Get Page Average Load Time',
  GET_PAGE_AVERAGE_LOAD_TIME_RES = '[Analytics] Get Page Average Load Time Results',
  GET_PAGE_AVERAGE_LOAD_TIME_ERR = '[Analytics] Get Page Average Load Time Error',
  GET_PAGE_AVERAGE_LOAD_TIME_CLEANUP = '[Analytics] Get Page Average Load Time Cleanup',


  GET_PAGE_ERRORS = '[Analytics] Get Page Errors',
  GET_PAGE_ERRORS_RES = '[Analytics] Get Page Errors Results',
  GET_PAGE_ERRORS_ERR = '[Analytics] Get Page Errors Error',

  GET_PAGE_ACTIVITY = '[Analytics] Get Page Activity',
  GET_PAGE_ACTIVITY_RES = '[Analytics] Get Page Activity Results',
  GET_PAGE_ACTIVITY_ERR = '[Analytics] Get Page Activity Error',

  GET_PAGE_FAVORITED_BY = '[Analytics] Get Page Favorited By',
  GET_PAGE_FAVORITED_BY_RES = '[Analytics] Get Page Favorited By Results',
  GET_PAGE_FAVORITED_BY_ERR = '[Analytics] Get Page Favorited By Error',

  GET_LAST_WEEK_ERRORS_FULL = '[Analytics] Get Last Week Errors Full',
  GET_LAST_WEEK_ERRORS_FULL_RES = '[Analytics] Get Last Week Errors Full Results',
  GET_LAST_WEEK_ERRORS_FULL_ERR = '[Analytics] Get Last Week Errors Full Error',

  GET_ERROR_DETAIL = '[Analytics] Get Error Detail',
  GET_ERROR_DETAIL_RES = '[Analytics] Get Error Detail Results',
  GET_ERROR_DETAIL_ERR = '[Analytics] Get Error Detail Error',

  CLEAR_PAGE_DATA = '[Analytics] Clear Page Data',
  CLEAR_PAGE_DETAIL = '[Analytics] Clear Page Detail',
  CLEAR_USER_DATA = '[Analytics] Clear User Data',
  CLEAR_USER_DETAIL = '[Analytics] Clear User Detail',
  CLEAR_ERROR_DATA = '[Analytics] Clear Error Data',
  CLEAR_ERROR_DETAIL = '[Analytics] Clear Error Detail',
  CLEAR_HOME_DATA = '[Analytics] Clear Home Data',

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

export const GetUserLogins = createAction(AnalyticsStateActionTypes.GET_USER_LOGINS);
export const GetUserLoginsResults = createAction(AnalyticsStateActionTypes.GET_USER_LOGINS_RES, props<{ userLogins: SimpleCount[] }>());
export const GetUserLoginsError = createAction(AnalyticsStateActionTypes.GET_USER_LOGINS_ERR, props<{ message: string }>());

export const GetAllUsers = createAction(AnalyticsStateActionTypes.GET_ALL_USERS);
export const GetAllUsersResults = createAction(AnalyticsStateActionTypes.GET_ALL_USERS_RES, props<{ allUsers: User[] }>());
export const GetAllUsersError = createAction(AnalyticsStateActionTypes.GET_ALL_USERS_ERR, props<{ message: string }>());

export const GetAllPages = createAction(AnalyticsStateActionTypes.GET_ALL_PAGES);
export const GetAllPagesResults = createAction(AnalyticsStateActionTypes.GET_ALL_PAGES_RES, props<{ allPages: Page[] }>());
export const GetAllPagesError = createAction(AnalyticsStateActionTypes.GET_ALL_PAGES_ERR, props<{ message: string }>());

export const GetUser = createAction(AnalyticsStateActionTypes.GET_USER, props<{ uid: string }>());
export const GetUserResults = createAction(AnalyticsStateActionTypes.GET_USER_RES, props<{ user: User }>());
export const GetUserError = createAction(AnalyticsStateActionTypes.GET_USER_ERR, props<{ message: string }>());

export const GetUserErrors = createAction(AnalyticsStateActionTypes.GET_USER_ERRORS, props<{ uid: string }>());
export const GetUserErrorsResults = createAction(AnalyticsStateActionTypes.GET_USER_ERRORS_RES, props<{ userErrors: Error[] }>());
export const GetUserErrorsError = createAction(AnalyticsStateActionTypes.GET_USER_ERRORS_ERR, props<{ message: string }>());

export const GetUserActivity = createAction(AnalyticsStateActionTypes.GET_USER_ACTIVITY, props<{ uid: string }>());
export const GetUserActivityResults = createAction(AnalyticsStateActionTypes.GET_USER_ACTIVITY_RES, props<{ userActivity: Activity[] }>());
export const GetUserActivityError = createAction(AnalyticsStateActionTypes.GET_USER_ACTIVITY_ERR, props<{ message: string }>());

export const GetPage = createAction(AnalyticsStateActionTypes.GET_PAGE, props<{ pageID: string }>());
export const GetPageResults = createAction(AnalyticsStateActionTypes.GET_PAGE_RES, props<{ page: Page }>());
export const GetPageError = createAction(AnalyticsStateActionTypes.GET_PAGE_ERR, props<{ message: string }>());

export const GetPageAverageLoadTime = createAction(AnalyticsStateActionTypes.GET_PAGE_AVERAGE_LOAD_TIME, props<{ pageUrl: string }>());
export const GetPageAverageLoadTimeResults = createAction(AnalyticsStateActionTypes.GET_PAGE_AVERAGE_LOAD_TIME_RES, props<{ averageLoadTime: string }>());
export const GetPageAverageLoadTimeError = createAction(AnalyticsStateActionTypes.GET_PAGE_AVERAGE_LOAD_TIME_ERR, props<{ message: string }>());
export const GetPageAverageLoadTimeCleanup = createAction(AnalyticsStateActionTypes.GET_PAGE_AVERAGE_LOAD_TIME_CLEANUP);

export const GetPageErrors = createAction(AnalyticsStateActionTypes.GET_PAGE_ERRORS, props<{ pageUrl: string }>());
export const GetPageErrorsResults = createAction(AnalyticsStateActionTypes.GET_PAGE_ERRORS_RES, props<{ pageErrors: Error[] }>());
export const GetPageErrorsError = createAction(AnalyticsStateActionTypes.GET_PAGE_ERRORS_ERR, props<{ message: string }>());

export const GetPageActivity = createAction(AnalyticsStateActionTypes.GET_PAGE_ACTIVITY, props<{ pageUrl: string }>());
export const GetPageActivityResults = createAction(AnalyticsStateActionTypes.GET_PAGE_ACTIVITY_RES, props<{ pageActivity: Activity[] }>());
export const GetPageActivityError = createAction(AnalyticsStateActionTypes.GET_PAGE_ACTIVITY_ERR, props<{ message: string }>());

export const GetPageFavoritedBy = createAction(AnalyticsStateActionTypes.GET_PAGE_FAVORITED_BY, props<{ pageID: string }>());
export const GetPageFavoritedByResults = createAction(AnalyticsStateActionTypes.GET_PAGE_FAVORITED_BY_RES, props<{ favoritedBy: User[] }>());
export const GetPageFavoritedByError = createAction(AnalyticsStateActionTypes.GET_PAGE_FAVORITED_BY_ERR, props<{ message: string }>());

export const GetLastWeekErrorsFull = createAction(AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_FULL);
export const GetLastWeekErrorsFullResults = createAction(AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_FULL_RES, props<{ lastWeekErrors: Error[] }>());
export const GetLastWeekErrorsFullError = createAction(AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_FULL_ERR, props<{ message: string }>());

export const GetErrorDetail = createAction(AnalyticsStateActionTypes.GET_ERROR_DETAIL, props<{ itemID: string }>());
export const GetErrorDetailResults = createAction(AnalyticsStateActionTypes.GET_ERROR_DETAIL_RES, props<{ errorDetail: ErrorDetail }>());
export const GetErrorDetailError = createAction(AnalyticsStateActionTypes.GET_ERROR_DETAIL_ERR, props<{ message: string }>());

export const ClearPageData = createAction(AnalyticsStateActionTypes.CLEAR_PAGE_DATA);
export const ClearPageDetail = createAction(AnalyticsStateActionTypes.CLEAR_PAGE_DETAIL);
export const ClearErrorData = createAction(AnalyticsStateActionTypes.CLEAR_ERROR_DATA);
export const ClearErrorDetail = createAction(AnalyticsStateActionTypes.CLEAR_ERROR_DETAIL);
export const ClearUserData = createAction(AnalyticsStateActionTypes.CLEAR_USER_DATA);
export const ClearUserDetail = createAction(AnalyticsStateActionTypes.CLEAR_USER_DETAIL);
export const ClearHomeData = createAction(AnalyticsStateActionTypes.CLEAR_HOME_DATA);