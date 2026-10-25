/**
 * 搜索建议。
 *
 * 这些接口都不发 CORS 头，`fetch` 会被浏览器拦掉，只能用 <script> 加载
 * （JSONP）绕过同源限制。实测可用的是百度、Google、Bing 三家；
 * Bilibili 的接口不支持 JSONP，DuckDuckGo 直连超时，GitHub 没有该接口。
 */

const jsonp = <T,>(url: string): Promise<T> =>
  new Promise((resolve, reject) => {
    const cb = `__sug_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const win = window as unknown as Record<string, unknown>;

    const cleanup = () => {
      delete win[cb];
      script.remove();
    };
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error('suggestion timeout'));
    }, 4000);

    win[cb] = (data: T) => {
      window.clearTimeout(timer);
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      cleanup();
      reject(new Error('suggestion failed'));
    };
    script.src = url.replace('__CB__', cb);
    document.head.appendChild(script);
  });

export const SUPPORTS_SUGGEST = new Set(['baidu', 'google', 'bing', 'bilibili']);

export const fetchSuggestions = async (engineId: string, input: string): Promise<string[]> => {
  const q = encodeURIComponent(input);

  if (engineId === 'baidu') {
    const data = await jsonp<{ s?: string[] }>(
      `https://suggestion.baidu.com/su?wd=${q}&cb=__CB__`
    );
    return data.s ?? [];
  }

  if (engineId === 'google') {
    const data = await jsonp<[string, string[]]>(
      `https://suggestqueries.google.com/complete/search?client=chrome&hl=zh-CN&q=${q}&jsonp=__CB__`
    );
    return Array.isArray(data) ? data[1] ?? [] : [];
  }

  if (engineId === 'bilibili') {
    const res = await fetch(`/api/suggest?term=${q}`);
    if (!res.ok) return [];
    const data = (await res.json()) as {
      suggestions?: string[];
      result?: { tag?: { value?: string }[] };
    };
    if (Array.isArray(data.suggestions)) return data.suggestions;
    return (data.result?.tag ?? []).map((t) => t.value).filter((v): v is string => Boolean(v));
  }

  if (engineId === 'bing') {
    const data = await jsonp<{ AS?: { Results?: { Suggests?: { Txt?: string }[] }[] } }>(
      `https://api.bing.com/qsonhs.aspx?type=cb&cb=__CB__&q=${q}`
    );
    const list = data.AS?.Results?.[0]?.Suggests ?? [];
    return list.map((s) => s.Txt).filter((s): s is string => Boolean(s));
  }

  return [];
};
