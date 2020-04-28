import { environment } from './environments/environment';
import { Server } from 'hapi';
import { stocksConstants } from './stocks.constants';

//Using Wreck module for HTTP calls
const Wreck = require('@hapi/wreck');

const init = async () => {
  const server = new Server({
    port: stocksConstants.portConst,
    host: stocksConstants.host,
    routes: {
      cors: {
        origin: ['*'],

      }
    }
  });

  //getStockDataMethod method to fetch Stock data  
  const getStockDataMethod = async (symbol: string, timePeriod: string) => {
    try {
      const url = `${environment.apiURL}${symbol}${stocksConstants.chartConst}${timePeriod}${stocksConstants.tokenConst}${environment.apiKey}`;
      const { payload } = await Wreck.get(url);
      return payload.toString();
    }
    catch (ex) {
      console.error(ex);
    }

  };

  //Set proxy route    
  server.route({
    method: 'GET',
    path: '/stock/{symbol}/{timePeriod}',
    handler: async function (req, h) {
      const { symbol, timePeriod } = req.params;
      const token = req.url.searchParams.get(stocksConstants.token);
      const response = await server.methods.getStockDataMethod(symbol, timePeriod);
      return response;
    }
  });

  //server method for caching purpose  
  server.method('getStockDataMethod', getStockDataMethod, {
    cache: {
      expiresIn: stocksConstants.expiresIn,
      generateTimeout: stocksConstants.generateTimeout
    },
    //generateKey function to create unique id for caching
    generateKey: (symbol, timePeriod) => `${symbol}${timePeriod}`
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();