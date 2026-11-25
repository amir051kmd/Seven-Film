export async function wambesha<T>(event: any, path:string , query: Record<string , any> = {}){
    const cfg = useRuntimeConfig(event)
    try{
        return await $fetch<T>(cfg.wambeshaBaseUrl + path,{
            query,
            headers: { Authorization: `Bearer ${cfg.wambeshaApiKey}`}
        
        })
    }catch(e : any) {
      throw createError({
      statusCode: e?.response?.status || 502,
      data: e?.data
    }
)
    }
}