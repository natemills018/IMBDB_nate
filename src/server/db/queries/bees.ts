import { Query } from "../connection";
import { Bee } from "../../types";

const all = () => Query<Bee[]>("SELECT * FROM Bees");

export default {
    all,
};
