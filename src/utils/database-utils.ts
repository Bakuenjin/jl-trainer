import { DbTranslation } from "../models/database/DbTypes";
import TranslationType from "../models/TranslationType";

export function isNativeTranslation(dbTranslation: DbTranslation): boolean {
    return dbTranslation.type_id === TranslationType.Native
}

export function isForeignTranslation(dbTranslation: DbTranslation): boolean {
    return dbTranslation.type_id === TranslationType.Foreign
}