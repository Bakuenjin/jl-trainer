import InvalidArgumentsResponse from "./responses/InvalidArgumentsResponse";
import EmptyLectionListResponse from "./responses/EmptyLectionListResponse";
import LectionAlreadyExistsResponse from "./responses/LectionAlreadyExistsResponse";
import LectionCreatedResponse from "./responses/LectionCreatedResponse";
import LectionListInfoResponse from "./responses/LectionListInfoResponse";
import LectionListResponse from "./responses/LectionListResponse";
import LectionNotFoundResponse from "./responses/LectionNotFoundResponse";
import LectionRemoveDeniedResponse from "./responses/LectionRemoveDeniedResponse";
import LectionRemoveQuestionResponse from "./responses/LectionRemoveQuestionResponse";
import LectionRemoveSuccessResponse from "./responses/LectionRemoveSuccessResponse";
import LectionRenameSuccessResponse from "./responses/LectionRenameSuccessResponse";
import LectionSelectedResponse from "./responses/LectionSelectedResponse";
import WordCreatedResponse from "./responses/WordCreatedResponse";
import LectionNotSelectedResponse from "./responses/LectionNotSelectedResponse";
import WordAlreadyExistsResponse from "./responses/WordAlreadyExistsResponse";
import CurrentSelectionInfoResponse from "./responses/CurrentSelectionInfoResponse";

export const invalidArgumentsResponse =         new InvalidArgumentsResponse()
export const emptyLectionListResponse =         new EmptyLectionListResponse()
export const lectionAlreadyExistsResponse =     new LectionAlreadyExistsResponse()
export const lectionCreatedResponse =           new LectionCreatedResponse()
export const lectionListInfoResponse =          new LectionListInfoResponse()
export const lectionListResponse =              new LectionListResponse()
export const lectionNotFoundResponse =          new LectionNotFoundResponse()
export const lectionRemoveDeniedResponse =      new LectionRemoveDeniedResponse()
export const lectionRemoveQuestionResponse =    new LectionRemoveQuestionResponse()
export const lectionRemoveSuccessResponse =     new LectionRemoveSuccessResponse()
export const lectionRenameSuccessResponse =     new LectionRenameSuccessResponse()
export const lectionSelectedResponse =          new LectionSelectedResponse()
export const wordCreatedResponse =              new WordCreatedResponse()
export const lectionNotSelectedResponse =       new LectionNotSelectedResponse()
export const wordAlreadyExistsResponse =        new WordAlreadyExistsResponse()
export const currentSelectionInfoResponse =     new CurrentSelectionInfoResponse()
