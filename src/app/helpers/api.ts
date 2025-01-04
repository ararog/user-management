const apiUrl = process.env.API_URL || 'http://localhost:3000'

export const apiClient = async (path: string, config?: RequestInit) => {

  return await fetch(`${apiUrl}${path}`, config)
}