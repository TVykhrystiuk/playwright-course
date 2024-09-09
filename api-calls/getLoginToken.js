import * as nodeFetch from "node-fetch" // import * means import everything from a folder

export const getLoginToken = async (username, password) =>{
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({"username": username, "password": password}),
    })
    if (response.status !==200 ){
        throw Error("An error occured trying to retrieve the login token.")
    }
    const body = await response.json()
    return body.token
}