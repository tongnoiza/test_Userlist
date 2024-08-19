export function fetch(path: String, options = {}) {
    const { data } = useFetch(`http://localhost:3002${path}`, options)
    return  data
}