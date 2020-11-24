
export function FirearmLaws(container) {
    const margin = ({top: 60, right: 60, bottom: 60, left: 60});

    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg1 = d3.select(container)
        .append('svg')
        .attr('class', 'svg1')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const svg2 = d3.select(container)
        .append('svg')
        .attr('class', 'svg2')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    svg1.append('text')
        .text("Firearm Laws Graphs will be here");

    Promise.all([
        d3.json('./firearmLaws/states-10m.json'),
        d3.csv('./firearmLaws/firearmLaws.csv')
    ]).then(data => {
        let map = data[0];
        let laws = data[1];
        console.log(map);

        const width = 1000 - margin.left - margin.right;
        const height = 430 - margin.top - margin.bottom;

        let states = topojson.feature(map, map.objects.states).features;
        console.log(states);
        let projection = d3.geoAlbersUsa()
            .translate([width/2, height/2 + 25])
            .scale(700);
        let path = d3.geoPath().projection(projection);

        svg1.selectAll('.state')
            .data(states)
            .enter()
            .append('path')
            .attr('class', 'state')
            .attr('d', path)
            .style('fill', '#e3e3e3')
            .style('stroke', '#333')
            .style('stroke-width', 0.5);
        
        d3.selectAll('.state')
            .on('click', function(d, i) {
                update(laws, i.properties.name);
            });
    })

    function update(laws, state) {

        svg2.selectAll('*').remove();

        let filtered = laws.filter(law => law.state == state);
        console.log(filtered);
        let xScale = d3.scaleTime()
            .domain(d3.extent(filtered, function(d){ return d.year }))
            .range([0, width]);
        svg2.append('g')
            .attr('class', 'x-axis')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));
        
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(filtered, function(d){ return d.lawtotal })])
            .range([height, 0]);
        svg2.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale)
                .tickFormat(d3.format('d')));

        svg2.append('text')
            .attr('class', 'y-axis-title')
            .attr('x', -30)
            .attr('y', height/2 - margin.top)
            .attr('writing-mode', 'vertical-lr');

        svg2.select('.y-axis-title')
            .text('number of gun laws');

        let line = d3.line()
            .x(function(d) {return xScale(d.year)})
            .y(function(d) {return yScale(d.lawtotal)})

        svg2.append('path')
            .datum(filtered)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);
    }
}