import { AnalyticsStateActionTypes } from "./analytics.actions";
import { DeviceType, PageLoads, ScreenSize } from "../models/page-view-models";
import { PowerUser } from "../models/events-models";
import { ErrorByDay } from "../models/exceptions-models";

export interface AnalyticsState {
  deviceTypeList: DeviceType[],
  screenSizeList: ScreenSize[],
  powerUserList: PowerUser[],
  errorByDayList: ErrorByDay[],
  pageLoadsList: PageLoads[],
}

export const initialState: AnalyticsState =
{
  deviceTypeList: [],
  screenSizeList: [],
  powerUserList: [],
  errorByDayList: [],
  pageLoadsList: [],
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

    default: {
      return state;
    }
  }
}