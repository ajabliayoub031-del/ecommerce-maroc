/* script.js - logique produits, langue, WhatsApp, formulaire */

// === CONFIGURATION ===
// Remplace ce numéro par ton numéro marocain (sans 0) ex: 2126XXXXXXXX
const WHATSAPP_NUMBER = "2126XXXXXXXX";

// Produits (exemples). Ajoute/édite ici.
const products = [
  {
    id: 1,
    name_fr: "Organisateur de rangement - Grand",
    name_ar: "منظم تخزين - كبير",
    desc_fr: "Boîte de rangement en plastique, grande capacité.",
    desc_ar: "صندوق تخزين من البلاستيك بسعة كبيرة.",
    price: 120, // MAD
    image: "https://via.placeholder.com/400x300?text=Rangement"
  },
  {
    id: 2,
    name_fr: "Support pour cuisine",
    name_ar: "حامل للمطبخ",
    desc_fr: "Support pratique pour ustensiles.",
    desc_ar: "حامل عملي للأدوات.",
    price: 85,
    image: "https://via.placeholder.com/400x300?text=Support"
  },
  {
    id: 3,
    name_fr: "Set de boîtes empilables",
    name_ar: "طقم صناديق متراصة",
    desc_fr: "Ensemble de 3 boîtes empilables.",
    desc_ar: "مجموعة من 3 صناديق متراصة.",
    price: 200,
    image: "https://via.placeholder.com/400x300?text=Set"
  }
];

// Traductions simples
const i18n = {
  fr: {
    nav_home: "Accueil", nav_products: "Produits", nav_about: "À propos", nav_contact: "Contact",
    hero_title: "Produits locaux de qualité — Livraison partout au Maroc",
    hero_sub: "Commandez facilement via WhatsApp",
    hero_btn: "Commander sur WhatsApp",
    prod_title: "Nos produits",
    about_title: "À propos",
    about_text: "Nous sommes une boutique locale au Maroc proposant des articles de ménage et accessoires de qualité.",
    contact_title: "Contact",
    contact_phone_label: "Téléphone:",
    contact_whatsapp_label: "WhatsApp:",
    contact_address_label: "Adresse:",
    form_name: "Nom",
    form_email: "Email",
    form_message: "Message",
    form_send: "Envoyer",
    footer_rights: "Tous droits réservés"
  },
  ar: {
    nav_home: "الرئيسية", nav_products: "المنتجات", nav_about: "من نحن", nav_contact: "اتصل",
    hero_title: "منتجات محلية عالية الجودة — التوصيل إلى جميع أنحاء المغرب",
    hero_sub: "اطلب بسهولة عبر واتساب",
    hero_btn: "الطلب عبر واتساب",
    prod_title: "منتجاتنا",
    about_title: "من نحن",
    about_text: "نحن متجر محلي في المغرب نقدم مستلزمات منزلية و إكسسوارات عالية الجودة.",
    contact_title: "اتصل",
    contact_phone_label: "الهاتف:",
    contact_whatsapp_label: "واتساب:",
    contact_address_label: "العنوان:",
    form_name: "الاسم",
    form_email: "البريد الإلكتروني",
    form_message: "الرسالة",
    form_send: "إرسال",
    footer_rights: "جميع الحقوق محفوظة"
  }
};

// === UTILITAIRES ===
function waLink(text){
  // encode message and open whatsapp link
  const msg = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function setYear(){
  document.getElementById("year").textContent = new Date().getFullYear();
}

// === RENDER PRODUITS ===
function renderProducts(lang="fr"){
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${lang === 'fr' ? p.name_fr : p.name_ar}" />
      <h3>${lang === 'fr' ? p.name_fr : p.name_ar}</h3>
      <p>${lang === 'fr' ? p.desc_fr : p.desc_ar}</p>
      <div class="price">${p.price} MAD</div>
      <div class="actions">
        <a class="btn wa-btn" href="#" data-id="${p.id}">${lang === 'fr' ? 'Commander' : 'اطلب'}</a>
      </div>
    `;
    list.appendChild(card);
  });
  // add click listeners
  document.querySelectorAll(".wa-btn").forEach(btn=>{
    btn.addEventListener("click", e=>{
      e.preventDefault();
      const id = +btn.dataset.id;
      const prod = products.find(x=>x.id===id);
      const text = `${lang==='fr' ? 'Bonjour, je veux commander:' : 'مرحبا، أريد طلب:'} ${lang==='fr'?prod.name_fr:prod.name_ar} - ${prod.price} MAD`;
      window.open(waLink(text), "_blank");
    });
  });
}

// === LANGUE & i18n ===
function applyTranslations(lang){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    el.textContent = i18n[lang][key] || el.textContent;
  });
  // set links and inputs
  const phoneEl = document.getElementById("phoneText");
  phoneEl.href = `tel:+${WHATSAPP_NUMBER}`;
  const waEl = document.getElementById("waText");
  waEl.href = waLink(lang==='fr' ? "Bonjour, je veux des informations." : "مرحبا، أريد معلومات.");
  // hero order button
  const heroBtn = document.getElementById("heroOrder");
  heroBtn.href = waLink(lang==='fr' ? "Bonjour, je veux commander" : "مرحبا، أريد الطلب");
}

// Toggle langue
const langToggle = document.getElementById("langToggle");
let currentLang = "fr";
function toggleLang(){
  currentLang = currentLang === "fr" ? "ar" : "fr";
  document.body.classList.toggle("lang-ar", currentLang === "ar");
  document.body.classList.toggle("lang-fr", currentLang === "fr");
  langToggle.textContent = currentLang === "fr" ? "AR" : "FR";
  applyTranslations(currentLang);
  renderProducts(currentLang);
}

// === FORMULAIRE ===
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  if(!name || !email || !message){
    alert(currentLang==='fr' ? "Remplissez tous les champs." : "يرجى ملء جميع الحقول.");
    return;
  }
  // Action simple: ouvrir WhatsApp pour recevoir la demande
  const text = (currentLang==='fr' ? `Nouvelle demande de contact: ${name} - ${email} - ${message}` : `طلب تواصل: ${name} - ${email} - ${message}`);
  window.open(waLink(text), "_blank");
  this.reset();
});

// === INIT ===
document.addEventListener("DOMContentLoaded", ()=>{
  setYear();
  renderProducts(currentLang);
  applyTranslations(currentLang);
  langToggle.addEventListener("click", toggleLang);
});
