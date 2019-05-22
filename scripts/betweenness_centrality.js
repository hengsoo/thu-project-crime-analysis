$(document).ready(function () {
    // Driver code
    $("#input_bc_node").change(function (e) {
        let node = parseInt($("#input_bc_node").val());
        console.log("Calculating betweenness centrality for node " + node);
        console.log(bc(node));
    }); // End of driver
});

function bc(node)
{
  const node_count = edge.length+1;
  const total_sp = (node_count-1)*(node_count-2);
  var sp_thru_node = 0;
  for(let i=0 ; i<node_count ; i++)
  {
    for(let j=0 ; j<node_count ; j++)
    {
      if(i==j || node==i || node==j)continue;
      var info = shortest_paths[i][j];
      if(info.path == "No Path")continue;
      if(info.path.indexOf(node)>=0){
        sp_thru_node++;
      }
      
    }
  }
  
  console.log(sp_thru_node);
  return sp_thru_node/(total_sp/2);
}
