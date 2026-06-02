const fileInput = document.querySelector("#fileInput");
const dropZone = document.querySelector("#dropZone");
const fileName = document.querySelector("#fileName");
const addSourceTableButton = document.querySelector("#addSourceTableButton");
const sourceTableList = document.querySelector("#sourceTableList");
const dateSelect = document.querySelector("#dateSelect");
const statusPill = document.querySelector("#statusPill");
const headlineText = document.querySelector("#headlineText");
const moduleTabs = document.querySelectorAll("[data-module-tab]");
const modulePanels = document.querySelectorAll("[data-module-panel]");
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
const dataChangeButton = document.querySelector("#dataChangeButton");
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
const dataChangeModal = document.querySelector("#dataChangeModal");
const dataChangeSubtitle = document.querySelector("#dataChangeSubtitle");
const dataChangeStoreTabs = document.querySelector("#dataChangeStoreTabs");
const dataChangeTableBody = document.querySelector("#dataChangeTableBody");
const closeDataChangeButton = document.querySelector("#closeDataChangeButton");
const dataChangeHeaders = {
  currentTotal: document.querySelector("#dataChangeCurrentTotalHeader"),
  previousTotal: document.querySelector("#dataChangePreviousTotalHeader"),
  outboundCase: document.querySelector("#dataChangeOutboundCaseHeader"),
  outboundBottle: document.querySelector("#dataChangeOutboundBottleHeader"),
  customerReturnCase: document.querySelector("#dataChangeCustomerReturnCaseHeader"),
  customerReturnBottle: document.querySelector("#dataChangeCustomerReturnBottleHeader"),
  surplusReturnCase: document.querySelector("#dataChangeSurplusReturnCaseHeader"),
  surplusReturnBottle: document.querySelector("#dataChangeSurplusReturnBottleHeader"),
  currentCase: document.querySelector("#dataChangeCurrentCaseHeader"),
  currentBottle: document.querySelector("#dataChangeCurrentBottleHeader"),
  previousCase: document.querySelector("#dataChangePreviousCaseHeader"),
  previousBottle: document.querySelector("#dataChangePreviousBottleHeader"),
};
const financeFileInput = document.querySelector("#financeFileInput");
const financeDropZone = document.querySelector("#financeDropZone");
const financeStoreList = document.querySelector("#financeStoreList");
const financeSubmoduleTabs = document.querySelectorAll("[data-finance-submodule-tab]");
const financeFileLabel = document.querySelector("#financeFileLabel");
const financeFileName = document.querySelector("#financeFileName");
const financeAddSourceTableButton = document.querySelector("#financeAddSourceTableButton");
const financeSourceTableTitle = document.querySelector("#financeSourceTableTitle");
const financeSourceTableList = document.querySelector("#financeSourceTableList");
const financeSheetName = document.querySelector("#financeSheetName");
const financeMetaRows = document.querySelector("#financeMetaRows");
const financeMetaColumns = document.querySelector("#financeMetaColumns");
const financeWarningText = document.querySelector("#financeWarningText");
const financeCreditTotal = document.querySelector("#financeCreditTotal");
const financeInternalTotal = document.querySelector("#financeInternalTotal");
const financePersonSummaryTitle = document.querySelector("#financePersonSummaryTitle");
const financePersonSummaryHead = document.querySelector("#financePersonSummaryHead");
const financePersonSummaryBody = document.querySelector("#financePersonSummaryBody");
const financeManualForm = document.querySelector("#financeManualForm");
const financeManualDateInput = document.querySelector("#financeManualDateInput");
const financeManualPersonLabel = document.querySelector("#financeManualPersonLabel");
const financeManualPersonInput = document.querySelector("#financeManualPersonInput");
const financeManualAmountLabel = document.querySelector("#financeManualAmountLabel");
const financeManualAmountInput = document.querySelector("#financeManualAmountInput");
const financeManualNoteInput = document.querySelector("#financeManualNoteInput");
const financeManualAddButton = document.querySelector("#financeManualAddButton");
const financeTableHead = document.querySelector("#financeTableHead");
const financeTableBody = document.querySelector("#financeTableBody");
const salesFileInput = document.querySelector("#salesFileInput");
const salesDropZone = document.querySelector("#salesDropZone");
const salesFileName = document.querySelector("#salesFileName");
const salesSheetName = document.querySelector("#salesSheetName");
const salesMetaRows = document.querySelector("#salesMetaRows");
const salesMetaColumns = document.querySelector("#salesMetaColumns");
const salesWarningText = document.querySelector("#salesWarningText");
const salesSourceCount = document.querySelector("#salesSourceCount");
const salesRowCount = document.querySelector("#salesRowCount");
const salesColumnCount = document.querySelector("#salesColumnCount");
const salesReturnSummaryText = document.querySelector("#salesReturnSummaryText");
const salesReturnTableBody = document.querySelector("#salesReturnTableBody");
const salesTableHead = document.querySelector("#salesTableHead");
const salesTableBody = document.querySelector("#salesTableBody");

let copyToastTimer = null;
let activeDataChangeStoreId = "all";

const STORE_KEY = "inventory-tool-store-settings-v1";
const DATA_KEY = "inventory-tool-parsed-data-v1";
const FINANCE_DATA_KEY = "inventory-tool-finance-data-v4";
const SALES_DATA_KEY = "inventory-tool-sales-data-v1";
const FINANCE_STORE_SELECTION_KEY = "inventory-tool-finance-selected-store-v1";
const FINANCE_MANUAL_SOURCE_ID = "finance-manual-entry-source";
const FINANCE_MANUAL_SOURCE_FILENAME = "手动添加";
const LEGACY_FINANCE_DATA_KEYS = [
  "inventory-tool-finance-data-v1",
  "inventory-tool-finance-data-v2",
  "inventory-tool-finance-data-v3",
];
const FINANCE_SUBMODULES = {
  credit: {
    label: "挂账",
    dataKey: FINANCE_DATA_KEY,
    targetSheetNames: ["挂账", "挂帐"],
    personLabel: "支付人",
    totalLabel: "挂账总金额",
    personAliases: ["支付人", "付款人", "支付方", "付款方", "付款账户", "客户", "姓名"],
    amountAliases: [
      "挂账总金额",
      "挂账金额",
      "金额",
      "总金额",
      "总额",
      "挂账总额",
      "挂账款",
      "欠款金额",
      "欠款",
      "支付金额",
      "付款金额",
      "支出金额",
      "应付金额",
      "已付金额",
      "挂账",
      "合计",
    ],
    fileLabel: "挂账源数据文件",
    sourceTitle: "挂账数据源表",
    manualAmountLabel: "挂账金额",
    manualButtonText: "添加挂账",
    emptySourceText: "暂无挂账数据源表",
    emptyTableText: "上传挂账源数据后展示表内容",
    restoredText: "已恢复上次挂账数据",
    deletedAllText: "已删除全部挂账数据源表",
    noReadableText: "没有可读取的挂账源数据。",
    readFailedPrefix: "挂账源数据读取失败",
  },
  internal: {
    label: "内部收款",
    dataKey: "inventory-tool-finance-internal-collection-data-v1",
    targetSheetNames: ["内部收款"],
    personLabel: "收款人",
    totalLabel: "收款总额",
    personAliases: ["收款人", "内部收款人", "收款方", "收款账户", "收款账号", "员工", "姓名"],
    amountAliases: [
      "内部收款总额",
      "内部收款金额",
      "收款总额",
      "收款金额",
      "实收金额",
      "到账金额",
      "收入金额",
      "总金额",
      "总额",
      "金额",
      "合计",
    ],
    fileLabel: "内部收款源数据文件",
    sourceTitle: "内部收款数据源表",
    manualAmountLabel: "收款金额",
    manualButtonText: "添加收款",
    emptySourceText: "暂无内部收款数据源表",
    emptyTableText: "上传内部收款源数据后展示表内容",
    restoredText: "已恢复上次内部收款数据",
    deletedAllText: "已删除全部内部收款数据源表",
    noReadableText: "没有可读取的内部收款源数据。",
    readFailedPrefix: "内部收款源数据读取失败",
  },
};
const STORE_BACKUP_KEY = "inventory-tool-store-settings-backup-v1";
const RESTOCK_MUTE_KEY = "inventory-tool-restock-muted-until-v1";
const LOW_STOCK_THRESHOLD = 200;
const FINANCE_RENDER_ROW_LIMIT = 500;
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

const FINANCE_BILL_FIELDS = [
  "户头",
  "销售时间",
  "账单日期",
  "账单名称",
  "商品ID",
  "商品名称",
  "销售规格",
  "仓库ID",
  "仓库名称",
  "销售数量",
  "商家报价（元）",
  "多多售价",
  "结算金额",
  "买价",
  "毛利额",
  "备注",
];
const FINANCE_DATE_FIELDS = new Set(["销售时间", "账单日期"]);
const FINANCE_DATE_ALIASES = [
  "销售时间",
  "账单日期",
  "日期",
  "时间",
  "发生日期",
  "挂账日期",
  "收款日期",
  "付款日期",
  "创建时间",
  "录入时间",
];
const FINANCE_NOTE_ALIASES = ["备注", "说明", "备注信息", "记录", "附言"];

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
let activeFinanceStoreId = "";
let activeFinanceSubmodule = "credit";
let financeData = null;
let financeDataByModule = {
  credit: null,
  internal: null,
};
let financeDataByStore = {};
let salesData = null;
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
  useGrouping: false,
  maximumFractionDigits: 2,
});

const moneyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  useGrouping: false,
  maximumFractionDigits: 2,
});

function setStatus(text, mode = "") {
  statusPill.textContent = text;
  statusPill.className = `status-pill ${mode}`.trim();
}

function getCopyToast() {
  let toast = document.querySelector("#copyToast");
  if (toast) return toast;

  toast = document.createElement("div");
  toast.id = "copyToast";
  toast.className = "copy-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  return toast;
}

function showCopyToast(text, mode = "success") {
  const toast = getCopyToast();
  toast.textContent = text;
  toast.classList.toggle("is-error", mode === "error");
  toast.classList.add("is-visible");

  window.clearTimeout(copyToastTimer);
  copyToastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible", "is-error");
  }, 1400);
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    textarea.remove();
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fall through to the legacy copy path for local file usage.
    }
  }

  try {
    return copyTextFallback(text);
  } catch (error) {
    return false;
  }
}

function getCopyableCellText(cell) {
  if (!cell || cell.classList.contains("empty-cell")) return "";
  if (cell.hasAttribute("data-copy-text")) return cell.dataset.copyText.trim();

  return cell.textContent.replace(/\s+/g, " ").trim();
}

async function copyTableCell(cell) {
  const text = getCopyableCellText(cell);
  if (!text) return;

  const copied = await copyTextToClipboard(text);
  if (!copied) {
    showCopyToast("复制失败", "error");
    return;
  }

  cell.classList.add("is-copied");
  window.setTimeout(() => cell.classList.remove("is-copied"), 450);
  showCopyToast(`已复制：${text.length > 18 ? `${text.slice(0, 18)}...` : text}`);
}

function setRandomHeadline() {
  if (!headlineText) return;

  const index = Math.floor(Math.random() * headlineBlessings.length);
  headlineText.textContent = headlineBlessings[index];
}

function setActiveModule(moduleName) {
  moduleTabs.forEach((tab) => {
    const isActive = tab.dataset.moduleTab === moduleName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  modulePanels.forEach((panel) => {
    panel.hidden = panel.dataset.modulePanel !== moduleName;
  });

  if (moduleName === "finance") {
    ensureActiveFinanceStore();
    renderFinanceStoreList();
  }
}

function getFinanceSubmoduleConfig(moduleName = activeFinanceSubmodule) {
  return FINANCE_SUBMODULES[moduleName] || FINANCE_SUBMODULES.credit;
}

function getFinanceDataKey(moduleName = activeFinanceSubmodule) {
  return getFinanceSubmoduleConfig(moduleName).dataKey;
}

function getFinanceStoreDataKey(moduleName = activeFinanceSubmodule, storeId = activeFinanceStoreId) {
  return `${getFinanceDataKey(moduleName)}::store::${storeId}`;
}

function getFinanceStoreBucket(storeId = activeFinanceStoreId) {
  if (!storeId) return { credit: null, internal: null };
  financeDataByStore[storeId] ||= { credit: null, internal: null };
  return financeDataByStore[storeId];
}

function getActiveFinanceData() {
  return getFinanceStoreBucket()[activeFinanceSubmodule] || null;
}

function setActiveFinanceData(data) {
  const bucket = getFinanceStoreBucket();
  bucket[activeFinanceSubmodule] = data;
  financeDataByModule = bucket;
  financeData = data;
}

function getFinanceStoreById(storeId = activeFinanceStoreId) {
  return storeState.stores.find((store) => store.id === storeId) || null;
}

function getDefaultFinanceStoreId() {
  const savedStoreId = localStorage.getItem(FINANCE_STORE_SELECTION_KEY) || "";
  if (getFinanceStoreById(savedStoreId)) return savedStoreId;
  if (getFinanceStoreById(storeState.selectedStoreId)) return storeState.selectedStoreId;
  return storeState.stores[0]?.id || "";
}

function syncActiveFinanceBucket() {
  financeDataByModule = getFinanceStoreBucket(activeFinanceStoreId);
  financeData = getActiveFinanceData();
}

function ensureActiveFinanceStore() {
  if (getFinanceStoreById(activeFinanceStoreId)) {
    syncActiveFinanceBucket();
    return activeFinanceStoreId;
  }

  activeFinanceStoreId = getDefaultFinanceStoreId();
  if (activeFinanceStoreId) {
    localStorage.setItem(FINANCE_STORE_SELECTION_KEY, activeFinanceStoreId);
  }
  syncActiveFinanceBucket();
  return activeFinanceStoreId;
}

function renderFinanceStoreList() {
  if (!financeStoreList) return;

  if (!storeState.stores.length) {
    financeStoreList.innerHTML = `<p class="empty-note">暂无商店</p>`;
    if (financeFileInput) financeFileInput.disabled = true;
    return;
  }

  financeStoreList.innerHTML = storeState.stores
    .map(
      (store) => `<button class="finance-store-button ${
        store.id === activeFinanceStoreId ? "is-active" : ""
      }" type="button" data-finance-store-id="${escapeHtml(store.id)}">
        ${escapeHtml(store.name)}
      </button>`,
    )
    .join("");
  if (financeFileInput) financeFileInput.disabled = !activeFinanceStoreId;
}

function setActiveFinanceStore(storeId, options = {}) {
  if (!getFinanceStoreById(storeId)) return;

  activeFinanceStoreId = storeId;
  localStorage.setItem(FINANCE_STORE_SELECTION_KEY, activeFinanceStoreId);
  syncActiveFinanceBucket();
  renderFinanceStoreList();

  if (financeData) {
    renderFinanceData(financeData, { persist: false });
  } else {
    resetFinanceResult(undefined, { clearPersisted: false });
  }
}

function removeFinanceStoreData(storeId) {
  if (!storeId) return;

  Object.keys(FINANCE_SUBMODULES).forEach((moduleName) => {
    localStorage.removeItem(getFinanceStoreDataKey(moduleName, storeId));
  });
  delete financeDataByStore[storeId];
  if (activeFinanceStoreId === storeId) {
    activeFinanceStoreId = "";
    localStorage.removeItem(FINANCE_STORE_SELECTION_KEY);
  }
}

function refreshFinanceForStoreChanges() {
  ensureActiveFinanceStore();
  renderFinanceStoreList();

  if (financeData) {
    renderFinanceData(financeData, { persist: false });
  } else {
    resetFinanceResult(undefined, { clearPersisted: false });
  }
}

function updateFinanceSubmoduleLabels() {
  const config = getFinanceSubmoduleConfig();
  if (financeFileLabel) financeFileLabel.textContent = config.fileLabel;
  if (financeSourceTableTitle) financeSourceTableTitle.textContent = config.sourceTitle;
  if (financePersonSummaryTitle) {
    financePersonSummaryTitle.textContent = `${config.personLabel}汇总`;
  }
  if (financeManualPersonLabel) financeManualPersonLabel.textContent = config.personLabel;
  if (financeManualPersonInput) {
    financeManualPersonInput.placeholder = `填写${config.personLabel}`;
  }
  if (financeManualAmountLabel) {
    financeManualAmountLabel.textContent = config.manualAmountLabel || config.totalLabel;
  }
  if (financeManualAmountInput) {
    financeManualAmountInput.placeholder = config.manualAmountLabel || config.totalLabel;
  }
  if (financeManualAddButton) {
    financeManualAddButton.textContent = config.manualButtonText || `添加${config.label}`;
  }
  if (financeManualDateInput && !financeManualDateInput.value) {
    financeManualDateInput.value = getTodayDateKey();
  }
  const manualInputDisabled = !activeFinanceStoreId;
  [
    financeManualDateInput,
    financeManualPersonInput,
    financeManualAmountInput,
    financeManualNoteInput,
    financeManualAddButton,
  ].forEach((element) => {
    if (element) element.disabled = manualInputDisabled;
  });
}

function setActiveFinanceSubmodule(moduleName) {
  if (!FINANCE_SUBMODULES[moduleName]) return;

  activeFinanceSubmodule = moduleName;
  ensureActiveFinanceStore();
  financeData = getActiveFinanceData();
  financeSubmoduleTabs.forEach((tab) => {
    const isActive = tab.dataset.financeSubmoduleTab === moduleName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  updateFinanceSubmoduleLabels();
  renderFinanceTopTotals();

  if (financeData) {
    renderFinanceData(financeData, { persist: false });
  } else {
    resetFinanceResult(undefined, { clearPersisted: false });
  }
}

function formatNumber(value) {
  const rounded = Math.abs(value) < 0.0000001 ? 0 : value;
  return numberFormatter.format(rounded);
}

function formatExportNumber(value) {
  const rounded = Math.abs(value) < 0.0000001 ? 0 : value;
  if (!Number.isFinite(rounded)) return String(value ?? "");
  return rounded.toLocaleString("zh-CN", {
    useGrouping: false,
    maximumFractionDigits: 2,
  });
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

function stripTrailingPackageSpec(value) {
  return String(value || "")
    .trim()
    .replace(/\s*[/／]\s*瓶\s*$/g, "")
    .replace(/\s*(?:瓶|罐|听|支|个)?\s*[/／]\s*箱\s*$/g, "")
    .replace(/\s*(?:瓶|罐|听|支|个|箱)\s*$/g, "")
    .replace(/\s*[*×xX]\s*\d+(?:\.\d+)?\s*$/g, "")
    .replace(/\s*(?:ml|mL|ML|毫升)\s*$/g, "")
    .trim();
}

function normalizeProductBaseName(value) {
  return normalizeProductName(stripTrailingPackageSpec(value));
}

function productBaseNameMatches(configuredProduct, actualProduct) {
  const actualBase = normalizeProductBaseName(actualProduct);
  if (!actualBase) return false;

  return getProductMatchTokens(configuredProduct).some((token) => {
    const configuredBase = normalizeProductBaseName(token);
    return Boolean(configuredBase && configuredBase === actualBase);
  });
}

function isBottleRelatedRow(row) {
  return Boolean(
    (row.bottleQty || 0) ||
      (row.outboundBottleQty || 0) ||
      (row.customerReturnBottleQty || 0) ||
      (row.surplusReturnBottleQty || 0),
  );
}

function productMatchesInventoryRow(product, row) {
  return (
    productMatches(product, row.product) ||
    (isBottleRelatedRow(row) && productBaseNameMatches(product, row.product))
  );
}

function isOrderedSubsequence(needle, haystack) {
  if (!needle || !haystack || needle.length > haystack.length) return false;

  let needleIndex = 0;
  for (const char of haystack) {
    if (char === needle[needleIndex]) {
      needleIndex += 1;
      if (needleIndex === needle.length) return true;
    }
  }
  return false;
}

function getSharedPrefixLength(left, right) {
  const limit = Math.min(left.length, right.length);
  let index = 0;
  while (index < limit && left[index] === right[index]) index += 1;
  return index;
}

function getSharedSuffixLength(left, right) {
  const limit = Math.min(left.length, right.length);
  let index = 0;
  while (
    index < limit &&
    left[left.length - 1 - index] === right[right.length - 1 - index]
  ) {
    index += 1;
  }
  return index;
}

function getOrderedProductNameMatchScore(configured, actual) {
  const shorter = configured.length <= actual.length ? configured : actual;
  const longer = configured.length <= actual.length ? actual : configured;
  if (shorter.length < 4 || !isOrderedSubsequence(shorter, longer)) return 0;

  const coverage = shorter.length / longer.length;
  const sharedEdges =
    getSharedPrefixLength(shorter, longer) + getSharedSuffixLength(shorter, longer);
  if (coverage < 0.5 && sharedEdges < 4) return 0;

  return Math.round(2000 * coverage) + shorter.length * 10;
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

function hasProductExportBottleSetting(product) {
  if (!product || typeof product === "string") return false;
  return ["exportBottle", "exportSingleBottle", "includeBottleInExport"].some((key) =>
    Object.prototype.hasOwnProperty.call(product, key),
  );
}

function getProductExportBottle(product) {
  if (!product || typeof product === "string") return true;
  if (Object.prototype.hasOwnProperty.call(product, "exportBottle")) {
    return product.exportBottle !== false;
  }
  if (Object.prototype.hasOwnProperty.call(product, "exportSingleBottle")) {
    return product.exportSingleBottle !== false;
  }
  if (Object.prototype.hasOwnProperty.call(product, "includeBottleInExport")) {
    return product.includeBottleInExport !== false;
  }
  return true;
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
    const exportBottle = hasProductExportBottleSetting(product)
      ? getProductExportBottle(product)
      : (existing?.exportBottle ?? true);

    productsByKey.set(key, {
      name: existing?.name || name,
      price: price ?? existing?.price ?? null,
      keywords: mergeProductKeywords(existing?.keywords || [], keywords),
      exportBottle,
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

    const orderedScore = getOrderedProductNameMatchScore(configured, actual);
    if (orderedScore) {
      return Math.max(bestScore, 2000 + orderedScore);
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

function normalizeFinanceCellValue(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return formatDateKeyFromDate(value) || "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function normalizeFinanceDateValue(value) {
  const text = normalizeFinanceCellValue(value).trim();
  if (value instanceof Date) return formatDateKeyFromDate(value) || text;

  if (typeof value === "number" && value >= 20000 && value <= 80000) {
    return parseExcelSerialDate(value) || text;
  }

  if (/^\d{4,5}(?:\.\d+)?$/.test(text)) {
    const serial = Number(text);
    if (serial >= 20000 && serial <= 80000) {
      return parseExcelSerialDate(serial) || text;
    }
  }

  return parseDateValue(text) || text;
}

function normalizeFinanceFieldValue(field, value) {
  if (FINANCE_DATE_FIELDS.has(field)) return normalizeFinanceDateValue(value);
  return normalizeFinanceCellValue(value).trim();
}

function buildFinanceHeaders(headerRow, columnCount) {
  return Array.from({ length: columnCount }, (_, index) => {
    const header = normalizeFinanceCellValue(headerRow?.[index]).trim();
    return header || `列 ${index + 1}`;
  });
}

function getFinanceHeaderKey(header) {
  return normalizeLabel(header) || String(header || "").trim().toLowerCase();
}

function mergeFinanceHeaders(sources, columnCount) {
  const prioritizedSources = [...sources].sort((a, b) => {
    const aIsBill = String(a.sheetName || "").trim() === "账单";
    const bIsBill = String(b.sheetName || "").trim() === "账单";
    return Number(bIsBill) - Number(aIsBill);
  });
  const headers = [];
  const usedKeys = new Set();

  prioritizedSources.forEach((source) => {
    const sourceColumnCount = Math.max(columnCount, source.headers?.length || 0);
    for (let index = 0; index < sourceColumnCount; index += 1) {
      const header = normalizeFinanceCellValue(source.headers?.[index]).trim();
      if (!header) continue;

      const key = getFinanceHeaderKey(header);
      if (key && usedKeys.has(key)) continue;

      headers.push(header);
      if (key) usedKeys.add(key);
    }
  });

  if (headers.length) return headers;

  return Array.from({ length: columnCount }, (_, index) => `列 ${index + 1}`);
}

function normalizeFinanceHeaders(headers, columnCount) {
  return Array.from({ length: columnCount }, (_, index) => {
    const header = normalizeFinanceCellValue(headers?.[index]).trim();
    return header || `列${index + 1}`;
  });
}

function isFinanceDateHeader(header) {
  return /(日期|时间|date|time)/i.test(String(header || ""));
}

function normalizeFinanceSourceValue(header, value) {
  if (isFinanceDateHeader(header)) return normalizeFinanceDateValue(value);
  return normalizeFinanceCellValue(value).trim();
}

function buildFinanceRecordFromValues(headers, values) {
  return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
}

function buildFinanceValuesFromRecord(headers, record = {}) {
  return headers.map((header, index) =>
    normalizeFinanceSourceValue(
      header,
      record[header] ?? record[FINANCE_BILL_FIELDS[index]] ?? "",
    ),
  );
}

function getFinanceColumnCountFromSource(source, rows = []) {
  return Math.max(
    source?.columnCount || 0,
    source?.headers?.length || 0,
    ...rows.map((row) => row.values?.length || 0),
  );
}

function getFinanceDisplayHeaders(data) {
  const columnCount = Math.max(
    data?.columnCount || 0,
    data?.headers?.length || 0,
    ...(Array.isArray(data?.rows) ? data.rows.map((row) => row.values?.length || 0) : []),
  );
  return normalizeFinanceHeaders(
    data?.headers || FINANCE_BILL_FIELDS,
    columnCount || FINANCE_BILL_FIELDS.length,
  );
}

function normalizeFinanceSheetName(value) {
  return normalizeLabel(value);
}

function isCsvFinanceTable(table) {
  return normalizeFinanceSheetName(table?.sheetName) === "csv";
}

function financeSheetNameMatches(table, targetSheetNames = []) {
  const sheetName = normalizeFinanceSheetName(table?.sheetName);
  return targetSheetNames.some((targetSheetName) => {
    const target = normalizeFinanceSheetName(targetSheetName);
    return target && sheetName === target;
  });
}

function getFinanceTargetTables(readableTables, targetSheetNames = []) {
  if (!targetSheetNames.length) return readableTables;
  if (readableTables.length === 1 && isCsvFinanceTable(readableTables[0])) {
    return readableTables;
  }

  return readableTables.filter((table) =>
    financeSheetNameMatches(table, targetSheetNames),
  );
}

function getFinanceHeaderScore(headers, moduleName = activeFinanceSubmodule) {
  const config = getFinanceSubmoduleConfig(moduleName);
  const personScore = Math.max(
    0,
    ...headers.map((header) => aliasScore(header, config.personAliases)),
  );
  const amountScore = Math.max(
    0,
    ...headers.map((header) => aliasScore(header, config.amountAliases)),
  );

  return {
    score: amountScore * 2 + personScore,
    personScore,
    amountScore,
  };
}

function findFinanceHeaderRow(rows, moduleName = activeFinanceSubmodule) {
  const candidates = rows.slice(0, Math.min(30, rows.length));
  let best = null;

  candidates.forEach((row, index) => {
    if (isEmptyRow(row)) return;
    const columnCount = row.length;
    const headers = buildFinanceHeaders(row, columnCount);
    const scores = getFinanceHeaderScore(headers, moduleName);
    if (!scores.amountScore) return;

    if (
      !best ||
      scores.score > best.score ||
      (scores.score === best.score && index < best.index)
    ) {
      best = { index, headers, columnCount, ...scores };
    }
  });

  return best;
}

function findFinanceColumnIndexes(headers, aliases = []) {
  const candidates = [];
  headers.forEach((header, index) => {
    const score = aliasScore(header, aliases);
    if (score) candidates.push({ score, index });
  });

  candidates.sort((a, b) => b.score - a.score || a.index - b.index);
  return candidates.map((candidate) => candidate.index);
}

function findFinanceColumnIndex(headers, aliases = []) {
  const indexes = findFinanceColumnIndexes(headers, aliases);
  return indexes[0] ?? null;
}

function findFinanceDateColumnIndexes(headers = []) {
  return findFinanceColumnIndexes(headers, FINANCE_DATE_ALIASES).filter((index) =>
    isFinanceDateHeader(headers[index]),
  );
}

function getFinanceRowValueByIndexes(row, headers, indexes = []) {
  for (const index of indexes) {
    const value = row.values?.[index] ?? row.record?.[headers[index]];
    if (normalizeFinanceCellValue(value).trim()) return value;
  }
  return "";
}

function getFinanceRowAmount(row, headers, amountIndexes = []) {
  let fallback = "";

  for (const index of amountIndexes) {
    const value = row.values?.[index] ?? row.record?.[headers[index]];
    const normalized = normalizeFinanceCellValue(value).trim();
    if (!normalized) continue;
    const amount = parseFinanceAmount(normalized);
    if (amount > 0) return amount;
    if (!fallback) fallback = normalized;
  }

  return parseFinanceAmount(fallback);
}

function getFinanceDateSortValue(value) {
  const normalized = normalizeFinanceCellValue(value).trim();
  if (!normalized) return null;

  const parsedDate = parseDateValue(normalized);
  if (parsedDate) {
    const [year, month, day] = parsedDate.split("-").map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  const parsedTime = Date.parse(
    normalized
      .replaceAll("年", "-")
      .replaceAll("月", "-")
      .replaceAll("日", "")
      .replace(/[./]/g, "-"),
  );
  return Number.isNaN(parsedTime) ? null : parsedTime;
}

function getFinanceRowDateSortValue(row, headers, dateIndexes = findFinanceDateColumnIndexes(headers)) {
  for (const index of dateIndexes) {
    const value = row.values?.[index] ?? row.record?.[headers[index]];
    const sortValue = getFinanceDateSortValue(value);
    if (sortValue !== null) return sortValue;
  }
  return null;
}

function sortFinanceRowsByTimeDesc(rows, headers) {
  const dateIndexes = findFinanceDateColumnIndexes(headers);
  if (!dateIndexes.length) return rows;

  return rows
    .map((row, index) => ({
      row,
      index,
      sortValue: getFinanceRowDateSortValue(row, headers, dateIndexes),
    }))
    .sort((a, b) => {
      const aValue = a.sortValue ?? Number.NEGATIVE_INFINITY;
      const bValue = b.sortValue ?? Number.NEGATIVE_INFINITY;
      return bValue - aValue || a.index - b.index;
    })
    .map((item) => item.row);
}

function parseFinanceAmount(value) {
  return Math.abs(parseNumber(value, 0));
}

function financeAmountColumnHasValues(rows, amountIndexes, headers = []) {
  const indexes = Array.isArray(amountIndexes) ? amountIndexes : [amountIndexes];
  if (!indexes.some((index) => index !== null && index !== undefined)) return false;
  return rows.some((row) => getFinanceRowAmount(row, headers, indexes) > 0);
}

function getFinanceSummaryContext(data, moduleName = activeFinanceSubmodule) {
  const config = getFinanceSubmoduleConfig(moduleName);
  const normalized = normalizeFinanceDataSources(data);
  if (!normalized?.rows?.length) return null;

  const directHeaders = getFinanceDisplayHeaders(normalized);
  const directAmountIndexes = findFinanceColumnIndexes(directHeaders, config.amountAliases);
  const directPersonIndexes = findFinanceColumnIndexes(directHeaders, config.personAliases);
  if (
    directAmountIndexes.length &&
    financeAmountColumnHasValues(normalized.rows, directAmountIndexes, directHeaders)
  ) {
    return {
      normalized,
      headers: directHeaders,
      rows: normalized.rows,
      amountIndexes: directAmountIndexes,
      personIndexes: directPersonIndexes,
    };
  }

  const headerCandidate = findFinanceHeaderRow(
    normalized.rows.map((row) => row.values || []),
    moduleName,
  );
  if (!headerCandidate) {
    return {
      normalized,
      headers: directHeaders,
      rows: normalized.rows,
      amountIndexes: [],
      personIndexes: directPersonIndexes,
    };
  }

  return {
    normalized,
    headers: headerCandidate.headers,
    rows: normalized.rows.slice(headerCandidate.index + 1),
    amountIndexes: findFinanceColumnIndexes(headerCandidate.headers, config.amountAliases),
    personIndexes: findFinanceColumnIndexes(headerCandidate.headers, config.personAliases),
  };
}

function getFinanceSummary(data, moduleName = activeFinanceSubmodule) {
  const config = getFinanceSubmoduleConfig(moduleName);
  const context = getFinanceSummaryContext(data, moduleName);
  if (!context?.normalized?.rows?.length) {
    return { total: 0, items: [], missingFields: [] };
  }

  const { headers, rows, amountIndexes = [], personIndexes = [] } = context;
  const missingFields = [];
  if (!amountIndexes.length) missingFields.push(config.totalLabel);
  if (!personIndexes.length) missingFields.push(config.personLabel);

  if (!amountIndexes.length) return { total: 0, items: [], missingFields };

  const total = rows.reduce(
    (sum, row) => sum + getFinanceRowAmount(row, headers, amountIndexes),
    0,
  );

  if (!personIndexes.length) return { total, items: [], missingFields };

  const grouped = new Map();
  rows.forEach((row) => {
    const person =
      normalizeFinanceCellValue(getFinanceRowValueByIndexes(row, headers, personIndexes)).trim() ||
      `未填写${config.personLabel}`;
    const amount = getFinanceRowAmount(row, headers, amountIndexes);
    if (!amount) return;

    const key = normalizeLabel(person) || person;
    const existing = grouped.get(key) || { person, total: 0, rows: 0 };
    existing.total += amount;
    existing.rows += 1;
    grouped.set(key, existing);
  });

  const items = [...grouped.values()].sort(
    (a, b) => b.total - a.total || a.person.localeCompare(b.person, "zh-Hans-CN"),
  );

  return {
    total,
    items,
    missingFields,
  };
}

function renderFinanceTopTotals() {
  if (financeCreditTotal) {
    financeCreditTotal.closest(".summary-bar > div")?.toggleAttribute(
      "hidden",
      activeFinanceSubmodule !== "credit",
    );
    financeCreditTotal.textContent = formatMoney(
      getFinanceSummary(financeDataByModule.credit, "credit").total,
    );
  }
  if (financeInternalTotal) {
    financeInternalTotal.closest(".summary-bar > div")?.toggleAttribute(
      "hidden",
      activeFinanceSubmodule !== "internal",
    );
    financeInternalTotal.textContent = formatMoney(
      getFinanceSummary(financeDataByModule.internal, "internal").total,
    );
  }
}

function renderFinancePersonSummary(data) {
  if (!financePersonSummaryHead || !financePersonSummaryBody) return;

  const config = getFinanceSubmoduleConfig();
  const summary = getFinanceSummary(data);
  const headers = [config.personLabel, config.totalLabel];
  financePersonSummaryHead.innerHTML = `<tr>${headers
    .map((header) => `<th>${escapeHtml(header)}</th>`)
    .join("")}</tr>`;

  if (!data?.rows?.length) {
    financePersonSummaryBody.innerHTML = `<tr><td colspan="2" class="empty-cell">${escapeHtml(
      config.emptyTableText,
    )}</td></tr>`;
    return;
  }

  if (summary.missingFields.length) {
    financePersonSummaryBody.innerHTML = `<tr><td colspan="2" class="empty-cell">未识别到${escapeHtml(
      summary.missingFields.join("、"),
    )}列，请检查${escapeHtml(config.label)}分页表头。</td></tr>`;
    return;
  }

  if (!summary.items.length) {
    financePersonSummaryBody.innerHTML = `<tr><td colspan="2" class="empty-cell">暂无可汇总数据</td></tr>`;
    return;
  }

  financePersonSummaryBody.innerHTML = summary.items
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.person)}</td>
        <td>${escapeHtml(formatMoney(item.total))}</td>
      </tr>`,
    )
    .join("");
}

function parseFinanceFile(filename, arrayBuffer) {
  const config = getFinanceSubmoduleConfig();
  const targetSheetNames = config.targetSheetNames || [];
  const readableTables = getFinanceTargetTables(
    readFileTables(filename, arrayBuffer),
    targetSheetNames,
  );
  const tables = [];
  const failedFiles = [];

  if (!readableTables.length) {
    throw new Error(`未找到“${targetSheetNames[0] || config.label}”分页。`);
  }

  readableTables.forEach((table) => {
    try {
      const rowsWithIndex = table.rows
        .map((row, index) => ({ row, rowNumber: index + 1 }))
        .filter(({ row }) => !isEmptyRow(row));
      if (!rowsWithIndex.length) {
        throw new Error("该分页没有可展示的数据行。");
      }

      const detectedHeader = findFinanceHeaderRow(
        rowsWithIndex.map(({ row }) => row),
        activeFinanceSubmodule,
      );
      const headerIndex = detectedHeader?.index ?? 0;
      const sourceColumnCount = rowsWithIndex
        .slice(headerIndex)
        .reduce((max, { row }) => Math.max(max, row.length), 0);
      const sourceHeaders = detectedHeader
        ? normalizeFinanceHeaders(detectedHeader.headers, sourceColumnCount)
        : buildFinanceHeaders(rowsWithIndex[0].row, sourceColumnCount);
      const dataRows = rowsWithIndex.slice(headerIndex + 1);
      if (!dataRows.length) {
        throw new Error("该分页只有表头，没有可展示的数据行。");
      }

      const rows = dataRows
        .map(({ row, rowNumber }) => {
          const values = sourceHeaders.map((header, index) =>
            normalizeFinanceSourceValue(header, row[index]),
          );
          return {
            sourceRow: rowNumber,
            record: buildFinanceRecordFromValues(sourceHeaders, values),
            values,
          };
        })
        .filter((row) => row.values.some(Boolean));

      if (!rows.length) {
        throw new Error("该分页没有可展示的数据行。");
      }

      tables.push({
        filename,
        sheetName: table.sheetName,
        sheetNames: table.sheetNames || [table.sheetName],
        rowCount: rows.length,
        columnCount: sourceColumnCount,
        headers: sourceHeaders,
        rows,
      });
    } catch (error) {
      failedFiles.push({
        filename: `${filename} / ${table.sheetName || "未命名分页"}`,
        message: error.message || "解析失败",
      });
    }
  });

  if (!tables.length) {
    throw new Error(
      failedFiles.length
        ? failedFiles.map((file) => `${file.filename}：${file.message}`).join("；")
        : "没有可展示的数据。",
    );
  }

  return { tables, failedFiles };
}

function rebuildFinanceDataFromSources(sources, rows, options = {}) {
  const normalizedSources = sources.map((source, index) => {
    const id = source.id || makeLegacySourceId(source, index);
    const sourceRows = rows.filter((row) => row.sourceId === id);
    const columnCount = getFinanceColumnCountFromSource(source, sourceRows);
    const headers = normalizeFinanceHeaders(source.headers || FINANCE_BILL_FIELDS, columnCount);
    return {
      ...source,
      id,
      rowCount: sourceRows.length || source.rowCount || 0,
      columnCount,
      headers,
    };
  });

  const columnCount = Math.max(
    1,
    ...normalizedSources.map((source) => source.columnCount || 0),
    ...rows.map((row) => row.values?.length || 0),
  );
  const headers = mergeFinanceHeaders(normalizedSources, columnCount);
  const headerIndexByKey = new Map(
    headers.map((header, index) => [getFinanceHeaderKey(header), index]),
  );
  const sourceById = new Map(normalizedSources.map((source) => [source.id, source]));
  const normalizedRows = rows.map((row) => {
    const matchedSource = sourceById.get(row.sourceId);
    const sourceHeaders = normalizeFinanceHeaders(
      matchedSource?.headers || headers,
      Math.max(matchedSource?.headers?.length || 0, row.values?.length || 0, headers.length),
    );
    const values = Array.from({ length: headers.length }, () => "");

    if (Array.isArray(row.values)) {
      row.values.forEach((value, index) => {
        const sourceHeader = sourceHeaders[index] || headers[index];
        const targetIndex = headerIndexByKey.get(getFinanceHeaderKey(sourceHeader));
        if (targetIndex === undefined) return;
        values[targetIndex] = normalizeFinanceSourceValue(headers[targetIndex], value);
      });
    }

    if (row.record && typeof row.record === "object") {
      Object.entries(row.record).forEach(([header, value]) => {
        const targetIndex = headerIndexByKey.get(getFinanceHeaderKey(header));
        if (targetIndex === undefined || values[targetIndex]) return;
        values[targetIndex] = normalizeFinanceSourceValue(headers[targetIndex], value);
      });
    }

    return {
      ...row,
      record: buildFinanceRecordFromValues(headers, values),
      values,
    };
  });
  const sortedRows = sortFinanceRowsByTimeDesc(normalizedRows, headers);
  const rebuiltSources = normalizedSources.map((source) => ({
    ...source,
    rowCount: sortedRows.filter((row) => row.sourceId === source.id).length || source.rowCount || 0,
    columnCount: headers.length,
    headers,
  }));

  return {
    filename:
      rebuiltSources.length > 1
        ? `${rebuiltSources.length} 个财务数据源表`
        : rebuiltSources[0]?.filename || "",
    sheetName:
      rebuiltSources.length > 1
        ? `已读取 ${rebuiltSources.length} 个财务数据源表`
        : rebuiltSources[0]?.sheetName || "-",
    rowCount: sortedRows.length,
    columnCount: headers.length,
    headers,
    rows: sortedRows,
    sources: rebuiltSources,
    failedFiles: options.failedFiles || [],
  };
}

function combineFinanceTables(tables, failedFiles = []) {
  const sources = tables.map((table, index) => ({
    id: table.sourceId || makeSourceId(index),
    filename: table.filename,
    sheetName: table.sheetName,
    sheetNames: table.sheetNames || [],
    rowCount: table.rowCount || 0,
    columnCount: table.columnCount || table.headers?.length || 0,
    headers: table.headers || [],
  }));
  const rows = tables.flatMap((table, index) => {
    const source = sources[index];
    return table.rows.map((row) => ({
      ...row,
      sourceId: row.sourceId || source.id,
      sourceFile: table.filename,
      sourceSheet: table.sheetName,
    }));
  });

  return rebuildFinanceDataFromSources(sources, rows, { failedFiles });
}

function isValidFinanceData(data) {
  return Boolean(
    data &&
      Array.isArray(data.rows) &&
      Array.isArray(data.sources) &&
      typeof data.rowCount === "number",
  );
}

function normalizeFinanceDataSources(data) {
  if (!isValidFinanceData(data)) return null;

  const sources = data.sources.map((source, index) => {
    const columnCount = Math.max(
      source.columnCount || 0,
      source.headers?.length || 0,
      data.columnCount || 0,
      data.headers?.length || 0,
    ) || FINANCE_BILL_FIELDS.length;
    return {
      id: source.id || makeLegacySourceId(source, index),
      filename: source.filename || data.filename || "已上传财务数据",
      sheetName: source.sheetName || data.sheetName || "-",
      sheetNames: source.sheetNames || [],
      rowCount: source.rowCount || 0,
      columnCount,
      headers: normalizeFinanceHeaders(source.headers || data.headers || FINANCE_BILL_FIELDS, columnCount),
    };
  });
  const fallbackSource = sources[0];
  const sourceByFileSheet = new Map(
    sources.map((source) => [`${source.filename}::${source.sheetName}`, source]),
  );
  const rows = data.rows.map((row) => {
    const matchedSource =
      sources.find((source) => source.id === row.sourceId) ||
      sourceByFileSheet.get(`${row.sourceFile || data.filename}::${row.sourceSheet || data.sheetName}`) ||
      fallbackSource;
    const sourceColumnCount = Math.max(
      matchedSource?.columnCount || 0,
      row.values?.length || 0,
      row.record ? Object.keys(row.record).length : 0,
    ) || FINANCE_BILL_FIELDS.length;
    const sourceHeaders = normalizeFinanceHeaders(
      matchedSource?.headers || data.headers || FINANCE_BILL_FIELDS,
      sourceColumnCount,
    );
    const values = Array.isArray(row.values)
      ? Array.from({ length: sourceColumnCount }, (_, index) =>
          normalizeFinanceSourceValue(sourceHeaders[index], row.values[index]),
        )
      : buildFinanceValuesFromRecord(sourceHeaders, row.record);

    return {
      ...row,
      record: buildFinanceRecordFromValues(sourceHeaders, values),
      values,
      sourceId: row.sourceId || matchedSource?.id || "",
      sourceFile: row.sourceFile || matchedSource?.filename || data.filename || "",
      sourceSheet: row.sourceSheet || matchedSource?.sheetName || data.sheetName || "",
      sourceRow: row.sourceRow || 0,
    };
  });

  return rebuildFinanceDataFromSources(sources, rows, {
    failedFiles: data.failedFiles || [],
  });
}

function mergeFinanceData(existingData, appendedData) {
  const existing = normalizeFinanceDataSources(existingData);
  const appended = normalizeFinanceDataSources(appendedData);

  if (!existing) return appended;
  if (!appended) return existing;

  return rebuildFinanceDataFromSources(
    [...existing.sources, ...appended.sources],
    [...existing.rows, ...appended.rows],
    { failedFiles: appended.failedFiles || [] },
  );
}

function loadPersistedFinanceData(moduleName = activeFinanceSubmodule, storeId = activeFinanceStoreId) {
  if (!storeId) return null;
  const saved = parseJsonFromStorage(getFinanceStoreDataKey(moduleName, storeId), null);
  const normalized = normalizeFinanceDataSources(saved?.data);
  return normalized;
}

function loadLegacyFinanceData(moduleName = activeFinanceSubmodule) {
  const saved = parseJsonFromStorage(getFinanceDataKey(moduleName), null);
  return normalizeFinanceDataSources(saved?.data);
}

function loadPersistedFinanceStoreData() {
  financeDataByStore = {};

  storeState.stores.forEach((store) => {
    const bucket = getFinanceStoreBucket(store.id);
    bucket.credit = loadPersistedFinanceData("credit", store.id);
    bucket.internal = loadPersistedFinanceData("internal", store.id);
  });

  const defaultStoreId = getDefaultFinanceStoreId();
  if (defaultStoreId) {
    const bucket = getFinanceStoreBucket(defaultStoreId);
    bucket.credit ||= loadLegacyFinanceData("credit");
    bucket.internal ||= loadLegacyFinanceData("internal");
  }
}

function clearLegacyFinanceData() {
  LEGACY_FINANCE_DATA_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}

function savePersistedFinanceData(
  data,
  moduleName = activeFinanceSubmodule,
  storeId = activeFinanceStoreId,
) {
  if (!isValidFinanceData(data)) return "";
  if (!storeId) return "请先选择商店后再上传财务数据。";

  try {
    localStorage.setItem(
      getFinanceStoreDataKey(moduleName, storeId),
      JSON.stringify({
        savedAt: new Date().toISOString(),
        data,
      }),
    );
    return "";
  } catch {
    return "当前财务数据较大，浏览器本地存储空间不足，本次刷新后可能无法自动恢复财务源数据。";
  }
}

function formatFinanceFileText(data) {
  const config = getFinanceSubmoduleConfig();
  const sources = Array.isArray(data?.sources) ? data.sources : [];
  if (sources.length > 1) {
    return `${sources.length} 个${config.sourceTitle}：${sources
      .map((source) => `${source.filename}/${source.sheetName || "-"}`)
      .join("、")}`;
  }

  return sources[0]?.filename || data?.filename || config.restoredText;
}

function appendFinanceWarningText(message) {
  if (!message) return;

  const existing = financeWarningText.hidden ? "" : financeWarningText.textContent;
  financeWarningText.textContent = existing ? `${existing}${message}` : message;
  financeWarningText.hidden = false;
}

function renderFinanceSourceTableList(data = financeData) {
  const config = getFinanceSubmoduleConfig();
  const normalized = normalizeFinanceDataSources(data);
  if (!normalized?.sources?.length) {
    financeSourceTableList.innerHTML = `<p class="empty-note">${escapeHtml(config.emptySourceText)}</p>`;
    return;
  }

  financeSourceTableList.innerHTML = normalized.sources
    .map(
      (source) => `<div class="source-table-item" data-finance-source-id="${escapeHtml(source.id)}">
        <div>
          <strong>${escapeHtml(source.filename)}</strong>
          <span>${escapeHtml(source.sheetName || "-")} · ${formatNumber(source.rowCount || 0)} 行</span>
        </div>
        <button class="row-remove-button source-delete-button" type="button" data-delete-finance-source="${escapeHtml(
          source.id,
        )}" title="删除该表" aria-label="删除该表">-</button>
      </div>`,
    )
    .join("");
}

function renderFinanceTable(data) {
  const config = getFinanceSubmoduleConfig();
  const headers = getFinanceDisplayHeaders(data);
  const colspan = headers.length;

  financeTableHead.innerHTML = `<tr>
    ${headers.map((field) => `<th>${escapeHtml(field)}</th>`).join("")}
  </tr>`;

  if (!data?.rows?.length) {
    financeTableBody.innerHTML = `<tr><td colspan="${colspan}" class="empty-cell">${escapeHtml(config.emptyTableText)}</td></tr>`;
    return;
  }

  financeTableBody.innerHTML =
    data.rows
      .map(
      (row) => `<tr>
        ${headers.map((field, index) => {
          const value = row.record?.[field] ?? row.values?.[index] ?? "";
          return `<td>${escapeHtml(value)}</td>`;
        }).join("")}
      </tr>`,
    )
      .join("");
}

function getFinanceManualSourceId(moduleName = activeFinanceSubmodule) {
  return `${FINANCE_MANUAL_SOURCE_ID}-${moduleName}`;
}

function getFinanceManualHeaders(moduleName = activeFinanceSubmodule) {
  const config = getFinanceSubmoduleConfig(moduleName);
  return ["日期", config.personLabel, config.manualAmountLabel || config.totalLabel, "备注"];
}

function appendFinanceHeader(headers, header) {
  const nextHeaders = [...headers];
  const index = nextHeaders.length;
  nextHeaders.push(header);
  return { headers: nextHeaders, index };
}

function ensureFinanceHeader(headers, aliases, fallbackHeader, predicate = null) {
  const matchedIndex = findFinanceColumnIndexes(headers, aliases).find((index) =>
    predicate ? predicate(headers[index]) : true,
  );
  if (matchedIndex !== undefined) return { headers, index: matchedIndex };
  return appendFinanceHeader(headers, fallbackHeader);
}

function getFinanceManualFieldPlan(sourceHeaders, moduleName = activeFinanceSubmodule) {
  const config = getFinanceSubmoduleConfig(moduleName);
  let headers = sourceHeaders?.length
    ? [...sourceHeaders]
    : getFinanceManualHeaders(moduleName);
  let result = ensureFinanceHeader(headers, FINANCE_DATE_ALIASES, "日期", isFinanceDateHeader);
  headers = result.headers;
  const dateIndex = result.index;

  result = ensureFinanceHeader(headers, config.personAliases, config.personLabel);
  headers = result.headers;
  const personIndex = result.index;

  result = ensureFinanceHeader(
    headers,
    config.amountAliases,
    config.manualAmountLabel || config.totalLabel,
  );
  headers = result.headers;
  const amountIndex = result.index;

  result = ensureFinanceHeader(headers, FINANCE_NOTE_ALIASES, "备注");
  headers = result.headers;

  return {
    headers,
    dateIndex,
    personIndex,
    amountIndex,
    noteIndex: result.index,
  };
}

function appendManualFinanceEntry(entry) {
  const config = getFinanceSubmoduleConfig();
  const current = normalizeFinanceDataSources(getActiveFinanceData());
  const manualSourceId = getFinanceManualSourceId();
  const currentSources = current?.sources || [];
  const manualSource = currentSources.find((source) => source.id === manualSourceId);
  const plan = getFinanceManualFieldPlan(manualSource?.headers, activeFinanceSubmodule);
  const nextSources = currentSources
    .filter((source) => source.id !== manualSourceId)
    .concat({
      ...(manualSource || {}),
      id: manualSourceId,
      filename: FINANCE_MANUAL_SOURCE_FILENAME,
      sheetName: config.label,
      sheetNames: [config.label],
      rowCount: 0,
      columnCount: plan.headers.length,
      headers: plan.headers,
    });
  const values = Array.from({ length: plan.headers.length }, () => "");
  values[plan.dateIndex] = entry.date;
  values[plan.personIndex] = entry.person;
  values[plan.amountIndex] = String(entry.amount);
  values[plan.noteIndex] = entry.note;

  const rows = current?.rows ? [...current.rows] : [];
  rows.push({
    sourceId: manualSourceId,
    sourceFile: FINANCE_MANUAL_SOURCE_FILENAME,
    sourceSheet: config.label,
    sourceRow: Date.now(),
    manualEntry: true,
    createdAt: new Date().toISOString(),
    values,
    record: buildFinanceRecordFromValues(plan.headers, values),
  });

  return rebuildFinanceDataFromSources(nextSources, rows);
}

function handleFinanceManualSubmit(event) {
  event.preventDefault();

  if (!ensureActiveFinanceStore()) {
    appendFinanceWarningText("请先创建并选择商店，再添加财务数据。");
    return;
  }

  const config = getFinanceSubmoduleConfig();
  const date = financeManualDateInput?.value || getTodayDateKey();
  const person = financeManualPersonInput?.value.trim() || "";
  const amount = parseFinanceAmount(financeManualAmountInput?.value);
  const note = financeManualNoteInput?.value.trim() || "";

  if (!date || !person || amount <= 0) {
    appendFinanceWarningText(`请填写日期、${config.personLabel}和有效的${config.manualAmountLabel || config.totalLabel}。`);
    return;
  }

  renderFinanceData(appendManualFinanceEntry({ date, person, amount, note }));
  if (financeManualDateInput) financeManualDateInput.value = getTodayDateKey();
  if (financeManualPersonInput) financeManualPersonInput.value = "";
  if (financeManualAmountInput) financeManualAmountInput.value = "";
  if (financeManualNoteInput) financeManualNoteInput.value = "";
  setStatus(`${config.label}已添加`, "ready");
}

function resetFinanceResult(message, options = {}) {
  const config = getFinanceSubmoduleConfig();
  const { clearPersisted = true } = options;
  const emptyMessage = message || config.emptyTableText;
  setActiveFinanceData(null);
  if (clearPersisted && activeFinanceStoreId) {
    localStorage.removeItem(getFinanceStoreDataKey());
  }
  updateFinanceSubmoduleLabels();
  financeFileInput.value = "";
  financeFileName.textContent = "未选择文件";
  financeSheetName && (financeSheetName.textContent = "-");
  financeMetaRows && (financeMetaRows.textContent = "0");
  financeMetaColumns && (financeMetaColumns.textContent = "0");
  financeWarningText.hidden = true;
  financeWarningText.textContent = "";
  renderFinanceSourceTableList(null);
  renderFinanceTopTotals();
  renderFinancePersonSummary(null);
  financeTableHead.innerHTML = `<tr><th>${escapeHtml(config.label)}数据</th></tr>`;
  financeTableBody.innerHTML = `<tr><td colspan="1" class="empty-cell">${escapeHtml(emptyMessage)}</td></tr>`;
}

function renderFinanceData(data, options = {}) {
  const { persist = true } = options;
  const config = getFinanceSubmoduleConfig();
  const normalized = normalizeFinanceDataSources(data);

  if (!normalized) {
    resetFinanceResult(undefined, { clearPersisted: persist });
    return;
  }

  setActiveFinanceData(normalized);
  updateFinanceSubmoduleLabels();
  financeFileName.textContent = formatFinanceFileText(normalized);
  if (financeSheetName) {
    financeSheetName.textContent =
    normalized.sources.length > 1
      ? `已读取 ${normalized.sources.length} 个${config.sourceTitle}`
      : normalized.sources[0]?.sheetName || "-";
  }
  financeMetaRows && (financeMetaRows.textContent = formatNumber(normalized.rowCount));
  financeMetaColumns && (financeMetaColumns.textContent = formatNumber(normalized.columnCount));
  financeWarningText.hidden = true;
  financeWarningText.textContent = "";

  if (normalized.failedFiles?.length) {
    appendFinanceWarningText(
      `未读取${config.sourceTitle}：${normalized.failedFiles
        .map((file) => `${file.filename}（${file.message}）`)
        .join("；")}。`,
    );
  }

  if (persist) {
    appendFinanceWarningText(
      savePersistedFinanceData(normalized, activeFinanceSubmodule, activeFinanceStoreId),
    );
  }

  renderFinanceSourceTableList(normalized);
  renderFinanceTopTotals();
  renderFinancePersonSummary(normalized);
  renderFinanceTable(normalized);
}

function deleteFinanceSourceTable(sourceId) {
  const currentFinanceData = getActiveFinanceData();
  if (!currentFinanceData || !sourceId) return;

  const config = getFinanceSubmoduleConfig();
  const normalized = normalizeFinanceDataSources(currentFinanceData);
  const nextSources = normalized.sources.filter((source) => source.id !== sourceId);

  if (!nextSources.length) {
    resetFinanceResult(config.deletedAllText);
    return;
  }

  const allowedSourceIds = new Set(nextSources.map((source) => source.id));
  const nextRows = normalized.rows.filter((row) => allowedSourceIds.has(row.sourceId));
  renderFinanceData(rebuildFinanceDataFromSources(nextSources, nextRows));
}

async function uploadFinanceFiles(files) {
  const uploadList = [...(files || [])].filter(Boolean);
  if (!uploadList.length) return;
  if (!ensureActiveFinanceStore()) {
    appendFinanceWarningText("请先创建并选择商店，再上传财务数据。");
    return;
  }

  const config = getFinanceSubmoduleConfig();
  const previousFileText = financeFileName.textContent;
  financeFileName.textContent =
    uploadList.length === 1
      ? uploadList[0].name
      : `${uploadList.length} 个文件：${uploadList.map((file) => file.name).join("、")}`;
  setStatus(`${config.label}处理中`);

  try {
    const parsedTables = [];
    const failedFiles = [];

    for (const file of uploadList) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const parsedResult = parseFinanceFile(file.name, arrayBuffer);
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
          : config.noReadableText,
      );
    }

    const appendedData = combineFinanceTables(parsedTables, failedFiles);
    const currentFinanceData = getActiveFinanceData();
    renderFinanceData(
      currentFinanceData ? mergeFinanceData(currentFinanceData, appendedData) : appendedData,
    );
    financeFileInput.value = "";
    setStatus(`${config.label}已完成`, "ready");
  } catch (error) {
    setStatus(`${config.label}处理失败`, "error");
    financeFileName.textContent = previousFileText;
    appendFinanceWarningText(`${config.readFailedPrefix}：${error.message}`);
  }
}

function normalizeSalesCellValue(value, header = "") {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return formatDateKeyFromDate(value) || "";

  const text = String(value).trim();
  const headerText = String(header || "");
  if (!text) return "";

  if (/(日期|时间)/.test(headerText)) {
    if (typeof value === "number" && value >= 20000 && value <= 80000) {
      return parseExcelSerialDate(value) || text;
    }

    if (/^\d{4,5}(?:\.\d+)?$/.test(text)) {
      const serial = Number(text);
      if (serial >= 20000 && serial <= 80000) {
        return parseExcelSerialDate(serial) || text;
      }
    }

    return parseDateValue(text) || text;
  }

  return text;
}

function buildSalesHeaders(headerRow, columnCount) {
  return Array.from({ length: columnCount }, (_, index) => {
    const header = normalizeSalesCellValue(headerRow?.[index]).trim();
    return header || `列${index + 1}`;
  });
}

function parseSalesFile(filename, arrayBuffer) {
  const readableTables = readFileTables(filename, arrayBuffer);
  const tables = [];
  const failedFiles = [];

  readableTables.forEach((table) => {
    try {
      const rowsWithIndex = table.rows
        .map((row, index) => ({ row, rowNumber: index + 1 }))
        .filter(({ row }) => !isEmptyRow(row));
      if (rowsWithIndex.length < 2) {
        throw new Error("该分页没有可展示的数据行。");
      }

      const columnCount = rowsWithIndex.reduce(
        (max, { row }) => Math.max(max, row.length),
        0,
      );
      const headers = buildSalesHeaders(rowsWithIndex[0].row, columnCount);
      const rows = rowsWithIndex
        .slice(1)
        .map(({ row, rowNumber }) => ({
          sourceRow: rowNumber,
          values: headers.map((header, index) => normalizeSalesCellValue(row[index], header)),
        }))
        .filter((row) => row.values.some(Boolean));

      if (!rows.length) {
        throw new Error("该分页只有表头，没有可展示的数据行。");
      }

      tables.push({
        filename,
        sheetName: table.sheetName,
        sheetNames: table.sheetNames || [table.sheetName],
        rowCount: rows.length,
        columnCount,
        headers,
        rows,
      });
    } catch (error) {
      failedFiles.push({
        filename: `${filename} / ${table.sheetName || "未命名分页"}`,
        message: error.message || "解析失败",
      });
    }
  });

  if (!tables.length) {
    throw new Error(
      failedFiles.length
        ? failedFiles.map((file) => `${file.filename}：${file.message}`).join("；")
        : "没有可展示的数据。",
    );
  }

  return { tables, failedFiles };
}

function combineSalesTables(tables, failedFiles = []) {
  const columnCount = tables.reduce(
    (max, table) => Math.max(max, table.columnCount || table.headers?.length || 0),
    0,
  );
  const headers = Array.from({ length: columnCount }, (_, index) => {
    const matchedHeader = tables
      .map((table) => normalizeSalesCellValue(table.headers?.[index]))
      .find(Boolean);
    return matchedHeader || `列${index + 1}`;
  });
  const sources = tables.map((table, index) => ({
    id: table.sourceId || makeSourceId(index),
    filename: table.filename,
    sheetName: table.sheetName,
    sheetNames: table.sheetNames || [],
    rowCount: table.rowCount,
    columnCount: table.columnCount,
    headers: table.headers,
  }));
  const rows = tables.flatMap((table, tableIndex) => {
    const source = sources[tableIndex];
    return table.rows.map((row) => ({
      ...row,
      sourceId: source.id,
      sourceFile: source.filename,
      sourceSheet: source.sheetName,
      values: headers.map((header, index) => normalizeSalesCellValue(row.values?.[index], header)),
    }));
  });

  return {
    filename:
      sources.length > 1
        ? `${sources.length} 个销售数据源表`
        : sources[0]?.filename || "",
    sheetName:
      sources.length > 1
        ? `已读取 ${sources.length} 个销售数据源表`
        : sources[0]?.sheetName || "-",
    rowCount: rows.length,
    columnCount,
    headers,
    rows,
    sources,
    failedFiles,
  };
}

function isValidSalesData(data) {
  return Boolean(
    data &&
      Array.isArray(data.rows) &&
      Array.isArray(data.sources) &&
      Array.isArray(data.headers) &&
      typeof data.rowCount === "number",
  );
}

function normalizeSalesData(data) {
  if (!isValidSalesData(data)) return null;

  const columnCount = Math.max(
    data.columnCount || 0,
    data.headers.length,
    ...data.rows.map((row) => row.values?.length || 0),
  );
  const headers = Array.from({ length: columnCount }, (_, index) => {
    const header = normalizeSalesCellValue(data.headers[index]);
    return header || `列${index + 1}`;
  });
  const sources = data.sources.map((source, index) => ({
    id: source.id || makeLegacySourceId(source, index),
    filename: source.filename || data.filename || "已上传销售数据",
    sheetName: source.sheetName || data.sheetName || "-",
    sheetNames: source.sheetNames || [],
    rowCount: source.rowCount || 0,
    columnCount: source.columnCount || columnCount,
    headers: Array.isArray(source.headers) ? source.headers : headers,
  }));
  const fallbackSource = sources[0];
  const rows = data.rows.map((row) => {
    const matchedSource =
      sources.find((source) => source.id === row.sourceId) ||
      fallbackSource;

    return {
      ...row,
      sourceId: row.sourceId || matchedSource?.id || "",
      sourceFile: row.sourceFile || matchedSource?.filename || data.filename || "",
      sourceSheet: row.sourceSheet || matchedSource?.sheetName || data.sheetName || "",
      sourceRow: row.sourceRow || 0,
      values: headers.map((header, index) => normalizeSalesCellValue(row.values?.[index], header)),
    };
  });

  return {
    filename: data.filename || sources[0]?.filename || "",
    sheetName: data.sheetName || sources[0]?.sheetName || "-",
    rowCount: rows.length,
    columnCount,
    headers,
    rows,
    sources,
    failedFiles: data.failedFiles || [],
  };
}

function loadPersistedSalesData() {
  const saved = parseJsonFromStorage(SALES_DATA_KEY, null);
  return normalizeSalesData(saved?.data);
}

function savePersistedSalesData(data) {
  if (!isValidSalesData(data)) return "";

  try {
    localStorage.setItem(
      SALES_DATA_KEY,
      JSON.stringify({
        savedAt: new Date().toISOString(),
        data,
      }),
    );
    return "";
  } catch {
    return "当前销售数据较大，浏览器本地存储空间不足，本次刷新后可能无法自动恢复销售源数据。";
  }
}

function formatSalesFileText(data) {
  const sources = Array.isArray(data?.sources) ? data.sources : [];
  if (sources.length > 1) {
    return `${sources.length} 个销售数据源表：${sources
      .map((source) => `${source.filename}/${source.sheetName || "-"}`)
      .join("、")}`;
  }

  return sources[0]?.filename || data?.filename || "已恢复上次销售数据";
}

function appendSalesWarningText(message) {
  if (!message) return;

  const existing = salesWarningText.hidden ? "" : salesWarningText.textContent;
  salesWarningText.textContent = existing ? `${existing}${message}` : message;
  salesWarningText.hidden = false;
}

function findSalesHeaderIndex(headers, aliases) {
  const normalizedAliases = aliases.map(normalizeLabel).filter(Boolean);
  const normalizedHeaders = headers.map(normalizeLabel);

  let index = normalizedHeaders.findIndex((header) => normalizedAliases.includes(header));
  if (index >= 0) return index;

  index = normalizedHeaders.findIndex((header) =>
    normalizedAliases.some((alias) => header.includes(alias) || alias.includes(header)),
  );
  return index >= 0 ? index : null;
}

function getSalesReturnFieldIndexes(headers) {
  return {
    product: findSalesHeaderIndex(headers, [
      "商品名称",
      "商品名",
      "商品",
      "产品名称",
      "产品名",
      "品名",
    ]),
    amount: findSalesHeaderIndex(headers, [
      "售后金额（元）",
      "售后金额",
      "退货金额",
      "退款金额",
      "金额",
    ]),
  };
}

function getSalesReturnSummary(data) {
  const headers = data?.headers || [];
  const indexes = getSalesReturnFieldIndexes(headers);
  const missingFields = [];
  if (indexes.product === null) missingFields.push("商品名称");
  if (indexes.amount === null) missingFields.push("售后金额");

  if (missingFields.length) {
    return {
      items: [],
      missingFields,
      totalAmount: 0,
      totalQuantity: 0,
      calculatedCount: 0,
      unpricedCount: 0,
    };
  }

  const configuredProducts = getAllConfiguredProducts();
  const itemMap = new Map();

  data.rows.forEach((row) => {
    const sourceProductName = normalizeSalesCellValue(row.values?.[indexes.product], headers[indexes.product]);
    const returnAmount = Math.abs(parseNumber(row.values?.[indexes.amount], 0));
    if (!sourceProductName || !returnAmount) return;

    const configuredProduct = resolveConfiguredProductFromProducts(configuredProducts, sourceProductName);
    const productName = configuredProduct ? getProductName(configuredProduct) : sourceProductName;
    const price = configuredProduct ? getProductPrice(configuredProduct) : null;
    const key = normalizeProductName(productName) || productName;
    const existing = itemMap.get(key) || {
      productName,
      sourceNames: new Set(),
      amount: 0,
      price,
      quantity: 0,
      rows: 0,
      matched: Boolean(configuredProduct),
      hasPrice: Number.isFinite(price) && price > 0,
    };

    existing.sourceNames.add(sourceProductName);
    existing.amount += returnAmount;
    existing.rows += 1;
    if (existing.hasPrice) {
      existing.quantity += returnAmount / existing.price;
    }
    itemMap.set(key, existing);
  });

  const items = [...itemMap.values()]
    .map((item) => {
      let status = "已计算";
      if (!item.matched) status = "未匹配商品";
      else if (!item.hasPrice) status = "未设置单价";

      return {
        ...item,
        sourceNames: [...item.sourceNames],
        status,
      };
    })
    .sort((a, b) => b.amount - a.amount);
  const calculatedItems = items.filter((item) => item.hasPrice);

  return {
    items,
    missingFields,
    totalAmount: items.reduce((sum, item) => sum + item.amount, 0),
    totalQuantity: calculatedItems.reduce((sum, item) => sum + item.quantity, 0),
    calculatedCount: calculatedItems.length,
    unpricedCount: items.length - calculatedItems.length,
  };
}

function renderSalesReturnSummary(data) {
  const summary = getSalesReturnSummary(data || { headers: [], rows: [] });

  if (summary.missingFields?.length) {
    salesReturnSummaryText.textContent = `缺少${summary.missingFields.join("、")}列`;
    salesReturnTableBody.innerHTML = `<tr><td colspan="6" class="empty-cell">未识别到${escapeHtml(
      summary.missingFields.join("、"),
    )}列，无法计算退货数量</td></tr>`;
    return;
  }

  if (!summary.items.length) {
    salesReturnSummaryText.textContent = "暂无可计算的退货数据";
    salesReturnTableBody.innerHTML = `<tr><td colspan="6" class="empty-cell">暂无可计算的退货数据</td></tr>`;
    return;
  }

  salesReturnSummaryText.textContent = `共 ${formatNumber(summary.items.length)} 个商品，可计算 ${formatNumber(
    summary.calculatedCount,
  )} 个，退货数量合计 ${formatNumber(summary.totalQuantity)}`;
  salesReturnTableBody.innerHTML = summary.items
    .map((item) => {
      const statusClass = item.hasPrice ? "status-ok" : "status-warn";
      const sourceHint =
        item.sourceNames.length > 1 || item.sourceNames[0] !== item.productName
          ? `<span class="subtle-text">${escapeHtml(item.sourceNames.join(" / "))}</span>`
          : "";

      return `<tr>
        <td><strong>${escapeHtml(item.productName)}</strong>${sourceHint}</td>
        <td>${formatMoney(item.amount)}</td>
        <td>${item.hasPrice ? formatMoney(item.price) : "-"}</td>
        <td>${item.hasPrice ? formatNumber(item.quantity) : "-"}</td>
        <td>${formatNumber(item.rows)}</td>
        <td><span class="${statusClass}">${escapeHtml(item.status)}</span></td>
      </tr>`;
    })
    .join("");
}

function renderSalesTable(data) {
  const headers = data?.headers?.length ? data.headers : ["销售数据"];
  const colspan = headers.length;

  salesTableHead.innerHTML = `<tr>${headers
    .map((header) => `<th>${escapeHtml(header)}</th>`)
    .join("")}</tr>`;

  if (!data?.rows?.length) {
    salesTableBody.innerHTML = `<tr><td colspan="${colspan}" class="empty-cell">上传销售源数据后展示表内容</td></tr>`;
    return;
  }

  salesTableBody.innerHTML = data.rows
    .map(
      (row) => `<tr>${headers
        .map((header, index) => `<td>${escapeHtml(normalizeSalesCellValue(row.values?.[index], header))}</td>`)
        .join("")}</tr>`,
    )
    .join("");
}

function resetSalesResult(message = "上传销售源数据后展示表内容") {
  salesData = null;
  localStorage.removeItem(SALES_DATA_KEY);
  salesFileInput.value = "";
  salesFileName.textContent = "未选择文件";
  salesSheetName.textContent = "-";
  salesMetaRows.textContent = "0";
  salesMetaColumns.textContent = "0";
  salesSourceCount.textContent = "0";
  salesRowCount.textContent = "0";
  salesColumnCount.textContent = "0";
  salesWarningText.hidden = true;
  salesWarningText.textContent = "";
  salesReturnSummaryText.textContent = "待上传销售数据";
  salesReturnTableBody.innerHTML = `<tr><td colspan="6" class="empty-cell">${escapeHtml(
    "上传销售源数据后计算退货数量",
  )}</td></tr>`;
  salesTableHead.innerHTML = "<tr><th>销售数据</th></tr>";
  salesTableBody.innerHTML = `<tr><td colspan="1" class="empty-cell">${escapeHtml(message)}</td></tr>`;
}

function renderSalesData(data, options = {}) {
  const { persist = true } = options;
  const normalized = normalizeSalesData(data);

  if (!normalized) {
    resetSalesResult();
    return;
  }

  salesData = normalized;
  salesFileName.textContent = formatSalesFileText(normalized);
  salesSheetName.textContent =
    normalized.sources.length > 1
      ? `已读取 ${normalized.sources.length} 个销售数据源表`
      : normalized.sources[0]?.sheetName || "-";
  salesMetaRows.textContent = formatNumber(normalized.rowCount);
  salesMetaColumns.textContent = formatNumber(normalized.columnCount);
  salesSourceCount.textContent = formatNumber(normalized.sources.length);
  salesRowCount.textContent = formatNumber(normalized.rowCount);
  salesColumnCount.textContent = formatNumber(normalized.columnCount);
  salesWarningText.hidden = true;
  salesWarningText.textContent = "";

  if (normalized.failedFiles?.length) {
    appendSalesWarningText(
      `未读取销售数据源表：${normalized.failedFiles
        .map((file) => `${file.filename}（${file.message}）`)
        .join("；")}。`,
    );
  }

  if (persist) {
    appendSalesWarningText(savePersistedSalesData(normalized));
  }

  renderSalesReturnSummary(normalized);
  renderSalesTable(normalized);
}

async function uploadSalesFiles(files) {
  const uploadList = [...(files || [])].filter(Boolean);
  if (!uploadList.length) return;

  const previousFileText = salesFileName.textContent;
  salesFileName.textContent =
    uploadList.length === 1
      ? uploadList[0].name
      : `${uploadList.length} 个文件：${uploadList.map((file) => file.name).join("、")}`;
  setStatus("销售处理中");

  try {
    const parsedTables = [];
    const failedFiles = [];

    for (const file of uploadList) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const parsedResult = parseSalesFile(file.name, arrayBuffer);
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
          : "没有可读取的销售源数据。",
      );
    }

    const parsedSalesData = combineSalesTables(parsedTables, failedFiles);
    renderSalesData(parsedSalesData);
    salesFileInput.value = "";
    setStatus("销售已完成", "ready");
  } catch (error) {
    setStatus("销售处理失败", "error");
    salesFileName.textContent = previousFileText;
    appendSalesWarningText(`销售源数据读取失败：${error.message}`);
  }
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
        totalFormulaParts: [],
      });
    }

    const item = grouped.get(key);
    const boxSize = row.boxSize || 1;
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
    item.boxSizes.add(boxSize);
    item.totalFormulaParts.push({
      caseQty: row.caseQty || 0,
      bottleQty: row.bottleQty || 0,
      boxSize,
    });
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
      const matchedProduct =
        resolveConfiguredProduct(store, row.product) ||
        store.products.find((product) => productMatchesInventoryRow(product, row));
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
    (row) => row.date === dateKey && productMatchesInventoryRow(product, row),
  );
  if (!rows.length) {
    return {
      caseQty: 0,
      bottleQty: 0,
      totalQty: 0,
    };
  }

  const productName = getProductName(product);
  const matchedRows = rows.map((row) => ({ ...row, product: productName }));
  return summarizeRows(matchedRows)[0];
}

function getProductInventory(product) {
  return getProductInventoryForDate(product, dateSelect.value);
}

function formatDataChangeValue(value) {
  if (!Number.isFinite(value)) return "-";

  const className =
    value > 0 ? "change-positive" : value < 0 ? "change-negative" : "change-neutral";
  return `<span class="${className}">${escapeHtml(formatSignedNumber(value))}</span>`;
}

function formatFormulaNumber(value) {
  const normalized = Math.abs(value) < 0.0000001 ? 0 : Number(value);
  if (!Number.isFinite(normalized)) return "0";

  return normalized.toLocaleString("zh-CN", {
    useGrouping: false,
    maximumFractionDigits: 8,
  });
}

function buildInventoryTotalFormula(inventory) {
  if (!inventory) return "";

  const boxSizes = [...(inventory.boxSizes || [])].filter((size) => Number.isFinite(size) && size);
  if (boxSizes.length <= 1) {
    return `=${formatFormulaNumber(inventory.caseQty || 0)}+${formatFormulaNumber(
      inventory.bottleQty || 0,
    )}/${formatFormulaNumber(boxSizes[0] || 1)}`;
  }

  const parts = inventory.totalFormulaParts?.length
    ? inventory.totalFormulaParts
    : [
        {
          caseQty: inventory.caseQty || 0,
          bottleQty: inventory.bottleQty || 0,
          boxSize: [...(inventory.boxSizes || [1])][0] || 1,
        },
      ];

  return `=${parts
    .map(
      (part) =>
        `${formatFormulaNumber(part.caseQty)}+${formatFormulaNumber(
          part.bottleQty,
        )}/${formatFormulaNumber(part.boxSize || 1)}`,
    )
    .join("+")}`;
}

function renderFormulaTotalCell(inventory) {
  if (!inventory) return "<td>-</td>";

  const formula = buildInventoryTotalFormula(inventory);
  const title = `总数${formula}`;
  return `<td class="formula-cell" data-copy-text="${escapeHtml(formula)}" title="${escapeHtml(
    title,
  )}">${formatNumber(inventory.totalQty)}</td>`;
}

function formatShortDateLabel(dateKey, fallback) {
  if (!dateKey) return fallback;

  const parts = dateKey.split("-");
  return parts.length === 3 ? `${parts[1]}-${parts[2]}` : dateKey;
}

function setDataChangeHeaderLabels(selectedDate, previousDate) {
  const currentLabel = formatShortDateLabel(selectedDate, "当日");
  const previousLabel = formatShortDateLabel(previousDate, "前日");

  dataChangeHeaders.currentTotal.textContent = `${currentLabel}总库存`;
  dataChangeHeaders.previousTotal.textContent = `${previousLabel}总库存`;
  dataChangeHeaders.outboundCase.textContent = `${currentLabel}整件出库`;
  dataChangeHeaders.outboundBottle.textContent = `${currentLabel}单瓶出库`;
  dataChangeHeaders.customerReturnCase.textContent = `${currentLabel}客退整件`;
  dataChangeHeaders.customerReturnBottle.textContent = `${currentLabel}客退单瓶`;
  dataChangeHeaders.surplusReturnCase.textContent = `${currentLabel}多退整件`;
  dataChangeHeaders.surplusReturnBottle.textContent = `${currentLabel}多退单瓶`;
  dataChangeHeaders.currentCase.textContent = `${currentLabel}整件`;
  dataChangeHeaders.currentBottle.textContent = `${currentLabel}单瓶`;
  dataChangeHeaders.previousCase.textContent = `${previousLabel}整件`;
  dataChangeHeaders.previousBottle.textContent = `${previousLabel}单瓶`;
}

function getValidDataChangeStoreId(storeId = activeDataChangeStoreId) {
  if (storeId === "all") return "all";
  return storeState.stores.some((store) => store.id === storeId) ? storeId : "all";
}

function getDataChangeScopeText(storeId = activeDataChangeStoreId) {
  if (storeId === "all") return "全部店铺";
  return getStoreById(storeId)?.name || "当前店铺";
}

function renderDataChangeStoreTabs() {
  if (!dataChangeStoreTabs) return;

  activeDataChangeStoreId = getValidDataChangeStoreId();
  const tabs = [
    { id: "all", name: "全部" },
    ...storeState.stores.map((store) => ({ id: store.id, name: store.name || "未命名店铺" })),
  ];

  dataChangeStoreTabs.innerHTML = tabs
    .map(
      (tab) => `<button
        class="${tab.id === activeDataChangeStoreId ? "is-active" : ""}"
        type="button"
        data-data-change-store-id="${escapeHtml(tab.id)}"
      >${escapeHtml(tab.name)}</button>`,
    )
    .join("");
}

function getDataChangeRows(storeId = "all") {
  if (!parsedData || dateSelect.disabled || !dateSelect.value) {
    return { rows: [], selectedDate: "", previousDate: "", hasPreviousDate: false };
  }

  const selectedDate = dateSelect.value;
  const previousDate = getPreviousDateKey(selectedDate);
  const hasPreviousDate = parsedData.dates?.includes(previousDate);
  const rows = [];
  const stores =
    storeId === "all"
      ? storeState.stores
      : storeState.stores.filter((store) => store.id === storeId);

  stores.forEach((store) => {
    store.products.forEach((product) => {
      const currentInventory = getProductInventoryForDate(product, selectedDate) || {
        caseQty: 0,
        bottleQty: 0,
        totalQty: 0,
      };
      const previousInventory = hasPreviousDate
        ? getProductInventoryForDate(product, previousDate) || {
            caseQty: 0,
            bottleQty: 0,
            totalQty: 0,
          }
        : null;
      const movement = getProductMovement(product, selectedDate) || {
        outboundCaseQty: 0,
        outboundBottleQty: 0,
        customerReturnCaseQty: 0,
        customerReturnBottleQty: 0,
        surplusReturnCaseQty: 0,
        surplusReturnBottleQty: 0,
      };

      rows.push({
        storeName: store.name,
        productName: getProductName(product),
        currentInventory,
        previousInventory,
        movement,
        totalChange: previousInventory
          ? currentInventory.totalQty - previousInventory.totalQty
          : null,
        status: hasPreviousDate ? "已对比" : "前日无数据",
      });
    });
  });

  return { rows, selectedDate, previousDate, hasPreviousDate };
}

function renderDataChangeTable() {
  activeDataChangeStoreId = getValidDataChangeStoreId();
  renderDataChangeStoreTabs();

  const { rows, selectedDate, previousDate, hasPreviousDate } =
    getDataChangeRows(activeDataChangeStoreId);
  const scopeText = getDataChangeScopeText(activeDataChangeStoreId);
  setDataChangeHeaderLabels(selectedDate, previousDate);
  dataChangeSubtitle.textContent = selectedDate
    ? `对比日期：${selectedDate} 比 ${previousDate || "前一日"}；范围：${scopeText}${
        hasPreviousDate ? "" : "（前日无数据）"
      }`
    : `对比日期：当日 比 前一日；范围：${scopeText}`;

  if (!rows.length) {
    dataChangeTableBody.innerHTML = `<tr><td colspan="16" class="empty-cell">暂无在售商品或库存数据</td></tr>`;
    return;
  }

  dataChangeTableBody.innerHTML = rows
    .map((row) => {
      const previous = row.previousInventory;
      const movement = row.movement;
      return `<tr>
        <td>${escapeHtml(row.storeName)}</td>
        <td>${escapeHtml(row.productName)}</td>
        <td>${previous ? formatDataChangeValue(row.totalChange) : "-"}</td>
        ${renderFormulaTotalCell(row.currentInventory)}
        ${renderFormulaTotalCell(previous)}
        <td>${formatNumber(movement.outboundCaseQty)}</td>
        <td>${formatNumber(movement.outboundBottleQty)}</td>
        <td>${formatNumber(movement.customerReturnCaseQty)}</td>
        <td>${formatNumber(movement.customerReturnBottleQty)}</td>
        <td>${formatNumber(movement.surplusReturnCaseQty)}</td>
        <td>${formatNumber(movement.surplusReturnBottleQty)}</td>
        <td>${formatNumber(row.currentInventory.caseQty)}</td>
        <td>${formatNumber(row.currentInventory.bottleQty)}</td>
        <td>${previous ? formatNumber(previous.caseQty) : "-"}</td>
        <td>${previous ? formatNumber(previous.bottleQty) : "-"}</td>
        <td><span class="${hasPreviousDate ? "status-ok" : "status-warn"}">${escapeHtml(row.status)}</span></td>
      </tr>`;
    })
    .join("");
}

function openDataChangeModal() {
  if (!parsedData || dataChangeButton.disabled) return;

  renderDataChangeTable();
  dataChangeModal.hidden = false;
  closeDataChangeButton.focus();
}

function closeDataChangeModal() {
  dataChangeModal.hidden = true;
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
    (row) => row.date === dateKey && productMatchesInventoryRow(product, row),
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

function setProductExportBottle(storeId, productIndex, exportBottle) {
  const store = getStoreById(storeId);
  const product = store?.products?.[productIndex];
  if (!product) return;

  product.exportBottle = exportBottle;
  saveStoreState();
}

function renderStoreProducts(store) {
  if (!store.products.length) {
    return `<p class="empty-note">暂无在售商品</p>`;
  }

  return store.products
    .map(
      (product, productIndex) => {
        const keywordText = formatProductKeywordsText(product);
        const exportBottle = getProductExportBottle(product);
        return `<div class="store-product-row">
        <span class="product-name-cell">
          <strong>${escapeHtml(getProductName(product))}</strong>
          ${keywordText ? `<em>${escapeHtml(keywordText)}</em>` : ""}
        </span>
        <label class="store-product-export-toggle" title="控制一键导出库存时是否包含该商品的单瓶数量">
          <input
            type="checkbox"
            data-store-product-export-bottle
            data-store-id="${escapeHtml(store.id)}"
            data-product-index="${productIndex}"
            ${exportBottle ? "checked" : ""}
          />
          <span>导出单瓶</span>
        </label>
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
  dataChangeButton.disabled =
    !parsedData || dateSelect.disabled || !storeState.stores.some((store) => store.products.length);

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
  refreshFinanceForStoreChanges();
  renderSummary();
  if (salesData) renderSalesReturnSummary(salesData);
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
  if (event.target.closest("button, input, select, textarea, a, label")) return null;

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

function renderProductEditorRow(product = { name: "", price: null, exportBottle: true }) {
  const price = getProductPrice(product);
  const keywords = getProductKeywords(product).join("，");
  const productName = getProductName(product);
  const exportBottle = getProductExportBottle(product);

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
    <label class="product-export-bottle-toggle">
      <input type="checkbox" data-product-export-bottle-input ${exportBottle ? "checked" : ""} />
      <span>是否导出单瓶</span>
    </label>
  </div>`;
}

function renderProductEditorRows(products = []) {
  const rows = products.length ? products : [{ name: "", price: null, exportBottle: true }];
  storeProductRows.innerHTML = rows.map((product) => renderProductEditorRow(product)).join("");
}

function addProductEditorRow(product = { name: "", price: null, exportBottle: true }) {
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
      exportBottle: row.querySelector("[data-product-export-bottle-input]")?.checked !== false,
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
  refreshFinanceForStoreChanges();
  renderSummary();
  if (salesData) renderSalesReturnSummary(salesData);
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
  removeFinanceStoreData(store.id);

  closeStoreEditor();
  closeDeleteStoreConfirm();
  saveStoreState();
  renderStoreList();
  refreshFinanceForStoreChanges();
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
      const caseQty = inventory ? formatExportNumber(inventory.caseQty) : "待上传数据";
      const bottleQty = inventory ? formatExportNumber(inventory.bottleQty) : "待上传数据";
      const parts = [`${getProductName(product)}：库存整件${caseQty}`];
      if (getProductExportBottle(product)) {
        parts.push(`库存单瓶${bottleQty}`);
      }
      lines.push(parts.join("，"));
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
  const multiSourceRuleText = isMultiSource
    ? "；多表规则：按处理日期读取所有数据源，商品名匹配后合并统计"
    : "";
  columnMatch.textContent = `${baseColumnText}；${movementColumnText}${multiSourceRuleText}`;

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
    renderParsedData(nextData);
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

moduleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveModule(tab.dataset.moduleTab);
  });
});

financeSubmoduleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveFinanceSubmodule(tab.dataset.financeSubmoduleTab);
  });
});

financeStoreList?.addEventListener("click", (event) => {
  const storeButton = event.target.closest("[data-finance-store-id]");
  if (!storeButton) return;

  setActiveFinanceStore(storeButton.dataset.financeStoreId);
});

financeFileInput.addEventListener("change", (event) => {
  uploadFinanceFiles(event.target.files);
});

financeAddSourceTableButton.addEventListener("click", () => {
  financeFileInput.click();
});

financeSourceTableList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-finance-source]");
  if (!deleteButton) return;

  deleteFinanceSourceTable(deleteButton.dataset.deleteFinanceSource);
});

financeManualForm?.addEventListener("submit", handleFinanceManualSubmit);

salesFileInput.addEventListener("change", (event) => {
  uploadSalesFiles(event.target.files);
});

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
dataChangeButton.addEventListener("click", openDataChangeModal);
dataChangeStoreTabs?.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-data-change-store-id]");
  if (!tab) return;

  activeDataChangeStoreId = tab.dataset.dataChangeStoreId || "all";
  renderDataChangeTable();
});
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

  if (event.target.closest("[data-store-product-export-bottle], .store-product-export-toggle")) {
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

storeList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-store-product-export-bottle]");
  if (!checkbox) return;

  const productIndex = Number(checkbox.dataset.productIndex);
  if (!Number.isInteger(productIndex)) return;

  setProductExportBottle(checkbox.dataset.storeId, productIndex, checkbox.checked);
});

storeList.addEventListener("pointerdown", startStorePointerDrag);
document.addEventListener("pointermove", moveStorePointerDrag);
document.addEventListener("pointerup", finishStorePointerDrag);
document.addEventListener("pointercancel", finishStorePointerDrag);
document.addEventListener("click", (event) => {
  const cell = event.target.closest("tbody td");
  if (
    cell &&
    !event.target.closest("button, input, select, textarea, label, a") &&
    !cell.classList.contains("empty-cell")
  ) {
    copyTableCell(cell);
  }

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
closeDataChangeButton.addEventListener("click", closeDataChangeModal);
dataChangeModal.addEventListener("click", (event) => {
  if (event.target === dataChangeModal) closeDataChangeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dataChangeModal.hidden) {
    closeDataChangeModal();
    return;
  }
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

for (const eventName of ["dragenter", "dragover"]) {
  financeDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    financeDropZone.classList.add("is-dragging");
  });
}

for (const eventName of ["dragleave", "drop"]) {
  financeDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    financeDropZone.classList.remove("is-dragging");
  });
}

financeDropZone.addEventListener("drop", (event) => {
  uploadFinanceFiles(event.dataTransfer.files);
});

for (const eventName of ["dragenter", "dragover"]) {
  salesDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    salesDropZone.classList.add("is-dragging");
  });
}

for (const eventName of ["dragleave", "drop"]) {
  salesDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    salesDropZone.classList.remove("is-dragging");
  });
}

salesDropZone.addEventListener("drop", (event) => {
  uploadSalesFiles(event.dataTransfer.files);
});

setRandomHeadline();
setActiveModule("inventory");
clearLegacyFinanceData();

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

loadPersistedFinanceStoreData();
activeFinanceStoreId = getDefaultFinanceStoreId();
if (activeFinanceStoreId) {
  localStorage.setItem(FINANCE_STORE_SELECTION_KEY, activeFinanceStoreId);
}
syncActiveFinanceBucket();
renderFinanceStoreList();

if (financeData) {
  renderFinanceData(financeData, { persist: false });
} else {
  resetFinanceResult(undefined, { clearPersisted: false });
}

const restoredSalesData = loadPersistedSalesData();
if (restoredSalesData) {
  renderSalesData(restoredSalesData, { persist: false });
} else {
  resetSalesResult();
}
