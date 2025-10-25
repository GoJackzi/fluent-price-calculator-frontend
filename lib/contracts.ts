// Contract addresses on Fluent Testnet
export const PRICE_CALCULATOR_ADDRESS = "0x4447dde77D30004E130896Cc875f279D902315D4" as const;
export const TOKEN_PRICE_MANAGER_ADDRESS = "0xF942E2Aa33e3BbB7D4936444e92433dFa9EA85bd" as const;

// PriceCalculator (Rust/WASM) ABI
export const PRICE_CALCULATOR_ABI = [
  {
    name: "calculatePriceWithMarkup",
    inputs: [
      { internalType: "uint256", type: "uint256", name: "base_price" },
      { internalType: "uint256", type: "uint256", name: "markup_percent" }
    ],
    outputs: [{ internalType: "uint256", type: "uint256", name: "_0" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    name: "calculateTotalCost",
    inputs: [
      { internalType: "uint256", type: "uint256", name: "unit_price" },
      { internalType: "uint256", type: "uint256", name: "quantity" }
    ],
    outputs: [{ internalType: "uint256", type: "uint256", name: "_0" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    name: "calculateDiscountAmount",
    inputs: [
      { internalType: "uint256", type: "uint256", name: "original_price" },
      { internalType: "uint256", type: "uint256", name: "discount_percent" }
    ],
    outputs: [{ internalType: "uint256", type: "uint256", name: "_0" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    name: "calculatePriceAfterDiscount",
    inputs: [
      { internalType: "uint256", type: "uint256", name: "original_price" },
      { internalType: "uint256", type: "uint256", name: "discount_percent" }
    ],
    outputs: [{ internalType: "uint256", type: "uint256", name: "_0" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    name: "calculateAveragePrice",
    inputs: [{ internalType: "uint256[]", type: "uint256[]", name: "prices" }],
    outputs: [{ internalType: "uint256", type: "uint256", name: "_0" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    name: "isPriceWithinRange",
    inputs: [
      { internalType: "uint256", type: "uint256", name: "price" },
      { internalType: "uint256", type: "uint256", name: "min_range" },
      { internalType: "uint256", type: "uint256", name: "max_range" }
    ],
    outputs: [{ internalType: "bool", type: "bool", name: "_0" }],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

// TokenPriceManager (Solidity) ABI
export const TOKEN_PRICE_MANAGER_ABI = [
  {
    type: "constructor",
    inputs: [{ name: "_priceCalculatorAddress", type: "address", internalType: "address" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "authorizedPriceSetters",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "calculatePurchaseCost",
    inputs: [
      { name: "tokenSymbol", type: "string", internalType: "string" },
      { name: "quantity", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getAverageTokenPrice",
    inputs: [
      { name: "token1", type: "string", internalType: "string" },
      { name: "token2", type: "string", internalType: "string" },
      { name: "token3", type: "string", internalType: "string" }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getBasePrice",
    inputs: [{ name: "tokenSymbol", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getDiscountedPrice",
    inputs: [
      { name: "tokenSymbol", type: "string", internalType: "string" },
      { name: "discountPercentage", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getTokenPriceWithMarkup",
    inputs: [
      { name: "tokenSymbol", type: "string", internalType: "string" },
      { name: "markupPercentage", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "isPriceInAcceptableRange",
    inputs: [
      { name: "tokenSymbol", type: "string", internalType: "string" },
      { name: "minPrice", type: "uint256", internalType: "uint256" },
      { name: "maxPrice", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "priceCalculator",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPriceCalculator" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "setAuthorization",
    inputs: [
      { name: "user", type: "address", internalType: "address" },
      { name: "authorized", type: "bool", internalType: "bool" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setTokenPrice",
    inputs: [
      { name: "tokenSymbol", type: "string", internalType: "string" },
      { name: "basePrice", type: "uint256", internalType: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "tokenBasePrices",
    inputs: [{ name: "", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "AuthorizationChanged",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "authorized", type: "bool", indexed: false, internalType: "bool" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PriceCalculated",
    inputs: [
      { name: "tokenSymbol", type: "string", indexed: true, internalType: "string" },
      { name: "finalPrice", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PriceSet",
    inputs: [
      { name: "tokenSymbol", type: "string", indexed: true, internalType: "string" },
      { name: "basePrice", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  }
] as const;

