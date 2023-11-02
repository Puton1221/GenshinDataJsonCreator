const keys = ["UIDInvalid", "UnknownCharaName", "UIDDigitsNotEnough"];

export const ErrorCode = Object.fromEntries(keys.map((key) => [key, key]));
