import React, { useEffect, useState } from "react";
import { Bee, Sighting } from "../types";
import { GET } from "../services/apiService";
import { Link } from "react-router-dom";

const Sightings = () => {
    const [sightings, setSightings] = useState<Sighting[]>([]);

    useEffect(() => {
        GET("/api/sightings").then(setSightings);
    }, []);

    return (
        <div className="mt-5 row justify-content-center">
            {sightings.map((sighting) => (
                <div key={`sighting-card-${sighting.id}`} className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="card p-3 shadow">
                        <div className="card-title bg-warning-subtle p-1 rounded-2">
                            <h3 className="text-center">Bee ID #{sighting.bee_id} encounter</h3>
                        </div>
                        <div className="card-body">
                            <p>Located at {sighting.location}</p>
                            <p>
                                Details of the encounter: <em>{sighting.description.substring(0, 32)}...</em>{" "}
                                <Link className="btn btn-warning" to={`/sightings/${sighting.id}`}>
                                    Full details here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sightings;
