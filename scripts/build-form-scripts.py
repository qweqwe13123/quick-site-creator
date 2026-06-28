#!/usr/bin/env python3
"""Generate src/site-clone/script.js and script.es.js with bilingual form."""
import pathlib, json

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src" / "site-clone"

REVIEWS_EN = [
    ("Maria G.", "Medical Assistant · Florida", 5, "I moved to the U.S. two years ago and had no idea how American resumes were supposed to look. They completely rewrote my resume and helped me highlight my experience the right way. Within a month I had three interviews and accepted a better position."),
    ("Carlos M.", "Warehouse Associate · Texas", 4, "The resume review was very helpful and pointed out mistakes I didn't even notice. I wish there had been a little more guidance on where to apply, but overall it was worth the money."),
    ("Sofia R.", "Customer Service Representative · Nevada", 5, "Professional, fast, and easy to work with. They explained every change they made to my resume and gave me confidence for interviews. Highly recommended."),
    ("Juan P.", "HVAC Technician · Arizona", 4, "Before using Trabajo Listo, I wasn't getting any callbacks. After updating my resume and LinkedIn profile, recruiters actually started reaching out to me. The difference was noticeable."),
    ("Andrea L.", "Administrative Assistant · California", 5, "Very good service and friendly communication. The final resume looked much more professional. The turnaround took a little longer than expected, but the quality was excellent."),
    ("Miguel C.", "Electrician · New Jersey", 5, "They helped me translate years of experience into a resume that employers could understand. I received interview requests within two weeks and ended up accepting a higher-paying position."),
    ("Valeria T.", "Receptionist · Illinois", 4, "The interview coaching alone was worth it. I learned how to answer common questions and present my experience confidently. I felt much more prepared."),
    ("Roberto D.", "Delivery Driver · Georgia", 5, "Good experience overall. The resume looked much cleaner and more organized than what I had before. I would have liked an additional follow-up session, but I was satisfied with the service."),
    ("Elena S.", "Dental Assistant · Colorado", 5, "I had been applying for jobs for months without success. They restructured my resume and showed me how to tailor it for each position. A few weeks later I received multiple interview invitations."),
    ("Luis A.", "Construction Supervisor · North Carolina", 5, "Excellent service from start to finish. They understood my background, improved my resume, and gave practical advice for the job search process. I would definitely recommend them."),
    ("Daniel H.", "Forklift Operator · Ohio", 4, "I thought my resume was fine until they reviewed it. The changes they made were simple but powerful. I started getting responses almost immediately."),
    ("Patricia V.", "Cashier · Pennsylvania", 5, "Helpful team and clear communication. The resume looked much better afterward. I just wish there were more examples for interview questions."),
    ("Jorge N.", "Plumber · Nevada", 5, "The resume they created made me look far more professional. I landed two interviews in the first week after updating my applications."),
    ("Melissa F.", "Office Coordinator · Washington", 5, "Great experience. They organized my work history and made my achievements stand out. I finally felt confident applying for better positions."),
    ("Ricardo B.", "Maintenance Technician · Michigan", 4, "I had been using the same resume for years. They modernized everything and explained how hiring managers actually review resumes in the U.S."),
    ("Sandra C.", "Retail Associate · Oregon", 5, "The final resume looked great and the suggestions were useful. It took slightly longer than expected, but the quality made up for it."),
    ("Fernando R.", "Truck Driver · Tennessee", 5, "Professional service with real results. My applications started getting attention after months of silence. Definitely worth the investment."),
    ("Gabriela M.", "Front Desk Associate · Florida", 5, "They transformed my resume from a basic document into something that looked professional and polished. I received multiple interview invitations afterward."),
    ("Oscar L.", "Carpenter · Utah", 4, "I appreciated how they focused on accomplishments instead of just listing duties. My resume finally reflected my actual experience."),
    ("Diana P.", "Childcare Provider · Virginia", 5, "Very satisfied overall. The resume review was detailed and easy to understand. A little more job search guidance would have been helpful."),
    ("Rafael E.", "Security Officer · Texas", 5, "They showed me mistakes that were probably costing me interviews. After the update, recruiters started contacting me through LinkedIn."),
    ("Monica A.", "Medical Receptionist · California", 5, "The interview preparation helped me tremendously. I was nervous before, but I felt much more confident during the hiring process."),
    ("Victor S.", "Painter · Arizona", 4, "Excellent attention to detail. My resume looked modern, professional, and much easier to read than before."),
    ("Paula G.", "Hotel Housekeeper · Nevada", 5, "Good service and friendly staff. The recommendations were practical and easy to implement. I would use the service again."),
    ("Hector T.", "Restaurant Manager · Illinois", 5, "They helped me present my management experience properly. Within weeks I received offers for positions paying more than my previous job."),
    ("Natalia R.", "Sales Associate · New York", 5, "Everything was explained clearly and professionally. The final resume exceeded my expectations and gave me confidence to apply for higher-level roles."),
    ("Alberto M.", "Welder · Indiana", 4, "I wasn't sure if a resume service would make a difference, but it absolutely did. The resume they created looked far more professional than anything I could have done myself."),
    ("Veronica D.", "Customer Support Specialist · Maryland", 5, "The quality was excellent and the feedback was detailed. I only wish there had been one more revision included in my package."),
    ("Esteban C.", "Landscaping Supervisor · North Carolina", 5, "They helped me organize years of experience into a resume that finally made sense. Recruiters started responding much more often."),
    ("Isabella F.", "Dental Hygienist · New Mexico", 5, "Outstanding service. Professional, responsive, and very knowledgeable about the U.S. job market. I would recommend Trabajo Listo to anyone looking to improve their career opportunities."),
]

REVIEWS_ES = [
    ("María G.", "Asistente Médica · Florida", 5, "Me mudé a Estados Unidos hace dos años y no tenía idea de cómo debía verse un currículum en este país. Reescribieron completamente mi currículum y me ayudaron a destacar mi experiencia de la manera correcta. En menos de un mes tuve tres entrevistas y acepté un mejor puesto de trabajo."),
    ("Carlos M.", "Asociado de Almacén · Texas", 4, "La revisión de mi currículum fue muy útil y me señalaron errores que ni siquiera había notado. Me hubiera gustado recibir un poco más de orientación sobre dónde postularme, pero en general valió la pena la inversión."),
    ("Sofia R.", "Representante de Servicio al Cliente · Nevada", 5, "Profesionales, rápidos y muy fáciles de tratar. Me explicaron cada cambio que hicieron en mi currículum y me dieron confianza para las entrevistas. Los recomiendo totalmente."),
    ("Juan P.", "Técnico de HVAC · Arizona", 4, "Antes de usar Trabajo Listo no recibía llamadas de los empleadores. Después de actualizar mi currículum y perfil de LinkedIn, los reclutadores comenzaron a contactarme. La diferencia fue notable."),
    ("Andrea L.", "Asistente Administrativa · California", 5, "Muy buen servicio y excelente comunicación. El currículum final se veía mucho más profesional. El proceso tomó un poco más de tiempo de lo esperado, pero la calidad fue excelente."),
    ("Miguel C.", "Electricista · Nueva Jersey", 5, "Me ayudaron a convertir años de experiencia en un currículum que los empleadores pudieran entender fácilmente. Recibí solicitudes de entrevista en menos de dos semanas y terminé aceptando un puesto mejor remunerado."),
    ("Valeria T.", "Recepcionista · Illinois", 4, "La preparación para entrevistas por sí sola valió la pena. Aprendí a responder preguntas comunes y a presentar mi experiencia con confianza. Me sentí mucho más preparada."),
    ("Roberto D.", "Conductor de Reparto · Georgia", 5, "En general fue una buena experiencia. Mi currículum quedó mucho más limpio y organizado que antes. Me hubiera gustado una sesión adicional de seguimiento, pero quedé satisfecho con el servicio."),
    ("Elena S.", "Asistente Dental · Colorado", 5, "Había estado solicitando empleos durante meses sin éxito. Reestructuraron mi currículum y me enseñaron cómo adaptarlo para cada puesto. Unas semanas después recibí múltiples invitaciones para entrevistas."),
    ("Luis A.", "Supervisor de Construcción · Carolina del Norte", 5, "Excelente servicio de principio a fin. Comprendieron mi experiencia, mejoraron mi currículum y me dieron consejos prácticos para la búsqueda de empleo. Definitivamente los recomendaría."),
    ("Daniel H.", "Operador de Montacargas · Ohio", 4, "Pensaba que mi currículum estaba bien hasta que lo revisaron. Los cambios que hicieron fueron simples pero muy efectivos. Comencé a recibir respuestas casi de inmediato."),
    ("Patricia V.", "Cajera · Pensilvania", 5, "Equipo muy servicial y comunicación clara. Mi currículum quedó mucho mejor después de la revisión. Solo me hubiera gustado recibir más ejemplos de preguntas para entrevistas."),
    ("Jorge N.", "Plomero · Nevada", 5, "El currículum que crearon me hizo ver mucho más profesional. Conseguí dos entrevistas durante la primera semana después de actualizar mis solicitudes."),
    ("Melissa F.", "Coordinadora de Oficina · Washington", 5, "Excelente experiencia. Organizaron mi historial laboral y destacaron mis logros. Finalmente me sentí con confianza para postularme a mejores posiciones."),
    ("Ricardo B.", "Técnico de Mantenimiento · Michigan", 4, "Había estado usando el mismo currículum durante años. Modernizaron todo y me explicaron cómo los gerentes de contratación realmente revisan los currículums en Estados Unidos."),
    ("Sandra C.", "Asociada de Ventas Minoristas · Oregón", 5, "El currículum final quedó excelente y las recomendaciones fueron muy útiles. Tomó un poco más de tiempo de lo esperado, pero la calidad compensó la espera."),
    ("Fernando R.", "Conductor de Camión · Tennessee", 5, "Servicio profesional con resultados reales. Mis solicitudes comenzaron a recibir atención después de meses sin respuestas. Definitivamente valió la inversión."),
    ("Gabriela M.", "Recepcionista de Hotel · Florida", 5, "Transformaron mi currículum de un documento básico en algo profesional y pulido. Después recibí múltiples invitaciones para entrevistas."),
    ("Oscar L.", "Carpintero · Utah", 4, "Aprecié que se enfocaran en mis logros en lugar de simplemente enumerar responsabilidades. Mi currículum finalmente reflejó mi verdadera experiencia."),
    ("Diana P.", "Cuidadora Infantil · Virginia", 5, "Muy satisfecha en general. La revisión del currículum fue detallada y fácil de entender. Un poco más de orientación para la búsqueda de empleo habría sido útil."),
    ("Rafael E.", "Oficial de Seguridad · Texas", 5, "Me mostraron errores que probablemente me estaban costando entrevistas. Después de la actualización, los reclutadores comenzaron a contactarme a través de LinkedIn."),
    ("Monica A.", "Recepcionista Médica · California", 5, "La preparación para entrevistas me ayudó muchísimo. Estaba muy nerviosa antes, pero me sentí mucho más segura durante el proceso de contratación."),
    ("Victor S.", "Pintor · Arizona", 4, "Excelente atención a los detalles. Mi currículum se veía moderno, profesional y mucho más fácil de leer que antes."),
    ("Paula G.", "Ama de Llaves de Hotel · Nevada", 5, "Buen servicio y personal amable. Las recomendaciones fueron prácticas y fáciles de implementar. Volvería a utilizar el servicio."),
    ("Hector T.", "Gerente de Restaurante · Illinois", 5, "Me ayudaron a presentar correctamente mi experiencia de gestión. En pocas semanas recibí ofertas para puestos con mejor salario que mi empleo anterior."),
    ("Natalia R.", "Asociada de Ventas · Nueva York", 5, "Todo fue explicado de manera clara y profesional. El currículum final superó mis expectativas y me dio confianza para postularme a puestos de mayor nivel."),
    ("Alberto M.", "Soldador · Indiana", 4, "No estaba seguro de que un servicio de currículums hiciera una diferencia, pero definitivamente la hizo. El currículum que crearon se veía mucho más profesional que cualquier cosa que hubiera podido hacer por mi cuenta."),
    ("Veronica D.", "Especialista en Atención al Cliente · Maryland", 5, "La calidad fue excelente y los comentarios fueron muy detallados. Solo me hubiera gustado que mi paquete incluyera una revisión adicional."),
    ("Esteban C.", "Supervisor de Jardinería · Carolina del Norte", 5, "Me ayudaron a organizar años de experiencia en un currículum que finalmente tenía sentido. Los reclutadores comenzaron a responder con mucha más frecuencia."),
    ("Isabella F.", "Higienista Dental · Nuevo México", 5, "Servicio excepcional. Profesionales, atentos y con un gran conocimiento del mercado laboral estadounidense. Recomendaría Trabajo Listo a cualquiera que quiera mejorar sus oportunidades profesionales."),
]

TEMPLATES_EN = [
    ("Classic", "/templates/chicago-resume-templates.jpg"),
    ("Professional", "/templates/dublin-resume-templates.jpg"),
    ("Modern", "/templates/helsinki-ca1d2b7f.jpg"),
    ("Regular", "/templates/shanghai-resume-templates.jpg"),
    ("Minimal", "/templates/singapore-6d371a1d.jpg"),
    ("Creative", "/templates/sydney-resume-templates.jpg"),
    ("Executive", "/templates/vienna-resume-templates.jpg"),
]

TEMPLATES_ES = [
    ("Clásico", "/templates/chicago-resume-templates.jpg"),
    ("Profesional", "/templates/dublin-resume-templates.jpg"),
    ("Moderno", "/templates/helsinki-ca1d2b7f.jpg"),
    ("Regular", "/templates/shanghai-resume-templates.jpg"),
    ("Minimalista", "/templates/singapore-6d371a1d.jpg"),
    ("Creativo", "/templates/sydney-resume-templates.jpg"),
    ("Ejecutivo", "/templates/vienna-resume-templates.jpg"),
]

def reviews_js(reviews):
    items = ",".join(
        "{n:%s,m:%s,s:%d,t:%s}" % (json.dumps(n), json.dumps(m), s, json.dumps(t))
        for (n, m, s, t) in reviews
    )
    return "[" + items + "]"

def templates_js(templates):
    return "[" + ",".join("{name:%s,img:%s}" % (json.dumps(n), json.dumps(i)) for n, i in templates) + "]"

def build(default_lang, reviews, templates, use_label):
    return f"""(function () {{
  // ---------- Templates carousel ----------
  var TEMPLATES = {templates_js(templates)};
  function tplCard(t) {{
    return '<div class="tpl-card" data-open-form>' +
      '<div class="tpl-preview" style="padding:0;background:#f4f4f5"><img src="' + t.img + '" alt="' + t.name + '" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy"/><div class="tpl-overlay"><button type="button" class="tpl-use-btn" data-open-form>{use_label}</button></div></div>' +
      '<div class="tpl-meta"><div class="tpl-name">' + t.name + '</div></div>' +
      '</div>';
  }}
  var scroller = document.getElementById('tpl-scroll');
  if (scroller) {{
    scroller.innerHTML = TEMPLATES.map(tplCard).join('');
    var prevBtn = document.getElementById('tpl-prev');
    var nextBtn = document.getElementById('tpl-next');
    var step = function () {{ return Math.max(300, scroller.clientWidth * 0.6); }};
    if (prevBtn) prevBtn.addEventListener('click', function () {{ scroller.scrollBy({{ left: -step(), behavior: 'smooth' }}); }});
    if (nextBtn) nextBtn.addEventListener('click', function () {{ scroller.scrollBy({{ left: step(), behavior: 'smooth' }}); }});
    requestAnimationFrame(function () {{
      var cards = scroller.querySelectorAll('.tpl-card');
      if (cards[2]) {{ var c = cards[2]; scroller.scrollLeft = c.offsetLeft - (scroller.clientWidth - c.clientWidth) / 2; }}
    }});
  }}

  // ---------- Reviews ----------
  var REVIEWS = {reviews_js(reviews)};
  function initials(n) {{ return n.split(' ').map(function (p) {{ return p[0]; }}).slice(0, 2).join('').toUpperCase(); }}
  function rstars(n) {{ return '★'.repeat(n) + '<span style="color:#e4e4e7">' + '★'.repeat(5 - n) + '</span>'; }}
  function rcard(r) {{
    return '<div class="tl-rev-card">' +
      '<div class="tl-rev-stars">' + rstars(r.s) + '</div>' +
      '<p class="tl-rev-quote">' + r.t + '</p>' +
      '<div class="tl-rev-author"><div class="tl-rev-avatar">' + initials(r.n) + '</div><div><div class="tl-rev-name">' + r.n + '</div><div class="tl-rev-meta">' + r.m + '</div></div></div>' +
      '</div>';
  }}
  var mid = Math.ceil(REVIEWS.length / 2);
  var row1 = REVIEWS.slice(0, mid);
  var row2 = REVIEWS.slice(mid);
  var r1 = document.getElementById('tl-rev-track-1');
  var r2 = document.getElementById('tl-rev-track-2');
  if (r1) r1.innerHTML = row1.concat(row1).map(rcard).join('');
  if (r2) r2.innerHTML = row2.concat(row2).map(rcard).join('');

  // ---------- Bilingual multi-step form ----------
  var I18N = {{
    en: {{
      step1_title: "Contact information",
      step1_sub: "Let's start with the basics. We'll only use these to deliver your resume.",
      f_name: "First & last name", f_email: "Email", f_phone: "Phone", f_lang: "Preferred language",
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
      plan49_name: "Resume Review", plan49_desc: "Professional review with detailed feedback and rewrite suggestions.",
      plan249_name: "Resume Rewrite", plan249_desc: "Complete professional rewrite. ATS-optimized. Bilingual delivery.",
      plan549_name: "Premium Career Support", plan549_desc: "Full rewrite + LinkedIn + 1:1 interview coaching session.",
      recommended: "Recommended",
      step5_title: "Consent & checkout",
      step5_sub: "Please confirm the following before we move to payment.",
      consents: [
        "I have read and agree to the Terms of Use and Privacy Policy.",
        "I understand Trabajo Listo provides resume, interview prep, coaching and educational services.",
        "I understand Trabajo Listo is NOT an employer, staffing agency, or recruiting company.",
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
    }},
    es: {{
      step1_title: "Información de contacto",
      step1_sub: "Empecemos con lo básico. Solo lo usaremos para entregar tu currículum.",
      f_name: "Nombre y apellido", f_email: "Correo electrónico", f_phone: "Teléfono", f_lang: "Idioma preferido",
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
      plan49_name: "Revisión de currículum", plan49_desc: "Revisión profesional con retroalimentación detallada y sugerencias de reescritura.",
      plan249_name: "Reescritura de currículum", plan249_desc: "Reescritura profesional completa. Optimizada para ATS. Entrega bilingüe.",
      plan549_name: "Soporte Premium de carrera", plan549_desc: "Reescritura completa + LinkedIn + sesión 1:1 de coaching de entrevista.",
      recommended: "Recomendado",
      step5_title: "Consentimiento y pago",
      step5_sub: "Por favor confirma lo siguiente antes de pasar al pago.",
      consents: [
        "He leído y acepto los Términos de Uso y la Política de Privacidad.",
        "Entiendo que Trabajo Listo proporciona servicios de currículum, preparación de entrevistas, coaching y educación.",
        "Entiendo que Trabajo Listo NO es un empleador, agencia de personal ni empresa de reclutamiento.",
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
    }}
  }};

  var state = {{ step: 0, data: {{ lang: "{ 'English' if default_lang == 'en' else 'Español' }" }} }};
  function curLang() {{ return state.data.lang === 'English' ? 'en' : 'es'; }}
  function L() {{ return I18N[curLang()]; }}

  function esc(v) {{ return (v == null ? '' : String(v)).replace(/"/g, '&quot;'); }}
  function opts(k, list) {{
    return '<div class="tl-options">' + list.map(function (o) {{
      var sel = state.data[k] === o ? 'is-selected' : '';
      return '<label class="tl-opt ' + sel + '"><input type="radio" name="' + k + '" value="' + esc(o) + '" ' + (state.data[k] === o ? 'checked' : '') + '/> <span>' + o + '</span></label>';
    }}).join('') + '</div>';
  }}
  function planCard(price, name, desc, isRec) {{
    var sel = state.data.plan === price ? 'is-selected' : '';
    return '<div class="tl-plan ' + sel + '" data-plan="' + price + '">' + (isRec ? '<span class="tl-plan-badge">' + L().recommended + '</span>' : '') + '<h4>' + name + '</h4><div class="tl-price">$' + price + '</div><p>' + desc + '</p></div>';
  }}
  function consent(k, text) {{
    return '<label><input type="checkbox" data-k="' + k + '" ' + (state.data[k] ? 'checked' : '') + '/> <span>' + text + '</span></label>';
  }}
  function recommendPlan() {{
    var has = (state.data.hasResume || '').toLowerCase();
    var exp = state.data.exp || '';
    var t = L();
    if (has.indexOf('no') === 0) return '549';
    if (exp === t.exp[4] || exp === t.exp[3]) return '249';
    if ((has.indexOf('yes') === 0 || has.indexOf('sí') === 0 || has.indexOf('si') === 0) && (exp === t.exp[1] || exp === t.exp[0])) return '49';
    return '249';
  }}

  function makeSteps() {{
    var t = L();
    return [
      {{
        title: t.step1_title, sub: t.step1_sub,
        render: function () {{
          return ''
            + '<div class="tl-field"><label>' + t.f_name + '</label><input type="text" data-k="name" value="' + esc(state.data.name) + '" placeholder="María García"/></div>'
            + '<div class="tl-field"><label>' + t.f_email + '</label><input type="email" data-k="email" value="' + esc(state.data.email) + '" placeholder="email@example.com"/></div>'
            + '<div class="tl-field"><label>' + t.f_phone + '</label><input type="tel" data-k="phone" value="' + esc(state.data.phone) + '" placeholder="(555) 555-5555"/></div>'
            + '<div class="tl-field"><label>' + t.f_lang + '</label>' + opts('lang', ['Español', 'English']) + '</div>';
        }},
        valid: function () {{ return state.data.name && state.data.email && state.data.phone && state.data.lang; }}
      }},
      {{
        title: t.step2_title, sub: t.step2_sub,
        render: function () {{
          return ''
            + '<div class="tl-field"><label>' + t.f_working + '</label>' + opts('working', t.working) + '</div>'
            + '<div class="tl-field"><label>' + t.f_industry + '</label>'
            +   '<select data-k="industry"><option value="">' + t.industry_placeholder + '</option>'
            +   t.industry.map(function (o) {{ return '<option ' + (state.data.industry === o ? 'selected' : '') + '>' + o + '</option>'; }}).join('') + '</select></div>'
            + '<div class="tl-field"><label>' + t.f_exp + '</label>' + opts('exp', t.exp) + '</div>'
            + '<div class="tl-field"><label>' + t.f_hasResume + '</label>' + opts('hasResume', t.hasResume) + '</div>'
            + '<div class="tl-field"><label>' + t.f_english + '</label>' + opts('english', t.english) + '</div>';
        }},
        valid: function () {{ return state.data.working && state.data.industry && state.data.exp && state.data.hasResume && state.data.english; }}
      }},
      {{
        title: t.step3_title, sub: t.step3_sub,
        render: function () {{
          return ''
            + '<div class="tl-field"><label>' + t.f_title + '</label><input type="text" data-k="title" value="' + esc(state.data.title) + '" placeholder="Warehouse Supervisor"/></div>'
            + '<div class="tl-field"><label>' + t.f_skills + '</label><textarea data-k="skills" placeholder="Forklift, inventory, bilingual, leadership…">' + esc(state.data.skills) + '</textarea></div>'
            + '<div class="tl-field"><label>' + t.f_education + '</label><input type="text" data-k="education" value="' + esc(state.data.education) + '" placeholder="' + t.education_ph + '"/></div>'
            + '<div class="tl-field"><label>' + t.f_certs + '</label><input type="text" data-k="certs" value="' + esc(state.data.certs) + '" placeholder="OSHA 10, CDL Class A, CNA…"/></div>'
            + '<div class="tl-field"><label>' + t.f_jobs + '</label><textarea data-k="jobs" placeholder="2022–2024 · ABC Construction · Foreman">' + esc(state.data.jobs) + '</textarea></div>'
            + '<div class="tl-field"><label>' + t.f_strength + '</label><input type="text" data-k="strength" value="' + esc(state.data.strength) + '" placeholder="' + t.strength_ph + '"/></div>'
            + '<div class="tl-field"><label>' + t.f_challenge + '</label>' + opts('challenge', t.challenge) + '</div>';
        }},
        valid: function () {{ return state.data.title && state.data.skills; }}
      }},
      {{
        title: t.step4_title, sub: t.step4_sub,
        render: function () {{
          var rec = recommendPlan();
          state.data.plan = state.data.plan || rec;
          var recName = rec === '49' ? t.plan49_name : rec === '249' ? t.plan249_name : t.plan549_name;
          return '<div class="tl-rec">💡 ' + t.rec_pre + ' <strong>' + recName + '</strong> ' + t.rec_post + '</div>'
            + '<div class="tl-plans">'
            +   planCard('49', t.plan49_name, t.plan49_desc, rec === '49')
            +   planCard('249', t.plan249_name, t.plan249_desc, rec === '249')
            +   planCard('549', t.plan549_name, t.plan549_desc, rec === '549')
            + '</div>';
        }},
        valid: function () {{ return !!state.data.plan; }}
      }},
      {{
        title: t.step5_title, sub: t.step5_sub,
        render: function () {{
          return '<div class="tl-consents">' + t.consents.map(function (c, i) {{ return consent('c' + (i + 1), c); }}).join('') + '</div>';
        }},
        valid: function () {{ return ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10'].every(function (k) {{ return state.data[k]; }}); }}
      }}
    ];
  }}

  function render() {{
    var t = L();
    var steps = makeSteps();
    var isLast = state.step >= steps.length;
    var body = document.getElementById('tl-body');
    var fill = document.getElementById('tl-progress-fill');
    var label = document.getElementById('tl-step-label');
    var back = document.getElementById('tl-back');
    var next = document.getElementById('tl-next');
    back.textContent = t.btn_back;
    if (isLast) {{
      body.innerHTML = '<div class="tl-success"><div class="tl-check">✓</div><h3>' + t.success_title + ' ' + esc(state.data.name || t.default_name) + (curLang() === 'es' ? '!' : '!') + '</h3><p class="tl-sub">' + t.success_pre + ' <strong>$' + state.data.plan + ' ' + t.success_pkg + '</strong>. ' + t.success_email_pre + ' <strong>' + esc(state.data.email) + '</strong> ' + t.success_email_post + '</p></div>';
      fill.style.width = '100%';
      label.textContent = t.complete;
      back.style.display = 'none';
      next.textContent = t.btn_close;
      next.dataset.action = 'close';
      return;
    }}
    var s = steps[state.step];
    body.innerHTML = '<h3>' + s.title + '</h3><p class="tl-sub">' + s.sub + '</p>' + s.render();
    fill.style.width = ((state.step + 1) / steps.length * 100) + '%';
    label.textContent = t.step_label + ' ' + (state.step + 1) + ' ' + t.step_of + ' ' + steps.length;
    back.style.display = state.step === 0 ? 'none' : '';
    next.textContent = state.step === steps.length - 1 ? t.btn_submit : t.btn_next;
    next.dataset.action = '';
    next.disabled = !s.valid();
    body.querySelectorAll('input[data-k],textarea[data-k],select[data-k]').forEach(function (el) {{
      var h = function () {{
        state.data[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value;
        next.disabled = !s.valid();
      }};
      el.addEventListener('input', h);
      el.addEventListener('change', h);
    }});
    body.querySelectorAll('input[type=radio]').forEach(function (el) {{
      el.addEventListener('change', function () {{
        state.data[el.name] = el.value;
        render();
      }});
    }});
    body.querySelectorAll('.tl-plan').forEach(function (el) {{
      el.addEventListener('click', function () {{
        state.data.plan = el.dataset.plan;
        render();
      }});
    }});
  }}

  function open() {{
    state.step = 0;
    document.body.style.overflow = 'hidden';
    document.getElementById('tl-modal').classList.add('is-open');
    render();
  }}
  function close() {{
    document.getElementById('tl-modal').classList.remove('is-open');
    document.body.style.overflow = '';
  }}
  document.querySelectorAll('[data-open-form]').forEach(function (b) {{
    b.addEventListener('click', function (e) {{ e.preventDefault(); open(); }});
  }});
  document.getElementById('tl-close').addEventListener('click', close);
  document.getElementById('tl-modal').addEventListener('click', function (e) {{ if (e.target.id === 'tl-modal') close(); }});
  document.getElementById('tl-back').addEventListener('click', function () {{ if (state.step > 0) {{ state.step--; render(); }} }});
  document.getElementById('tl-next').addEventListener('click', function () {{
    var btn = document.getElementById('tl-next');
    if (btn.dataset.action === 'close') {{ close(); return; }}
    state.step++;
    render();
  }});
}})();
"""

(ROOT / "script.js").write_text(build("en", REVIEWS_EN, TEMPLATES_EN, "Use this template"), encoding="utf-8")
(ROOT / "script.es.js").write_text(build("es", REVIEWS_ES, TEMPLATES_ES, "Usar esta plantilla"), encoding="utf-8")
print("Wrote script.js and script.es.js")
