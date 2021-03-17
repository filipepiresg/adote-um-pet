import Config from 'react-native-config';

const BASE_URL = 'https://onesignal.com';

export function sendNotification(message) {
  return fetch(`${BASE_URL}/api/v1/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${Config.ONESIGNAL_REST_API}`,
    },
    body: JSON.stringify({
      app_id: Config.ONESIGNAL_APPID,
      contents: { pt: message, en: message },
      filters: [{ field: 'tag', key: 'user_type', relation: '=', value: 'normal' }],
    }),
  });
}
