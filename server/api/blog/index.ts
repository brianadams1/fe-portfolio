export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiUri = config.apiUri
    const {page} = getQuery(event)

    try {
        return await fetch(`${apiUri}/blogs?limit=9&page=${page}`)
       
    } catch (error) {
        throw error
    }
})