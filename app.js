const fileInput = document.querySelector("#fileInput");
const dropZone = document.querySelector("#dropZone");
const fileName = document.querySelector("#fileName");
const addSourceTableButton = document.querySelector("#addSourceTableButton");
const sourceTableList = document.querySelector("#sourceTableList");
const dateSelect = document.querySelector("#dateSelect");
const statusPill = document.querySelector("#statusPill");
const headlineText = document.querySelector("#headlineText");
const sheetName = document.querySelector("#sheetName");
const headerRow = document.querySelector("#headerRow");
const columnMatch = document.querySelector("#columnMatch");
const warningText = document.querySelector("#warningText");
const productCount = document.querySelector("#productCount");
const rowCount = document.querySelector("#rowCount");
const totalCount = document.querySelector("#totalCount");
const inventoryValue = document.querySelector("#inventoryValue");
const resultBody = document.querySelector("#resultBody");
const newStoreButton = document.querySelector("#newStoreButton");
const allProductsButton = document.querySelector("#allProductsButton");
const exportInventoryTextButton = document.querySelector("#exportInventoryTextButton");
const storeList = document.querySelector("#storeList");
const storeArea = document.querySelector(".store-area");
const workspace = document.querySelector(".workspace");
const storeEditor = document.querySelector("#storeEditor");
const storeEditorTitle = document.querySelector("#storeEditorTitle");
const storeNameInput = document.querySelector("#storeNameInput");
const storeProductRows = document.querySelector("#storeProductRows");
const addStoreProductButton = document.querySelector("#addStoreProductButton");
const deleteStoreFromEditorButton = document.querySelector("#deleteStoreFromEditorButton");
const saveStoreButton = document.querySelector("#saveStoreButton");
const cancelStoreButton = document.querySelector("#cancelStoreButton");
const deleteConfirmModal = document.querySelector("#deleteConfirmModal");
const deleteConfirmText = document.querySelector("#deleteConfirmText");
const cancelDeleteStoreButton = document.querySelector("#cancelDeleteStoreButton");
const confirmDeleteStoreButton = document.querySelector("#confirmDeleteStoreButton");
const restockModal = document.querySelector("#restockModal");
const restockList = document.querySelector("#restockList");
const restockMuteCheckbox = document.querySelector("#restockMuteCheckbox");
const closeRestockButton = document.querySelector("#closeRestockButton");

const STORE_KEY = "inventory-tool-store-settings-v1";
const DATA_KEY = "inventory-tool-parsed-data-v1";
const STORE_BACKUP_KEY = "inventory-tool-store-settings-backup-v1";
const RESTOCK_MUTE_KEY = "inventory-tool-restock-muted-until-v1";
const LOW_STOCK_THRESHOLD = 200;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const headlineBlessings = [
  "愿今天的努力，都变成明天的底气",
  "稳稳当当地做好每一天，答案会慢慢出现",
  "愿你眼里有光，手里有数，心里有方向",
  "把小事做好，日子就会一点点变好",
  "今天也要顺顺利利，清清爽爽地往前走",
  "愿每一份认真，都能开出漂亮的结果",
  "慢慢来，比较快；稳稳做，走得远",
  "愿你所做皆有回响，所行皆有收获",
  "保持热爱，也保持清醒",
  "好运藏在认真做事的每一个瞬间",
];

const fieldLabels = {
  date: "日期",
  product: "商品名称",
  case_qty: "整件数量",
  bottle_qty: "单瓶数量",
  stock_qty: "库存数量",
  box_size: "箱规",
};

const columnAliases = {
  date: [
    "日期",
    "时间",
    "业务日期",
    "单据日期",
    "库存日期",
    "统计日期",
    "入库日期",
    "出库日期",
    "订单日期",
    "创建日期",
  ],
  product: [
    "商品名称",
    "商品名",
    "商品",
    "产品名称",
    "产品名",
    "品名",
    "货品名称",
    "物料名称",
    "名称",
  ],
  case_qty: [
    "整件数量",
    "整件",
    "整箱数量",
    "整箱",
    "库存件数",
    "件数",
    "箱数",
    "件",
    "箱",
  ],
  bottle_qty: [
    "单瓶数量",
    "单瓶",
    "散瓶数量",
    "散瓶",
    "零瓶数量",
    "零瓶",
    "瓶数",
    "支数",
    "数量(瓶)",
    "数量（瓶）",
    "瓶",
  ],
  stock_qty: ["剩余库存", "库存数量", "当前库存", "库存", "结存", "期末库存", "可用库存"],
  box_size: [
    "箱规",
    "包装规格",
    "规格",
    "件装",
    "箱装",
    "装箱数",
    "每箱数量",
    "每箱瓶数",
    "瓶/箱",
    "瓶每箱",
  ],
};

let parsedData = null;
let currentSummary = [];
let editingStoreId = null;
let deleteTargetStoreId = null;
let draggedStoreId = null;
let draggedStoreCard = null;
let storeDragPointerId = null;
let storeDragStartX = 0;
let storeDragStartY = 0;
let hasStoreDragMoved = false;
let suppressStoreClick = false;
let storeState = loadStoreState();

const numberFormatter = new Intl.NumberFormat("zh-CN", {
  maximumFractionDigits: 2,
});

const moneyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 2,
});

function setStatus(text, mode = "") {
  statusPill.textContent = text;
  statusPill.className = `status-pill ${mode}`.trim();
}

function setRandomHeadline() {
  if (!headlineText) return;

  const index = Math.floor(Math.random() * headlineBlessings.length);
  headlineText.textContent = headlineBlessings[index];
}

function formatNumber(value) {
  const rounded = Math.abs(value) < 0.0000001 ? 0 : value;
  return numberFormatter.format(rounded);
}

function formatSignedNumber(value) {
  const rounded = Math.abs(value) < 0.0000001 ? 0 : value;
  return `${rounded > 0 ? "+" : ""}${formatNumber(rounded)}`;
}

function formatMoney(value) {
  if (!Number.isFinite(value)) return "-";
  const rounded = Math.abs(value) < 0.0000001 ? 0 : value;
  return moneyFormatter.format(rounded);
}

function getTodayDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPreviousDateKey(dateKey) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey || "");
  if (!match) return "";

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  date.setDate(date.getDate() - 1);

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function makeId() {
  return `store-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeProductName(value) {
  return String(value || "")
    .replace(/[/／]\s*瓶$/g, "")
    .replace(/[()\[\]（）【】\s_\-—,，.。:：;；、/／\\*×xX]/g, "")
    .replace(/[味汁]$/g, "")
    .toLowerCase();
}

function parseUnitPrice(value) {
  const normalized = String(value ?? "").replace(/[￥¥,\s]/g, "");
  if (!normalized) return null;
  const price = Number(normalized);
  return Number.isFinite(price) && price >= 0 ? price : null;
}

function getProductName(product) {
  return typeof product === "string" ? product : String(product?.name || "");
}

function getProductPrice(product) {
  if (!product || typeof product === "string") return null;
  return parseUnitPrice(product.price);
}

function parseProductKeywords(value) {
  const rawItems = Array.isArray(value)
    ? value
    : String(value ?? "")
        .split(/[,，;；\n\r]+/)
        .filter(Boolean);
  const keywordsByKey = new Map();

  rawItems.forEach((item) => {
    const keyword = String(item || "").trim();
    if (!keyword) return;
    const key = normalizeProductName(keyword) || keyword.toLowerCase();
    if (!key || keywordsByKey.has(key)) return;
    keywordsByKey.set(key, keyword);
  });

  return [...keywordsByKey.values()];
}

function getProductKeywords(product) {
  if (!product || typeof product === "string") return [];
  return parseProductKeywords(
    product.keywords ?? product.aliases ?? product.alias ?? product.matchKeywords ?? [],
  );
}

function mergeProductKeywords(...keywordGroups) {
  return parseProductKeywords(keywordGroups.flatMap((group) => parseProductKeywords(group)));
}

function getProductMatchTokens(product) {
  return mergeProductKeywords([getProductName(product)], getProductKeywords(product));
}

function normalizeProductEntries(products) {
  const productsByKey = new Map();

  for (const product of products) {
    const name = getProductName(product).trim();
    if (!name) continue;

    const key = normalizeProductName(name) || name;
    const price = getProductPrice(product);
    const keywords = getProductKeywords(product);
    const existing = productsByKey.get(key);

    productsByKey.set(key, {
      name: existing?.name || name,
      price: price ?? existing?.price ?? null,
      keywords: mergeProductKeywords(existing?.keywords || [], keywords),
    });
  }

  return [...productsByKey.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "zh-Hans-CN"),
  );
}

function getProductMatchScore(configuredProduct, actualProduct) {
  const actual = normalizeProductName(actualProduct);
  if (!actual) return 0;

  return getProductMatchTokens(configuredProduct).reduce((bestScore, token) => {
    const configured = normalizeProductName(token);
    if (!configured) return bestScore;

    if (actual === configured) {
      return Math.max(bestScore, 10000 + configured.length);
    }
    if (actual.includes(configured)) {
      return Math.max(bestScore, 5000 + configured.length);
    }
    if (configured.includes(actual)) {
      return Math.max(bestScore, 1000 + actual.length);
    }

    return bestScore;
  }, 0);
}

function productMatches(configuredProduct, actualProduct) {
  return getProductMatchScore(configuredProduct, actualProduct) > 0;
}

function resolveConfiguredProductFromProducts(products, actualProduct) {
  if (!products?.length) return null;

  return products.reduce(
    (best, product) => {
      const score = getProductMatchScore(product, actualProduct);
      if (score <= best.score) return best;
      return { product, score };
    },
    { product: null, score: 0 },
  ).product;
}

function resolveConfiguredProduct(store, actualProduct) {
  return resolveConfiguredProductFromProducts(store?.products || [], actualProduct);
}

function parseJsonFromStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeStoreState(saved = {}) {
  const selectedStoreId = saved.selectedStoreId || "";
  const storesByName = new Map();
  const rawStores = Array.isArray(saved.stores) ? saved.stores : [];

  for (const rawStore of rawStores) {
    const store = {
      id: rawStore.id || makeId(),
      name: String(rawStore.name || "").trim(),
      products: normalizeProductEntries(
        Array.isArray(rawStore.products) ? rawStore.products : [],
      ),
    };
    if (!store.name) continue;

    const existing = storesByName.get(store.name);
    if (existing) {
      existing.products = normalizeProductEntries([...existing.products, ...store.products]);
      if (store.id === selectedStoreId) {
        existing.id = store.id;
      }
    } else {
      storesByName.set(store.name, store);
    }
  }

  const stores = [...storesByName.values()];
  return {
    selectedStoreId: stores.some((store) => store.id === selectedStoreId) ? selectedStoreId : "",
    stores,
  };
}

function loadStoreState() {
  const saved = parseJsonFromStorage(STORE_KEY, null);
  const backup = parseJsonFromStorage(STORE_BACKUP_KEY, null);
  const normalized = normalizeStoreState(saved || {});

  if (normalized.stores.length || !backup) return normalized;
  return normalizeStoreState(backup);
}

function saveStoreState() {
  const serialized = JSON.stringify(storeState);
  localStorage.setItem(STORE_KEY, serialized);
  localStorage.setItem(STORE_BACKUP_KEY, serialized);
}

function getStoreById(storeId) {
  return storeState.stores.find((store) => store.id === storeId) || null;
}

function getCurrentStore() {
  return getStoreById(storeState.selectedStoreId);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeLabel(value) {
  return String(value ?? "")
    .replace(/[\s_\-:：/\\（）()\[\]【】,，.。]+/g, "")
    .toLowerCase();
}

function isEmptyRow(row) {
  return row.every((value) => value === null || value === undefined || String(value).trim() === "");
}

function aliasScore(header, aliases) {
  const label = normalizeLabel(header);
  if (!label) return 0;

  let best = 0;
  aliases.forEach((alias, index) => {
    const normalizedAlias = normalizeLabel(alias);
    if (label === normalizedAlias) {
      best = Math.max(best, 1000 - index);
    } else if (normalizedAlias && label.includes(normalizedAlias)) {
      best = Math.max(best, 500 - index);
    }
  });
  return best;
}

function detectColumns(headers) {
  const detected = {};
  const scores = {};
  const usedIndexes = new Set();

  for (const [field, aliases] of Object.entries(columnAliases)) {
    const candidates = [];
    headers.forEach((header, index) => {
      if (usedIndexes.has(index)) return;

      const score = aliasScore(header, aliases);
      if (score) candidates.push({ score, index });
    });

    if (candidates.length) {
      candidates.sort((a, b) => b.score - a.score || a.index - b.index);
      detected[field] = candidates[0].index;
      scores[field] = candidates[0].score;
      usedIndexes.add(candidates[0].index);
    } else {
      detected[field] = null;
      scores[field] = 0;
    }
  }

  return { detected, scores };
}

function findHeaderRow(rows) {
  const candidates = rows.slice(0, Math.min(30, rows.length));
  let bestIndex = -1;
  let bestHeaders = [];
  let bestDetected = {};
  let bestHits = -1;
  let bestScore = -1;

  candidates.forEach((row, index) => {
    if (isEmptyRow(row)) return;

    const { detected, scores } = detectColumns(row);
    const hits = Object.values(detected).filter((column) => column !== null).length;
    const scoreTotal = Object.values(scores).reduce((sum, score) => sum + score, 0);

    if (hits > bestHits || (hits === bestHits && scoreTotal > bestScore)) {
      bestIndex = index;
      bestHeaders = row;
      bestDetected = detected;
      bestHits = hits;
      bestScore = scoreTotal;
    }
  });

  if (bestIndex < 0 || bestHits < 2) {
    throw new Error("没有识别到表头。请确认表格包含日期、商品名称、整件数量、单瓶数量、箱规等列。");
  }

  return { headerIndex: bestIndex, headers: bestHeaders, detected: bestDetected };
}

function formatDateKeyFromDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseExcelSerialDate(value) {
  const serial = Number(value);
  if (!Number.isFinite(serial) || serial <= 0) return null;

  const utcMs = Math.round((serial - 25569) * 86400 * 1000);
  const date = new Date(utcMs);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateValue(value) {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) return formatDateKeyFromDate(value);
  if (typeof value === "number") return parseExcelSerialDate(value);

  let text = String(value).trim();
  if (!text) return null;

  text = text
    .replace(/\s+/g, " ")
    .replaceAll("年", "-")
    .replaceAll("月", "-")
    .replaceAll("日", "")
    .replace(/[./]/g, "-");

  const matchedDate = text.match(/(\d{4}-\d{1,2}-\d{1,2})/);
  if (matchedDate) text = matchedDate[1];

  let match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) {
    const compact = text.replace(/\D/g, "").match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compact) match = compact;
  }

  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseNumber(value, defaultValue = 0) {
  if (value === null || value === undefined || value === "") return defaultValue;
  if (typeof value === "boolean") return Number(value);
  if (typeof value === "number") return Number.isNaN(value) ? defaultValue : value;

  const text = String(value).trim().replaceAll(",", "");
  if (!text) return defaultValue;

  const match = text.match(/-?\d+(?:\.\d+)?/);
  if (!match) return defaultValue;

  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

function parseBoxSize(value) {
  if (value === null || value === undefined || value === "") return 1;
  if (typeof value === "number" && value > 0) return value;

  const numbers = String(value).trim().replaceAll(",", "").match(/\d+(?:\.\d+)?/g);
  if (!numbers) return 1;

  for (const rawNumber of numbers.reverse()) {
    const number = Number(rawNumber);
    if (number > 0) return number;
  }
  return 1;
}

function cell(row, index) {
  if (index === null || index === undefined || index >= row.length) return null;
  return row[index];
}

function normalizeProductUnit(product) {
  const text = String(product || "").trim();
  const bottlePatterns = [/\s*[/／]\s*瓶\s*$/, /\s*[（(]\s*瓶\s*[）)]\s*$/, /\s*[-_]\s*瓶\s*$/];

  for (const pattern of bottlePatterns) {
    if (pattern.test(text)) {
      return { product: text.replace(pattern, "").trim(), unitType: "bottle" };
    }
  }

  return { product: text, unitType: "case" };
}

function detectMovementColumns(headers, detected) {
  const skippedIndexes = new Set(Object.values(detected).filter((index) => index !== null));
  const movementColumns = [];
  const customerReturnKeywords = ["客退", "退货", "退回", "退库", "退仓", "退件"];
  const surplusReturnKeywords = ["多货实退", "多货退货", "多货退", "实退"];
  const outboundKeywords = [
    "出库",
    "出货",
    "补货",
    "夜补",
    "正转残",
    "发货",
    "送货",
    "配送",
    "售出",
    "调货",
    "调拨",
    "报损",
    "破损出库",
  ];
  const fallbackOutboundKeywords = ["销售"];
  const excludedKeywords = ["总数", "合计", "小计", "费用", "费", "库存", "备注"];

  headers.forEach((header, index) => {
    if (skippedIndexes.has(index)) return;

    const label = String(header ?? "").trim();
    const normalized = normalizeLabel(label);
    if (!normalized || excludedKeywords.some((keyword) => normalized.includes(keyword))) return;

    if (surplusReturnKeywords.some((keyword) => normalized.includes(keyword))) {
      movementColumns.push({ index, label, kind: "surplus_return", sign: 1 });
    } else if (customerReturnKeywords.some((keyword) => normalized.includes(keyword))) {
      movementColumns.push({ index, label, kind: "customer_return", sign: 1 });
    } else if (outboundKeywords.some((keyword) => normalized.includes(keyword))) {
      movementColumns.push({ index, label, kind: "outbound", sign: -1, priority: 2 });
    } else if (fallbackOutboundKeywords.some((keyword) => normalized.includes(keyword))) {
      movementColumns.push({ index, label, kind: "outbound", sign: -1, priority: 1 });
    }
  });

  const hasExplicitOutbound = movementColumns.some(
    (column) => column.kind === "outbound" && column.priority > 1,
  );

  return hasExplicitOutbound
    ? movementColumns.filter((column) => column.kind !== "outbound" || column.priority > 1)
    : movementColumns;
}

function convertMovementQuantity(value, unitType, boxSize) {
  const quantity = Math.abs(parseNumber(value));
  if (!quantity) return 0;
  if (unitType === "bottle") return boxSize ? quantity / boxSize : 0;
  return quantity;
}

function parseCsvText(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value.replace(/\r$/, ""));
  if (row.some((cellValue) => cellValue !== "") || rows.length) rows.push(row);
  return rows;
}

function readCsvRows(arrayBuffer) {
  let text = "";
  const encodings = ["utf-8", "gb18030", "utf-16le"];

  for (const encoding of encodings) {
    try {
      text = new TextDecoder(encoding, { fatal: true }).decode(arrayBuffer);
      break;
    } catch {
      text = "";
    }
  }

  if (!text) throw new Error("CSV 编码无法识别。");

  const rows = parseCsvText(text.replace(/^\ufeff/, ""));
  if (rows.length < 2) throw new Error("CSV 里没有足够的数据行。");
  return { sheetName: "CSV", sheetNames: ["CSV"], rows };
}

function readXlsxTables(arrayBuffer) {
  if (!window.XLSX) {
    throw new Error("缺少离线 Excel 解析库，请确认 vendor/xlsx.full.min.js 和 index.html 在同一工具文件夹内。");
  }

  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array", cellDates: false });
  const sheetNames = workbook.SheetNames || [];
  const tables = [];

  for (const sheetName of sheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) continue;
    const rows = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: true,
      defval: null,
      blankrows: true,
    });
    const meaningfulCount = rows.filter((row) => !isEmptyRow(row)).length;
    if (meaningfulCount > 1) {
      tables.push({ sheetName, sheetNames, rows });
    }
  }

  if (!tables.length) throw new Error("这个 Excel 里没有可读取的数据行。");
  return tables;
}

function parseTableRows(filename, table) {
  const { headerIndex, headers, detected } = findHeaderRow(table.rows);
  const movementColumns = detectMovementColumns(headers, detected);
  const dataRows = table.rows.slice(headerIndex + 1);
  const hasDirectQuantity = detected.case_qty !== null || detected.bottle_qty !== null;
  const hasSplitStock = detected.stock_qty !== null;
  const quantityMode = hasDirectQuantity ? "direct" : "split_stock";

  if (!hasDirectQuantity && !hasSplitStock) {
    throw new Error("没有识别到库存数量列。请确认表格包含整件/单瓶数量列，或包含“剩余库存/库存”列。");
  }

  const requiredFields =
    quantityMode === "direct"
      ? ["date", "product", "box_size", "case_qty", "bottle_qty"]
      : ["date", "product", "stock_qty"];
  const missingColumns = requiredFields
    .filter((field) => detected[field] === null)
    .map((field) => fieldLabels[field]);
  const normalizedRows = [];
  let skippedRows = 0;
  let currentDate = null;

  dataRows.forEach((row, rowIndex) => {
    if (isEmptyRow(row)) return;

    const parsedDate = parseDateValue(cell(row, detected.date));
    if (parsedDate) currentDate = parsedDate;

    const rowDate = parsedDate || currentDate;
    const rawProduct = String(cell(row, detected.product) ?? "").trim();
    if (!rowDate || !rawProduct) {
      skippedRows += 1;
      return;
    }

    const { product, unitType } = normalizeProductUnit(rawProduct);
    const boxSize = parseBoxSize(cell(row, detected.box_size));
    let caseQty = 0;
    let bottleQty = 0;

    if (quantityMode === "split_stock") {
      const stockQty = parseNumber(cell(row, detected.stock_qty));
      caseQty = unitType === "case" ? stockQty : 0;
      bottleQty = unitType === "bottle" ? stockQty : 0;
    } else {
      caseQty = parseNumber(cell(row, detected.case_qty));
      bottleQty = parseNumber(cell(row, detected.bottle_qty));
    }

    const totalQty = caseQty + (boxSize ? bottleQty / boxSize : 0);
    let outboundQty = 0;
    let returnQty = 0;
    let outboundCaseQty = 0;
    let outboundBottleQty = 0;
    let customerReturnQty = 0;
    let customerReturnCaseQty = 0;
    let customerReturnBottleQty = 0;
    let surplusReturnQty = 0;
    let surplusReturnCaseQty = 0;
    let surplusReturnBottleQty = 0;

    for (const movementColumn of movementColumns) {
      const rawMovementQty = Math.abs(parseNumber(cell(row, movementColumn.index)));
      const movementQty = convertMovementQuantity(rawMovementQty, unitType, boxSize);

      if (movementColumn.kind === "customer_return") {
        customerReturnQty += movementQty;
        returnQty += movementQty;
        if (unitType === "bottle") customerReturnBottleQty += rawMovementQty;
        else customerReturnCaseQty += rawMovementQty;
      } else if (movementColumn.kind === "surplus_return") {
        surplusReturnQty += movementQty;
        returnQty += movementQty;
        if (unitType === "bottle") surplusReturnBottleQty += rawMovementQty;
        else surplusReturnCaseQty += rawMovementQty;
      } else {
        outboundQty += movementQty;
        if (unitType === "bottle") outboundBottleQty += rawMovementQty;
        else outboundCaseQty += rawMovementQty;
      }
    }

    normalizedRows.push({
      sourceRow: headerIndex + rowIndex + 2,
      date: rowDate,
      product,
      caseQty,
      bottleQty,
      boxSize,
      totalQty,
      outboundQty,
      outboundCaseQty,
      outboundBottleQty,
      returnQty,
      customerReturnQty,
      customerReturnCaseQty,
      customerReturnBottleQty,
      surplusReturnQty,
      surplusReturnCaseQty,
      surplusReturnBottleQty,
      changeQty: returnQty - outboundQty,
    });
  });

  if (!normalizedRows.length) {
    throw new Error("没有可统计的数据。请检查日期和商品名称列是否有内容。");
  }

  const detectedColumns = Object.fromEntries(
    Object.entries(detected).map(([field, index]) => [
      field,
      index !== null && index < headers.length ? String(headers[index]).trim() : null,
    ]),
  );
  const dates = [...new Set(normalizedRows.map((row) => row.date))].sort();

  return {
    filename,
    sheetName: table.sheetName,
    sheetNames: table.sheetNames,
    headerRow: headerIndex + 1,
    detectedColumns,
    quantityMode,
    missingColumns,
    movementColumns: movementColumns.map((column) => ({
      label: column.label,
      kind: column.kind,
    })),
    rowCount: normalizedRows.length,
    skippedRows,
    dates,
    rows: normalizedRows,
  };
}

function readFileTables(filename, arrayBuffer) {
  const suffix = filename.slice(filename.lastIndexOf(".")).toLowerCase();

  if ([".xlsx", ".xlsm", ".xltx", ".xltm"].includes(suffix)) {
    return readXlsxTables(arrayBuffer);
  }

  if (suffix === ".csv") {
    return [readCsvRows(arrayBuffer)];
  }

  if (suffix === ".xls") {
    throw new Error("暂不支持旧版 .xls，请另存为 .xlsx 或 .csv 后再上传。");
  }

  throw new Error("请上传 .xlsx、.xlsm 或 .csv 文件。");
}

function parseTable(filename, arrayBuffer) {
  const readableTables = readFileTables(filename, arrayBuffer);
  const parsedTables = [];
  const failedFiles = [];

  readableTables.forEach((table) => {
    try {
      parsedTables.push(parseTableRows(filename, table));
    } catch (error) {
      failedFiles.push({
        filename: `${filename} / ${table.sheetName || "未命名分页"}`,
        message: error.message || "解析失败",
      });
    }
  });

  if (!parsedTables.length) {
    throw new Error(
      failedFiles.length
        ? failedFiles.map((file) => `${file.filename}：${file.message}`).join("；")
        : "没有可统计的数据。",
    );
  }

  return { tables: parsedTables, failedFiles };
}

function makeSourceId(index = 0) {
  return `source-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`;
}

function makeLegacySourceId(source, index = 0) {
  const filename = normalizeLabel(source?.filename || "file");
  const sheetName = normalizeLabel(source?.sheetName || "sheet");
  return `legacy-${index}-${filename}-${sheetName}`;
}

function buildSourceFromTable(table, index = 0) {
  return {
    id: table.sourceId || makeSourceId(index),
    filename: table.filename,
    sheetName: table.sheetName,
    sheetNames: table.sheetNames || [],
    headerRow: table.headerRow,
    rowCount: table.rowCount,
    skippedRows: table.skippedRows || 0,
    missingColumns: table.missingColumns || [],
    detectedColumns: table.detectedColumns || null,
    quantityMode: table.quantityMode || "",
    movementColumns: table.movementColumns || [],
  };
}

function getUniqueMovementColumns(tables) {
  const byKey = new Map();

  tables.forEach((table) => {
    (table.movementColumns || []).forEach((column) => {
      const key = `${column.kind}:${column.label}`;
      if (!byKey.has(key)) {
        byKey.set(key, { label: column.label, kind: column.kind });
      }
    });
  });

  return [...byKey.values()];
}

function combineParsedTables(tables, failedFiles = []) {
  const sources = tables.map((table, index) => buildSourceFromTable(table, index));
  const rows = tables.flatMap((table, index) => {
    const source = sources[index];
    return table.rows.map((row) => ({
      ...row,
      sourceId: row.sourceId || source.id,
      sourceFile: table.filename,
      sourceSheet: table.sheetName,
    }));
  });
  const dates = [...new Set(rows.map((row) => row.date))].sort();

  if (tables.length === 1) {
    return {
      ...tables[0],
      sources,
      failedFiles,
      rows,
      rowCount: rows.length,
      dates,
    };
  }

  return rebuildParsedDataFromSources(sources, rows, {
    failedFiles,
  });
}

function normalizeParsedDataSources(data) {
  if (!isValidParsedData(data)) return null;

  const sourceList = Array.isArray(data.sources) && data.sources.length
    ? data.sources
    : [
        {
          filename: data.filename || "已上传数据",
          sheetName: data.sheetName || "-",
          sheetNames: data.sheetNames || [],
          headerRow: data.headerRow || null,
          rowCount: data.rowCount || data.rows.length,
          skippedRows: data.skippedRows || 0,
          missingColumns: data.missingColumns || [],
          detectedColumns: data.detectedColumns || null,
          quantityMode: data.quantityMode || "",
          movementColumns: data.movementColumns || [],
        },
      ];
  const sources = sourceList.map((source, index) => ({
    id: source.id || makeLegacySourceId(source, index),
    filename: source.filename || data.filename || "已上传数据",
    sheetName: source.sheetName || data.sheetName || "-",
    sheetNames: source.sheetNames || data.sheetNames || [],
    headerRow: source.headerRow || data.headerRow || null,
    rowCount: source.rowCount || 0,
    skippedRows: source.skippedRows || 0,
    missingColumns: source.missingColumns || [],
    detectedColumns: source.detectedColumns || data.detectedColumns || null,
    quantityMode: source.quantityMode || data.quantityMode || "",
    movementColumns: source.movementColumns || data.movementColumns || [],
  }));
  const fallbackSource = sources[0];
  const sourceByFileSheet = new Map(
    sources.map((source) => [`${source.filename}::${source.sheetName}`, source]),
  );
  const rows = data.rows.map((row) => {
    const matchedSource =
      sources.find((source) => source.id === row.sourceId) ||
      sourceByFileSheet.get(`${row.sourceFile || data.filename}::${row.sourceSheet || data.sheetName}`) ||
      fallbackSource;

    return {
      ...row,
      sourceId: row.sourceId || matchedSource?.id || "",
      sourceFile: row.sourceFile || matchedSource?.filename || data.filename || "",
      sourceSheet: row.sourceSheet || matchedSource?.sheetName || data.sheetName || "",
    };
  });

  sources.forEach((source) => {
    source.rowCount = rows.filter((row) => row.sourceId === source.id).length || source.rowCount || 0;
  });

  return rebuildParsedDataFromSources(sources, rows, {
    failedFiles: data.failedFiles || [],
  });
}

function rebuildParsedDataFromSources(sources, rows, options = {}) {
  const normalizedSources = sources.map((source, index) => ({
    ...source,
    id: source.id || makeLegacySourceId(source, index),
    rowCount: rows.filter((row) => row.sourceId === (source.id || makeLegacySourceId(source, index))).length ||
      source.rowCount ||
      0,
  }));
  const dates = [...new Set(rows.map((row) => row.date))].sort();

  if (normalizedSources.length === 1) {
    const source = normalizedSources[0];
    return {
      filename: source.filename,
      sheetName: source.sheetName,
      sheetNames: source.sheetNames || [source.sheetName],
      headerRow: source.headerRow,
      detectedColumns: source.detectedColumns || null,
      quantityMode: source.quantityMode || "",
      missingColumns: source.missingColumns || [],
      movementColumns: source.movementColumns || [],
      rowCount: rows.length,
      skippedRows: source.skippedRows || 0,
      dates,
      rows,
      sources: normalizedSources,
      failedFiles: options.failedFiles || [],
    };
  }

  return {
    filename: `${normalizedSources.length} 个数据源表`,
    sheetName: `已读取 ${normalizedSources.length} 个数据源表`,
    sheetNames: normalizedSources.flatMap((source) => source.sheetNames || [source.sheetName]),
    headerRow: null,
    detectedColumns: null,
    quantityMode: "mixed",
    missingColumns: [...new Set(normalizedSources.flatMap((source) => source.missingColumns || []))],
    movementColumns: getUniqueMovementColumns(normalizedSources),
    rowCount: rows.length,
    skippedRows: normalizedSources.reduce((sum, source) => sum + (source.skippedRows || 0), 0),
    dates,
    rows,
    sources: normalizedSources,
    failedFiles: options.failedFiles || [],
  };
}

function mergeParsedData(existingData, appendedData) {
  const existing = normalizeParsedDataSources(existingData);
  const appended = normalizeParsedDataSources(appendedData);

  if (!existing) return appended;
  if (!appended) return existing;

  return rebuildParsedDataFromSources(
    [...existing.sources, ...appended.sources],
    [...existing.rows, ...appended.rows],
    {
      failedFiles: appended.failedFiles || [],
    },
  );
}

function deleteSourceTable(sourceId) {
  if (!parsedData || !sourceId) return;

  const normalized = normalizeParsedDataSources(parsedData);
  const nextSources = normalized.sources.filter((source) => source.id !== sourceId);

  if (!nextSources.length) {
    localStorage.removeItem(DATA_KEY);
    fileInput.value = "";
    fileName.textContent = "未选择文件";
    setStatus("等待上传");
    resetResult("已删除全部数据源表");
    return;
  }

  const allowedSourceIds = new Set(nextSources.map((source) => source.id));
  const nextRows = normalized.rows.filter((row) => allowedSourceIds.has(row.sourceId));
  const nextData = rebuildParsedDataFromSources(nextSources, nextRows, {
    failedFiles: [],
  });
  const selectedDate = nextData.dates.includes(dateSelect.value) ? dateSelect.value : "";

  renderParsedData(nextData, { selectedDate });
}

function renderSourceTableList(data = parsedData) {
  if (!sourceTableList) return;

  const normalized = normalizeParsedDataSources(data);
  if (!normalized?.sources?.length) {
    sourceTableList.innerHTML = `<p class="empty-note">暂无数据源表</p>`;
    return;
  }

  sourceTableList.innerHTML = normalized.sources
    .map(
      (source) => `<div class="source-table-item" data-source-id="${escapeHtml(source.id)}">
        <div>
          <strong>${escapeHtml(source.filename)}</strong>
          <span>${escapeHtml(source.sheetName || "-")} · ${formatNumber(source.rowCount || 0)} 行</span>
        </div>
        <button class="row-remove-button source-delete-button" type="button" data-delete-source="${escapeHtml(
          source.id,
        )}" title="删除该表" aria-label="删除该表">-</button>
      </div>`,
    )
    .join("");
}

function isValidParsedData(data) {
  return Boolean(
    data &&
      Array.isArray(data.rows) &&
      Array.isArray(data.dates) &&
      typeof data.rowCount === "number",
  );
}

function loadPersistedParsedData() {
  const saved = parseJsonFromStorage(DATA_KEY, null);
  const data = saved?.data;

  if (!isValidParsedData(data)) {
    return null;
  }

  return {
    data,
    selectedDate: saved.selectedDate || "",
  };
}

function savePersistedParsedData(data, selectedDate = "") {
  if (!isValidParsedData(data)) return "";

  try {
    localStorage.setItem(
      DATA_KEY,
      JSON.stringify({
        savedAt: new Date().toISOString(),
        selectedDate,
        data,
      }),
    );
    return "";
  } catch {
    return "当前数据较大，浏览器本地存储空间不足，本次刷新后可能无法自动恢复上传数据。";
  }
}

function formatParsedDataFileText(data) {
  const sources = Array.isArray(data?.sources) ? data.sources : [];

  if (sources.length > 1) {
    return `${sources.length} 个数据源表：${sources
      .map((source) => `${source.filename}/${source.sheetName || "-"}`)
      .join("、")}`;
  }

  return sources[0]?.filename || data?.filename || "已恢复上次上传数据";
}

function appendWarningText(message) {
  if (!message) return;

  const existing = warningText.hidden ? "" : warningText.textContent;
  warningText.textContent = existing ? `${existing}${message}` : message;
  warningText.hidden = false;
}

function resetResult(message = "上传表格后显示统计结果") {
  parsedData = null;
  currentSummary = [];
  dateSelect.disabled = true;
  dateSelect.innerHTML = "<option>先上传文件</option>";
  sheetName.textContent = "-";
  headerRow.textContent = "-";
  columnMatch.textContent = "-";
  warningText.hidden = true;
  warningText.textContent = "";
  productCount.textContent = "0";
  rowCount.textContent = "0";
  totalCount.textContent = "0";
  inventoryValue.textContent = "-";
  resultBody.innerHTML = `<tr><td colspan="8" class="empty-cell">${message}</td></tr>`;
  renderSourceTableList(null);
  renderStoreList();
}

function summarizeRows(rows) {
  const grouped = new Map();

  for (const row of rows) {
    const key = row.product || "(未命名商品)";
    if (!grouped.has(key)) {
      grouped.set(key, {
        product: key,
        caseQty: 0,
        bottleQty: 0,
        totalQty: 0,
        outboundQty: 0,
        outboundCaseQty: 0,
        outboundBottleQty: 0,
        returnQty: 0,
        customerReturnQty: 0,
        customerReturnCaseQty: 0,
        customerReturnBottleQty: 0,
        surplusReturnQty: 0,
        surplusReturnCaseQty: 0,
        surplusReturnBottleQty: 0,
        changeQty: 0,
        rows: 0,
        boxSizes: new Set(),
      });
    }

    const item = grouped.get(key);
    item.caseQty += row.caseQty || 0;
    item.bottleQty += row.bottleQty || 0;
    item.totalQty += row.totalQty || 0;
    item.outboundQty += row.outboundQty || 0;
    item.outboundCaseQty += row.outboundCaseQty || 0;
    item.outboundBottleQty += row.outboundBottleQty || 0;
    item.returnQty += row.returnQty || 0;
    item.customerReturnQty += row.customerReturnQty || 0;
    item.customerReturnCaseQty += row.customerReturnCaseQty || 0;
    item.customerReturnBottleQty += row.customerReturnBottleQty || 0;
    item.surplusReturnQty += row.surplusReturnQty || 0;
    item.surplusReturnCaseQty += row.surplusReturnCaseQty || 0;
    item.surplusReturnBottleQty += row.surplusReturnBottleQty || 0;
    item.changeQty += row.changeQty || 0;
    item.rows += 1;
    item.boxSizes.add(row.boxSize || 1);
  }

  return [...grouped.values()].sort((a, b) =>
    a.product.localeCompare(b.product, "zh-Hans-CN"),
  );
}

function getFilteredRows(selectedDate) {
  if (!parsedData) return [];
  const rows = parsedData.rows.filter((row) => row.date === selectedDate);
  const store = getCurrentStore();
  if (!store) return rows;

  return rows
    .map((row) => {
      const matchedProduct = resolveConfiguredProduct(store, row.product);
      return matchedProduct ? { ...row, product: getProductName(matchedProduct) } : null;
    })
    .filter(Boolean);
}

function getAllConfiguredProducts() {
  return storeState.stores.flatMap((store) => store.products || []);
}

function getPriceForSummaryProduct(store, actualProduct) {
  const product = store
    ? resolveConfiguredProduct(store, actualProduct)
    : resolveConfiguredProductFromProducts(getAllConfiguredProducts(), actualProduct);
  return getProductPrice(product);
}

function getSummaryInventoryValue(summary, store) {
  return summary.reduce(
    (result, item) => {
      const price = getPriceForSummaryProduct(store, item.product);
      if (price === null) return result;

      return {
        amount: result.amount + item.totalQty * price,
        pricedCount: result.pricedCount + 1,
      };
    },
    { amount: 0, pricedCount: 0 },
  );
}

function renderSummary() {
  if (!parsedData) return;

  const selectedDate = dateSelect.value;
  const store = getCurrentStore();
  const filteredRows = getFilteredRows(selectedDate);
  currentSummary = summarizeRows(filteredRows);
  const total = currentSummary.reduce((sum, item) => sum + item.totalQty, 0);
  const totalInventoryValue = getSummaryInventoryValue(currentSummary, store);

  productCount.textContent = formatNumber(currentSummary.length);
  rowCount.textContent = formatNumber(filteredRows.length);
  totalCount.textContent = formatNumber(total);
  inventoryValue.textContent = totalInventoryValue.pricedCount
    ? formatMoney(totalInventoryValue.amount)
    : "-";

  if (!currentSummary.length) {
    const message =
      store && store.products.length === 0
        ? "当前店铺还没有设置商品"
        : "当前条件没有数据";
    resultBody.innerHTML = `<tr><td colspan="8" class="empty-cell">${message}</td></tr>`;
    return;
  }

  resultBody.innerHTML = currentSummary
    .map((item) => {
      const boxSize =
        item.boxSizes.size === 1
          ? formatNumber([...item.boxSizes][0])
          : `多个(${[...item.boxSizes].map(formatNumber).join(" / ")})`;
      const price = getPriceForSummaryProduct(store, item.product);
      const value = price === null ? null : item.totalQty * price;
      return `<tr>
        <td>${escapeHtml(item.product)}</td>
        <td>${formatNumber(item.caseQty)}</td>
        <td>${formatNumber(item.bottleQty)}</td>
        <td>${boxSize}</td>
        <td>${formatNumber(item.totalQty)}</td>
        <td>${price === null ? "-" : formatMoney(price)}</td>
        <td>${value === null ? "-" : formatMoney(value)}</td>
        <td>${formatNumber(item.rows)}</td>
      </tr>`;
    })
    .join("");
}

function getProductInventoryForDate(product, dateKey) {
  if (!parsedData || !dateKey || dateSelect.disabled) return null;

  const rows = parsedData.rows.filter(
    (row) => row.date === dateKey && productMatches(product, row.product),
  );
  if (!rows.length) {
    return {
      caseQty: 0,
      bottleQty: 0,
      totalQty: 0,
    };
  }

  return summarizeRows(rows)[0];
}

function getProductInventory(product) {
  return getProductInventoryForDate(product, dateSelect.value);
}

function getRestockMutedUntil() {
  const timestamp = Number(localStorage.getItem(RESTOCK_MUTE_KEY) || 0);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function isRestockMuted() {
  const mutedUntil = getRestockMutedUntil();
  if (!mutedUntil) return false;

  if (Date.now() < mutedUntil) return true;
  localStorage.removeItem(RESTOCK_MUTE_KEY);
  return false;
}

function saveRestockMuteIfChecked() {
  if (!restockMuteCheckbox.checked) return;
  localStorage.setItem(RESTOCK_MUTE_KEY, String(Date.now() + ONE_DAY_MS));
}

function getLowStockProducts(dateKey = dateSelect.value) {
  if (!parsedData || !dateKey || dateSelect.disabled) return [];

  const items = [];
  storeState.stores.forEach((store) => {
    store.products.forEach((product) => {
      const inventory = getProductInventoryForDate(product, dateKey);
      if (!inventory || inventory.totalQty >= LOW_STOCK_THRESHOLD) return;

      items.push({
        storeName: store.name,
        productName: getProductName(product),
        caseQty: inventory.caseQty,
        bottleQty: inventory.bottleQty,
        totalQty: inventory.totalQty,
      });
    });
  });

  return items;
}

function openRestockModal() {
  if (isRestockMuted()) return;

  const items = getLowStockProducts();
  if (!items.length) return;

  restockList.innerHTML = items
    .map(
      (item) => `<div class="restock-item">
        <strong>${escapeHtml(item.storeName)} · ${escapeHtml(item.productName)}</strong>
        <span>当前库存 ${formatNumber(item.totalQty)}（整件 ${formatNumber(
          item.caseQty,
        )}，单瓶 ${formatNumber(item.bottleQty)}）</span>
      </div>`,
    )
    .join("");
  restockMuteCheckbox.checked = false;
  restockModal.hidden = false;
  closeRestockButton.focus();
}

function closeRestockModal() {
  saveRestockMuteIfChecked();
  restockModal.hidden = true;
  restockList.innerHTML = "";
  restockMuteCheckbox.checked = false;
}

function getProductMovement(product, dateKey) {
  if (!parsedData || !dateKey || dateSelect.disabled) return null;

  const rows = parsedData.rows.filter(
    (row) => row.date === dateKey && productMatches(product, row.product),
  );

  return rows.reduce(
    (summary, row) => ({
      outboundQty: summary.outboundQty + (row.outboundQty || 0),
      outboundCaseQty: summary.outboundCaseQty + (row.outboundCaseQty || 0),
      outboundBottleQty: summary.outboundBottleQty + (row.outboundBottleQty || 0),
      returnQty: summary.returnQty + (row.returnQty || 0),
      customerReturnQty: summary.customerReturnQty + (row.customerReturnQty || 0),
      customerReturnCaseQty: summary.customerReturnCaseQty + (row.customerReturnCaseQty || 0),
      customerReturnBottleQty:
        summary.customerReturnBottleQty + (row.customerReturnBottleQty || 0),
      surplusReturnQty: summary.surplusReturnQty + (row.surplusReturnQty || 0),
      surplusReturnCaseQty: summary.surplusReturnCaseQty + (row.surplusReturnCaseQty || 0),
      surplusReturnBottleQty:
        summary.surplusReturnBottleQty + (row.surplusReturnBottleQty || 0),
      changeQty: summary.changeQty + (row.changeQty || 0),
    }),
    {
      outboundQty: 0,
      outboundCaseQty: 0,
      outboundBottleQty: 0,
      returnQty: 0,
      customerReturnQty: 0,
      customerReturnCaseQty: 0,
      customerReturnBottleQty: 0,
      surplusReturnQty: 0,
      surplusReturnCaseQty: 0,
      surplusReturnBottleQty: 0,
      changeQty: 0,
    },
  );
}

function formatInventoryHtml(product) {
  const inventory = getProductInventory(product);
  if (!inventory) return "库存数量：待上传数据";
  const totalText = `库存数量：${formatNumber(inventory.totalQty)}`;
  const totalHtml =
    inventory.totalQty < 200 ? `<span class="danger-value">${totalText}</span>` : totalText;
  const bottleText = `单瓶 ${formatNumber(inventory.bottleQty)}`;
  const bottleHtml =
    inventory.bottleQty > 1000 ? `<span class="danger-value">${bottleText}</span>` : bottleText;
  return `${totalHtml}（整件 ${formatNumber(inventory.caseQty)}，${bottleHtml}）`;
}

function formatInventoryTextPlain(product) {
  const inventory = getProductInventory(product);
  if (!inventory) return "库存数量：待上传数据";
  return `库存数量：${formatNumber(inventory.totalQty)}（整件 ${formatNumber(
    inventory.caseQty,
  )}，单瓶 ${formatNumber(inventory.bottleQty)}）`;
}

function formatPriceText(product) {
  const price = getProductPrice(product);
  return price === null ? "单价：未设置" : `单价：${formatMoney(price)}`;
}

function formatProductKeywordsText(product) {
  const keywords = getProductKeywords(product);
  return keywords.length ? `关键词：${keywords.join("、")}` : "";
}

function formatInventoryValueText(product) {
  const price = getProductPrice(product);
  const inventory = getProductInventory(product);

  if (!inventory) return "库存价值：待上传数据";
  if (price === null) return "库存价值：未设置单价";
  return `库存价值：${formatMoney(inventory.totalQty * price)}`;
}

function formatStoreInventoryValueText(store) {
  if (!store.products.length) return "总价值：-";
  if (!parsedData || dateSelect.disabled) return "总价值：待上传数据";

  const summary = store.products.reduce(
    (result, product) => {
      const price = getProductPrice(product);
      const inventory = getProductInventory(product);
      if (price === null || !inventory) return result;

      return {
        amount: result.amount + inventory.totalQty * price,
        pricedCount: result.pricedCount + 1,
      };
    },
    { amount: 0, pricedCount: 0 },
  );

  return summary.pricedCount ? `总价值：${formatMoney(summary.amount)}` : "总价值：未设置单价";
}

function formatDayOverDayText(product) {
  if (!parsedData) return "较前日变化：待上传数据";

  const selectedDate = dateSelect.value;
  const previousDate = getPreviousDateKey(selectedDate);
  const currentInventory = getProductInventoryForDate(product, selectedDate);
  const previousInventory = getProductInventoryForDate(product, previousDate);

  if (!currentInventory || !previousInventory) return "较前日变化：无日期";
  if (!parsedData.dates.includes(previousDate)) return "较前日变化：前日无数据";

  return `较前日变化：${formatSignedNumber(
    currentInventory.totalQty - previousInventory.totalQty,
  )}`;
}

function formatOutboundText(product) {
  if (!parsedData) return "出库：待上传数据";
  if (!parsedData.movementColumns?.length) return "出库：未识别出库列";

  const movement = getProductMovement(product, dateSelect.value);
  if (!movement) return "出库：无日期";

  return `出库：整件出库 ${formatNumber(movement.outboundCaseQty)}，单瓶出库 ${formatNumber(
    movement.outboundBottleQty,
  )}`;
}

function formatReturnText(product) {
  if (!parsedData) return "退货：待上传数据";
  if (!parsedData.movementColumns?.length) return "退货：未识别退货列";

  const movement = getProductMovement(product, dateSelect.value);
  if (!movement) return "退货：无日期";

  return `退货：客退整件 ${formatNumber(
    movement.customerReturnCaseQty,
  )}，客退单瓶 ${formatNumber(
    movement.customerReturnBottleQty,
  )}；多货退货整件 ${formatNumber(
    movement.surplusReturnCaseQty,
  )}，多货退货单瓶 ${formatNumber(movement.surplusReturnBottleQty)}`;
}

function renderStoreProducts(store) {
  if (!store.products.length) {
    return `<p class="empty-note">暂无在售商品</p>`;
  }

  return store.products
    .map(
      (product) => {
        const keywordText = formatProductKeywordsText(product);
        return `<div class="store-product-row">
        <span class="product-name-cell">
          <strong>${escapeHtml(getProductName(product))}</strong>
          ${keywordText ? `<em>${escapeHtml(keywordText)}</em>` : ""}
        </span>
        <small>${escapeHtml(formatPriceText(product))}</small>
        <small>${formatInventoryHtml(product)}</small>
        <small>${escapeHtml(formatInventoryValueText(product))}</small>
        <small>${escapeHtml(formatDayOverDayText(product))}</small>
        <small>${escapeHtml(formatOutboundText(product))}</small>
        <small>${escapeHtml(formatReturnText(product))}</small>
      </div>`;
      },
    )
    .join("");
}

function renderStoreList() {
  const hasSelectedStore = storeState.stores.some(
    (store) => store.id === storeState.selectedStoreId,
  );
  if (!hasSelectedStore) {
    storeState.selectedStoreId = "";
  }

  allProductsButton.classList.toggle("is-active", !storeState.selectedStoreId);
  exportInventoryTextButton.disabled =
    !parsedData || !storeState.stores.some((store) => store.products.length);

  if (!storeState.stores.length) {
    storeList.innerHTML = `<p class="empty-note">暂无店铺</p>`;
    return;
  }

  storeList.innerHTML = storeState.stores
    .map(
      (store) => `<article class="store-card ${
        store.id === storeState.selectedStoreId ? "is-active" : ""
      }" data-store-id="${escapeHtml(store.id)}">
        <div class="store-card-header">
          <span class="store-drag-handle" aria-hidden="true"></span>
          <button class="store-select-button" type="button" data-select-store="${escapeHtml(
            store.id,
          )}">
            <strong>${escapeHtml(store.name)}</strong>
            <span>${store.products.length} 个商品 · <em class="store-total-value">${escapeHtml(
              formatStoreInventoryValueText(store),
            )}</em></span>
          </button>
          <button class="mini-edit-button" type="button" data-edit-store="${escapeHtml(
            store.id,
          )}">修改</button>
        </div>
        <div class="store-product-list">
          ${renderStoreProducts(store)}
        </div>
      </article>`,
    )
    .join("");
}

function getStoreOrderFromDom() {
  return [...storeList.querySelectorAll("[data-store-id]")]
    .map((card) => card.dataset.storeId)
    .filter(Boolean);
}

function reorderStoresByIds(storeIds) {
  if (storeIds.length !== storeState.stores.length) return false;

  const storesById = new Map(storeState.stores.map((store) => [store.id, store]));
  const reorderedStores = storeIds.map((storeId) => storesById.get(storeId)).filter(Boolean);
  if (reorderedStores.length !== storeState.stores.length) return false;

  const hasChanged = reorderedStores.some(
    (store, index) => store.id !== storeState.stores[index].id,
  );
  if (!hasChanged) return false;

  storeState.stores = reorderedStores;
  saveStoreState();
  return true;
}

function clearStoreDragClasses() {
  storeList.querySelectorAll(".store-card").forEach((card) => {
    card.classList.remove("is-dragging");
  });
}

function clearSelectedStore() {
  if (!storeState.selectedStoreId) return;

  storeState.selectedStoreId = "";
  saveStoreState();
  renderStoreList();
  renderSummary();
}

function isBlankStoreCancelTarget(target) {
  if (!(target instanceof Element)) return false;

  if (target.closest("[data-store-id], .modal-backdrop")) return false;
  if (target.closest("button, input, select, textarea, a, label")) return false;

  return [storeList, storeArea, workspace, document.body, document.documentElement].includes(target);
}

function getStoreDragCard(event) {
  const storeCard = event.target.closest("[data-store-id]");
  if (!storeCard || !storeList.contains(storeCard)) return null;

  if (event.target.closest("[data-edit-store]")) return null;
  if (event.target.closest(".store-drag-handle")) return storeCard;
  if (event.target.closest("button, input, select, textarea, a")) return null;

  return storeCard;
}

function placeDraggedStoreCard(clientX, clientY) {
  if (!draggedStoreCard) return;

  const element = document.elementFromPoint(clientX, clientY);
  const targetCard = element?.closest(".store-card:not(.is-dragging)");
  if (!targetCard || !storeList.contains(targetCard)) return;

  const targetRect = targetCard.getBoundingClientRect();
  const shouldPlaceAfter = clientY > targetRect.top + targetRect.height / 2;
  storeList.insertBefore(
    draggedStoreCard,
    shouldPlaceAfter ? targetCard.nextSibling : targetCard,
  );
}

function startStorePointerDrag(event) {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  const storeCard = getStoreDragCard(event);
  if (!storeCard) return;

  draggedStoreId = storeCard.dataset.storeId;
  draggedStoreCard = storeCard;
  storeDragPointerId = event.pointerId;
  storeDragStartX = event.clientX;
  storeDragStartY = event.clientY;
  hasStoreDragMoved = false;
  storeCard.setPointerCapture?.(event.pointerId);
}

function moveStorePointerDrag(event) {
  if (!draggedStoreId || event.pointerId !== storeDragPointerId) return;

  const distance = Math.hypot(
    event.clientX - storeDragStartX,
    event.clientY - storeDragStartY,
  );
  if (!hasStoreDragMoved && distance < 6) return;

  if (!hasStoreDragMoved) {
    hasStoreDragMoved = true;
    suppressStoreClick = true;
    draggedStoreCard?.classList.add("is-dragging");
  }

  event.preventDefault();
  placeDraggedStoreCard(event.clientX, event.clientY);
}

function finishStorePointerDrag(event) {
  if (!draggedStoreId || event.pointerId !== storeDragPointerId) return;

  try {
    draggedStoreCard?.releasePointerCapture?.(event.pointerId);
  } catch {
    // The pointer can already be released if the browser cancels a drag.
  }
  const reordered = hasStoreDragMoved && reorderStoresByIds(getStoreOrderFromDom());

  draggedStoreId = null;
  draggedStoreCard = null;
  storeDragPointerId = null;
  storeDragStartX = 0;
  storeDragStartY = 0;
  hasStoreDragMoved = false;
  clearStoreDragClasses();

  if (suppressStoreClick) {
    setTimeout(() => {
      suppressStoreClick = false;
    }, 0);
  }

  if (reordered) {
    renderStoreList();
    renderSummary();
  }
}

function renderProductEditorRow(product = { name: "", price: null }) {
  const price = getProductPrice(product);
  const keywords = getProductKeywords(product).join("，");
  const productName = getProductName(product);

  return `<div class="product-editor-row">
    <div class="product-editor-main">
      <input
        type="text"
        data-product-name-input
        placeholder="商品名称"
        value="${escapeHtml(productName)}"
      />
      <input
        type="number"
        data-product-price-input
        min="0"
        step="0.01"
        placeholder="单价"
        value="${price === null ? "" : price}"
      />
      <button class="row-remove-button" type="button" data-remove-product-row title="删除商品" aria-label="删除商品">
        -
      </button>
    </div>
    <input
      type="text"
      data-product-keywords-input
      class="product-keywords-input"
      placeholder="匹配关键词/别名，用逗号分隔"
      value="${escapeHtml(keywords)}"
    />
  </div>`;
}

function renderProductEditorRows(products = []) {
  const rows = products.length ? products : [{ name: "", price: null }];
  storeProductRows.innerHTML = rows.map((product) => renderProductEditorRow(product)).join("");
}

function addProductEditorRow(product = { name: "", price: null }) {
  storeProductRows.insertAdjacentHTML("beforeend", renderProductEditorRow(product));
  const nameInputs = storeProductRows.querySelectorAll("[data-product-name-input]");
  nameInputs[nameInputs.length - 1]?.focus();
}

function getProductEditorProducts() {
  const rows = [...storeProductRows.querySelectorAll(".product-editor-row")];
  return normalizeProductEntries(
    rows.map((row) => ({
      name: row.querySelector("[data-product-name-input]")?.value || "",
      price: row.querySelector("[data-product-price-input]")?.value || "",
      keywords: row.querySelector("[data-product-keywords-input]")?.value || "",
    })),
  );
}

function openStoreEditor(storeId = null) {
  const store = storeId ? getStoreById(storeId) : null;
  editingStoreId = store ? store.id : null;

  storeEditorTitle.textContent = store ? "修改店铺" : "新增店铺";
  storeNameInput.value = store ? store.name : "";
  renderProductEditorRows(store ? store.products : []);
  deleteStoreFromEditorButton.hidden = !store;
  storeEditor.hidden = false;
  storeNameInput.focus();
}

function closeStoreEditor() {
  storeEditor.hidden = true;
  editingStoreId = null;
  storeNameInput.value = "";
  storeProductRows.innerHTML = "";
}

function saveStoreFromEditor() {
  const name = storeNameInput.value.trim();
  if (!name) {
    storeNameInput.focus();
    return;
  }

  const products = getProductEditorProducts();
  const existingByName = storeState.stores.find(
    (store) => store.name === name && store.id !== editingStoreId,
  );

  if (editingStoreId) {
    const store = getStoreById(editingStoreId);
    if (!store) return;

    if (existingByName) {
      existingByName.products = normalizeProductEntries([...existingByName.products, ...products]);
      storeState.stores = storeState.stores.filter((item) => item.id !== editingStoreId);
      storeState.selectedStoreId = existingByName.id;
    } else {
      store.name = name;
      store.products = products;
      storeState.selectedStoreId = store.id;
    }
  } else if (existingByName) {
    existingByName.products = normalizeProductEntries([...existingByName.products, ...products]);
    storeState.selectedStoreId = existingByName.id;
  } else {
    const store = { id: makeId(), name, products };
    storeState.stores.push(store);
    storeState.selectedStoreId = store.id;
  }

  closeStoreEditor();
  saveStoreState();
  renderStoreList();
  renderSummary();
}

function openDeleteStoreConfirm(storeId = storeState.selectedStoreId) {
  const store = getStoreById(storeId);
  if (!store) return;

  deleteTargetStoreId = store.id;
  deleteConfirmText.textContent = `确认删除“${store.name}”吗？该店铺的售卖商品设置也会一起删除。`;
  deleteConfirmModal.hidden = false;
  confirmDeleteStoreButton.focus();
}

function closeDeleteStoreConfirm() {
  deleteConfirmModal.hidden = true;
  deleteTargetStoreId = null;
}

function deleteTargetStore() {
  const store = getStoreById(deleteTargetStoreId);
  if (!store) {
    closeDeleteStoreConfirm();
    return;
  }

  storeState.stores = storeState.stores.filter((item) => item.id !== store.id);
  if (storeState.selectedStoreId === store.id) {
    storeState.selectedStoreId = "";
  }

  closeStoreEditor();
  closeDeleteStoreConfirm();
  saveStoreState();
  renderStoreList();
  renderSummary();
}

function buildInventoryExportText() {
  const lines = [];

  for (const store of storeState.stores) {
    if (!store.products.length) continue;

    if (lines.length) lines.push("");
    lines.push(store.name);

    for (const product of store.products) {
      const inventory = getProductInventory(product);
      const caseQty = inventory ? formatNumber(inventory.caseQty) : "待上传数据";
      const bottleQty = inventory ? formatNumber(inventory.bottleQty) : "待上传数据";
      lines.push(`${getProductName(product)}：库存整件${caseQty}，库存单瓶${bottleQty}`);
    }
  }

  return lines.join("\n") + "\n";
}

function exportInventoryText() {
  if (!parsedData || exportInventoryTextButton.disabled) return;

  const text = "\ufeff" + buildInventoryExportText();
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeDate = (dateSelect.value || getTodayDateKey()).replace(/[\\/:*?"<>|]/g, "_");

  link.href = url;
  link.download = `在售商品库存_${safeDate}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function renderParsedData(data, options = {}) {
  const {
    persist = true,
    restore = false,
    showRestockAlert = true,
    selectedDate = "",
  } = options;

  parsedData = data;

  if (!restore) {
    storeState.selectedStoreId = "";
    saveStoreState();
  }

  dateSelect.disabled = false;
  dateSelect.innerHTML = data.dates
    .map((date) => `<option value="${date}">${date}</option>`)
    .join("");
  const todayDate = getTodayDateKey();
  dateSelect.value = data.dates.includes(selectedDate)
    ? selectedDate
    : data.dates.includes(todayDate)
      ? todayDate
      : data.dates.at(-1);
  fileName.textContent = formatParsedDataFileText(data);

  const isMultiSource = data.sources?.length > 1;
  sheetName.textContent = isMultiSource
    ? `已读取 ${data.sources.length} 个数据源表`
    : data.sheetName || "-";
  headerRow.textContent = isMultiSource
    ? data.sources
        .map((source) => `${source.filename}/${source.sheetName || "-"}：第 ${source.headerRow} 行`)
        .join("；")
    : data.headerRow
      ? `第 ${data.headerRow} 行`
      : "-";
  const baseColumnText = isMultiSource
    ? `数据源明细：${data.sources
        .map((source) => `${source.filename}（${source.sheetName}，${formatNumber(source.rowCount)} 行）`)
        .join("；")}`
    : Object.entries(data.detectedColumns)
        .map(([field, value]) => `${fieldLabels[field]}：${value || "未识别"}`)
        .join("；");
  const movementColumnText = data.movementColumns?.length
    ? `出库/退货列：${data.movementColumns
        .map((column) => {
          const movementLabel =
            column.kind === "customer_return"
              ? "客退增项"
              : column.kind === "surplus_return"
                ? "多货退货增项"
                : "出库减项";
          return `${column.label}(${movementLabel})`;
        })
        .join("、")}`
    : "出库/退货列：未识别";
  columnMatch.textContent = `${baseColumnText}；${movementColumnText}`;

  warningText.hidden = true;
  warningText.textContent = "";

  if (data.missingColumns.length || data.skippedRows || data.failedFiles?.length) {
    const missing = data.missingColumns.length
      ? `未识别列：${data.missingColumns.join("、")}。`
      : "";
    const skipped = data.skippedRows ? `已跳过 ${data.skippedRows} 行空日期或空商品。` : "";
    const failed = data.failedFiles?.length
      ? `未读取数据源表：${data.failedFiles
          .map((file) => `${file.filename}（${file.message}）`)
          .join("；")}。`
      : "";
    appendWarningText(`${missing}${skipped}${failed}`);
  }

  if (persist) {
    appendWarningText(savePersistedParsedData(data, dateSelect.value));
  }

  setStatus(
    restore ? "已恢复上次数据" : isMultiSource ? `已完成 ${data.sources.length} 个数据源表` : "已完成",
    "ready",
  );
  renderSourceTableList(data);
  renderStoreList();
  renderSummary();
  if (showRestockAlert) {
    setTimeout(openRestockModal, 0);
  }
}

async function uploadFiles(files) {
  const uploadList = [...(files || [])].filter(Boolean);
  if (!uploadList.length) return;

  const previousFileText = fileName.textContent;

  if (!parsedData) {
    resetResult("正在读取表格");
  }
  fileName.textContent =
    uploadList.length === 1
      ? uploadList[0].name
      : `${uploadList.length} 个文件：${uploadList.map((file) => file.name).join("、")}`;
  setStatus("处理中");

  try {
    const parsedTables = [];
    const failedFiles = [];

    for (const file of uploadList) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const parsedResult = parseTable(file.name, arrayBuffer);
        parsedTables.push(...parsedResult.tables);
        failedFiles.push(...parsedResult.failedFiles);
      } catch (error) {
        failedFiles.push({
          filename: file.name,
          message: error.message || "解析失败",
        });
      }
    }

    if (!parsedTables.length) {
      throw new Error(
        failedFiles.length
          ? failedFiles.map((file) => `${file.filename}：${file.message}`).join("；")
          : "没有可读取的文件。",
      );
    }

    const appendedData = combineParsedTables(parsedTables, failedFiles);
    const nextData = parsedData ? mergeParsedData(parsedData, appendedData) : appendedData;
    renderParsedData(nextData, {
      selectedDate: dateSelect.value,
    });
    fileInput.value = "";
  } catch (error) {
    setStatus("处理失败", "error");
    if (parsedData) {
      fileName.textContent = previousFileText;
      appendWarningText(`新文件读取失败，仍保留上一份数据：${error.message}`);
      renderStoreList();
      renderSummary();
    } else {
      resetResult(error.message);
    }
  }
}

fileInput.addEventListener("change", (event) => {
  uploadFiles(event.target.files);
});

addSourceTableButton.addEventListener("click", () => {
  fileInput.click();
});

sourceTableList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-source]");
  if (!deleteButton) return;

  deleteSourceTable(deleteButton.dataset.deleteSource);
});

dateSelect.addEventListener("change", () => {
  if (parsedData) savePersistedParsedData(parsedData, dateSelect.value);
  renderSummary();
  renderStoreList();
});

newStoreButton.addEventListener("click", () => openStoreEditor());
exportInventoryTextButton.addEventListener("click", exportInventoryText);
allProductsButton.addEventListener("click", clearSelectedStore);

storeList.addEventListener("click", (event) => {
  if (suppressStoreClick) {
    event.preventDefault();
    suppressStoreClick = false;
    return;
  }

  const editButton = event.target.closest("[data-edit-store]");
  if (editButton) {
    openStoreEditor(editButton.dataset.editStore);
    return;
  }

  const selectButton = event.target.closest("[data-select-store]");
  const storeCard = event.target.closest("[data-store-id]");
  const storeId = selectButton?.dataset.selectStore || storeCard?.dataset.storeId;
  if (!storeId) return;

  storeState.selectedStoreId = storeId;
  saveStoreState();
  renderStoreList();
  renderSummary();
});

storeList.addEventListener("pointerdown", startStorePointerDrag);
document.addEventListener("pointermove", moveStorePointerDrag);
document.addEventListener("pointerup", finishStorePointerDrag);
document.addEventListener("pointercancel", finishStorePointerDrag);
document.addEventListener("click", (event) => {
  if (suppressStoreClick || !storeState.selectedStoreId) return;
  if (isBlankStoreCancelTarget(event.target)) clearSelectedStore();
});

saveStoreButton.addEventListener("click", saveStoreFromEditor);
cancelStoreButton.addEventListener("click", closeStoreEditor);
storeEditor.addEventListener("click", (event) => {
  if (event.target === storeEditor) closeStoreEditor();
});
storeNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    storeProductRows.querySelector("[data-product-name-input]")?.focus();
  }
});
addStoreProductButton.addEventListener("click", () => addProductEditorRow());
storeProductRows.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-product-row]");
  if (!removeButton) return;

  removeButton.closest(".product-editor-row")?.remove();
  if (!storeProductRows.querySelector(".product-editor-row")) {
    renderProductEditorRows();
  }
});
storeProductRows.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) saveStoreFromEditor();
});
deleteStoreFromEditorButton.addEventListener("click", () => {
  if (editingStoreId) openDeleteStoreConfirm(editingStoreId);
});

cancelDeleteStoreButton.addEventListener("click", closeDeleteStoreConfirm);
confirmDeleteStoreButton.addEventListener("click", deleteTargetStore);
deleteConfirmModal.addEventListener("click", (event) => {
  if (event.target === deleteConfirmModal) closeDeleteStoreConfirm();
});
closeRestockButton.addEventListener("click", closeRestockModal);
restockModal.addEventListener("click", (event) => {
  if (event.target === restockModal) closeRestockModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !restockModal.hidden) {
    closeRestockModal();
    return;
  }
  if (event.key === "Escape" && !deleteConfirmModal.hidden) {
    closeDeleteStoreConfirm();
    return;
  }
  if (event.key === "Escape" && !storeEditor.hidden) {
    closeStoreEditor();
  }
});

for (const eventName of ["dragenter", "dragover"]) {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });
}

for (const eventName of ["dragleave", "drop"]) {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
  });
}

dropZone.addEventListener("drop", (event) => {
  uploadFiles(event.dataTransfer.files);
});

setRandomHeadline();

const restoredParsedData = loadPersistedParsedData();
if (restoredParsedData) {
  renderParsedData(restoredParsedData.data, {
    persist: false,
    restore: true,
    selectedDate: restoredParsedData.selectedDate,
  });
} else {
  renderSourceTableList();
  renderStoreList();
}
