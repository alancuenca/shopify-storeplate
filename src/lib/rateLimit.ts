type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitState>();

export const rateLimit = (
  key: string,
  options: RateLimitOptions = {},
): {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfter: number;
} => {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetMs: windowMs,
      retryAfter: Math.ceil(windowMs / 1000),
    };
  }

  const nextCount = existing.count + 1;
  existing.count = nextCount;
  store.set(key, existing);

  const resetMs = Math.max(existing.resetAt - now, 0);
  const allowed = nextCount <= limit;

  return {
    allowed,
    limit,
    remaining: Math.max(limit - nextCount, 0),
    resetMs,
    retryAfter: Math.ceil(resetMs / 1000),
  };
};
