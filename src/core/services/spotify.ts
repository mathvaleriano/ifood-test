import Playlist from "types/spotify";

const getAccessTokenFromHash = () => {
  const { hash = '' } = window.location

  let token = ''
  if (hash) {
    const [tokenPart = ''] = hash.slice(1).split('&')
    token = tokenPart.split('=')[1]
  }
  return token
}

const getToken = () => (
  getAccessTokenFromHash() || localStorage.getItem('token') || ''
)

export const setToken = (token?: string) => {
  localStorage.setItem('token', token || getToken())
}

export const clearToken = () => {
  localStorage.removeItem('token')
}

export const redirectToSpotifyAuth = () => {
  const scopes = 'user-read-email';
  window.location.href = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' + process.env.REACT_APP_CLIENT_ID +
    '&scopes=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + window.location.origin;
}

export const login = () => {
  const token = getToken()
  if (!token) {
    redirectToSpotifyAuth()
  } else {
    setToken()
  }
}

type responseOfGet = {
  message: string | null,
  playlists: {
    items: Playlist[]
  },
  limit: number,
  offset: number,
  previous: string | null,
  total: number
}

export const get = async (filters: Record<string, string> = {}): Promise<responseOfGet> => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    const baseUrl = `https://api.spotify.com/v1/browse/featured-playlists`
    const searchParams = Object.keys(filters).length > 0
      ? '?' + (new URLSearchParams(filters)).toString()
      : ''
    const res = await fetch(
      baseUrl + searchParams,
      { headers }
    )
    const data = await res.json()

    if (data.error) {
      throw data.error
    }

    return data
  } catch (error) {
    throw error
  }
}