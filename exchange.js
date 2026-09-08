/* Illustrative prototype data. No live feed or transfer service. Values per AUD. */
const Exchange = (() => {
  const currencies = [
    {code:'AUD', flag:'🇦🇺', fa:'دلار استرالیا', en:'Australian dollar', rate:1, change:0},
    {code:'USD', flag:'🇺🇸', fa:'دلار آمریکا', en:'US dollar', rate:0.66, change:0.3},
    {code:'EUR', flag:'🇪🇺', fa:'یورو', en:'Euro', rate:0.56, change:-0.2},
    {code:'GBP', flag:'🇬🇧', fa:'پوند انگلیس', en:'British pound', rate:0.51, change:0.1},
    {code:'CAD', flag:'🇨🇦', fa:'دلار کانادا', en:'Canadian dollar', rate:0.91, change:0.4},
    {code:'NZD', flag:'🇳🇿', fa:'دلار نیوزیلند', en:'New Zealand dollar', rate:1.10, change:-0.1},
    {code:'TRY', flag:'🇹🇷', fa:'لیر ترکیه', en:'Turkish lira', rate:21.45, change:0.8},
    {code:'JPY', flag:'🇯🇵', fa:'ین ژاپن', en:'Japanese yen', rate:97.30, change:-0.3},
    {code:'CHF', flag:'🇨🇭', fa:'فرانک سوئیس', en:'Swiss franc', rate:0.59, change:0.2},
    {code:'IRR', flag:'🇮🇷', fa:'ریال ایران', en:'Iranian rial', rate:1880000, change:1.2}
  ];
  function amount(value) {
    const normalized=String(value).replace(/[۰-۹]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[,٬\s]/g,'').replace('٫','.');
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return null;
    const n=Number(normalized); return Number.isFinite(n)&&n>=0&&n<=1e12?n:null;
  }
  function convert(value,from,to) {
    const n=amount(value), a=currencies.find(c=>c.code===from), b=currencies.find(c=>c.code===to);
    return n===null||!a||!b?null:n/a.rate*b.rate;
  }
  function remittance(value,direction,unit='toman') {
    const n=amount(value); if(n===null||!['out','in'].includes(direction)||!['toman','IRR'].includes(unit))return null;
    const factor=unit==='IRR'?10:1;
    const rates=[185000,188000,191000].map(r=>r*factor);
    const estimates=rates.map(r=>direction==='out'?n*r:n/r);
    return {low:Math.min(...estimates), average:estimates[1], high:Math.max(...estimates), rate:rates[1]};
  }
  const trends={ '7D':[175000,178000,177500,182000,181000,185000,188000], '1M':[169000,173000,171000,177000,180000,176000,183000,188000], '3M':[158000,162000,159000,170000,169000,177000,180000,188000], '1Y':[130000,145000,139000,155000,151000,169000,176000,188000] };
  return {currencies,amount,convert,remittance,trends};
})();
if (typeof module !== 'undefined') module.exports=Exchange;
