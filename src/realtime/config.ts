import excludedTags from "./excludedTagNames.json";
import {ApiPrefix} from "../config";

export const page = 1
export const pageSize = 2000
export const dayBefore = 2
export const interval = 2000
export const realtimeMsgUrl = `${ApiPrefix}/api/realtime?`
export const saveUrl = `${ApiPrefix}/api/realtime/save/joexzh`
export const maxGap = dayBefore * 24 * 60 * 60
export const excludedTagNames = excludedTags
