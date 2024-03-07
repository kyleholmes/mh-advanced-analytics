import { AnalyticsStateActionTypes } from "./analytics.actions";
import { DeviceType } from "../models/device-type";

export interface AnalyticsState {
  deviceTypeList: DeviceType[],
}

export const initialState: AnalyticsState =
{
  deviceTypeList: [],
}

export function analyticsReducer(state = initialState, action: any): AnalyticsState {

  switch (action.type) {
    case AnalyticsStateActionTypes.GET_DEVICE_TYPES_RES: {
      return { ...state, deviceTypeList: action.deviceTypeList };
    }

    default: {
      return state;
    }
  }
}