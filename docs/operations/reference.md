---
title: Reference
docSetName: Operations
folder: Operations Repository
basePath: /operations
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

```typescript
/**
 * Common EVM Data Schema
 */
export const evmAddressSchema = z.string().regex(/^0x[a-fA-F\d]{40}$/);
export const evmBeaconIdSchema = z.string().regex(/^0x[a-fA-F\d]{64}$/);
export const evmTemplateIdSchema = z.string().regex(/^0x[a-fA-F\d]{64}$/);
export const evmEndpointIdSchema = z.string().regex(/^0x[a-fA-F\d]{64}$/);
export const evmXpubSchema = z.string().regex(/^xpub[a-zA-Z\d]{107}$/);

/**
 * Wallet types
 *
 * The type of wallet specified.
 *
 * If a wallet type contains "Sponsor" it means the target wallet must be derived using the Airnode Sponsor-wallet
 * algorithm: https://docs.api3.org/airnode/v0.7/concepts/sponsor.html#derive-a-sponsor-wallet
 *
 * If a wallet type does not contain "Sponsor" it is the derived target wallet.
 */
export const walletTypeSchema = z.enum([
  'Provider',
  'API3',
  'Provider-Sponsor',
  'API3-Sponsor',
]);

/**
 * Wallet Top-up Schema
 *
 * A wallet to be monitored for topping up. These wallets are used by Airkeeper and potentially Airseeker to fulfil
 * on-chain value update requests against a DapiServer contract instance.
 */
export const topUpWalletSchema = z
  .object({
    walletType: walletTypeSchema,
    address: evmAddressSchema.optional(),
  })
  .strict();

/**
 * Extended Chain Description Schema
 *
 * A description of a parent beacon's on-chain presence and associated resources.
 *
 * @param active Whether the beacon is currently actively being updated
 * @param sponsor The `sponsor` address (https://docs.api3.org/airnode/v0.7/concepts/sponsor.html#sponsoraddress)
 * @param updateConditionPercentage The API provider's Airkeeper update condition percentage
 * @param displayDisabled Should the beacon be displayed in UI applications (TODO this should be moved to explorerMetadata)
 * @param airseekerConfig API3's Airkseeker update configuration, including:
 * @param airseekerConfig.deviationThreshold API3's Airseeker update threshold
 * @param airseekerConfig.heartbeatInterval The interval at which a forced update will be made regardless of deviation
 * @param airseekerConfig.updateInterval How often API3's Airseeker checks the deviation
 */
export const extendedChainDescriptionSchema = z
  .object({
    active: z.boolean(),
    sponsor: z.string(),
    topUpWallets: z.array(topUpWalletSchema),
    updateConditionPercentage: z.number().optional(),
    displayDisabled: z.boolean().optional(),
    airseekerConfig: z
      .object({
        deviationThreshold: z.number(),
        heartbeatInterval: z.number(),
        updateInterval: z.number(),
      })
      .optional(),
  })
  .strict();

/**
 * Beacon Schema
 *
 * @param name A name for a beacon, formatted for UI display.
 * @param description A description for a beacon, formatted for UI display.
 */
export const beaconSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    beaconId: evmBeaconIdSchema,
    airnodeAddress: evmAddressSchema,
    templateId: evmTemplateIdSchema,
    chains: z.record(extendedChainDescriptionSchema),
  })
  .strict();

export const beaconsSchema = z.record(beaconSchema);

/**
 * Secrets Schema
 *
 * Secrets are expected to not be stored in the operations repository, only templates lacking actual sensitive content.
 * Secrets files are handled as an object containing a filename and their string content - essentially pass-through.
 */
export const secretsSchema = z.object({
  filename: z.string(),
  content: z.string(),
});

/**
 * Airnode AWS Deployment Schema
 *
 * Describes an Airnode deployment to AWS
 */
export const airnodeDeploymentAWSSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  secrets: secretsSchema.optional(),
  aws: secretsSchema.optional(),
});

/**
 * Airnode GCP Deployment Schema
 *
 * Describes an Airnode deployment to GCP
 */
export const airnodeDeploymentGCPSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  secrets: secretsSchema.optional(),
  gcp: z.any().optional(),
});

/**
 * Airnode Deployment Schema
 *
 * Describes an optional set of Airnode deployments
 */
export const airnodeDeploymentSchema = z.object({
  aws: airnodeDeploymentAWSSchema.optional(),
  gcp: airnodeDeploymentGCPSchema.optional(),
});

/**
 * Airkeeper AWS Deployment Schema
 *
 * Describes an Airkeeper deployment to AWS
 */
export const airkeeperDeploymentAWSSchema = z.object({
  config: z.any().optional(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  airkeeper: z.any().optional(),
  secrets: secretsSchema.optional(),
  aws: secretsSchema.optional(),
});

/**
 * Airkeeper Deployment Schema
 *
 * Describes an Airkeeper deployment
 */
export const airkeeperDeploymentSchema = z.object({
  aws: airkeeperDeploymentAWSSchema.optional(),
});

/**
 * Deployment Set Schema
 *
 * Describes an Airnode and Airkeeper deployment.
 * Deployment of Airkeeper is optional.
 */
export const deploymentSetSchema = z.object({
  airnode: airnodeDeploymentSchema,
  airkeeper: airkeeperDeploymentSchema.optional(),
});

/**
 * Deployment Schema
 *
 * Deployment sets are keyed by the date in the format 'YYYY-MM-DD'
 */
export const deploymentsSchema = z.record(deploymentSetSchema);

/**
 * An Airnode Template
 *
 * Please see documentation here: https://docs.api3.org/airnode/v0.7/grp-developers/using-templates.html#part-1-build-a-template
 */
export const templateDecodedParametersSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

/**
 * Template Schema
 *
 * @param name A UI-suitable formatted name
 * @param templateId Referenced by beacons and used to generate configuration files for Airnode, Airkeeper and Airseeker
 * @param endpointId References an OIS-based endpoint: https//docs.api3.org/airnode/latest/concepts/endpoint.html#endpointid
 * @param parameters Encoded parameters - derived from `decodedParameters` and used in consuming applications
 * @param decodedParameters Used as an input into the generation of `parameters`. See https://docs.api3.org/airnode/v0.7/reference/deployment-files/config-json.html#triggers
 */
export const templateSchema = z
  .object({
    name: z.string(),
    templateId: evmTemplateIdSchema,
    endpointId: evmEndpointIdSchema,
    parameters: z.string(),
    decodedParameters: z.array(templateDecodedParametersSchema),
  })
  .strict();

/**
 * Templates Schema
 *
 * Templates are keyed by their `templateId`
 */
export const templatesSchema = z.record(templateSchema);

/**
 * OISes Schema
 *
 * OISes are keyed by a composite of their `title` and `version`.
 * For more information, visit: https://docs.api3.org/ois/v1.1/
 */
export const oisesSchema = z.record(oisSchema);

/**
 * API Provider Metadata Schema
 *
 * The API provider metadata provides information about an API provider.
 *
 * @param name A UI-suitably formatted name for the provider
 * @param active Whether any of the provider's beacons are active
 * @param description A UI-suitably formatted description of the API provider
 * @param homepage The API provider's homepage
 * @param airnode The API Provider's Airnode address, see: https://docs.api3.org/airnode/v0.7/reference/packages/admin-cli.html#derive-airnode-address
 * @param xpub The extended public key of the API Provider's Airnode, see: https://docs.api3.org/airnode/v0.7/reference/packages/admin-cli.html#derive-airnode-xpub
 * @param logoPath The API Provider's web-accessible logo as a URL
 * @param orderLogoPath An alternative logo for the API Provider for light backgrounds
 * @param maxSubscriptionPeriod The maximum period that a requester contract may be allowed to read from the API provider's beacons in months
 */
export const apiMetadataSchema = z
  .object({
    name: z.string(),
    active: z.boolean(),
    description: z.string(),
    homepage: z.string(),
    airnode: evmAddressSchema,
    xpub: evmXpubSchema,
    logoPath: z.string(),
    orderLogoPath: z.string().optional(),
    maxSubscriptionPeriod: z.number(),
  })
  .strict();

/**
 * API Schema
 *
 * Data describing an API provider's on-chain services.
 */
export const apiSchema = z
  .object({
    apiMetadata: apiMetadataSchema,
    beacons: beaconsSchema,
    templates: templatesSchema,
    deployments: deploymentsSchema,
    ois: oisesSchema,
  })
  .strict()
  .superRefine(validateBeaconsTemplateIdReferences)
  .superRefine(validateTemplatesEndpointIdReferences);

export const apisSchema = z.record(apiSchema);

/**
 * Chains Metadata: Contracts
 *
 * Describes contract deployments on a chain
 */
export const chainsMetadataContractsSchema = z.object({
  AirnodeRrp: z.string().optional(),
  RrpBeaconServer: z.string().optional(),
  DapiServer: z.string(),
});

/**
 * Chains Metadata Schema
 *
 * Data describing chains served by operations services
 *
 * @param name The name of the chain as used by `ethers`, eg. 'polygon-mumbai'
 * @param fullName The UI-suitable name of the chain, e.g. "Polygon Mumbai Testnet"
 * @param decimalPlaces The number of decimal places to display for the native token (useful for chains with high native token
 *                 values. Defaults to 2 if unspecified).
 * @param id The chainId number of the chain
 * @param contracts Contract addresses deployed on the target chain, keyed by their name
 * @param nativeToken The symbol of the native token of the target chain, e.g. "BTC"
 * @param logoPath A URL pointing to the logo for the chain
 * @param orderLogoPath A URL pointing to an alternative logo for the chain, useful for light backgrounds
 * @param testnet Whether the target chain is a testnet
 * @param explorerUrl A base URL pointing to an explorer for the target chain
 */
export const chainsMetadataSchema = z
  .object({
    name: z.string(),
    fullName: z.string(),
    decimalPlaces: z.number(),
    id: z.string(),
    contracts: chainsMetadataContractsSchema,
    nativeToken: z.string().optional(),
    blockTime: z.number().optional(),
    logoPath: z.string().optional(),
    orderLogoPath: z.string().optional(),
    testnet: z.boolean().optional(),
    explorerUrl: z.string().optional(),
  })
  .strict();

export const chainsSchema = z.record(chainsMetadataSchema);

const airseekerDeploymentSetSchema = z
  .object({
    airseeker: z.any(), //TODO commented until we decide on versioning: airseekerConfigSchema,
    secrets: secretsSchema.optional(),
  })
  .strict();

const airseekerDeploymentsSchema = z.record(airseekerDeploymentSetSchema);

//TODO: Decide on the airseeker schema
export const api3Schema = z
  .object({
    airseeker: airseekerDeploymentsSchema,
  })
  .strict();

// Chain name => Dapi Name => Data feed Id (beacon or beaconSet)
export const dapisSchema = z.record(z.record(z.string()));

export const beaconSetsSchema = z
  .record(z.array(z.string()))
  .superRefine(validateBeaconSetIds);

/**
 * Common Logos are logos used for beacons which can have logos associated with them.
 * For example USD/ETH could consist of a USD logo and an ETH logo.
 * There is significant re-use across token pairs, eg. both "USD/ETH" and "USD/BTC" will have the USD logo in common.
 * We'd therefore like to reference these logos separately.
 */
export const commonLogosSchema = z.record(z.string());

/**
 * UI-specific data relating to the display of beacons
 *
 * @param category The category of the beacon as a neatly formatted string, eg. "Cryptocurrency" or "Commodities"
 * @param pricingCoverage A string as a key referencing keys in pricingCoverageSchema, keyed by chain name
 * @param decimalPlaces The number of digits to display after the decimal point for a feed, defaults to 2 if unspecified
 * @param logos An array of logos, which should be displayed in order, representing the underlying asset(s) of the data feed
 */
export const beaconMetadataSchema = z.record(
  z.object({
    category: z.string(),
    pricingCoverage: z.record(z.string()), //TODO must be present in pricingCoverage
    decimalPlaces: z.number().optional(),
    logos: z.array(z.string()).optional(),
    prefix: z.string().optional(),
    postfix: z.string().optional(),
  })
);

/**
 * UI-specific data around display of dapis
 *
 * @param pricingCoverage A string as a key referencing keys in pricingCoverageSchema
 */
export const dapiMetadataSchema = z.record(
  z.object({
    pricingCoverage: z.record(z.string()), //TODO must be present in pricingCoverage
  })
);

/**
 * Pricing and Coverage
 *
 * Values are in USD equivalent.
 * @param subscriptionFee API3-specific subscription fee per data feed for UI display
 * @param coverage The amount of coverage a data feed consumer will receive
 */
export const pricingCoverageSchema = z.record(
  z.array(
    z.object({
      subscriptionFee: z.number(),
      coverage: z.number(),
    })
  )
);

/**
 * Explorer Schema
 *
 * The explorerSchema contains data needed to render beacons and services to a UI.
 */
export const explorerSchema = z
  .object({
    beaconMetadata: beaconMetadataSchema,
    dapiMetadata: dapiMetadataSchema,
    pricingCoverage: pricingCoverageSchema,
    beaconSets: beaconSetsSchema,
    commonLogos: commonLogosSchema,
  })
  .strict();

/**
 * Chain Deployment References
 *
 * Metadata around chains on which API3 services operate.
 *
 * @param chainNames A mapping between chain names and chain IDs
 * @param contracts A mapping between contracts deployed on chains and the IDs of those chains
 */
export const chainDeploymentReferencesSchema = z
  .object({
    chainNames: z.record(z.string()),
    contracts: z.record(z.record(z.string())),
  })
  .strict();

/**
 * Base Policy
 *
 * Describes a base poly schema to be extended. Policies describe coverage purchased and committed on-chain.
 *
 * @param paymentTxHash The transaction hash of a payment for a policy
 * @param claimantAddress The address related to the claimant in the event of a claim against a policy
 * @param beneficiaryAddress The beneficiary address for disbursement of funds if a claim is paid out
 * @param readerAddress The address of a consuming contract
 * @param coverageAmount The amount covered, as per pricingCoverage
 * @param startDate The start date of the policy in seconds since the Unix epoch
 * @param endDate The end date of the policy in seconds since the Unix epoch
 * @param ipfsPolicyHash An IPFS hash referencing a document that describes the terms of the coverage policy
 * @param ipfsServicePolicyHash An IPFS hash referencing a document that describes the service policy
 * @param metadata a metadata string stored on chain as part of the ClaimsManager: https://github.com/api3dao/claims-manager/blob/main/contracts/ClaimsManager.sol#L206
 */
export const basePolicySchema = z
  .object({
    paymentTxHash: z.string().optional(), // zero if free/no payment
    claimantAddress: evmAddressSchema.optional(),
    beneficiaryAddress: evmAddressSchema.optional(),
    readerAddress: evmAddressSchema,
    coverageAmount: z.string().optional(),
    startDate: z.number(),
    endDate: z.number(),
    ipfsPolicyHash: z.string().optional(),
    ipfsServicePolicyHash: z.string().optional(),
    metadata: z.string().optional(),
  })
  .strict();

/**
 * Dapi Policy
 *
 * Extends the Base Policy to add a Dapi Name
 *
 * @param dapiName The dapiName the policy covers
 */
export const dapiPolicySchema = basePolicySchema
  .extend({
    dapiName: z.string(),
  })
  .strict();

/**
 * Data Feed Policy
 *
 * Extends the Base Policy to add a Data Feed ID
 *
 * @param dataFeedId The dataFeedId covered by the policy
 */
export const dataFeedPolicySchema = basePolicySchema
  .extend({
    dataFeedId: evmBeaconIdSchema,
  })
  .strict();

/**
 * Policies
 *
 * Policies are keyed by the names of chain on which they are deployed.
 */
export const policiesSchema = z
  .object({
    dapis: z.record(dapiPolicySchema).optional(),
    dataFeeds: z.record(dataFeedPolicySchema).optional(),
  })
  .strict();

/**
 * Operations Repository
 *
 * @param apis Contains API providers, keyed by their filesystem-safe name
 * @param chains Contains chains, keyed by their filesystem-safe name
 * @param api3 Contains metadata related to API3
 * @param dapis Contains dapi mappings, keyed by chain name
 * @param explorer Contains metadata used by the API3 Explorer for rendering feeds in a UI context
 * @param policies Contains metadata around policies committed on-chain
 */
export const operationsRepositorySchema = z
  .object({
    apis: apisSchema,
    chains: chainsSchema,
    api3: api3Schema.optional(),
    dapis: dapisSchema,
    explorer: explorerSchema,
    policies: z.record(policiesSchema).optional(),
  })
  .strict()
  .superRefine(validateApisBeaconsChainReferences)
  .superRefine(validateBeaconIdAgainstBeaconMetadataReferences)
  .superRefine(validateDapisChainReferences)
  .superRefine(validateBeaconMetadataReferences)
  .superRefine(validateBeaconSetsReferences)
  .superRefine(validatePoliciesDatafeedReferences)
  .superRefine(validateDapiMetadataReferences)
  .superRefine(validateCommonLogosReferences);
```
