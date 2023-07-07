import PieChart from "./PieChart";
import BarChart from "./BarChart";
import axios from "axios";
import "./Charts.scss";
import { render } from "@testing-library/react";

function Charts({ tasks }) {
    return (
        <div id="wrapper">
            <h3 className="wrap-header">TASK ANALYSIS</h3>
            <div id="leftcolumn">
                <PieChart tasks={tasks} />
            </div>
            <div id="rightcolumn">
                <BarChart tasks={tasks} />
            </div>
        </div>
    );
}

function getAllTask(User) {
    console.log("Getting All Task");
    const user = User;

    const request = axios.create({
        baseURL: "http://localhost:5000/user",
        headers: {
            post: {
                "access-control-allow-origin": "*",
            },
        },
        timeout: 10000,
    });

    request
        .post("/tasks", { email: user })
        .then((res) => {
            const tasks = res.data;
            document
                .getElementById("leftcolumn")
                .appendChild(document.createElement("PieChart", tasks));
            render(<PieChart tasks={tasks} />);
            document
                .getElementById("rightcolumn")
                .appendChild(document.createElement("BarChart", tasks));
            render(<BarChart tasks={tasks} />);
        })
        .catch((err) => {
            console.log(err);
        });
}

export default Charts;
