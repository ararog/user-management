
export const apiClient = async (path: string, config?: RequestInit) => {
  //const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  return await fetch(path, config)
}