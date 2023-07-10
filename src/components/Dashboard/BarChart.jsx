import * as d3 from 'd3';
import { useEffect } from 'react';
import './BarChart.css';

function BarChart({ tasks }) {

    useEffect(() => {
        const data = preprocess(tasks);
        drawBar(data);
    });

    return (
        <span>
            <div className="barchart-head">
                <h4 className='barchart-text'>Bar Chart</h4>
            </div>
            <div className="barchart-body">
                <svg
                    style={{
                        width: "500",
                        height: "400",
                        padding: "10px",
                        border: "1px solid black",
                    }}
                ></svg>
            </div>
        </span>
    );
}

function preprocess(tasks) {
    let completed = 0, inprogress = 0, overdue = 0, incomplete = 0;

    tasks.forEach(task => {
        if (Date(task.due) < Date.now() && task.status === "Incomplete") {
            overdue++;
        } else if (task.status === "Completed") {
            completed++;
        } else if (task.status === "Inprogress") {
            inprogress++;
        } else {
            incomplete++;
        }
    });

    const data = [
        { letter: "Completed", frequency: completed },
        { letter: "Inprogress", frequency: inprogress },
        { letter: "Overdue", frequency: overdue },
        { letter: "Incomplete", frequency: incomplete },
    ]
    return data;
}

function drawBar(data) {
    const margin = { top: 60, right: 20, bottom: 30, left: 80 };
    const width = 350 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = d3
        .select(".barchart-body svg")
        .attr("width", width + margin.left + margin.right + 100)
        .attr("height", height + margin.top + margin.bottom + 100)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const color = d3.scaleOrdinal()
        .domain(["Completed", "Inprogress", "Overdue", "Incomplete"]).range(["#B85F4C", "#ff8c00", "#614084", "#5ABCC4", "#67B886", "#995796"]);
    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.letter))
        .attr("y", (d) => y(d.frequency))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.frequency))
        .style("fill", (d, i) => color(i));
}

export default BarChart;