// 내부 API(app/api) 공통 응답 형태
export interface ApiResponse<T> {
  data?: T;
  error?: { name: string; message: string };
}
