# Prompt: Arquitectura Front-End Escalable con Microfrontends y DevOps

---

## 🎯 CONTEXTO Y ROL

Eres un **Arquitecto Front-End Senior** con más de 10 años de experiencia diseñando aplicaciones web a gran escala. Te especializas en arquitecturas de microfrontends, pipelines modernos de DevOps e ingeniería de rendimiento. Has trabajado en plataformas que sirven a millones de usuarios en equipos distribuidos.

---

## 📋 TAREA

Diseña una **arquitectura front-end completa y lista para producción** basada en microfrontends y mejores prácticas de DevOps para una aplicación web de mediana a gran escala (p. ej., una plataforma de comercio electrónico, un dashboard SaaS o un portal empresarial — tú eliges el dominio y lo justificas).

Tu respuesta **debe cubrir los tres pilares** a continuación en detalle.

---

## 📐 PILAR 1 — Estrategia de Microfrontends

Explica y justifica el enfoque de microfrontends elegido. Tu respuesta debe incluir:

1. **Selección de estrategia** — Elige UNA de las siguientes y explica POR QUÉ se adapta al dominio:
   - Module Federation (Webpack 5 / Rspack)
   - Aislamiento basado en iframe
   - Web Components (Custom Elements + Shadow DOM)
   - Orquestador Single-SPA
   - Composición en el servidor (Edge/SSR stitching)

2. **Descomposición por equipo y dominio** — ¿Cómo divides la aplicación en microfrontends independientes? Define al menos 4 dominios delimitados (p. ej., `shell`, `auth`, `catalog`, `checkout`) y su modelo de propiedad.

3. **Patrones de comunicación** — ¿Cómo comparten estado y se comunican los microfrontends?
   - Bus de eventos compartido vs. eventos personalizados vs. estado en URL
   - Estrategia de sistema de diseño / biblioteca de componentes compartida
   - Propagación de tokens de autenticación

4. **Versiones y contratos** — ¿Cómo se aplican los contratos de API entre microfrontends para evitar fallos en tiempo de ejecución?

5. **Compromisos (trade-offs)** — Reconoce al menos 3 desventajas reales de la estrategia elegida y cómo las mitigas.

**Formato de salida para el Pilar 1:**
- Diagrama de arquitectura descrito en detalle (sintaxis ASCII o Mermaid)
- Un fragmento de configuración `module-federation.config.js` o equivalente que muestre al menos 2 remotos y 1 host
- Un breve registro de decisiones (estilo ADR) que justifique la estrategia elegida frente a las alternativas

---

## 🔁 PILAR 2 — Diseño del Pipeline CI/CD

Diseña el pipeline DevOps completo para un ecosistema de microfrontends. Tu respuesta debe incluir:

1. **Etapas del pipeline** — Define todas las etapas para un único repositorio de microfrontend:
   - Lint → Pruebas Unitarias → Build → Pruebas de Integración → Deploy de Vista Previa → Deploy a Producción
   - Especifica las herramientas para cada etapa (p. ej., ESLint, Vitest, Playwright, Docker, GitHub Actions)

2. **Desplegabilidad independiente** — Cada microfrontend se despliega de forma independiente sin coordinar con los demás. Explica:
   - Cómo versionas y publicas los remotos (p. ej., URLs versionadas en CDN/S3)
   - Cómo el shell/host recoge los nuevos remotos sin necesidad de redesplegarse

3. **Estrategia multi-entorno** — Define el modelo de ramas y entornos:
   - `feature/*` → URL de vista previa (efímera)
   - `develop` → Staging
   - `main` → Producción
   - Incluye estrategia de rollback

4. **Pipeline como código** — Proporciona un archivo `github-actions.yml` completo (o equivalente) para un microfrontend, que incluya:
   - Caché (node_modules, artefactos de build)
   - Jobs en paralelo donde sea aplicable
   - Manejo de secretos
   - Despliegue a CDN (p. ej., AWS S3 + CloudFront, Vercel o Cloudflare Pages)

5. **Hooks de observabilidad** — ¿Qué inyectas en el pipeline para monitoreo?
   - Presupuestos de tamaño de bundle (falla el build si se supera)
   - Lighthouse CI para regresión de rendimiento
   - Marcadores de despliegue para seguimiento de errores (p. ej., releases de Sentry)

**Formato de salida para el Pilar 2:**
- Diagrama completo del pipeline (etapas + herramientas)
- Archivo `github-actions.yml` completo (listo para producción, no pseudocódigo)
- Explicación del mecanismo de despliegue independiente

---

## ⚡ PILAR 3 — Escalabilidad, Mantenibilidad y Rendimiento

Aborda cada preocupación con técnicas concretas, no con principios vagos.

### Escalabilidad
- ¿Cómo escala esta arquitectura para 10+ equipos trabajando simultáneamente?
- ¿Cómo evitas conflictos de versiones de dependencias entre microfrontends?
- ¿Cómo manejas dependencias singleton compartidas (React, React-DOM, sistema de diseño)?
- Estrategia de CDN y caché en el edge para assets estáticos

### Mantenibilidad
- Decisión monorepo vs. polyrepo — justifícala para este contexto
- Herramientas compartidas: configuración de ESLint, TypeScript, Prettier — ¿cómo aplicas la consistencia?
- Pruebas de contrato entre microfrontends (p. ej., Pact.io o validación de esquemas)
- Estrategia de documentación: Storybook, ADRs, runbooks

### Rendimiento
- Estrategia de carga inicial: ¿qué microfrontends se cargan de forma eager vs. lazy?
- Objetivos de Core Web Vitals: define los objetivos de LCP, CLS, FID/INP y cómo la arquitectura los alcanza
- División de código en el límite del microfrontend
- Optimización de chunks compartidos para evitar duplicar código de vendors
- Rendimiento en tiempo de ejecución: ¿cómo evitas que la sobrecarga de los microfrontends degrade el TTI?

**Formato de salida para el Pilar 3:**
- Una tabla de presupuesto de rendimiento (métrica → objetivo → mecanismo de aplicación)
- Una matriz de dependencias compartidas (qué paquetes son singletons compartidos vs. aislados)
- Al menos 2 "gotchas" concretos encontrados con microfrontends a escala y cómo evitarlos

---

## 📦 ENTREGABLES FINALES

Estructura tu respuesta con estas secciones exactas:

```
1. Resumen Ejecutivo (3–5 oraciones)
2. Modelo de Dominio y Equipos
3. Estrategia de Microfrontends (Pilar 1)
   3.1 Diagrama de Arquitectura
   3.2 Fragmento de Configuración
   3.3 Registro de Decisiones (ADR)
4. Pipeline CI/CD (Pilar 2)
   4.1 Diagrama del Pipeline
   4.2 github-actions.yml
   4.3 Mecanismo de Despliegue Independiente
5. Escalabilidad, Mantenibilidad y Rendimiento (Pilar 3)
   5.1 Tabla de Presupuesto de Rendimiento
   5.2 Matriz de Dependencias Compartidas
   5.3 Gotchas a Escala y Mitigaciones
6. Preguntas Abiertas y Consideraciones Futuras
```

---

## ✅ RESTRICCIONES Y BARRA DE CALIDAD

- **Sin respuestas vagas** — cada afirmación debe estar respaldada por una técnica concreta, herramienta o ejemplo de configuración.
- **Calidad de producción** — escribe como si esto fuera revisado por un ingeniero principal antes de la implementación.
- **Flexibilidad de framework** — el shell puede ser agnóstico al framework, pero justifica cualquier elección de React/Vue/Angular para microfrontends individuales.
- **Sin sobreingeniería** — si una solución más simple resuelve el problema, prefiérela y explica por qué.
- **Se requieren fragmentos de código** para los Pilares 1 y 2 — no se acepta pseudocódigo.
- Longitud total de la respuesta: **completa pero enfocada** — prioriza la profundidad sobre la amplitud.

---

## 💡 BONUS (opcional, +profundidad)

Si el tiempo lo permite, aborda también:
- Cómo migrarías una SPA React monolítica existente a esta arquitectura de microfrontends (patrón strangler fig)
- Consideraciones de seguridad: cabeceras CSP, compartición de tokens entre microfrontends, sandboxing de iframes
- Modelo de costos: costos de CDN, minutos de build, compromisos de infraestructura

---

*Usa este prompt con Claude Sonnet, GPT-4o o cualquier modelo de frontera. Para mejores resultados, ejecútalo en una sesión de contexto largo y haz preguntas de seguimiento por pilar.*
