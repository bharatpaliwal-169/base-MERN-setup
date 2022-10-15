const os = require('os');
const cluster = require('cluster');
const express = require('express');
const XLSX = require('XLSX');
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
const noOfCPUs = os.cpus().length;
console.log('UV_THREADPOOL_SIZE : ', noOfCPUs);

const app = express();
if (cluster.isPrimary) {
  // primary cluster handles orther slave thread
  for (let i = 0; i < noOfCPUs; i++) {
    //cluster is making slave thread
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork(); // if dead then remake a new thread
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!');
  });

  const port = 8000;
  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
  });
  console.log(`Worker ${process.pid} started`);
}


const data = [
  {
    firstName: 'John',
    lastName: 'Doe'
}, {
firstName: 'Smith',
lastName: 'Peters'
}, {
firstName: 'Alice',
lastName: 'Lee'
}]

const ws = XLSX.utils.json_to_sheet(data)

const wb = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb, ws, 'Responses')

XLSX.writeFile(wb, 'sampleData.export.xlsx')