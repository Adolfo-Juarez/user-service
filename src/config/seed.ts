import BcryptHelper from "../helpers/BcryptHelper.ts";
import User from "../user/models/User.ts";

export async function addDefaultAdminUser() {
    const count = await User.count({
        where: {
            email: "admin@mail.com"
        }
    })

    if (count > 0) {
        console.log("Default admin user already exists");
        return;
    }

    User.create({
        username: "admin",
        email: "admin@mail.com",
        password: await BcryptHelper.hashPassword("12345678"),
        role: "admin"
    }).then(() => {
        console.log("Default admin user added");
    });
}