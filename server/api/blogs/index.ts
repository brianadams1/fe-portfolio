export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiUri = config.apiUri
    try {
        const blogs = await fetch(`${apiUri}/blogs?limit=9`)
        return blogs
    } catch (error) {
        throw error
    }
})