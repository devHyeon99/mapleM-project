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

export interface SiteNoticeItem {
  id: string;
  title: string;
  content: string;
  importance: number;
  created_at: string;
  start_at: string | null;
  end_at: string | null;
}
