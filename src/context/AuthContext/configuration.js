import { useCookies } from "react-cookie"

const [cookie, setCookie, removeCookie] = useCookies(['user'])

export const loginUser = (data) => {

    // date d'expiration
    const dateExpire = new Date()
    const addDateExpireThreeDays = dateExpire.setDate(dateExpire.getDate() + 3)

    setCookie('user', data.access_token, { expires: new Date(addDateExpireThreeDays), path: '/' })

}

export const logoutUser = () => removeCookie('user', { path: '/' })

export const isUserLoggin = () => {
    if (!cookie.user) return false

    return true
}