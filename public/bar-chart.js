
const data = d3.range(15).map(() => Math.round(Math.random() * 100));

const
  margin = {top: 30, right: 30, bottom: 30, left: 50},
  width = 800,
  height = 500,
  heightWithMargins = height + margin.top + margin.bottom,
  widthWithMargins = width + margin.right + margin.left,
  barWidth = width / data.length;

const xScale = d3.scaleBand()
  .range([0, width])
  .round(true)
  .padding(0.1)
  .domain(data.map((d, i) => i));

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(data.length, "s");

const svg = d3.select(".chart")
  .attr("width", widthWithMargins + "px")
  .attr("height", heightWithMargins + "px");

const div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

svg.append("g")
  .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
  .call(xAxis);

svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(yAxis)


svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d) + "px")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .on("mouseover", (d, i) => {
      div.transition()
        .duration(250)
        .style("opacity", 0.95);
      div.html(d + "<br/>")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", d => {
      div.transition()
        .duration(200)
        .style("opacity", 0);
    });
