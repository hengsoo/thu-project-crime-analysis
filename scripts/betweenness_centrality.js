$(document).ready(function () {
    // Driver code
    // End of driver
});

function betweennessCentrality(node)
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
