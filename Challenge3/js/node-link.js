// draw force-directed graph

function draw_node_link(node_final, edge_final) {
    var width = 500;
    var height = 500;

    var color = d3.scale.category20();

    var scale = d3.scale.linear();

    var svg = d3.select("#header1").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .size([width, height])
        .charge(-120)
        .linkDistance(100);

    d3.json("json/HKUST_coauthor_graph.json", function (error, graph) {
        if (error) throw error;

        force
            .nodes(node_final)
            .links(edge_final)
            .start();

        var link = svg.selectAll(".link")
            .data(edge_final)
            .enter().append("g")
            .attr("class", "link");

        link.append("line")
            .style("stroke-width", function (d) {
                return Math.sqrt(d.values) + "px";
            });
        link.filter(function (d) {
            return d.values > 1;
        }).append("line")
            .attr("class", "separator");

        var node = svg.selectAll(".node")
            .data(node_final)
            .enter().append("g")
            .attr("class", function (d) {
                return "node " + "name" + d.id
            })
            .on("mouseover", gridover)
            .on("mouseout", gridout)
            .call(force.drag);

        node.append("circle")
            .attr("r", function (d) {
                return d.values * 1.5 || 4;
            })
            .style("fill", function (d) {
                return color(d.values);
            });
      node.append("circle")
          .attr("r", function (d) {
            return d.values * 1.5 || 6;
          })
          .style("fill", function (d) {
            return color(d.values);
          });


      function gridover(d) {
            // hover the circle and change the color value
            // draw stroke-width of the circle
            d3.select(this).select("circle").style('stroke', '#343a40');
            d3.select(this).select("circle").style("stroke-width", 6);
            // set the texts of matrix row and column to be highlight
            d3.selectAll("g." + "name" + node_final[d.index].id + " text").classed("active", true);
            d3.selectAll("g." + "namecol" + node_final[d.index].id + " text").classed("active", true);
            // set the line of matrix row and column to be highlight
            d3.selectAll("g." + "name" + node_final[d.index].id + " line").classed("active_line", true);
            d3.selectAll("g." + "namecol" + node_final[d.index].id + " line").classed("active_line", true);
        }

        function gridout(d) {
            // cancel the hover effects
            svg.selectAll('circle').style('stroke', '#343a40');
            d3.select(this).select("circle").style("stroke-width", .5);
            d3.selectAll("g." + "name" + node_final[d.index].id + " text").classed("active", false);
            d3.selectAll("g." + "namecol" + node_final[d.index].id + " text").classed("active", false);
            d3.selectAll("g." + "name" + node_final[d.index].id + " line").classed("active_line", false);
            d3.selectAll("g." + "namecol" + node_final[d.index].id + " line").classed("active_line", false);
        }


        node.append("title")
            .attr("class", "tooltip")
            .text(function (d) {
                return d.id + " (" + d.fullname + ")";
            })
            .style("color",'red');


        force.on("tick", function () {
            link.selectAll("line")
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
    });
}