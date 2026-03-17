export async function safeQuery<T>(
  fn: () => PromiseLike<{ data: T | null; error: unknown }>
): Promise<T | null> {
  try {
    const { data, error } = await fn();
    if (error) { console.error('[safeQuery]', error); return null; }
    return data;
  } catch (err) {
    console.error('[safeQuery] threw:', err);
    return null;
  }
}

export async function safeQueryMany<T>(
  fn: () => PromiseLike<{ data: T[] | null; error: unknown }>
): Promise<T[]> {
  try {
    const { data, error } = await fn();
    if (error) { console.error('[safeQueryMany]', error); return []; }
    return data ?? [];
  } catch (err) {
    console.error('[safeQueryMany] threw:', err);
    return [];
  }
}
