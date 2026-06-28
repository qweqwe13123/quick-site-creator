(function () {
  // ---------- Templates carousel ----------
  var TEMPLATES = [{name:"Classic",img:"/templates/chicago-resume-templates.jpg"},{name:"Professional",img:"/templates/dublin-resume-templates.jpg"},{name:"Modern",img:"/templates/helsinki-ca1d2b7f.jpg"},{name:"Regular",img:"/templates/shanghai-resume-templates.jpg"},{name:"Minimal",img:"/templates/singapore-6d371a1d.jpg"},{name:"Creative",img:"/templates/sydney-resume-templates.jpg"},{name:"Executive",img:"/templates/vienna-resume-templates.jpg"}];
  function tplCard(t) {
    return '<div class="tpl-card" data-open-form>' +
      '<div class="tpl-preview" style="padding:0;background:#f4f4f5"><img src="' + t.img + '" alt="' + t.name + '" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy"/><div class="tpl-overlay"><button type="button" class="tpl-use-btn" data-open-form>Use this template</button></div></div>' +
      '<div class="tpl-meta"><div class="tpl-name">' + t.name + '</div></div>' +
      '</div>';
  }
  var scroller = document.getElementById('tpl-scroll');
  if (scroller) {
    scroller.innerHTML = TEMPLATES.map(tplCard).join('');
    var prevBtn = document.getElementById('tpl-prev');
    var nextBtn = document.getElementById('tpl-next');
    var step = function () { return Math.max(300, scroller.clientWidth * 0.6); };
    if (prevBtn) prevBtn.addEventListener('click', function () { scroller.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scroller.scrollBy({ left: step(), behavior: 'smooth' }); });
    requestAnimationFrame(function () {
      var cards = scroller.querySelectorAll('.tpl-card');
      if (cards[2]) { var c = cards[2]; scroller.scrollLeft = c.offsetLeft - (scroller.clientWidth - c.clientWidth) / 2; }
    });
  }

  // ---------- Reviews ----------
  var REVIEWS = [{n:"Maria G.",m:"Medical Assistant \u00b7 Florida",s:5,t:"I moved to the U.S. two years ago and had no idea how American resumes were supposed to look. They completely rewrote my resume and helped me highlight my experience the right way. Within a month I had three interviews and accepted a better position."},{n:"Carlos M.",m:"Warehouse Associate \u00b7 Texas",s:4,t:"The resume review was very helpful and pointed out mistakes I didn't even notice. I wish there had been a little more guidance on where to apply, but overall it was worth the money."},{n:"Sofia R.",m:"Customer Service Representative \u00b7 Nevada",s:5,t:"Professional, fast, and easy to work with. They explained every change they made to my resume and gave me confidence for interviews. Highly recommended."},{n:"Juan P.",m:"HVAC Technician \u00b7 Arizona",s:4,t:"Before using Mytalora, I wasn't getting any callbacks. After updating my resume and LinkedIn profile, recruiters actually started reaching out to me. The difference was noticeable."},{n:"Andrea L.",m:"Administrative Assistant \u00b7 California",s:5,t:"Very good service and friendly communication. The final resume looked much more professional. The turnaround took a little longer than expected, but the quality was excellent."},{n:"Miguel C.",m:"Electrician \u00b7 New Jersey",s:5,t:"They helped me translate years of experience into a resume that employers could understand. I received interview requests within two weeks and ended up accepting a higher-paying position."},{n:"Valeria T.",m:"Receptionist \u00b7 Illinois",s:4,t:"The interview coaching alone was worth it. I learned how to answer common questions and present my experience confidently. I felt much more prepared."},{n:"Roberto D.",m:"Delivery Driver \u00b7 Georgia",s:5,t:"Good experience overall. The resume looked much cleaner and more organized than what I had before. I would have liked an additional follow-up session, but I was satisfied with the service."},{n:"Elena S.",m:"Dental Assistant \u00b7 Colorado",s:5,t:"I had been applying for jobs for months without success. They restructured my resume and showed me how to tailor it for each position. A few weeks later I received multiple interview invitations."},{n:"Luis A.",m:"Construction Supervisor \u00b7 North Carolina",s:5,t:"Excellent service from start to finish. They understood my background, improved my resume, and gave practical advice for the job search process. I would definitely recommend them."},{n:"Daniel H.",m:"Forklift Operator \u00b7 Ohio",s:4,t:"I thought my resume was fine until they reviewed it. The changes they made were simple but powerful. I started getting responses almost immediately."},{n:"Patricia V.",m:"Cashier \u00b7 Pennsylvania",s:5,t:"Helpful team and clear communication. The resume looked much better afterward. I just wish there were more examples for interview questions."},{n:"Jorge N.",m:"Plumber \u00b7 Nevada",s:5,t:"The resume they created made me look far more professional. I landed two interviews in the first week after updating my applications."},{n:"Melissa F.",m:"Office Coordinator \u00b7 Washington",s:5,t:"Great experience. They organized my work history and made my achievements stand out. I finally felt confident applying for better positions."},{n:"Ricardo B.",m:"Maintenance Technician \u00b7 Michigan",s:4,t:"I had been using the same resume for years. They modernized everything and explained how hiring managers actually review resumes in the U.S."},{n:"Sandra C.",m:"Retail Associate \u00b7 Oregon",s:5,t:"The final resume looked great and the suggestions were useful. It took slightly longer than expected, but the quality made up for it."},{n:"Fernando R.",m:"Truck Driver \u00b7 Tennessee",s:5,t:"Professional service with real results. My applications started getting attention after months of silence. Definitely worth the investment."},{n:"Gabriela M.",m:"Front Desk Associate \u00b7 Florida",s:5,t:"They transformed my resume from a basic document into something that looked professional and polished. I received multiple interview invitations afterward."},{n:"Oscar L.",m:"Carpenter \u00b7 Utah",s:4,t:"I appreciated how they focused on accomplishments instead of just listing duties. My resume finally reflected my actual experience."},{n:"Diana P.",m:"Childcare Provider \u00b7 Virginia",s:5,t:"Very satisfied overall. The resume review was detailed and easy to understand. A little more job search guidance would have been helpful."},{n:"Rafael E.",m:"Security Officer \u00b7 Texas",s:5,t:"They showed me mistakes that were probably costing me interviews. After the update, recruiters started contacting me through LinkedIn."},{n:"Monica A.",m:"Medical Receptionist \u00b7 California",s:5,t:"The interview preparation helped me tremendously. I was nervous before, but I felt much more confident during the hiring process."},{n:"Victor S.",m:"Painter \u00b7 Arizona",s:4,t:"Excellent attention to detail. My resume looked modern, professional, and much easier to read than before."},{n:"Paula G.",m:"Hotel Housekeeper \u00b7 Nevada",s:5,t:"Good service and friendly staff. The recommendations were practical and easy to implement. I would use the service again."},{n:"Hector T.",m:"Restaurant Manager \u00b7 Illinois",s:5,t:"They helped me present my management experience properly. Within weeks I received offers for positions paying more than my previous job."},{n:"Natalia R.",m:"Sales Associate \u00b7 New York",s:5,t:"Everything was explained clearly and professionally. The final resume exceeded my expectations and gave me confidence to apply for higher-level roles."},{n:"Alberto M.",m:"Welder \u00b7 Indiana",s:4,t:"I wasn't sure if a resume service would make a difference, but it absolutely did. The resume they created looked far more professional than anything I could have done myself."},{n:"Veronica D.",m:"Customer Support Specialist \u00b7 Maryland",s:5,t:"The quality was excellent and the feedback was detailed. I only wish there had been one more revision included in my package."},{n:"Esteban C.",m:"Landscaping Supervisor \u00b7 North Carolina",s:5,t:"They helped me organize years of experience into a resume that finally made sense. Recruiters started responding much more often."},{n:"Isabella F.",m:"Dental Hygienist \u00b7 New Mexico",s:5,t:"Outstanding service. Professional, responsive, and very knowledgeable about the U.S. job market. I would recommend Mytalora to anyone looking to improve their career opportunities."}];
  function initials(n) { return n.split(' ').map(function (p) { return p[0]; }).slice(0, 2).join('').toUpperCase(); }
  function rstars(n) { return '★'.repeat(n) + '<span style="color:#e4e4e7">' + '★'.repeat(5 - n) + '</span>'; }
  function rcard(r) {
    return '<div class="tl-rev-card">' +
      '<div class="tl-rev-stars">' + rstars(r.s) + '</div>' +
      '<p class="tl-rev-quote">' + r.t + '</p>' +
      '<div class="tl-rev-author"><div class="tl-rev-avatar">' + initials(r.n) + '</div><div><div class="tl-rev-name">' + r.n + '</div><div class="tl-rev-meta">' + r.m + '</div></div></div>' +
      '</div>';
  }
  var mid = Math.ceil(REVIEWS.length / 2);
  var row1 = REVIEWS.slice(0, mid);
  var row2 = REVIEWS.slice(mid);
  var r1 = document.getElementById('tl-rev-track-1');
  var r2 = document.getElementById('tl-rev-track-2');
  if (r1) r1.innerHTML = row1.concat(row1).map(rcard).join('');
  if (r2) r2.innerHTML = row2.concat(row2).map(rcard).join('');

  // ---------- Bilingual multi-step form ----------
  var I18N = {
    en: {
      step1_title: "Contact information",
      step1_sub: "Let's start with the basics. We'll only use these to deliver your resume.",
      f_name: "First & last name", f_email: "Email", f_phone: "Phone", f_city: "City", f_lang: "Preferred language",
      step2_title: "Your current situation",
      step2_sub: "This helps us understand your level and the work involved.",
      f_working: "Are you currently working?",
      working: ["Yes, full time", "Yes, part time", "No, actively searching", "Planning to search"],
      f_industry: "Industry you want to work in",
      industry_placeholder: "Select…",
      industry: ["Construction / Trades", "Warehouse / Logistics", "Hospitality / Restaurant", "Customer Service", "Healthcare", "Office / Administration", "IT / Technology", "Other"],
      f_exp: "Years of experience",
      exp: ["No experience", "Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"],
      f_hasResume: "Do you have a resume?",
      hasResume: ["Yes, in English", "Yes, in Spanish", "Yes, in both", "No"],
      f_english: "English level",
      english: ["Beginner", "Intermediate", "Advanced", "Fluent"],
      step3_title: "Resume details",
      step3_sub: "The more detail you share, the stronger your resume will be.",
      f_title: "Desired job title",
      f_skills: "Key skills (comma separated)",
      f_education: "Education", education_ph: "High school, technical school, college…",
      f_certs: "Certifications or licenses",
      f_jobs: "Last 2–3 jobs (company, role, dates, achievements)",
      f_strength: "Your biggest strength", strength_ph: "Reliable, fast learner, leadership…",
      f_challenge: "What's your biggest challenge in your job search?",
      challenge: ["Few responses", "No interview invites", "Resume looks unprofessional", "Hard to explain my experience", "Weak English", "Other"],
      step4_title: "Choose your package",
      step4_sub: "Pick the level of support you want. We auto-recommended the best fit below.",
      rec_pre: "Based on your answers we recommend the", rec_post: "package.",
      plan49_name: "AI JOB STARTER",
      plan49_price: "$19.99/week",
      plan49_trial: "3 days free",
      plan49_intro: "Stop spending hours searching for jobs. Our AI assistant helps you start your job search faster.",
      plan49_features: [
        "Professional resume creation and optimization",
        "AI finds jobs that match your experience",
        "AI continuously searches for new opportunities",
        "Personalized job recommendations",
        "Career guidance and job market insights",
        "Weekly updates on matching opportunities"
      ],
      plan49_best: "People who want to get started with AI-powered job search support.",
      plan249_name: "AI JOB ASSISTANT",
      plan249_price: "$29.99/week",
      plan249_intro: "Let AI handle your job search while you focus on your life. Everything in Starter, plus more.",
      plan249_features: [
        "Everything in Starter, plus:",
        "AI searches for jobs daily",
        "Resume optimized for better opportunities",
        "AI identifies employers that match your profile",
        "Application assistance and job tracking",
        "Interview preparation support",
        "Higher-paying opportunity recommendations",
        "Priority job matching"
      ],
      plan249_best: "People who want AI to actively manage their job search daily.",
      plan549_name: "AI CAREER PRO",
      plan549_price: "$49.99/week",
      plan549_intro: "Our most advanced job search solution. Everything in Job Assistant, plus premium features.",
      plan549_features: [
        "Everything in Job Assistant, plus:",
        "Maximum AI-powered job search automation",
        "Priority access to new opportunities",
        "Advanced employer matching",
        "Personalized career growth recommendations",
        "Salary and market analysis",
        "Priority support",
        "Ongoing career assistance"
      ],
      plan549_best: "Designed for people who want the fastest and most comprehensive job search experience.",
      best_for: "Best for",
      tag_popular: "MOST POPULAR",
      tag_premium: "PREMIUM",
      select_all: "Select all — I agree to all of the items below",
      recommended: "Recommended",
      step5_title: "Consent & checkout",
      step5_sub: "Please confirm the following before we move to payment.",
      consents: [
        "I have read and agree to the Terms of Use and Privacy Policy.",
        "I understand Mytalora provides resume, interview prep, coaching and educational services.",
        "I understand Mytalora is NOT an employer, staffing agency, or recruiting company.",
        "I understand purchasing does not guarantee employment, interviews, offers, income or any specific outcome.",
        "I understand results depend on my experience, skills, language, qualifications and the labor market.",
        "All information I provided is true and current.",
        "I understand refunds may be limited once personalized work has begun, per the refund policy.",
        "I agree to electronic order processing and accept that my consent is legally binding.",
        "I confirm I am of legal age and able to enter into contracts and make payments.",
        "I understand services are delivered on a best-effort basis without guaranteed outcomes."
      ],
      btn_back: "Back", btn_next: "Next →", btn_submit: "Submit", btn_close: "Close",
      step_label: "Step", step_of: "of", complete: "Complete",
      success_title: "You're all set,", default_name: "amigo",
      success_pre: "We received your request for the", success_pkg: "package", success_email_pre: "Our team will email", success_email_post: "within 24 hours with payment details and next steps."
    },
    es: {
      step1_title: "Información de contacto",
      step1_sub: "Empecemos con lo básico. Solo lo usaremos para entregar tu currículum.",
      f_name: "Nombre y apellido", f_email: "Correo electrónico", f_phone: "Teléfono", f_city: "Ciudad", f_lang: "Idioma preferido",
      step2_title: "Tu situación actual",
      step2_sub: "Esto nos ayuda a entender tu nivel y el trabajo necesario.",
      f_working: "¿Estás trabajando actualmente?",
      working: ["Sí, tiempo completo", "Sí, medio tiempo", "No, buscando activamente", "Planeo buscar"],
      f_industry: "Industria en la que quieres trabajar",
      industry_placeholder: "Selecciona…",
      industry: ["Construcción / Oficios", "Almacén / Logística", "Hostelería / Restaurantes", "Servicio al cliente", "Salud", "Oficina / Administración", "Tecnología / TI", "Otro"],
      f_exp: "Años de experiencia",
      exp: ["Sin experiencia", "Menos de 1 año", "1–3 años", "3–5 años", "Más de 5 años"],
      f_hasResume: "¿Tienes un currículum?",
      hasResume: ["Sí, en inglés", "Sí, en español", "Sí, en ambos", "No"],
      f_english: "Nivel de inglés",
      english: ["Principiante", "Intermedio", "Avanzado", "Fluido"],
      step3_title: "Detalles del currículum",
      step3_sub: "Mientras más detalles compartas, más fuerte será tu currículum.",
      f_title: "Puesto deseado",
      f_skills: "Habilidades clave (separadas por comas)",
      f_education: "Educación", education_ph: "Secundaria, escuela técnica, universidad…",
      f_certs: "Certificaciones o licencias",
      f_jobs: "Últimos 2–3 trabajos (empresa, puesto, fechas, logros)",
      f_strength: "Tu mayor fortaleza", strength_ph: "Confiable, aprende rápido, liderazgo…",
      f_challenge: "¿Cuál es tu mayor desafío en la búsqueda de empleo?",
      challenge: ["Pocas respuestas", "Sin invitaciones a entrevistas", "Currículum se ve poco profesional", "Difícil explicar mi experiencia", "Inglés débil", "Otro"],
      step4_title: "Elige tu paquete",
      step4_sub: "Elige el nivel de soporte que quieras. Recomendamos automáticamente la mejor opción.",
      rec_pre: "Según tus respuestas recomendamos el paquete de", rec_post: ".",
      plan49_name: "Revisión",
      plan49_price: "$19.99/semana",
      plan49_trial: "3 días gratis",
      plan49_intro: "Para quienes ya tienen un currículum y quieren saber qué mejorar.",
      plan49_features: [
        "Revisión profesional de tu currículum actual",
        "Análisis de los principales problemas",
        "Lista escrita de recomendaciones",
        "Consejos generales para buscar trabajo en EE. UU."
      ],
      plan49_best: "Personas que ya tienen un currículum y quieren retroalimentación experta antes de postularse.",
      plan249_name: "Profesional",
      plan249_intro: "El más popular. Un currículum nuevo desde cero al estilo americano.",
      plan249_features: [
        "Complete ATS-optimized resume rewrite",
        "Professional formatting and structure",
        "Achievement-focused content that attracts recruiters",
        "Personalized career consultation",
        "Career path and profession analysis",
        "Job search strategy and tailored vacancy recommendations based on your experience",
        "LinkedIn profile optimization",
        "Interview preparation and coaching",
        "Bilingual support (English & Spanish)",
        "Delivered ready to apply."
      ],
      plan249_best: "Personas que buscan un currículum competitivo que destaque en el mercado laboral de EE. UU.",
      plan549_name: "Premium",
      plan549_intro: "Soporte completo personalizado con consultoría 1 a 1.",
      plan549_features: [
        "Complete ATS-optimized resume rewrite",
        "Professional formatting and structure",
        "Achievement-focused content that attracts recruiters",
        "1-on-1 career consultation",
        "Professional career assessment and job market analysis",
        "Personalized job recommendations matching your background and goals",
        "LinkedIn profile optimization to increase recruiter visibility",
        "Interview preparation with common questions and answer strategies",
        "Bilingual support (English & Spanish)",
        "Delivered ready to apply and start applying immediately"
      ],
      plan549_best: "Profesionales que quieren el más alto nivel de soporte y la mayor ventaja en su búsqueda de empleo.",
      best_for: "Ideal para",
      tag_popular: "MÁS POPULAR",
      tag_premium: "PREMIUM",
      select_all: "Seleccionar todo — Acepto todos los puntos siguientes",
      recommended: "Recomendado",
      step5_title: "Consentimiento y pago",
      step5_sub: "Por favor confirma lo siguiente antes de pasar al pago.",
      consents: [
        "He leído y acepto los Términos de Uso y la Política de Privacidad.",
        "Entiendo que Mytalora proporciona servicios de currículum, preparación de entrevistas, coaching y educación.",
        "Entiendo que Mytalora NO es un empleador, agencia de personal ni empresa de reclutamiento.",
        "Entiendo que la compra no garantiza empleo, entrevistas, ofertas, ingresos ni ningún resultado específico.",
        "Entiendo que los resultados dependen de mi experiencia, habilidades, idioma, calificaciones y mercado laboral.",
        "Toda la información que proporcioné es verdadera y actual.",
        "Entiendo que los reembolsos pueden ser limitados una vez iniciado el trabajo personalizado.",
        "Acepto el procesamiento electrónico del pedido y que mi consentimiento es legalmente vinculante.",
        "Confirmo que soy mayor de edad y puedo celebrar contratos y realizar pagos.",
        "Entiendo que los servicios se entregan bajo el principio de mejor esfuerzo, sin resultados garantizados."
      ],
      btn_back: "Atrás", btn_next: "Siguiente →", btn_submit: "Enviar", btn_close: "Cerrar",
      step_label: "Paso", step_of: "de", complete: "Completo",
      success_title: "¡Todo listo,", default_name: "amigo",
      success_pre: "Recibimos tu solicitud para el", success_pkg: "paquete", success_email_pre: "Nuestro equipo enviará un correo a", success_email_post: "en 24 horas con los detalles de pago y los próximos pasos."
    }
  };

  var state = { step: 0, data: { lang: "English" } };
  function curLang() { return state.data.lang === 'English' ? 'en' : 'es'; }
  function L() { return I18N[curLang()]; }

  function esc(v) { return (v == null ? '' : String(v)).replace(/"/g, '&quot;'); }
  function opts(k, list) {
    return '<div class="tl-options">' + list.map(function (o) {
      var sel = state.data[k] === o ? 'is-selected' : '';
      return '<label class="tl-opt ' + sel + '"><input type="radio" name="' + k + '" value="' + esc(o) + '" ' + (state.data[k] === o ? 'checked' : '') + '/> <span>' + o + '</span></label>';
    }).join('') + '</div>';
  }
  function planCard(price, name, priceLabel, intro, features, best, tag, isSelected) {
    var sel = isSelected ? 'is-selected' : '';
    var tagHtml = tag ? '<span class="tl-plan-badge ' + (price === '549' ? 'is-premium' : '') + '">' + tag + '</span>' : '';
    var feats = (features || []).map(function (f) { return '<li>' + f + '</li>'; }).join('');
    var subPrice = priceLabel || ('$' + price);
    var trial = L().plan49_trial;
    var priceHtml = (price === '49' && trial)
      ? '<div class="tl-price">' + trial + '<span class="tl-price-sub">' + subPrice + '</span></div>'
      : '<div class="tl-price">' + subPrice + '</div>';
    return '<div class="tl-plan ' + sel + (price === '249' ? ' is-popular' : '') + (price === '549' ? ' is-premium' : '') + '" data-plan="' + price + '">'
      + tagHtml
      + '<h4>' + name + '</h4>'
      + priceHtml
      + '<p class="tl-plan-intro">' + intro + '</p>'
      + '<ul class="tl-plan-feats">' + feats + '</ul>'
      + '<div class="tl-plan-best"><strong>' + L().best_for + ':</strong> ' + best + '</div>'
      + '</div>';
  }
  function consent(k, text) {
    return '<label><input type="checkbox" data-k="' + k + '" data-consent ' + (state.data[k] ? 'checked' : '') + '/> <span>' + text + '</span></label>';
  }
  function recommendPlan() {
    var has = (state.data.hasResume || '').toLowerCase();
    var exp = state.data.exp || '';
    var t = L();
    if (has.indexOf('no') === 0) return '549';
    if (exp === t.exp[4] || exp === t.exp[3]) return '249';
    if ((has.indexOf('yes') === 0 || has.indexOf('sí') === 0 || has.indexOf('si') === 0) && (exp === t.exp[1] || exp === t.exp[0])) return '49';
    return '249';
  }

  function makeSteps() {
    var t = L();
    return [
      {
        title: t.step1_title, sub: t.step1_sub,
        render: function () {
          return ''
            + '<div class="tl-field"><label>' + t.f_name + '</label><input type="text" data-k="name" value="' + esc(state.data.name) + '" placeholder="María García"/></div>'
            + '<div class="tl-field"><label>' + t.f_email + '</label><input type="email" data-k="email" value="' + esc(state.data.email) + '" placeholder="email@example.com"/></div>'
            + '<div class="tl-field"><label>' + t.f_phone + '</label><input type="tel" data-k="phone" value="' + esc(state.data.phone) + '" placeholder="(555) 555-5555"/></div>'
            + '<div class="tl-field"><label>' + t.f_city + '</label><input type="text" data-k="city" value="' + esc(state.data.city) + '" placeholder="Miami, FL"/></div>'
            + '<div class="tl-field"><label>' + t.f_lang + '</label>' + opts('lang', ['Español', 'English']) + '</div>';
        },
        valid: function () { return state.data.name && state.data.email && state.data.phone && state.data.city && state.data.lang; }
      },
      {
        title: t.step2_title, sub: t.step2_sub,
        render: function () {
          return ''
            + '<div class="tl-field"><label>' + t.f_working + '</label>' + opts('working', t.working) + '</div>'
            + '<div class="tl-field"><label>' + t.f_industry + '</label>'
            +   '<select data-k="industry"><option value="">' + t.industry_placeholder + '</option>'
            +   t.industry.map(function (o) { return '<option ' + (state.data.industry === o ? 'selected' : '') + '>' + o + '</option>'; }).join('') + '</select></div>'
            + '<div class="tl-field"><label>' + t.f_exp + '</label>' + opts('exp', t.exp) + '</div>'
            + '<div class="tl-field"><label>' + t.f_hasResume + '</label>' + opts('hasResume', t.hasResume) + '</div>'
            + '<div class="tl-field"><label>' + t.f_english + '</label>' + opts('english', t.english) + '</div>';
        },
        valid: function () { return state.data.working && state.data.industry && state.data.exp && state.data.hasResume && state.data.english; }
      },
      {
        title: t.step3_title, sub: t.step3_sub,
        render: function () {
          return ''
            + '<div class="tl-field"><label>' + t.f_title + '</label><input type="text" data-k="title" value="' + esc(state.data.title) + '" placeholder="Warehouse Supervisor"/></div>'
            + '<div class="tl-field"><label>' + t.f_skills + '</label><textarea data-k="skills" placeholder="Forklift, inventory, bilingual, leadership…">' + esc(state.data.skills) + '</textarea></div>'
            + '<div class="tl-field"><label>' + t.f_education + '</label><input type="text" data-k="education" value="' + esc(state.data.education) + '" placeholder="' + t.education_ph + '"/></div>'
            + '<div class="tl-field"><label>' + t.f_certs + '</label><input type="text" data-k="certs" value="' + esc(state.data.certs) + '" placeholder="OSHA 10, CDL Class A, CNA…"/></div>'
            + '<div class="tl-field"><label>' + t.f_jobs + '</label><textarea data-k="jobs" placeholder="2022–2024 · ABC Construction · Foreman">' + esc(state.data.jobs) + '</textarea></div>'
            + '<div class="tl-field"><label>' + t.f_strength + '</label><input type="text" data-k="strength" value="' + esc(state.data.strength) + '" placeholder="' + t.strength_ph + '"/></div>'
            + '<div class="tl-field"><label>' + t.f_challenge + '</label>' + opts('challenge', t.challenge) + '</div>';
        },
        valid: function () { return state.data.title && state.data.skills; }
      },
      {
        title: t.step4_title, sub: t.step4_sub,
        render: function () {
          var rec = recommendPlan();
          state.data.plan = state.data.plan || rec;
          var recName = rec === '49' ? t.plan49_name : rec === '249' ? t.plan249_name : t.plan549_name;
          return '<div class="tl-rec">💡 ' + t.rec_pre + ' <strong>' + recName + '</strong> ' + t.rec_post + '</div>'
            + '<div class="tl-plans">'
            +   planCard('49', t.plan49_name, t.plan49_price, t.plan49_intro, t.plan49_features, t.plan49_best, '', state.data.plan === '49')
            +   planCard('249', t.plan249_name, t.plan249_price, t.plan249_intro, t.plan249_features, t.plan249_best, t.tag_popular, state.data.plan === '249')
            +   planCard('549', t.plan549_name, t.plan549_price, t.plan549_intro, t.plan549_features, t.plan549_best, t.tag_premium, state.data.plan === '549')
            + '</div>';
        },
        valid: function () { return !!state.data.plan; }
      },
      {
        title: t.step5_title, sub: t.step5_sub,
        render: function () {
          return '<div class="tl-consents">'
            + '<label class="tl-consent-all"><input type="checkbox" data-consent-all ' + (t.consents.every(function (_, i) { return state.data['c' + (i + 1)]; }) ? 'checked' : '') + '/> <span><strong>' + t.select_all + '</strong></span></label>'
            + t.consents.map(function (c, i) { return consent('c' + (i + 1), c); }).join('')
            + '</div>';
        },
        valid: function () { return ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10'].every(function (k) { return state.data[k]; }); }
      }
    ];
  }

  function render() {
    var t = L();
    var steps = makeSteps();
    var isLast = state.step >= steps.length;
    var body = document.getElementById('tl-body');
    var fill = document.getElementById('tl-progress-fill');
    var label = document.getElementById('tl-step-label');
    var back = document.getElementById('tl-back');
    var next = document.getElementById('tl-next');
    back.textContent = t.btn_back;
    if (isLast) {
      var planName = state.data.plan === '49' ? t.plan49_name : state.data.plan === '249' ? t.plan249_name : t.plan549_name;
      body.innerHTML = '<div class="tl-success"><div class="tl-check">✓</div><h3>' + t.success_title + ' ' + esc(state.data.name || t.default_name) + (curLang() === 'es' ? '!' : '!') + '</h3><p class="tl-sub">' + t.success_pre + ' <strong>' + planName + '</strong>. ' + t.success_email_pre + ' <strong>' + esc(state.data.email) + '</strong> ' + t.success_email_post + '</p></div>';
      fill.style.width = '100%';
      label.textContent = t.complete;
      back.style.display = 'none';
      next.textContent = t.btn_close;
      next.dataset.action = 'close';
      return;
    }
    var s = steps[state.step];
    body.innerHTML = '<h3>' + s.title + '</h3><p class="tl-sub">' + s.sub + '</p>' + s.render();
    fill.style.width = ((state.step + 1) / steps.length * 100) + '%';
    label.textContent = t.step_label + ' ' + (state.step + 1) + ' ' + t.step_of + ' ' + steps.length;
    back.style.display = state.step === 0 ? 'none' : '';
    next.textContent = state.step === steps.length - 1 ? t.btn_submit : t.btn_next;
    next.dataset.action = '';
    next.disabled = !s.valid();
    body.querySelectorAll('input[data-k],textarea[data-k],select[data-k]').forEach(function (el) {
      var h = function () {
        state.data[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value;
        next.disabled = !s.valid();
      };
      el.addEventListener('input', h);
      el.addEventListener('change', h);
    });
    body.querySelectorAll('input[type=radio]').forEach(function (el) {
      el.addEventListener('change', function () {
        state.data[el.name] = el.value;
        render();
      });
    });
    body.querySelectorAll('.tl-plan').forEach(function (el) {
      el.addEventListener('click', function () {
        state.data.plan = el.dataset.plan;
        render();
      });
    });
    var allBox = body.querySelector('[data-consent-all]');
    if (allBox) {
      allBox.addEventListener('change', function () {
        var checked = allBox.checked;
        body.querySelectorAll('input[data-consent]').forEach(function (cb) {
          cb.checked = checked;
          state.data[cb.dataset.k] = checked;
        });
        next.disabled = !steps[state.step].valid();
      });
    }
  }

  function open() {
    state.step = 0;
    document.body.style.overflow = 'hidden';
    document.getElementById('tl-modal').classList.add('is-open');
    render();
  }
  function close() {
    document.getElementById('tl-modal').classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-open-form]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
  document.getElementById('tl-close').addEventListener('click', close);
  document.getElementById('tl-modal').addEventListener('click', function (e) { if (e.target.id === 'tl-modal') close(); });
  document.getElementById('tl-back').addEventListener('click', function () { if (state.step > 0) { state.step--; render(); } });
  document.getElementById('tl-next').addEventListener('click', function () {
    var btn = document.getElementById('tl-next');
    if (btn.dataset.action === 'close') { close(); return; }
    var steps = makeSteps();
    var isFinal = state.step === steps.length - 1;
    if (isFinal) {
      if (!steps[state.step].valid()) return;
      btn.disabled = true;
      var origText = btn.textContent;
      btn.textContent = 'Redirigiendo al pago…';
      var plan = state.data.plan;
      try { localStorage.setItem('lang', 'es'); } catch (e) {}
      var now = new Date();
      var dateStr = now.toLocaleDateString('ru-RU');
      var timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      var orderId = 'TL-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
      var leadPayload = {};
      for (var lk in state.data) { if (Object.prototype.hasOwnProperty.call(state.data, lk)) leadPayload[lk] = state.data[lk]; }
      leadPayload.date = dateStr;
      leadPayload.time = timeStr;
      leadPayload.order_id = orderId;
      try {
        fetch('/api/public/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
          keepalive: true
        }).catch(function () {});
        localStorage.setItem('tl-pending-payment', JSON.stringify({
          order_id: orderId,
          amount: plan,
          currency: 'USD',
          email: state.data.email || '',
          plan: plan,
          lang: state.data.lang || 'es'
        }));
      } catch (e) {}
      fetch('/api/public/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan, email: state.data.email || '', order_id: orderId, lang: 'es' })
      }).then(function (r) { return r.json(); }).then(function (j) {
        if (j && j.url) { window.location.href = j.url; }
        else { btn.disabled = false; btn.textContent = origText; alert((j && j.error) || 'Error de pago'); }
      }).catch(function () {
        btn.disabled = false; btn.textContent = origText; alert('Error de pago');
      });
      return;
    }
    state.step++;
    render();
  });
})();

// Typewriter for hero
(function(){
  function startTypewriter(){
    var el = document.querySelector('.tl-typewriter');
    if (!el || el.dataset.started) return;
    el.dataset.started = '1';
    var words;
    try { words = JSON.parse(el.getAttribute('data-words') || '[]'); } catch(e) { words = []; }
    if (!words.length) return;
    var i = 0, j = 0, deleting = false;
    function tick(){
      var w = words[i];
      if (!deleting) {
        j++;
        el.textContent = w.slice(0, j);
        if (j >= w.length) { deleting = true; setTimeout(tick, 1600); return; }
        setTimeout(tick, 80);
      } else {
        j--;
        el.textContent = w.slice(0, j);
        if (j <= 0) { deleting = false; i = (i + 1) % words.length; setTimeout(tick, 220); return; }
        setTimeout(tick, 40);
      }
    }
    setTimeout(tick, 800);
  }
  startTypewriter();
  setTimeout(startTypewriter, 300);
})();

(function(){
  function initReveal(){
    var els = document.querySelectorAll('.tl-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function(e){ e.classList.add('tl-reveal-in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          en.target.classList.add('tl-reveal-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18 });
    els.forEach(function(e){ io.observe(e); });
  }
  if (document.readyState !== 'loading') initReveal();
  else document.addEventListener('DOMContentLoaded', initReveal);
  setTimeout(initReveal, 400);
})();

// Direct checkout from pricing section CTAs
(function(){
  function init(){
    document.addEventListener('click', function(e){
      var a = e.target && e.target.closest && e.target.closest('.tl-pricing-cta');
      if (!a) return;
      var plan = a.getAttribute('data-tl-plan');
      if (!plan) return;
      e.preventDefault();
      if (a.dataset.tlLoading === '1') return;
      a.dataset.tlLoading = '1';
      var orig = a.textContent;
      a.textContent = 'Cargando…';
      var orderId = 'TL-' + Date.now() + '-' + Math.random().toString(36).slice(2,8);
      try {
        localStorage.setItem('tl-pending-payment', JSON.stringify({
          order_id: orderId, amount: plan, currency: 'USD', email: '', plan: plan, lang: 'es'
        }));
      } catch(_){}
      fetch('/api/public/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan, order_id: orderId, lang: 'es' })
      }).then(function(r){ return r.json(); }).then(function(j){
        if (j && j.url) { window.location.href = j.url; }
        else { a.textContent = orig; a.dataset.tlLoading = ''; alert((j && j.error) || 'Error de pago'); }
      }).catch(function(){
        a.textContent = orig; a.dataset.tlLoading = ''; alert('Error de pago');
      });
    });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

// Hero rotating text animation
(function () {
  var HOLD = 2500;
  var ERASE_DELAY = 55;
  var TYPE_DELAY = 70;
  var BETWEEN_PAUSE = 400;

  function initRotator(el) {
    var phrases = JSON.parse(el.getAttribute('data-phrases') || '[]');
    if (!phrases.length) return;
    var index = 0;

    function renderLetters(text, visible) {
      el.innerHTML = '';
      var chars = text.split('');
      for (var i = 0; i < chars.length; i++) {
        var span = document.createElement('span');
        var isSpace = chars[i] === ' ';
        span.className = 'letter' + (isSpace ? ' space' : '') + (visible ? ' visible' : '');
        span.style.setProperty('--i', i);
        span.textContent = isSpace ? '\u00A0' : chars[i];
        el.appendChild(span);
      }
    }

    function erase() {
      var letters = el.querySelectorAll('.letter');
      letters.forEach(function (letter, i) {
        setTimeout(function () { letter.classList.remove('visible'); }, i * ERASE_DELAY);
      });
      return new Promise(function (resolve) {
        setTimeout(resolve, letters.length * ERASE_DELAY + 300);
      });
    }

    function type(text) {
      renderLetters(text, false);
      var letters = el.querySelectorAll('.letter');
      letters.forEach(function (letter, i) {
        setTimeout(function () { letter.classList.add('visible'); }, i * TYPE_DELAY + 80);
      });
      return new Promise(function (resolve) {
        setTimeout(resolve, letters.length * TYPE_DELAY + 400);
      });
    }

    function loop() {
      setTimeout(function () {
        erase().then(function () {
          index = (index + 1) % phrases.length;
          setTimeout(function () {
            type(phrases[index]).then(function () {
              loop();
            });
          }, BETWEEN_PAUSE);
        });
      }, HOLD);
    }

    renderLetters(phrases[0], true);
    loop();
  }

  function boot() {
    var el = document.querySelector('.tl-rotator-js');
    if (!el) return;
    initRotator(el);
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
  setTimeout(boot, 600);
})();
