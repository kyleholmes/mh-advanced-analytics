import { AnalyticsStateActionTypes } from "./analytics.actions";
import { SimpleCount } from "../models/simple-count";
import { User } from "../models/user";
import { Page } from "../models/page";

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
      
    case AnalyticsStateActionTypes.SET_CURRENT_USER: {
      return { ...state, currentUser: action.currentUser };
    }

    default: {
      return state;
    }
  }
}