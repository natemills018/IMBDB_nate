import React, { useEffect, useState } from "react";
import { Bee, Sighting } from "../types";
import { GET } from "../services/apiService";
import { Link, useParams } from "react-router-dom";

const SightingDetails = () => {
    const { id } = useParams();

    const [sighting, setSighting] = useState<Sighting>();
    const [bees, setBees] = useState<Bee[]>([]);
    const [bee, setBee] = useState<Bee>();

    useEffect(() => {
        GET(`/api/sightings/${id}`).then(setSighting);
        GET("/api/bees").then(setBees);
    }, [id]);

    useEffect(() => {
        if (!sighting || !bees.length) return;

        const bee = bees.find((b) => b.id === sighting.bee_id);
        setBee(bee);
    }, [sighting, bees]);

    if (!sighting) return <></>;

    return (
        <div className="mt-5 row justify-content-center">
            <div key={`sighting-card-${sighting.id}`} className="col-12 col-md-8 col-lg-7">
                <div className="card p-3 shadow">
                    <div className="card-title bg-warning-subtle p-1 rounded-2">
                        <h3 className="text-center">
                            {bee?.common_name} (<em>{bee?.species}</em>) encounter
                        </h3>
                    </div>
                    <div className="card-body">
                        <p>Located at {sighting.location}</p>
                        <p>Details of the encounter:</p>
                        <p>{sighting.description}</p>
                        <p>Observed at {new Date(sighting.observed_at).toLocaleString()}</p>
                    </div>
                    <Link to={`/sightings/${id}/edit`} className="btn btn-warning">
                        Edit me
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SightingDetails;
