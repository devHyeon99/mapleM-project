import axios from 'axios';

const fetchNoticesFromApi = async () => {
  const [noticeRes, patchRes, eventRes] = await Promise.all([
    axios.get('https://open.api.nexon.com/maplestorym/v1/notice', {
      headers: { 'x-nxopen-api-key': import.meta.env.VITE_NEXON_KEY },
    }),
    axios.get('https://open.api.nexon.com/maplestorym/v1/notice-patch', {
      headers: { 'x-nxopen-api-key': import.meta.env.VITE_NEXON_KEY },
    }),
    axios.get('https://open.api.nexon.com/maplestorym/v1/notice-event', {
      headers: { 'x-nxopen-api-key': import.meta.env.VITE_NEXON_KEY },
    }),
  ]);
  return {
    notices: noticeRes.data.notice.slice(0, 5),
    patchNotices: patchRes.data.patch_notice.slice(0, 5),
    eventNotices: eventRes.data.event_notice.slice(0, 5),
  };
};

export default fetchNoticesFromApi;
