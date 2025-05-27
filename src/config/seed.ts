import User from "../user/models/User.ts";

export async function addDefaultAdminUser() {
    const count = await User.count({
        where: {
            email: "admin@mail.com"
        }
    })

    if (count > 0) {
        return;
    }

    await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "12345678",
        role: "admin"
    });
}