# 离散数学(2) 大作业

## 主题

分析芝加哥2019犯罪(未逮捕)记录

#### 数据来源:

 https://catalog.data.gov/dataset/crimes-one-year-prior-to-present-e171f/resource/a94a8c54-a4df-400a-add3-2d6b1d8ed2af?inner_span=True>

## Installation

Run `npm install --dev` to install **browser-sync**

Run `npm run dev` to run **browser-sync**

## File Descriptions

| Folder  |         File Name         |               Description                |
| :-----: | :-----------------------: | :--------------------------------------: |
|  views  |        index.html         |              **Index file**              |
| scripts | betweenness_centrality.js | Algorithm for **Betweenness Centrality** |
| scripts |  closeness centrality.js  |  Algorithm for **Closeness Centrality**  |
| scripts |          prim.js          |   Algorithm for **Minimum Tree Span**    |
| scripts |     shortest_path.js      |     Algorithm for **Shortest Path**      |
| scripts |      create_graph.js      |  **Create Vertices and Edges** Function  |
| scripts |     visualization.js      |        **Visualization** Function        |

## Technology Used

|        Aspects         |                                                              |
| :--------------------: | ------------------------------------------------------------ |
|     Visualization      | Force-Directed graph with d3js, represented using svg element in HTML |
|      Data storage      | Calculate and store in json then convert to 1-D array / 2-D array in JavaScript |
|     Shortest Path      | Dijkstra Single Source Shortest Path algorithm               |
|   Minimum Tree Span    | Prim's algorithm                                             |
|  Closeness Centrality  | Definition of Closeness Centrality                           |
| Betweenness Centrality | Definition of Betweenness Centrality                         |



## Special Consideration

1. Although the graph is undirected, when calculating the shortest path, we maintain the flow of timeline. That means, on a shortest path, a node placed after another node happens later than the other node.
2. When calculating Betweenness Centrality, we do not consider multiple shortest path from a node to another. This is because the weight of each edge is a decimal number with lots of digit, there is a small chance that the total cost of two path is same.

## Author

黄祖斌 2018080120
苏敬恒 2018080124