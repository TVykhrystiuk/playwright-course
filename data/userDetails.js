// export const adminDetails = {
//     username: "admin",
//     password: "Admin123",
// }


// ADMIN_PASSWORD - uper case is used for Environment Variables
// process.env.ADMIN_PASSWORD

export const adminDetails = {
    username: "admin",
    password: process.env.ADMIN_PASSWORD,
}