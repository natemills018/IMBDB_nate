import React from "react";

const Home = () => {
    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card p-3 shadow">
                    <div className="card-title bg-warning-subtle p-1 rounded-2">
                        <h3 className="text-center">Welcome to IMBDB, or I am bee db!</h3>
                    </div>
                    <div className="card-body">
                        You can read more about the requirements of this in the README of your local repo or at{" "}
                        <a href="https://github.com/covalence-io/i-am-bee-db">https://github.com/covalence-io/i-am-bee-db</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
