export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","customer","total"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.total==='string' && row.total.trim()) row.total=Number(row.total);
    if (!Number.isFinite(row.total)) throw new Error('Expected a numeric metric');
  }
  return {revenue:rows.reduce((s,r)=>s+r.total,0),average:Math.round(rows.reduce((s,r)=>s+r.total,0)/rows.length*100)/100,highValue:rows.filter(r=>r.total>=80).map(r=>r.customer)};
}
