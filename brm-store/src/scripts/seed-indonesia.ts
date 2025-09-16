import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createRegionsWorkflow,
  createTaxRegionsWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedIndonesiaRegion({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  const countries = ["id"]; // Indonesia

  logger.info("Setting up Indonesia region...");

  // Get store and default sales channel
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  // Update store to support IDR currency
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          {
            currency_code: "idr", // Indonesian Rupiah
            is_default: true,
          },
          {
            currency_code: "usd", // Keep USD as backup
          },
        ],
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });

  logger.info("Creating Indonesia region...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Indonesia",
          currency_code: "idr",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];
  
  logger.info("Setting up tax regions for Indonesia...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system"
    })),
  });

  logger.info("✅ Indonesia region setup completed!");
  logger.info(`Region ID: ${region.id}`);
  logger.info(`Currency: IDR`);
  logger.info(`Country: Indonesia (ID)`);
  
  console.log("\n🔥 Next Steps:");
  console.log("1. Go to Admin Panel → Products");
  console.log("2. For each product → Pricing tab");
  console.log("3. Add price for 'Indonesia' region with IDR currency");
  console.log("4. Restart storefront: npm run dev");
  console.log("\n📱 Access storefront at: http://localhost:8000/id/");
}