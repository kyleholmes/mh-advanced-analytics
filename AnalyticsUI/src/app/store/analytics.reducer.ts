import { AnalyticsStateActionTypes } from "./analytics.actions";
import { SimpleCount } from "../models/simple-count";
import { User } from "../models/user";
import { Page } from "../models/page";
import { Error } from "../models/error";
import { Activity } from "../models/activity";
import { ErrorDetail } from "../models/error-detail";

export interface AnalyticsState {
  deviceTypeList: SimpleCount[],
  screenSizeList: SimpleCount[],
  powerUserList: SimpleCount[],
  errorByDayList: SimpleCount[],
  pageLoadsList: SimpleCount[],
  userLoginsList: SimpleCount[],
  allUsersList: User[],
  allPagesList: Page[],
  currentUser: User,
  userErrors: Error[],
  userActivityList: Activity[],
  currentPage: Page,
  pageLoadTimesList: SimpleCount[],
  pageAverageLoadTime: string,
  pageErrors: Error[],
  pageActivityList: Activity[],
  pageFavoritedBy: User[],
  lastWeekErrorsFull: Error[],
  errorDetail: ErrorDetail,
  currentPageTitle: string
}

export const initialState: AnalyticsState =
{
  deviceTypeList: [],
  screenSizeList: [],
  powerUserList: [],
  errorByDayList: [],
  pageLoadsList: [],
  userLoginsList: [],
  allUsersList: [],
  allPagesList: [],
  currentUser: {} as User,
  userErrors: [],
  userActivityList: [],
  currentPage: {} as Page,
  pageAverageLoadTime: '',
  pageLoadTimesList: [],
  pageErrors: [],
  pageActivityList: [],
  pageFavoritedBy: [],
  lastWeekErrorsFull: [],
  errorDetail: {} as ErrorDetail,
  currentPageTitle: ''
}

export function analyticsReducer(state = initialState, action: any): AnalyticsState {

  switch (action.type) {
    case AnalyticsStateActionTypes.GET_DEVICE_TYPES_RES: {
      return { ...state, deviceTypeList: action.deviceTypeList };
    }
      
    case AnalyticsStateActionTypes.GET_SCREEN_SIZES_RES: {
      return { ...state, screenSizeList: action.screenSizesList };
    }
      
    case AnalyticsStateActionTypes.GET_POWER_USERS_RES: {
      return { ...state, powerUserList: action.powerUsers };
    }
      
    case AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_RES: {
      return { ...state, errorByDayList: action.lastWeekErrors };
    }
      
    case AnalyticsStateActionTypes.GET_PAGE_LOADS_RES: {
      return { ...state, pageLoadsList: action.pageLoads };
    }
      
    case AnalyticsStateActionTypes.GET_USER_LOGINS_RES: {
      return { ...state, userLoginsList: action.userLogins };
    }
      
    case AnalyticsStateActionTypes.GET_ALL_USERS_RES: {
      return { ...state, allUsersList: action.allUsers };
    }
      
    case AnalyticsStateActionTypes.GET_ALL_PAGES_RES: {
      return { ...state, allPagesList: action.allPages };
    }
      
    case AnalyticsStateActionTypes.GET_USER_RES: {
      return { ...state, currentUser: action.user };
    }
      
    case AnalyticsStateActionTypes.GET_USER_ERRORS_RES: {
      return { ...state, userErrors: action.userErrors };
    }
      
    case AnalyticsStateActionTypes.GET_USER_ACTIVITY_RES: {
      return { ...state, userActivityList: action.userActivity };
    }
      
    case AnalyticsStateActionTypes.GET_PAGE_RES: {
      return { ...state, currentPage: action.page };
    }
    
    case AnalyticsStateActionTypes.GET_PAGE_AVERAGE_LOAD_TIME_RES: {
      return { ...state, pageAverageLoadTime: action.averageLoadTime };
    }

    case AnalyticsStateActionTypes.GET_ALL_PAGE_LOAD_TIMES_RES: {
      return { ...state, pageLoadTimesList: action.pageLoadTimesList };
    }
      
    case AnalyticsStateActionTypes.GET_PAGE_AVERAGE_LOAD_TIME_CLEANUP: {
      return { ...state, pageAverageLoadTime: '' };
    }
      
    case AnalyticsStateActionTypes.GET_PAGE_ERRORS_RES: {
      return { ...state, pageErrors: action.pageErrors };
    }
      
    case AnalyticsStateActionTypes.GET_PAGE_ACTIVITY_RES: {
      return { ...state, pageActivityList: action.pageActivity };
    }
      
    case AnalyticsStateActionTypes.GET_PAGE_FAVORITED_BY_RES: {
      return { ...state, pageFavoritedBy: action.favoritedBy };
    }
      
    case AnalyticsStateActionTypes.GET_LAST_WEEK_ERRORS_FULL_RES: {
      return { ...state, lastWeekErrorsFull: action.lastWeekErrors };
    }
      
    case AnalyticsStateActionTypes.GET_ERROR_DETAIL_RES: {
      return { ...state, errorDetail: action.errorDetail };
    }

    case AnalyticsStateActionTypes.CLEAR_ERROR_DATA: {
      return { ...state, lastWeekErrorsFull: [] };
    }

    case AnalyticsStateActionTypes.CLEAR_ERROR_DETAIL: {
      return { ...state, errorDetail: {} as ErrorDetail };
    }

    case AnalyticsStateActionTypes.CLEAR_PAGE_DATA: {
      return { ...state, allPagesList: [], pageLoadsList: [], pageLoadTimesList: [] };
    }

    case AnalyticsStateActionTypes.CLEAR_PAGE_DETAIL: {
      return { ...state, pageFavoritedBy: [], pageActivityList: [], pageErrors: [], pageAverageLoadTime: '' };
    }

    case AnalyticsStateActionTypes.CLEAR_USER_DATA: {
      return { ...state, screenSizeList: [], powerUserList: [], allUsersList: [] };
    }

    case AnalyticsStateActionTypes.CLEAR_USER_DETAIL: {
      return { ...state, currentUser: {} as User, userActivityList: [], userErrors: [] };
    }

    case AnalyticsStateActionTypes.CLEAR_HOME_DATA: {
      return { ...state, pageLoadsList: [], userLoginsList: [], errorByDayList: [] };
    }
      
    case AnalyticsStateActionTypes.SET_PAGE_TITLE: {
      return { ...state, currentPageTitle: action.title };
    }

    default: {
      return state;
    }
  }
}