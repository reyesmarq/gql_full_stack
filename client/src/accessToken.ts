/**
 * This file is a bad practive
 * it is recommended to have a state management framework to deal with this
 * because is this token change, is not going to let react know and hence the
 * component will not re-render
 */

/**
 * If you really need to have a user accesible somewhere in the application
 * you can do it through the token or by calling query me {  }
 */

export let accessToken = ''

export const setAccessToken = (s: string) => {
  accessToken = s
}

export const getAccessToken = () => {
  return accessToken
}