const Worker = require('jest-worker').default

async function main() {
  const worker = new Worker(require.resolve('./worker'), {
    exposedMethods: [
      'sampleWorker1',
      'sampleWorker2',
      'sampleWorker3',
      'sampleWorker4'
    ],
    numWorkers: 4,
  });
  await worker.sampleWorker1()
  await worker.sampleWorker2()
  await worker.sampleWorker3()
  await worker.sampleWorker4()
  worker.end()
}

main()
