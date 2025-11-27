import { env } from "core/config/env";
import { retrieveAllCollections, setDefaultConfiguration } from "typesense-ts";

export default setDefaultConfiguration({
  apiKey: env.TYPESENSE_API_KEY,
  nodes: [
    {
      protocol: "http",
      host: env.TYPESENSE_HOST,
      port: env.TYPESENSE_PORT,
    },
  ],
  retryIntervalSeconds: 2,
  numRetries: 3,
  healthcheckIntervalSeconds: 30,
});

// export async function bootstrap() {
//   const collections = await retrieveAllCollections();
//   console.log(collections.map((collection) => ({ name: collection.name })));
// }
