type RequestConfig = RequestInit & {
  params?: Record<string, string>
}

type ApiResponse<T> = {
  data: T
  message: string
}

class HttpClient {
  private baseUrl: string

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
  }

  private buildUrl(url: string, params?: Record<string, string>): string {
    const fullUrl = `${this.baseUrl}${url}`
    if (!params) return fullUrl
    const searchParams = new URLSearchParams(params)
    return `${fullUrl}?${searchParams.toString()}`
  }

  private async request<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const { params, headers, ...rest } = config

    // TODO: 从valtio中获取token
    const token = ''

    const res = await fetch(this.buildUrl(url, params), {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
      }
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      const error = new Error(errorData.message || 'Network response was not ok')
      ;(error as any).status = res.status
      ;(error as any).data = errorData
      throw error
    }

    const json: ApiResponse<T> = await res.json()
    return json.data
  }

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  post<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }
}

export const http = new HttpClient(process.env.API_BASE_URL || '/api')
