import { Query } from "../connection";
import { NewUser, User } from "../../types";

const create = (newUser: NewUser) => Query("INSERT INTO Users SET ?", [newUser]);
const find = (column: "email" | "id", value: string | number) => Query<User[]>("SELECT * FROM Users WHERE ??=?", [column, value]);

export default {
    create,
    find,
};
