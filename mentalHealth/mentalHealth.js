export function MentalHealth(container) {
    const margin = ({top: 40, right: 40, bottom: 40, left: 40});

    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    svg.append('text')
        .text("Mental Health map and graph will be here");
}