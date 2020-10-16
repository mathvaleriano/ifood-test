import Filter from "types/filters"

type Response = {
  filters: Filter[]
}

export const get = (): Promise<Response> =>
  fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
    .then(res => res.json())