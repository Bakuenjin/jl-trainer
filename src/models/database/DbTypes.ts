export type DbLection = { id: string, snowflake: string, name: string }
export type DbWord = { id: string, lection_id: string, title: string, native_tip: string, foreign_tip: string }
export type DbTranslation = { id: string, word_id: string, type_id: number, content: string }
export type DbStatistic = { id: string, word_id: string, correct_amount: number, wrong_amount: number, total_amount: number }
export type DbPartial<DbT> = { [key in keyof DbT]?: DbT[key] }