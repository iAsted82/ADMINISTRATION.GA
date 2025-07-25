import { createTRPCRouter } from './server';
import { servicesRouter } from './routers/services';
import { requestsRouter } from './routers/requests';

export const appRouter = createTRPCRouter({
  services: servicesRouter,
  requests: requestsRouter,
});

export type AppRouter = typeof appRouter;