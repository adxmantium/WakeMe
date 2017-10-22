// /api/routes/user

export const userInfo = '/userInfo' // GET : params(user_id: number)

// GET : params fb_user_id
// POST : params (base64 file, to_user_id, from_user_id)
export const WAKEUP_CALLS = '/wakeup-calls'

// GET : params fb_user_id
// POST : params fb_user_id, alarm data, device_token
export const USER = '/user'

// GET : params searched
export const SEARCH_USER = '/user/search'