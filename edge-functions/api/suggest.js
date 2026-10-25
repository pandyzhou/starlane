/**
 * 代理 Bilibili 的搜索建议。
 *
 * 它的 suggest 接口不发 CORS 头，也不支持 JSONP，浏览器直连必然被拦，
 * 所以在边缘侧做一次转发并把结果统一成 { suggestions: string[] }。
 */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=60',
    },
  });

export default async function onRequest(context) {
  const term = new URL(context.request.url).searchParams.get('term');
  if (!term) return json({ suggestions: [] });

  try {
    const res = await fetch(
      `https://s.search.bilibili.com/main/suggest?term=${encodeURIComponent(term)}&main_ver=v1`,
      { headers: { 'User-Agent': UA, Referer: 'https://search.bilibili.com/' } }
    );
    if (!res.ok) return json({ suggestions: [] });

    const data = await res.json();
    const list = (data?.result?.tag ?? [])
      .map((item) => item?.value)
      .filter((v) => typeof v === 'string' && v.length > 0);

    return json({ suggestions: list.slice(0, 10) });
  } catch {
    return json({ suggestions: [] }, 200);
  }
}
