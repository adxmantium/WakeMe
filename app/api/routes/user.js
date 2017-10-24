// /api/routes/user

export const userInfo = '/userInfo' // GET : params(user_id: number)

// GET : params fb_user_id
// POST : params (base64 file, to_user_id, from_user_id)
export const WAKEUP_CALLS = '/wakeup-calls'

// GET : params fb_user_id
// POST : params fb_user_id, alarm data, device_token
export const USER = '/user'

// GET : params = searched text
export const SEARCH_USER = '/user/search'

// GET : params = fb_user_id - returns list of user's friends
// POST : params = friend object - saves a single friend
export const FRIENDS = '/friends'

// GET : params = fb_user_id - should return all wakers(wakeup calls) for this user
// POST: params = friends list, file
// DELETE : params = waker_id
export const WAKER = '/wakers'