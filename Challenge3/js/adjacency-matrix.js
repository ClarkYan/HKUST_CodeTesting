// draw matrix view map

function draw_matrix(node_result, edge_result) {
    var margin = {top: 135, right: 120, bottom: 100, left: 135},
        width = 720,
        height = 720;

    var x = d3.scale.ordinal().rangeBands([0, width]),
        z = d3.scale.linear().domain([0, 4]).clamp(true),
        c = d3.scale.category20().domain(d3.range(21));

    var svg2 = d3.select("#header2").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("json/HKUST_coauthor_graph.json", function () {

        var matrix = [],
            nodes = node_result,
            links = edge_result,
            n = nodes.length,
            sampleCategoricalData = [];

        // Compute index per node.
        nodes.forEach(function (node, i) {
            node.index = i;
            node.count = 0;
            matrix[i] = d3.range(n).map(function (j) {
                return {x: j, y: i, z: 0};
            });
        });

        // Convert links to matrix; count character occurrences

        links.forEach(function (link) {
            matrix[link.source.index][link.target.index].z += 4;
            matrix[link.target.index][link.source.index].z += 4;
            nodes[link.source.index].count++;
            nodes[link.target.index].count++;


            sampleCategoricalData[link.group] = link.publications;
        });

        verticalLegend = d3.svg.legend().labelFormat("none").cellPadding(5).orientation("vertical").units("Collaborations").cellWidth(16).cellHeight(16).inputScale(c, sampleCategoricalData).cellStepping(21);

        d3.selectAll("svg")
            .append("g").attr("transform", "translate(" + (width + 150) + ",250)").attr("class", "legend").call(verticalLegend);


        // Precompute the orders.
        var orders = {
            // sort by name
            name: d3.range(n).sort(function (a, b) {
                return d3.ascending(nodes[a].fullname, nodes[b].fullname);
            }),
            // sort by value
            count: d3.range(n).sort(function (a, b) {
                return nodes[b].values - nodes[a].values;
            }),
            // sort by id
            group: d3.range(n).sort(function (a, b) {
                return nodes[a].id - nodes[b].id;
            })
        };

        // The default sort order.
        x.domain(orders.name);

        svg2.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);


        var row = svg2.selectAll(".row")
            .data(matrix)
            .enter().append("g")
            .attr("class", function (d, i) {
                return "row name" + nodes[i].id;
            })
            .attr("transform", function (d, i) {
                return "translate(0," + x(i) + ")";
            })
            .each(row);

        row.append("line")
            .attr("x2", width);

        row.append("text")
            .attr("x", -6)
            .attr("y", x.rangeBand() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .text(function (d, i) {
                return nodes[i].fullname;
            });

        var column = svg2.selectAll(".column")
            .data(matrix)
            .enter().append("g")
            .attr("class", function (d, i) {
                return "column namecol" + nodes[i].id;
            })
            .attr("transform", function (d, i) {
                return "translate(" + x(i) + ")rotate(-90)";
            });

        column.append("line")
            .attr("x1", -width);

        column.append("text")
            .attr("x", 6)
            .attr("y", x.rangeBand() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .text(function (d, i) {
                return nodes[i].fullname;
            });

        function row(row) {
            var cell = d3.select(this).selectAll(".cell")
                .data(row.filter(function (d) {
                    return d.z;
                }))
                .enter().append("rect")
                .attr("class", "cell")
                .attr("x", function (d) {
                    return x(d.x);
                })
                .attr("width", x.rangeBand())
                .attr("height", x.rangeBand())
                .style("fill-opacity", function (d) {
                    return z(d.z);
                })
                // .style("stroke-width", "1px")
                .style("fill", function (d) {
                    // fill the color according to the number of publications
                    var result = 1;
                    for (var lIndex = 0; lIndex < edge_result.length; lIndex++) {
                        if (nodes[d.x].index == edge_result[lIndex].source.index && nodes[d.y].index == edge_result[lIndex].target.index) {
                            result = sortCseEdges[lIndex].publications;
                        } else if (nodes[d.y].index == edge_result[lIndex].source.index && nodes[d.x].index == edge_result[lIndex].target.index) {
                            result = edge_result[lIndex].publications;
                        } else {
                            continue;
                        }
                    }
                    return c(result - 1);
                })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);

        }

        function mouseover(p) {
            // add the hover effects interacted with the node-link diagram
            d3.selectAll("g." + "namecol" + nodes[p.x].id + " text").classed("active", true);
            d3.selectAll("g." + "name" + nodes[p.y].id + " text").classed("active", true);
            d3.selectAll("g." + "namecol" + nodes[p.x].id + " line").classed("active_line", true);
            d3.selectAll("g." + "name" + nodes[p.y].id + " line").classed("active_line", true);

            d3.selectAll("g." + "name" + nodes[p.x].id + " circle").style("stroke-width", 6);
            d3.selectAll("g." + "name" + nodes[p.x].id + " circle").style("stroke", "#343a40");
            d3.selectAll("g." + "name" + nodes[p.y].id + " circle").style("stroke-width", 6);
            d3.selectAll("g." + "name" + nodes[p.y].id + " circle").style("stroke", "#343a40");
        }

        function mouseout(p) {
            // cancel all the hover effects
            d3.selectAll("g." + "namecol" + nodes[p.x].id + " text").classed("active", false);
            d3.selectAll("g." + "name" + nodes[p.y].id + " text").classed("active", false);
            d3.selectAll("g." + "namecol" + nodes[p.x].id + " line").classed("active_line", false);
            d3.selectAll("g." + "name" + nodes[p.y].id + " line").classed("active_line", false);

            d3.selectAll("rect").attr("width", x.rangeBand());
            d3.selectAll("rect").attr("height", x.rangeBand());
            d3.selectAll("g." + "name" + nodes[p.x].id + " circle").style("stroke-width", .5);
            d3.selectAll("g." + "name" + nodes[p.x].id + " circle").style("stroke", "#343a40");
            d3.selectAll("g." + "name" + nodes[p.y].id + " circle").style("stroke-width", .5);
            d3.selectAll("g." + "name" + nodes[p.y].id + " circle").style("stroke", "#343a40");
            indexVal = 0;
            colVal = 0;
        }

        d3.select("#order").on("change", function () {
            clearTimeout(timeout);
            order(this.value);
        });

        function order(value) {
            x.domain(orders[value]);

            var t = svg2.transition().duration(1500);

            t.selectAll(".row")
                .delay(function (d, i) {
                    return x(i) * 4;
                })
                .attr("transform", function (d, i) {
                    return "translate(0," + x(i) + ")";
                })
                .selectAll(".cell")
                .delay(function (d) {
                    return x(d.x) * 4;
                })
                .attr("x", function (d) {
                    return x(d.x);
                });

            t.selectAll(".column")
                .delay(function (d, i) {
                    return x(i) * 4;
                })
                .attr("transform", function (d, i) {
                    return "translate(" + x(i) + ")rotate(-90)";
                })

        }

        var timeout = setTimeout(function () {
            order("group");
            d3.select("#order").property("selectedIndex", 2).node().focus();
        }, 2000);

    });
}