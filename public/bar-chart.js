
const data = d3.range(15).map(() => Math.round(Math.random() * 100));

const domainMax = data => d3.max(data) * 0.05 + d3.max(data);

const
  width = 800,
  height = 500,
  barWidth = width / data.length;

const xScale = d3.scaleBand()
  .range([0, width])
  .round(true)
  .padding(0.1)
  .domain(data.map((d, i) => i));

const yScale = d3.scaleLinear()
  .domain([0, domainMax(data)])
  .range([height, 0]);

const svg = d3.select(".chart")
  .attr("width", width + "px")
  .attr("height", height + "px");

svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d) + "px");
