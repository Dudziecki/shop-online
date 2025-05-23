export const buildUrl = (url: string, params: Record<string, string | number | boolean>): string => {
  let urlWithParams = url;
  let firstParam = true;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      const sign = firstParam ? "?" : "&";
      urlWithParams += `${sign}${key}=${encodeURIComponent(value.toString())}`;
      firstParam = false;
    }
  });

  return urlWithParams;
}