import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';

import {MikroORM} from "@mikro-orm/core";
import config from "../../mikro-orm.config";
import {Book} from "../../entities/Book";

export const handler: ValidatedEventAPIGatewayProxyEvent<unknown> = async () => {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();
  const newBook = new Book('title');

  // This should be true
  console.debug(em.getMetadata().get('Book').class === Book)
  // This does not work
  em.persistAndFlush(newBook);

  // This works (if you comment the above persistAndFlush
  const book = em.create(Book, newBook);
  em.persistAndFlush(book);

  return formatJSONResponse({
    newBook
  });
};

export const main = middyfy(handler);
