//d3.select('#visualization')
//  .selectAll('p')
//  .data(['hello','world'])
//  .enter().append('p')
//  .text(function(d) { return d });

// based (heavily) on:
// http://jsfiddle.net/HF57g/
// other version:
// http://jsfiddle.net/HF57g/2/
// both found via:
// http://stackoverflow.com/questions/15560145/how-to-zoom-in-out-d3-time-scale-without-scaling-other-shapes-bound-to-timeline

// axis tweeks via:
// http://alignedleft.com/tutorials/d3/axes/


var w = 900,
    h = 204,
    parseDate = d3.time.format("%Y-%m-%d").parse,
    now = parseDate('2013-04-19');


svg = d3.select("#visualization")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


var scale = d3.time.scale()
                .domain([new Date(+now - 28 * 1000 * 60 * 60 * 24),
                         new Date(+now + 10 * 1000 * 60 * 60 * 24)])
                .range([10, w]);



var xaxis = d3.svg.axis().scale(scale)
                .orient("bottom");


var zoom = d3.behavior.zoom()
  .on("zoom", function(){
    svg.select("g").call(xaxis).selectAll("text");//.style("font-size", "16px");
    svg.selectAll(".item").attr("transform", "translate(" + d3.event.translate[0]+", 0)scale(" + d3.event.scale+", 1)");
  }).x(scale);


var rect = svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", w)
                .attr("height", h)
                .attr("opacity", 0)
                .call(zoom);

svg.append("g")
    .attr("class", "axis")
    .call(xaxis)
    .attr("transform", "translate(0, 164)")

svg.append("line")
    .attr("class", "item")
    .attr("x1", scale(now))
    .attr("x2", scale(now))
    .attr("y1", 0)
    .attr("y2", 164)
    .style("stroke", "black");

svg.append("text")
    .attr("class", "item")
    .attr("x", scale(+now + 1000 * 60 * 100))
    .attr("y", 10)
    .text("now")

svg.append("text")
    .attr("x", 10)
    .attr("y", 150)
    .attr('opacity', 0.5)
    .text("preventative")

svg.append("text")
    .attr("x", 10)
    .attr("y", 114)
    .attr('opacity', 0.5)
    .text("interventions")

svg.append("text")
    .attr("x", 10)
    .attr("y", 78)
    .attr('opacity', 0.5)
    .text("emergency")

svg.append("text")
    .attr("x", 10)
    .attr("y", 42)
    .attr('opacity', 0.5)
    .text("hospitalization")

svg.selectAll('rect.items')
  .data([{start: '2013-04-12',
          end: '2013-04-13',
          shortDesc: 'ER for earache',
          longDesc: 'You had an earache and went in to the emergency room. Dr. Smith saw you and recommended that you take an over-the-counter medication. You can get <a href="http://en.wikipedia.org/wiki/Pharmacy" style="text-decoration: none" target="_blank">more information</a> about this recommendation.',
          setting: 'hospital'},
         {start: '2013-03-20',
          end: '2013-03-21',
          shortDesc: 'ER for earache',
          longDesc: 'You had an earache and went in to the emergency room. Dr. Smith saw you and recommended that you take an over-the-counter medication. You can get <a href="http://en.wikipedia.org/wiki/Pharmacy" style="text-decoration: none" target="_blank">more information</a> about this recommendation.',
          setting: 'hospital'},
         {start: '2012-03-04',
          end: '2012-03-05',
          shortDesc: 'birthday',
          longDesc: 'You celebrated your 29th birthday. Many happy returns!',
          setting: 'general practitioner'},
         {start: '2013-03-04',
          end: '2013-03-05',
          shortDesc: 'birthday',
          longDesc: 'You celebrated your 30th birthday. Many happy returns!',
          setting: 'general practitioner'},
         {start: '2011-03-04',
          end: '2011-03-05',
          shortDesc: 'birthday',
          longDesc: 'You celebrated your 28th birthday. Many happy returns!',
          setting: 'general practitioner'},
         {start: '2013-04-5',
          end: '2013-04-8',
          shortDesc: 'football concussion',
          longDesc: 'After colliding with a teammate, you had a severe concussion and were hospitalized for several days.',
          setting: 'pharmacy'},
         {start: '2011-04-5',
          end: '2011-04-8',
          shortDesc: 'football concussion',
          longDesc: 'After colliding with a teammate, you had a severe concussion and were hospitalized for several days.',
          setting: 'pharmacy'},
         {start: '2013-04-16',
          end: '2013-04-17',
          shortDesc: 'regular visit',
          longDesc: 'You saw Dr. Aykens at your local hospital. Everything was fine.',
          setting: 'general practitioner'},
         {start: '2013-03-30',
          end: '2013-03-31',
          shortDesc: 'blood work',
          longDesc: 'You had blood work done at a local clinic. The results were: <ul><li>calcium: 100</li><li>potassium: 47</li><li>midi-chlorians: off the charts</li></ul>',
          setting: 'specialist'},
         {start: '2013-03-29',
          end: '2013-03-30',
          shortDesc: 'regular visit',
          longDesc: 'You saw Dr. Aykens at your local hospital. Everything was fine, but he recommended you get some blood tests done.',
          setting: 'general practitioner'},
         {start: '2011-04-16',
          end: '2011-04-17',
          shortDesc: 'regular visit',
          longDesc: 'You saw Dr. Aykens at your local hospital. Everything was fine.',
          setting: 'general practitioner'},
         {start: '2011-03-30',
          end: '2011-03-31',
          shortDesc: 'blood work',
          longDesc: 'You had blood work done at a local clinic. The results were: <ul><li>calcium: 100</li><li>potassium: 47</li><li>midi-chlorians: off the charts</li></ul>',
          setting: 'specialist'},
         {start: '2011-03-29',
          end: '2011-03-30',
          shortDesc: 'regular visit',
          longDesc: 'You saw Dr. Aykens at your local hospital. Everything was fine, but he recommended you get some blood tests done.',
          setting: 'general practitioner'},
         {start: '2013-04-24',
          end: '2013-04-25',
          shortDesc: 'schedule flu shot',
          longDesc: 'Based on your age and health history, you should <a href="http://www.zocdoc.com/" style="text-decoration: none" target="_blank">schedule</a> a flu shot soon.',
          setting: 'specialist'},
         {start: '2012-04-24',
          end: '2012-04-25',
          shortDesc: 'flu shot',
          longDesc: 'You had your regularly scheduled flu shot and avoided illness all season. Good job!',
          setting: 'specialist'},
         {start: '2011-04-24',
          end: '2011-04-25',
          shortDesc: 'flu shot',
          longDesc: 'You had your regularly scheduled flu shot and avoided illness all season. Good job!',
          setting: 'specialist'}])
  .enter().append('rect')
  .attr('class', 'item')
  .attr('x', function(d){return scale(parseDate(d.start))})
  .attr('y', function(d){if (d.setting==='pharmacy') { return 20 } 
                         else if (d.setting==='hospital') { return 56 }
                         else if (d.setting==='specialist') { return 92 }
                         else { return 128 }})
  .attr('width', function(d){return scale(parseDate(d.end)) - scale(parseDate(d.start))})
  .attr('height', 30)
  .attr('rx', 5)
  .style('opacity', function(d){if (parseDate(d.start)>now) {return 0.5 } else {return 1}})
  .style('fill', function(d){if (d.setting==='pharmacy') { return 'red' } 
                         else if (d.setting==='hospital') { return 'orange' }
                         else if (d.setting==='specialist') { return 'purple' }
                         else { return 'green' }})
  .append("svg:title").text(function(d){return d.start});

$('svg rect').tipsy({ 
        gravity: 's', 
        html: true, 
        title: function() {
          var d = this.__data__;
          return d.shortDesc; 
        }
      });

$('svg rect').click(function() {
  $('#events').prepend("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+this.__data__.start+": "+this.__data__.longDesc+"</div>");
});


