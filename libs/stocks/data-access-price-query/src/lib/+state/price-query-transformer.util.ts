import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[],
  fromDate: Date,
  toDate: Date
): PriceQuery[] {
  let data = response.filter(selDate => new Date(selDate.date) >= new Date(fromDate) && new Date(selDate.date) <= new Date(toDate))
  return data
    .map(
      responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
