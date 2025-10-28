import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export type ConfigResponse = {
  message: string;
  env: {
    site_name: string;
    title: string;
    description: string;
    locale: string;
    NODE_ENV?: string;
    NEXT_PUBLIC_CREDENTIALS_MODE?: string;
    NEXT_PUBLIC_HARD_TOKEN_AMOUNT?: number;
    NEXT_PUBLIC_SOFT_TOKEN_AMOUNT?: number;
    NEXT_PUBLIC_ZF1_BASE_URL?: string;

    [key: string]: string | number | undefined;
  };
};

// Create a GET handler for the route
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  // Force revalidation of this route
  revalidatePath("/api/config");
  
  // Extract all environment variables that we want to expose
  const envVars: Record<string, string | undefined> = {};
  
  // Get all environment variables
  for (const key in process.env) {
    // Only expose NEXT_PUBLIC_ variables and a few safe ones
    if (key.startsWith('NEXT_PUBLIC_CREDENTIALS_MODE') || key.startsWith("NEXT_PUBLIC_ZF1_BASE_URL") ||
        ['NODE_ENV'].includes(key)) {
      envVars[key] = process.env[key];
    }
  }
  
  // console.log('Environment variables being sent:', Object.keys(envVars));
  
  // Create the configuration object
  const config: ConfigResponse = {
    message: "App configurations",
    env: {
      site_name: "Account Services",
      title: "Account Services",
      description: "",
      locale: "en",

      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_CREDENTIALS_MODE: process.env.NEXT_PUBLIC_CREDENTIALS_MODE,
      NEXT_MODS: process.env.NEXT_MODS,

      NEXT_PUBLIC_HARD_TOKEN_AMOUNT: process.env.NEXT_PUBLIC_HARD_TOKEN_AMOUNT !== undefined
        ? Number(process.env.NEXT_PUBLIC_HARD_TOKEN_AMOUNT)
        : undefined,
      NEXT_PUBLIC_SOFT_TOKEN_AMOUNT: process.env.NEXT_PUBLIC_SOFT_TOKEN_AMOUNT !== undefined
        ? Number(process.env.NEXT_PUBLIC_SOFT_TOKEN_AMOUNT)
        : undefined,

      NEXT_PUBLIC_ZF1_BASE_URL: process.env.NEXT_PUBLIC_ZF1_BASE_URL,
      NEXT_SECRET_CHQMGMT_GROUP: process.env.NEXT_SECRET_CHQMGMT_GROUP,

      //external links
      NEXT_PUBLIC_BVN_SUBMISSION: process.env.NEXT_PUBLIC_BVN_SUBMISSION,
      NEXT_PUBLIC_BVN_ENROLLMENT_PORTAL: process.env.NEXT_PUBLIC_BVN_ENROLLMENT_PORTAL,
      NEXT_PUBLIC_EXTRASWITCH: process.env.NEXT_PUBLIC_EXTRASWITCH,
      NEXT_PUBLIC_DUD_CHEQUES: process.env.NEXT_PUBLIC_DUD_CHEQUES,
      NEXT_PUBLIC_VIA_CARD: process.env.NEXT_PUBLIC_VIA_CARD,
      NEXT_PUBLIC_BVN_MATCHING_SYSTEM: process.env.NEXT_PUBLIC_BVN_MATCHING_SYSTEM,
      NEXT_PUBLIC_COOPERATE_SEARCH_PORTAL: process.env.NEXT_PUBLIC_COOPERATE_SEARCH_PORTAL,
      NEXT_PUBLIC_MY_BANK_STATEMENT: process.env.NEXT_PUBLIC_MY_BANK_STATEMENT,
      NEXT_PUBLIC_UMPIRE: process.env.NEXT_PUBLIC_UMPIRE,
      NEXT_PUBLIC_TWIG: process.env.NEXT_PUBLIC_TWIG,
      NEXT_PUBLIC_E_DOCUMENT: process.env.NEXT_PUBLIC_E_DOCUMENT,
      NEXT_PUBLIC_DRIVER_LICENCE_VALIDATION: process.env.NEXT_PUBLIC_DRIVER_LICENCE_VALIDATION,
      NEXT_PUBLIC_CRM: process.env.NEXT_PUBLIC_CRM,
      NEXT_PUBLIC_NIN: process.env.NEXT_PUBLIC_NIN,
      NEXT_PUBLIC_VOTER_CARD_VALIDATION: process.env.NEXT_PUBLIC_VOTER_CARD_VALIDATION,
      NEXT_PUBLIC_INTERNATIONAL_PASSPORT_VALIDATION: process.env.NEXT_PUBLIC_INTERNATIONAL_PASSPORT_VALIDATION,
      NEXT_PUBLIC_PAYDIRECT: process.env.NEXT_PUBLIC_PAYDIRECT,
      NEXT_PUBLIC_ETRANZACT: process.env.NEXT_PUBLIC_ETRANZACT,
      NEXT_PUBLIC_REMITA: process.env.NEXT_PUBLIC_REMITA,
      NEXT_PUBLIC_BANKONE: process.env.NEXT_PUBLIC_BANKONE,
      NEXT_PUBLIC_ITELLER: process.env.NEXT_PUBLIC_ITELLER,
      NEXT_PUBLIC_TRMS: process.env.NEXT_PUBLIC_TRMS,
      NEXT_PUBLIC_EBILLS: process.env.NEXT_PUBLIC_EBILLS,
      NEXT_PUBLIC_WESTERN_UNION: process.env.NEXT_PUBLIC_WESTERN_UNION,
      NEXT_PUBLIC_RIA: process.env.NEXT_PUBLIC_RIA,
      NEXT_PUBLIC_PAYARENA: process.env.NEXT_PUBLIC_PAYARENA,
      NEXT_PUBLIC_MONEY_GRAM: process.env.NEXT_PUBLIC_MONEY_GRAM,
      NEXT_PUBLIC_ACCESS_COLLECT: process.env.NEXT_PUBLIC_ACCESS_COLLECT,
      NEXT_PUBLIC_ACCESS_PAY_N: process.env.NEXT_PUBLIC_ACCESS_PAY_N,

      
      // Add a timestamp to help detect changes
      // CONFIG_TIMESTAMP: new Date().toISOString(),
    },
  };

  // Return the response with no-cache headers
  return NextResponse.json(config, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    },
  });
}