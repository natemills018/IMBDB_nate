import { Query } from "../connection";
import { Sighting, NewSighting } from "../../types";

const all = () => Query<Sighting[]>("SELECT * FROM BeeSightings ORDER BY observed_at DESC");
const find = (id: number) => Query<Sighting[]>("SELECT * FROM BeeSightings WHERE id=?", [id]);
const create = (newSighting: NewSighting) => Query("INSERT INTO BeeSightings SET ?", [newSighting]);
const update = (id: number, description: string) => Query("UPDATE BeeSightings SET description=? WHERE id=?", [description, id]);
const destroy = (id: number) => Query("DELETE FROM BeeSightings WHERE id=?", [id]);

export default {
    all,
    find,
    create,
    update,
    delete: destroy,
};
