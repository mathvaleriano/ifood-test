type Image = {
  height: number | null,
  url: string,
  width: number | null
}

export type Playlist = {
  collaborative: boolean,
  description: string,
  href: string,
  id: string,
  images: Image[],
  name: string,
  tracks: {
    href: string,
    total: number
  },
  type: string,
  uri: string
}

export default Playlist