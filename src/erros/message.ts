import { ErrorCode } from "./code";

const Messages = {
  [ErrorCode.UIDInvalid]: "Provided UID does not match any UID.",
  [ErrorCode.UnknownCharaName]:
    "Provided Character Name does not match any characters names.",
  [ErrorCode.UIDDigitsNotEnough]: "UID must be 9 digits.",
};

export { Messages };
