import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 모든 핸들러를 사용하여 워커를 설정
export const worker = setupWorker(...handlers);
