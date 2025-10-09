export interface NoticeItem {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

export interface NoticeData {
  notice: NoticeItem[];
  event_notice: NoticeItem[];
  patch_notice: NoticeItem[];
}
