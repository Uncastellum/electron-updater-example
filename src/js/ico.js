//<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
//<script src="src/ico.js"></script>
const dataset = [1, 1, 1, 1, 1, 1, 1, 1, 3, 1]

const colors = ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']

const width = document.querySelector('.app-icon').offsetWidth
const height = document.querySelector('.app-icon').offsetHeight
const radius = Math.min(width, height) / 2
const initialAnimDelay = 300
const arcAnimDelay = 150
const arcAnimDur = 3000

// append svg
let svg = d3.selectAll('.app-icon').append('svg')
  .attr({
    'width': width,
    'height': height,
    'class': 'pieChart'
  })
  .append('g')
/*let svg = d3.selectAll('.app-icon').append('svg')
  .each(function(d, i) {
    d3.select(this)
      //.attr('width', width)
      //.attr('height', height)
      //.attr('class', 'pieChart')
      .attr({
        'width': width,
        'height': height,
        'class': 'pieChart'
      })
})
  .append('g')*/

svg.attr({
  'transform': `translate(${width / 2}, ${height / 2})`
});

// for drawing slices
let arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(radius * 0.9)


let pie = d3.layout.pie()
  .value(d => d)
pie.padAngle(0.08);

let draw = function() {
  svg.append("g").attr("class", "slices")

  // define slice
  let slice = svg.select('.slices')
    .datum(dataset)
    .selectAll('path')
    .data(pie)
  slice
    .enter().append('path')
    .attr({
      'fill': (d, i) => colors[i],
      'd': arc,
      'transform': (d, i) => 'rotate(-180, 0, 0)'
    })
    .style('opacity', 0)
    .transition()
    .delay((d, i) => (i * arcAnimDelay) + initialAnimDelay)
    .duration(arcAnimDur)
    .ease('elastic')
    .style('opacity', 1)
    .attr('transform', 'rotate(0,0,0)')
}

draw()

//d3.selectAll('.slices').transition().ease('back').duration(500).delay(0).style('opacity', 0).attr('transform', 'translate(0, 250)').remove()
//setTimeout(draw, 800)
