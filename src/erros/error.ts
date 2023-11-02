import { ErrorCode } from "./code";
import { Messages } from "./message";

class GDJCError extends Error {
  code: string;

  constructor(code: string, ...args: any) {
    super(message(code, args));
    this.code = code;
    Error.captureStackTrace?.(this, GDJCError);
  }

  get name() {
    return `${super.name} [${this.code}]`;
  }
}

function message(code: any, ...args: any) {
  if (!(code in ErrorCode))
    throw new Error("Error code must be a valid ErrorCodes");
  const msg: any = Messages[code];
  if (!msg) throw new Error(`No message associated with error code: ${code}.`);
  if (typeof msg === "function") return msg(...args);
  if (!args?.length) return msg;
  args.unshift(msg);
  return String(...args);
}

export { GDJCError };
