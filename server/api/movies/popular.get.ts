export default defineEventHandler((event) =>
      wambesha(event, '/discover', { type: 'movie', sort: 'popularity', limit: 20 })
)