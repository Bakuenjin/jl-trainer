import Translation from "../models/Translation";
import TranslationType from "../models/TranslationType";
import Lection from "../models/Lection";
import { DbLection, DbWord, DbTranslation, DbStatistic } from "../models/database/DbTypes";
import Word from "../models/Word";
import WordStatistic from "../models/WordStatistic";

export function isNativeTranslation(translation: Translation): boolean {
    return translation.type === TranslationType.Native
}

export function isForeignTranslation(translation: Translation): boolean {
    return translation.type === TranslationType.Foreign
}

export function convertLectionToDbLection(lection: Lection): DbLection {
    return { id: lection.id, name: lection.name, snowflake: lection.snowflake }
}

export function convertWordToDbWord(word: Word): DbWord {
    return { id: word.id, lection_id: word.lectionId, title: word.title, native_tip: word.nativeTip, foreign_tip: word.foreignTip }
}

export function convertTranslationToDbTranslation(translation: Translation): DbTranslation {
    return { id: translation.id, word_id: translation.wordId, type_id: translation.type, content: translation.content }
}

export function convertWordStatisticToDbStatistic(statistic: WordStatistic): DbStatistic {
    return { id: statistic.id, word_id: statistic.wordId, correct_amount: statistic.correctAmount, wrong_amount: statistic.wrongAMount, total_amount: statistic.totalAmount }
}