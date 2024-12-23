import React, { useEffect, useState } from "react";
import { GET, POST } from "../services/apiService";
import { Sighting, Bee } from "../types";
import { useNavigate } from "react-router-dom";

const LOCATION_MAX = 32;
const DESCRIPTION_MAX = 2048;

const Create = () => {
    const nav = useNavigate();
    const [bees, setBees] = useState<Bee[]>([]);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [observed_at, setObservedAt] = useState(initTime());
    const [bee_id, setBeeId] = useState(1);

    useEffect(() => {
        GET("/api/bees").then(setBees);
    }, []);

    const handleClick = () => {
        POST("/api/sightings", { bee_id, location, description, observed_at }).then((results) => {
            if (results.id) nav(`/sightings/${results.id}`);
        });
    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
                <div className="card p-3 shadow">
                    <div className="card-title bg-warning-subtle p-1 rounded-2">
                        <h3 className="text-center">Create a sighting</h3>
                    </div>
                    <div className="card-body">
                        <div className="input-group">
                            <span className="input-group-text">
                                Location ({location.length}/{LOCATION_MAX})
                            </span>
                            <input maxLength={LOCATION_MAX} type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">
                                Description ({description.length}/{DESCRIPTION_MAX})
                            </span>
                            <textarea maxLength={DESCRIPTION_MAX} className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Bee Species</span>
                            <select value={bee_id} onChange={(e) => setBeeId(parseInt(e.target.value))} className="form-control">
                                {bees.map((bee) => (
                                    <option key={`bee-option-${bee.id}`} value={bee.id}>
                                        {bee.common_name} ({bee.species})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Observation time</span>
                            <input value={observed_at} onChange={(e) => setObservedAt(e.target.value)} type="datetime-local" className="form-control" />
                        </div>

                        <button onClick={handleClick} className="btn btn-warning">
                            Post your sighting!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;

function initTime() {
    let dateObj = new Date().toLocaleString();
    let [date, time, meridiem] = dateObj.split(" ");
    date = date.replace(",", "");
    let [mm, dd, yyyy] = date.split("/");
    date = [yyyy, mm, dd].join("-");
    let [hours, min, sec] = time.split(":");
    //@ts-ignore
    hours = parseInt(hours);
    hours += meridiem === "PM" ? 12 : 0;

    return `${date}T${hours}:${min}`;
}
