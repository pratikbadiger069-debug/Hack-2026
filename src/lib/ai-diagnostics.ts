import { AIProvider } from '@/types';

export type DiagnosticStatus =
  | 'Connected'
  | 'Invalid API Key'
  | 'Provider Authentication Failed'
  | 'Quota Exceeded'
  | 'Model Not Found'
  | 'Network Timeout'
  | 'Provider Unavailable'
  | 'Invalid Request';

export interface DiagnosticResult {
  status: DiagnosticStatus;
  provider: string;
  model: string;
  latencyMs: number;
  message?: string;
  echoResponse?: string;
  error?: string;
  errorDetails?: string;
  rawCode?: string | number;
}

/**
 * Normalizes and cleans raw user-entered API keys:
 * - Strips leading/trailing quotes (' or ")
 * - Strips bash assignment syntax (e.g. `export GEMINI_API_KEY=...` or `API_KEY=...`)
 * - Strips hidden carriage returns, tabs, and zero-width spaces
 * - Retains exact alphanumeric and valid token symbols
 */
export function cleanApiKey(rawKey?: string | null): string {
  if (!rawKey) return '';
  let key = rawKey.trim();

  // Strip assignment prefixes like `export OPENAI_API_KEY=`, `GEMINI_KEY=`, etc.
  if (key.includes('=')) {
    const parts = key.split('=');
    key = parts[parts.length - 1].trim();
  }

  // Strip surrounding quotes
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }

  // Remove zero-width spaces, newlines, carriage returns
  key = key.replace(/[\u200B-\u200D\uFEFF\r\n\t]/g, '').trim();
  return key;
}

/**
 * Classifies upstream provider error messages and HTTP status codes
 * into clear, actionable statuses.
 */
export function classifyProviderError(
  provider: AIProvider,
  httpStatus: number,
  errPayload: any,
  latencyMs: number
): DiagnosticResult {
  const providerNames: Record<AIProvider, string> = {
    gemini: 'Google Gemini AI',
    openai: 'OpenAI (GPT-4o)',
    claude: 'Anthropic Claude',
  };

  const defaultModels: Record<AIProvider, string> = {
    gemini: 'gemini-1.5-flash',
    openai: 'gpt-4o-mini',
    claude: 'claude-3-5-sonnet-20241022',
  };

  const providerName = providerNames[provider] || provider;
  const model = defaultModels[provider] || 'default';

  // 1. Extract error message and code
  let errMsg = '';
  let errCode = '';

  if (typeof errPayload === 'string') {
    errMsg = errPayload;
  } else if (errPayload && typeof errPayload === 'object') {
    errMsg =
      errPayload.error?.message ||
      errPayload.message ||
      errPayload.error?.status ||
      JSON.stringify(errPayload);
    errCode = String(errPayload.error?.code || errPayload.error?.type || errPayload.code || '');
  }

  // 2. Classify based on HTTP status and error content
  if (httpStatus === 401 || errCode.includes('API_KEY_INVALID') || errMsg.toLowerCase().includes('api key not valid') || errMsg.toLowerCase().includes('invalid api key') || errCode.includes('invalid_api_key') || errCode.includes('authentication_error')) {
    return {
      status: 'Invalid API Key',
      provider: providerName,
      model,
      latencyMs,
      error: `The API key was rejected by ${providerName}. Please verify that you copied the complete, active key from your developer console.`,
      errorDetails: errMsg || 'HTTP 401 Unauthorized',
      rawCode: errCode || 401,
    };
  }

  if (httpStatus === 403 || errCode.includes('PERMISSION_DENIED') || errMsg.toLowerCase().includes('permission denied') || errMsg.toLowerCase().includes('access denied')) {
    return {
      status: 'Provider Authentication Failed',
      provider: providerName,
      model,
      latencyMs,
      error: `Access denied by ${providerName}. Ensure your account project has the Generative Language / Model API enabled and billing is active.`,
      errorDetails: errMsg || 'HTTP 403 Forbidden',
      rawCode: errCode || 403,
    };
  }

  if (httpStatus === 429 || errCode.includes('RESOURCE_EXHAUSTED') || errCode.includes('insufficient_quota') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('rate limit')) {
    return {
      status: 'Quota Exceeded',
      provider: providerName,
      model,
      latencyMs,
      error: `Your ${providerName} account has exceeded its request quota or rate limit. Check your API usage and credit balance.`,
      errorDetails: errMsg || 'HTTP 429 Too Many Requests',
      rawCode: errCode || 429,
    };
  }

  if (httpStatus === 404 || errCode.includes('MODEL_NOT_FOUND') || errMsg.toLowerCase().includes('model not found')) {
    return {
      status: 'Model Not Found',
      provider: providerName,
      model,
      latencyMs,
      error: `The requested model (${model}) is not available or supported for this API key tier.`,
      errorDetails: errMsg || 'HTTP 404 Not Found',
      rawCode: errCode || 404,
    };
  }

  if (httpStatus === 502 || httpStatus === 503 || httpStatus === 504 || errMsg.toLowerCase().includes('unavailable') || errMsg.toLowerCase().includes('overloaded')) {
    return {
      status: 'Provider Unavailable',
      provider: providerName,
      model,
      latencyMs,
      error: `${providerName} upstream servers are temporarily overloaded or undergoing maintenance. Please retry in a few moments.`,
      errorDetails: errMsg || `HTTP ${httpStatus} Service Unavailable`,
      rawCode: errCode || httpStatus,
    };
  }

  return {
    status: 'Invalid Request',
    provider: providerName,
    model,
    latencyMs,
    error: `Upstream error from ${providerName}: ${errMsg || 'Unexpected server response'}`,
    errorDetails: errMsg || `HTTP Status ${httpStatus}`,
    rawCode: errCode || httpStatus,
  };
}
