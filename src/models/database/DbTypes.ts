export type DbLection = { id: number, snowflake: string, name: string, description: string }
export type DbWordPreview = { id: number, title: string }
export type DbWord = { id: number, lection_id: number, title: string, native_tip: string, foreign_tip: string }
export type DbTranslation = { id: number, word_id: number, type_id: number, content: string }
export type DbStatistic = { id: number, word_id: number, correct_amount: number, wrong_amount: number, total_amount: number }