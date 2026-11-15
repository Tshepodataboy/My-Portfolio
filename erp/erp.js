/* Company ERP — dashboard prototype
   Single source of truth for the demo: all figures below feed the KPIs,
   the chart, the watchlist and every module table. */

const DATA = {
  company: 'Company ERP',
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],
  revenue: [28, 32, 30, 38, 35, 41, 39, 44, 42, 47, 45], // R'000
  ordersThisMonth: 24,
  activity: [
    { icon: '✓', title: 'New order received — SO-1042', meta: 'Thabo Logistics · R4,850 · 12 min ago' },
    { icon: '↑', title: 'Inventory updated — +40 units', meta: 'Thermal Receipt Rolls · goods received note GRN-221 · 47 min ago' },
    { icon: 'R', title: 'Invoice paid — INV-0987', meta: 'Mokoena Retail · R2,300 · 1 h ago' },
    { icon: '👤', title: 'Leave request submitted', meta: 'Naledi M. · 24–26 Nov · awaiting approval' },
    { icon: '!', title: 'Stock alert — Toner Cartridge (Black)', meta: '42 units on hand, reorder level 50 · 3 h ago' }
  ],
  stock: [
    { sku: 'STA-001', item: 'A4 Copy Paper (Box)', cat: 'Stationery', onHand: 210, reorder: 80, cost: 289, value: 60690 },
    { sku: 'POS-014', item: 'Thermal Receipt Rolls', cat: 'Point of sale', onHand: 340, reorder: 120, cost: 34, value: 11560 },
    { sku: 'PRN-007', item: 'Toner Cartridge (Black)', cat: 'Printing', onHand: 42, reorder: 50, cost: 899, value: 37758 },
    { sku: 'FUR-022', item: 'Desk Chair (Ergo)', cat: 'Furniture', onHand: 18, reorder: 20, cost: 1499, value: 26982 },
    { sku: 'FUR-031', item: 'Filing Cabinet 3-Drawer', cat: 'Furniture', onHand: 12, reorder: 8, cost: 1249, value: 14988 },
    { sku: 'PRN-002', item: 'Label Printer', cat: 'Printing', onHand: 5, reorder: 6, cost: 3250, value: 16250 },
    { sku: 'ACC-015', item: 'Laptop Stand', cat: 'Accessories', onHand: 96, reorder: 40, cost: 210, value: 20160 },
    { sku: 'ACC-009', item: 'USB-C Hub (7-port)', cat: 'Accessories', onHand: 64, reorder: 30, cost: 349, value: 22336 },
    { sku: 'FUR-004', item: 'Office Desk 1.6m', cat: 'Furniture', onHand: 25, reorder: 10, cost: 2190, value: 54750 },
    { sku: 'STA-018', item: 'Whiteboard Marker Set', cat: 'Stationery', onHand: 428, reorder: 150, cost: 42, value: 17976 }
  ],
  sales: [
    { id: 'SO-1042', customer: 'Thabo Logistics', date: '15 Nov', amount: 4850, status: 'Invoiced' },
    { id: 'SO-1041', customer: 'Mokoena Retail', date: '15 Nov', amount: 2300, status: 'Delivered' },
    { id: 'SO-1040', customer: 'Lerato Interiors', date: '14 Nov', amount: 7120, status: 'Awaiting stock' },
    { id: 'SO-1039', customer: 'Kasi Foods', date: '14 Nov', amount: 1480, status: 'Delivered' },
    { id: 'SO-1038', customer: 'Ndlovu Wholesale', date: '13 Nov', amount: 5600, status: 'Invoiced' },
    { id: 'SO-1037', customer: 'Sipho Engineering', date: '13 Nov', amount: 3250, status: 'Awaiting stock' },
    { id: 'SO-1036', customer: 'Bosveld Traders', date: '12 Nov', amount: 9900, status: 'Delivered' },
    { id: 'SO-1035', customer: 'Mokoena Retail', date: '12 Nov', amount: 1200, status: 'Paid' }
  ],
  finance: {
    revenueYtd: 421000, expensesYtd: 287400, cash: 96400, debtors: 38500,
    lines: [
      { ref: 'INV-0987', party: 'Mokoena Retail', type: 'Sales invoice', date: '15 Nov', amount: 2300, status: 'Paid' },
      { ref: 'INV-0988', party: 'Thabo Logistics', type: 'Sales invoice', date: '15 Nov', amount: 4850, status: 'Outstanding' },
      { ref: 'PO-0442', party: 'Paper Co (SA)', type: 'Purchase order', date: '14 Nov', amount: -12400, status: 'Committed' },
      { ref: 'PAY-221', party: 'Payroll — Nov', type: 'Payroll', date: '25 Nov', amount: -142000, status: 'Scheduled' },
      { ref: 'EXP-118', party: 'City Power', type: 'Utility', date: '12 Nov', amount: -3820, status: 'Paid' }
    ]
  },
  hr: { headcount: 18, onLeave: 3, payroll: 142000, payrollDue: '25 Nov', openRoles: 2,
    people: [
      { name: 'Naledi Mokoena', role: 'Finance Officer', dept: 'Finance', leave: '3 days left', status: 'On leave' },
      { name: 'Sipho Dlamini', role: 'Warehouse Lead', dept: 'Operations', leave: '11 days left', status: 'Active' },
      { name: 'Lerato Khumalo', role: 'Sales Consultant', dept: 'Sales', leave: '7 days left', status: 'Active' },
      { name: 'Thabo Nkosi', role: 'Production Planner', dept: 'Production', leave: '14 days left', status: 'Active' },
      { name: 'Aisha Patel', role: 'HR Administrator', dept: 'HR', leave: '2 days left', status: 'On leave' }
    ]
  },
  operations: { inTransit: 7, late: 2, vehicles: 4, onTime: 86,
    trips: [
      { ref: 'DEL-511', route: 'Midrand → Sandton', driver: 'S. Dlamini', eta: 'Today 16:40', status: 'In transit' },
      { ref: 'DEL-510', route: 'Kempton Park → Centurion', driver: 'M. Zulu', eta: 'Today 12:10', status: 'Late' },
      { ref: 'DEL-509', route: 'Soweto → Roodepoort', driver: 'T. Nkosi', eta: 'Delivered 09:20', status: 'Delivered' },
      { ref: 'DEL-508', route: 'Midrand → Pretoria CBD', driver: 'S. Dlamini', eta: 'Delivered 08:05', status: 'Delivered' }
    ]
  },
  production: { open: 6, doneToday: 2, scrap: 1.4, utilisation: 78,
    orders: [
      { ref: 'WO-318', item: 'Label Printer assembly', qty: 12, due: '18 Nov', status: 'In progress' },
      { ref: 'WO-317', item: 'Desk Chair (Ergo) — upholstery', qty: 20, due: '19 Nov', status: 'In progress' },
      { ref: 'WO-316', item: 'Office Desk 1.6m — frame', qty: 15, due: '20 Nov', status: 'Queued' },
      { ref: 'WO-315', item: 'Filing Cabinet 3-Drawer', qty: 10, due: '22 Nov', status: 'Queued' }
    ]
  },
  reports: [
    { name: 'Monthly sales summary', period: 'Nov 2026', format: 'PDF' },
    { name: 'Stock valuation & reorder list', period: '15 Nov 2026', format: 'XLSX' },
    { name: 'Debtors ageing', period: 'Period 11', format: 'PDF' },
    { name: 'Purchase commitments', period: 'Nov 2026', format: 'XLSX' },
    { name: 'Payroll reconciliation', period: 'Nov 2026', format: 'PDF' }
  ]
};

const NAV = [
  { key: 'dashboard', ico: '📊', label: 'Dashboard' },
  { key: 'finance', ico: '💰', label: 'Finance' },
  { key: 'hr', ico: '👥', label: 'HR' },
  { key: 'inventory', ico: '📦', label: 'Inventory' },
  { key: 'sales', ico: '🛒', label: 'Sales' },
  { key: 'operations', ico: '🚚', label: 'Operations' },
  { key: 'production', ico: '🏭', label: 'Production' },
  { key: 'reports', ico: '📈', label: 'Reports' },
  { key: 'settings', ico: '⚙️', label: 'Settings' }
];

const rand = n => 'R' + Math.round(n).toLocaleString('en-US');
const num = n => n.toLocaleString('en-US');

function stockUnits() { return DATA.stock.reduce((s, i) => s + i.onHand, 0); }
function belowReorder() { return DATA.stock.filter(i => i.onHand <= i.reorder); }
function novRevenue() { return DATA.revenue[DATA.revenue.length - 1] * 1000; }

/* ---------- shell ---------- */
document.getElementById('nav').innerHTML = NAV.map(n =>
  `<button class="nav__item" data-key="${n.key}"><span class="nav__ico">${n.ico}</span>${n.label}</button>`
).join('');

/* ---------- dashboard ---------- */
document.getElementById('kpis').innerHTML = `
  <div class="kpi kpi--accent">
    <div class="kpi__label">Sales</div>
    <div class="kpi__value">${rand(novRevenue())}</div>
    <div class="kpi__foot"><span class="up">+6.7%</span> vs Oct 2026</div>
  </div>
  <div class="kpi">
    <div class="kpi__label">Orders</div>
    <div class="kpi__value">${DATA.ordersThisMonth}</div>
    <div class="kpi__foot">8 delivered &middot; 2 awaiting stock</div>
  </div>
  <div class="kpi">
    <div class="kpi__label">Stock</div>
    <div class="kpi__value">${num(stockUnits())}</div>
    <div class="kpi__foot"><span class="down">${belowReorder().length} items</span> below reorder level</div>
  </div>`;

function chartSVG() {
  const vals = DATA.revenue;
  const max = Math.ceil(Math.max(...vals) / 10) * 10;
  const W = 640, H = 220, pad = { l: 34, r: 8, t: 12, b: 26 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const step = iw / vals.length;
  const bw = Math.min(30, step * 0.52);
  const y = v => pad.t + ih - (v / max) * ih;

  let grid = '';
  for (let g = 0; g <= max; g += 10) {
    grid += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(g)}" y2="${y(g)}" stroke="#EDEDE9" stroke-width="1"/>`
          + `<text x="${pad.l - 8}" y="${y(g) + 4}" text-anchor="end" fill="#9A9A95" font-size="9.5" font-family="Archivo,sans-serif">${g}</text>`;
  }

  const bars = vals.map((v, i) => {
    const x = pad.l + i * step + (step - bw) / 2;
    const top = y(v);
    const last = i === vals.length - 1;
    return `<g>
      <rect x="${x}" y="${top}" width="${bw}" height="${pad.t + ih - top}" rx="4"
            fill="${last ? '#E8432F' : '#111111'}" opacity="${last ? 1 : 0.82}"></rect>
      <text x="${x + bw / 2}" y="${top - 6}" text-anchor="middle" fill="${last ? '#E8432F' : '#6E6E6E'}"
            font-size="9.5" font-weight="700" font-family="Archivo,sans-serif">${v}</text>
      <text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle" fill="#8A8A86" font-size="10" font-family="Archivo,sans-serif">${DATA.months[i]}</text>
    </g>`;
  }).join('');

  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly revenue from January to November 2026">${grid}${bars}</svg>`;
}
document.getElementById('chart').innerHTML = chartSVG();
document.getElementById('chartMeta').textContent =
  `${rand(novRevenue())} in Nov · ${rand(DATA.revenue.reduce((a, b) => a + b, 0) * 1000)} year to date`;

document.getElementById('activity').innerHTML = DATA.activity.map(a => `
  <li><span class="act__mark">${a.icon}</span>
  <div class="act__body"><div class="act__title">${a.title}</div><div class="act__meta">${a.meta}</div></div></li>`).join('');
document.getElementById('activityCount').textContent = DATA.activity.length + ' new';

document.getElementById('watchlist').innerHTML = belowReorder().sort((a, b) => a.onHand / a.reorder - b.onHand / b.reorder).map(i => `
  <li><span>${i.item}<div class="muted" style="font-size:12px;">${i.onHand} of ${i.reorder} reorder</div></span>
  <span class="bar"><span style="width:${Math.min(100, Math.round(i.onHand / i.reorder * 100))}%"></span></span></li>`).join('');

/* ---------- modules ---------- */
const statusTag = s => {
  const ok = ['Paid', 'Delivered', 'Active', 'Completed'];
  const wait = ['Invoiced', 'Committed', 'Scheduled', 'In progress', 'In transit', 'Queued', 'On leave'];
  const cls = ok.includes(s) ? 'tag--ok' : wait.includes(s) ? 'tag--wait' : 'tag--risk';
  return `<span class="tag ${cls}">${s}</span>`;
};

const table = (cols, rows) => `
  <div class="table-wrap"><table>
    <thead><tr>${cols.map(c => `<th class="${c.num ? 'num' : ''}">${c.label}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${cols.map(c => `<td class="${c.num ? 'num' : ''}">${r[c.key]}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;

const MODULES = {
  finance: () => `
    <h1 class="page-title">Finance</h1>
    <p class="welcome">Revenue, commitments and cash position for period 11</p>
    <div class="kpis">
      <div class="kpi"><div class="kpi__label">Revenue YTD</div><div class="kpi__value">${rand(DATA.finance.revenueYtd)}</div><div class="kpi__foot">11 months posted</div></div>
      <div class="kpi"><div class="kpi__label">Expenses YTD</div><div class="kpi__value">${rand(DATA.finance.expensesYtd)}</div><div class="kpi__foot">68% of revenue</div></div>
      <div class="kpi"><div class="kpi__label">Cash on hand</div><div class="kpi__value">${rand(DATA.finance.cash)}</div><div class="kpi__foot">Debtors ${rand(DATA.finance.debtors)}</div></div>
    </div>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Recent postings</h2><span class="pill">Period 11</span></div>
      ${table(
        [{ key: 'ref', label: 'Reference' }, { key: 'party', label: 'Party' }, { key: 'type', label: 'Type' },
         { key: 'date', label: 'Date' }, { key: 'amount', label: 'Amount', num: true }, { key: 'status', label: 'Status' }],
        DATA.finance.lines.map(l => ({ ...l, amount: (l.amount < 0 ? '-' : '') + rand(Math.abs(l.amount)), status: statusTag(l.status) }))
      )}
    </section>`,

  hr: () => `
    <h1 class="page-title">HR</h1>
    <p class="welcome">Headcount, leave and payroll for November</p>
    <div class="kpis">
      <div class="kpi"><div class="kpi__label">Headcount</div><div class="kpi__value">${DATA.hr.headcount}</div><div class="kpi__foot">${DATA.hr.openRoles} open roles</div></div>
      <div class="kpi"><div class="kpi__label">On leave</div><div class="kpi__value">${DATA.hr.onLeave}</div><div class="kpi__foot">Approved this week</div></div>
      <div class="kpi"><div class="kpi__label">Payroll</div><div class="kpi__value">${rand(DATA.hr.payroll)}</div><div class="kpi__foot">Due ${DATA.hr.payrollDue}</div></div>
    </div>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">People</h2><span class="pill">5 of ${DATA.hr.headcount}</span></div>
      ${table(
        [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'dept', label: 'Department' },
         { key: 'leave', label: 'Leave balance' }, { key: 'status', label: 'Status' }],
        DATA.hr.people.map(p => ({ ...p, status: statusTag(p.status) }))
      )}
    </section>`,

  inventory: () => `
    <h1 class="page-title">Inventory</h1>
    <p class="welcome">${num(stockUnits())} units across ${DATA.stock.length} SKUs · ${belowReorder().length} below reorder level</p>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Stock position</h2><span class="pill">Live from movements</span></div>
      ${table(
        [{ key: 'sku', label: 'SKU' }, { key: 'item', label: 'Item' }, { key: 'cat', label: 'Category' },
         { key: 'onHand', label: 'On hand', num: true }, { key: 'reorder', label: 'Reorder at', num: true },
         { key: 'value', label: 'Value', num: true }, { key: 'state', label: 'Status' }],
        DATA.stock.map(i => ({ sku: i.sku, item: i.item, cat: i.cat, onHand: num(i.onHand), reorder: i.reorder, value: rand(i.value),
          state: i.onHand <= i.reorder ? '<span class="tag tag--risk">Reorder</span>' : '<span class="tag tag--ok">In stock</span>' }))
      )}
    </section>`,

  sales: () => `
    <h1 class="page-title">Sales</h1>
    <p class="welcome">${DATA.ordersThisMonth} orders this month · ${rand(novRevenue())} booked in November</p>
    <div class="kpis">
      <div class="kpi"><div class="kpi__label">Orders</div><div class="kpi__value">${DATA.ordersThisMonth}</div><div class="kpi__foot">8 delivered</div></div>
      <div class="kpi"><div class="kpi__label">November revenue</div><div class="kpi__value">${rand(novRevenue())}</div><div class="kpi__foot"><span class="up">+6.7%</span> vs Oct</div></div>
      <div class="kpi"><div class="kpi__label">Awaiting stock</div><div class="kpi__value">2</div><div class="kpi__foot">Blocked until GRN posts</div></div>
    </div>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Latest orders</h2><span class="pill">8 of ${DATA.ordersThisMonth}</span></div>
      ${table(
        [{ key: 'id', label: 'Order' }, { key: 'customer', label: 'Customer' }, { key: 'date', label: 'Date' },
         { key: 'amount', label: 'Amount', num: true }, { key: 'status', label: 'Status' }],
        DATA.sales.map(o => ({ ...o, amount: rand(o.amount), status: statusTag(o.status) }))
      )}
    </section>`,

  operations: () => `
    <h1 class="page-title">Operations</h1>
    <p class="welcome">${DATA.operations.inTransit} deliveries in transit · ${DATA.operations.late} running late</p>
    <div class="kpis">
      <div class="kpi"><div class="kpi__label">On-time delivery</div><div class="kpi__value">${DATA.operations.onTime}%</div><div class="kpi__foot">Rolling 30 days</div></div>
      <div class="kpi"><div class="kpi__label">In transit</div><div class="kpi__value">${DATA.operations.inTransit}</div><div class="kpi__foot">${DATA.operations.late} late</div></div>
      <div class="kpi"><div class="kpi__label">Vehicles</div><div class="kpi__value">${DATA.operations.vehicles}</div><div class="kpi__foot">2 on the road today</div></div>
    </div>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Delivery board</h2><span class="pill">Today</span></div>
      ${table(
        [{ key: 'ref', label: 'Delivery' }, { key: 'route', label: 'Route' }, { key: 'driver', label: 'Driver' },
         { key: 'eta', label: 'ETA' }, { key: 'status', label: 'Status' }],
        DATA.operations.trips.map(t => ({ ...t, status: statusTag(t.status) }))
      )}
    </section>`,

  production: () => `
    <h1 class="page-title">Production</h1>
    <p class="welcome">${DATA.production.open} work orders open · ${DATA.production.doneToday} completed today</p>
    <div class="kpis">
      <div class="kpi"><div class="kpi__label">Open orders</div><div class="kpi__value">${DATA.production.open}</div><div class="kpi__foot">${DATA.production.doneToday} done today</div></div>
      <div class="kpi"><div class="kpi__label">Utilisation</div><div class="kpi__value">${DATA.production.utilisation}%</div><div class="kpi__foot">Single shift</div></div>
      <div class="kpi"><div class="kpi__label">Scrap rate</div><div class="kpi__value">${DATA.production.scrap}%</div><div class="kpi__foot">Target under 2%</div></div>
    </div>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Work orders</h2><span class="pill">This week</span></div>
      ${table(
        [{ key: 'ref', label: 'Work order' }, { key: 'item', label: 'Item' }, { key: 'qty', label: 'Qty', num: true },
         { key: 'due', label: 'Due' }, { key: 'status', label: 'Status' }],
        DATA.production.orders.map(w => ({ ...w, status: statusTag(w.status) }))
      )}
    </section>`,

  reports: () => `
    <h1 class="page-title">Reports</h1>
    <p class="welcome">Every report reads from the same tables — nothing is retyped</p>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Available reports</h2><span class="pill">${DATA.reports.length} reports</span></div>
      <div id="reportList">
        ${DATA.reports.map(r => `
          <div class="watchlist" style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 0;border-top:1px solid var(--line);">
            <span style="font-weight:600;">${r.name}<div class="muted" style="font-size:12px;font-weight:400;">${r.period} &middot; ${r.format}</div></span>
            <button class="btn btn--ghost report-btn" data-name="${r.name}">Generate</button>
          </div>`).join('')}
      </div>
    </section>`,

  settings: () => `
    <h1 class="page-title">Settings</h1>
    <p class="welcome">Company details and module rules</p>
    <section class="panel">
      <div class="panel__head"><h2 class="panel__title">Organisation</h2><span class="pill">Editable by Admin</span></div>
      <div class="form-grid">
        <div class="field"><label for="s-company">Company name</label><input id="s-company" value="Company ERP"></div>
        <div class="field"><label for="s-email">Admin email</label><input id="s-email" type="email" value="admin@company.co.za"></div>
        <div class="field"><label for="s-currency">Currency</label><input id="s-currency" value="ZAR — South African Rand"></div>
        <div class="field"><label for="s-fy">Financial year</label><input id="s-fy" value="March 2026 – February 2027"></div>
        <div class="field"><label for="s-approval">Order approval threshold</label><input id="s-approval" value="R 10,000"></div>
        <div class="field"><label for="s-lock">Posting lock</label><input id="s-lock" value="5 days after month end"></div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;">
        <button class="btn" id="saveSettings">Save changes</button>
        <button class="btn btn--ghost" id="resetSettings">Reset</button>
      </div>
    </section>`
};

const host = document.getElementById('moduleHost');
host.innerHTML = Object.keys(MODULES).map(k => `<section class="view" id="view-${k}">${MODULES[k]()}</section>`).join('');

/* ---------- routing ---------- */
const mainEl = document.getElementById('main');
const crumb = document.getElementById('crumb');
const navEl = document.getElementById('nav');
const sidebar = document.getElementById('sidebar');
const scrim = document.getElementById('scrim');
const burger = document.getElementById('burger');

const TITLES = { dashboard: 'Dashboard' };
function setModule(key) {
  if (!TITLES[key] && !MODULES[key]) key = 'dashboard';
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + key).classList.add('active');
  navEl.querySelectorAll('.nav__item').forEach(b => b.classList.toggle('is-active', b.dataset.key === key));
  const label = (NAV.find(n => n.key === key) || NAV[0]).label;
  crumb.textContent = key === 'dashboard' ? 'Dashboard' : 'Dashboard / ' + label;
  document.title = 'Company ERP — ' + label;
  closeDrawer();
  window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
}

navEl.addEventListener('click', e => {
  const btn = e.target.closest('.nav__item');
  if (btn) setModule(btn.dataset.key);
});

function openDrawer() {
  sidebar.classList.add('open');
  scrim.hidden = false;
  burger.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  sidebar.classList.remove('open');
  scrim.hidden = true;
  burger.setAttribute('aria-expanded', 'false');
}
burger.addEventListener('click', () => sidebar.classList.contains('open') ? closeDrawer() : openDrawer());
scrim.addEventListener('click', closeDrawer);

/* ---------- interactions ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
}

document.getElementById('bell').addEventListener('click', () => {
  const dot = document.getElementById('bellDot');
  dot.hidden = true;
  toast('3 notifications: order SO-1042, stock alert, leave request');
});

document.addEventListener('click', e => {
  const report = e.target.closest('.report-btn');
  if (report) toast(report.dataset.name + ' queued — generating from live tables');
});

document.addEventListener('click', e => {
  if (e.target.id === 'saveSettings') toast('Settings saved. Posting rules apply from the next transaction.');
  if (e.target.id === 'resetSettings') toast('Changes discarded.');
});

setModule((location.hash || '#dashboard').slice(1));
window.addEventListener('hashchange', () => setModule((location.hash || '#dashboard').slice(1)));
