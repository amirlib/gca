# gca

Graph Classic Algorithms: Use classic algorithms like BFS and Edmonds Krap on graphs.

## Installation

```bash
npm install gca
```

## Usage

```js
const gca = require('gca');
const tool = new gca();

let graph = tool.CreateGraph();
let bfsGraph = tool.BFS(graph, NodeID);
let flowGraph = tool.CreateFlowGraph();
let maxFlow = tool.EdmondsKarp(flowGraph);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## API

Full documentation can be found [here](https://amirlib.github.io/gca/#/).

Also, there an [example.js](https://github.com/amirlib/gca/blob/master/example.js) page.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/babudabu/gca/blob/master/LICENSE) file for details.
