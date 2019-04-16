// data pre-processing and sorting algorithm

function sortNodesByID(node){
    // sort cseNodes by ID
    node.sort(function(a, b){
        return a.id - b.id;
    });
    return node;
}

function sortEdgesByIndex(node, edge){
    // modify the source and target of edges to be index
    for (var eIndex = 0; eIndex < edge.length; eIndex++){
        for (var nIndex = 0; nIndex < node.length; nIndex++){
            if (node[nIndex].id == edge[eIndex].source){
                edge[eIndex].source = nIndex;
            }
            else if (node[nIndex].id == edge[eIndex].target){
                edge[eIndex].target = nIndex;
            }
            else {
                continue;
            }
        }
    }
    return edge;
}

// add the total number of collaborations
function getTotalCollaborations(data){
    return data.length;
}

// add the group attribute to edge
function groupByCollaborations(edge){
    edge.sort(function(a, b){
        return a.publications - b.publications;
    });
    var group = 0;
    for (var eIndex = 0; eIndex < edge.length; eIndex++) {
        if (eIndex == edge.length - 1){
            edge[eIndex].group = group;
        }
        else {
            if (edge[eIndex].publications == edge[eIndex + 1].publications) {
                edge[eIndex].group = group;
            } else {
                edge[eIndex].group = group;
                group++;
            }
        }
    }
}