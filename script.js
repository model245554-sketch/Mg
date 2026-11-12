const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
// Add the shop's complete international WhatsApp number here to route chats directly.
const SHOP_WA_NUMBER='';
const wa=msg=>window.open(SHOP_WA_NUMBER?`https://wa.me/${SHOP_WA_NUMBER}?text=${encodeURIComponent(msg)}`:`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank','noopener');
let basket=[];
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),3000)}
function render(){ $('#orderCount').textContent=basket.length+' รุ่น';$('#orderItems').innerHTML=basket.length?basket.map((m,i)=>`<div class="order-item"><span>${m}</span><button class="remove-order" data-i="${i}">นำออก</button></div>`).join(''):'<p class="empty-order">ยังไม่มีรถในรายการ เลือกรถที่สนใจจากด้านบนได้เลย</p>';$$('.remove-order').forEach(b=>b.onclick=()=>{basket.splice(+b.dataset.i,1);render()})}
$$('.add-order').forEach(b=>b.onclick=()=>{if(!basket.includes(b.dataset.model))basket.push(b.dataset.model);render();toast('เพิ่มรถในรายการแล้ว')});
$$('.whatsapp-btn').forEach(b=>b.onclick=()=>wa(`สวัสดี MG Showroom สนใจ ${b.dataset.model} ขอทราบราคา โปรโมชั่น และรายละเอียดเพิ่มเติมครับ/ค่ะ`));
$('#sendOrder').onclick=()=>basket.length?wa('สวัสดี MG Showroom สนใจรถรุ่น:\\n'+basket.map((m,i)=>`${i+1}. ${m}`).join('\\n')+'\\nกรุณาติดต่อกลับเพื่อแจ้งราคาและโปรโมชั่น'):toast('กรุณาเลือกรถอย่างน้อย 1 รุ่น');
let filter='all';function filterCars(){const q=$('#carSearch').value.toLowerCase();$$('.car-card').forEach(c=>c.style.display=(filter==='all'||c.dataset.type===filter)&&c.dataset.name.toLowerCase().includes(q)?'':'none')}
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;filterCars()});$('#carSearch').oninput=filterCars;
$('#menuToggle').onclick=()=>$('#mainNav').classList.toggle('open');$$('#mainNav a').forEach(a=>a.onclick=()=>$('#mainNav').classList.remove('open'));
const modal=$('#carModal');let selected='';const info={'MG ZS EV':'รถไฟฟ้า 100% ระยะทาง 420 กม. ตามโบรชัวร์ รองรับ CCS2 Fast Charge, Wireless Charger และ Panoramic Sunroof','THE ALL NEW MG HS':'เครื่องยนต์ 1.5 Turbo 170 แรงม้า แรงบิด 275 นิวตันเมตร เกียร์ 7 Speed DCT ตามโบรชัวร์','THE ALL NEW MG ZS':'SUV เครื่องยนต์ 1.5 ลิตร เกียร์ CVT ตามโบรชัวร์'};
$$('.details-btn').forEach(b=>b.onclick=()=>{selected=b.dataset.model;$('#modalTitle').textContent=selected;$('#modalText').textContent=info[selected]||'สอบถามราคา รุ่นย่อย สีรถ และอุปกรณ์จากฝ่ายขาย';modal.classList.add('show')});
$('#modalClose').onclick=()=>modal.classList.remove('show');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};$('#modalBooking').onclick=()=>modal.classList.remove('show');
const money=n=>new Intl.NumberFormat('th-TH',{style:'currency',currency:'THB',maximumFractionDigits:0}).format(n);let months=60;
function calc(){const p=Math.max(0,+$('#carPrice').value||0),d=+$('#downPayment').value,r=Math.max(0,+$('#interest').value||0),down=p*d/100,loan=p-down;$('#downLabel').textContent=d+'%';$('#monthlyPayment').textContent=money((loan+loan*r/100*months/12)/months);$('#downAmount').textContent=money(down);$('#loanAmount').textContent=money(loan);$('#monthCount').textContent=months+' เดือน'}
['#carPrice','#downPayment','#interest'].forEach(s=>$(s).oninput=calc);$$('.term').forEach(b=>b.onclick=()=>{$$('.term').forEach(x=>x.classList.remove('active'));b.classList.add('active');months=+b.dataset.months;calc()});calc();
const date=$('#testDate'),now=new Date();date.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
$('#testForm').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);wa(`สวัสดี MG Showroom ขอจองทดลองขับ\\nชื่อ: ${d.get('name')}\\nเบอร์โทร: ${d.get('phone')}\\nรุ่นรถ: ${d.get('model')}\\nวันที่: ${d.get('date')}\\nข้อความ: ${d.get('message')||'-'}`);toast('กำลังเปิด WhatsApp พร้อมรายละเอียดการจอง')};render();
