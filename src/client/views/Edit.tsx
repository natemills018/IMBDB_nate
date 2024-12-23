import React, { useEffect, useState } from "react";
import { DELETE, GET, POST, PUT } from "../services/apiService";
import { Sighting, Bee } from "../types";
import { useNavigate, useParams } from "react-router-dom";

const LOCATION_MAX = 32;
const DESCRIPTION_MAX = 2048;

const Edit = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [observed_at, setObservedAt] = useState<string | Date>(initTime());

    useEffect(() => {
        GET<Sighting>(`/api/sightings/${id}`).then((sighting) => {
            setLocation(sighting.location);
            setDescription(sighting.description);
        });
    }, [id]);

    const handleUpdateClick = () => {
        PUT(`/api/sightings/${id}`, { description }).then(() => nav(`/sightings/${id}`));
    };

    const handleDeleteClick = () => {
        if (confirm("Are you sure you want to delete this sighting? This action is PERMANENT!")) {
            DELETE(`/api/sightings/${id}`).then(() => nav(`/sightings/`));
        }
    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
                <div className="card p-3 shadow">
                    <div className="card-title bg-warning-subtle p-1 rounded-2">
                        <h3 className="text-center">Editing the description for sighting #{id}</h3>
                    </div>
                    <div className="card-body">
                        <div className="input-group">
                            <span className="input-group-text">Location</span>
                            <input disabled readOnly type="text" className="form-control" value={location} />
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">
                                Description ({description.length}/{DESCRIPTION_MAX})
                            </span>
                            <textarea maxLength={DESCRIPTION_MAX} className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <button onClick={handleUpdateClick} className="btn btn-warning">
                            Update description
                        </button>
                        <button onClick={handleDeleteClick} className="btn btn-danger">
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;

function initTime(dateObj: string = new Date().toLocaleString()) {
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
