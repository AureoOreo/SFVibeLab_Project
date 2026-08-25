# AI Work Log — Bitácora de Uso de IA

Este documento registra, de forma transparente y responsable, el uso de herramientas de inteligencia artificial durante el desarrollo del proyecto **Account Explorer** (Salesforce LWC y React local). Cada entrada detalla la herramienta utilizada, la fase o prompt clave, el problema o desafío detectado en la salida generada, y la verificación o corrección manual realizada para garantizar la funcionalidad y robustez del código.

**Política de uso:** La IA se empleó como asistente técnico de generación, estructura y depuración de código. Todo el código generado fue auditado, corregido, ejecutado y validado manualmente en entornos locales y en la organización de pruebas antes de su integración final. No se compartieron credenciales, secretos ni datos sensibles con las herramientas de IA.

---

## Tabla de Registro de Prompts y Correcciones

| Herramienta de IA | Prompt Clave / Fase | Problema / Desafío Detectado | Verificación / Corrección Manual Realizada |
| :--- | :--- | :--- | :--- |
| **Gemini / LLM** | Generación inicial del controlador Apex `AccountController.cls` para consultar cuentas. | La consulta SOQL inicial no consideraba nombres nulos ni garantizaba el orden alfabético estricto solicitado en los requerimientos. | Se ajustó la consulta agregando la cláusula `WHERE Name != null ORDER BY Name ASC LIMIT 50` y la anotación `@AuraEnabled(cacheable=true)`. Se validó desplegando a la org con `SFDX: Deploy This Source to Org`. |
| **Gemini / LLM** | Creación de la clase de prueba unitaria `AccountControllerTest.cls`. | La propuesta inicial no aislaba los datos de la base de datos de la org, dependiendo de registros preexistentes en el sandbox. | Se implementó el método `@TestSetup` para instanciar e insertar cuentas de prueba de forma controlada (`Alpha Tech`, `Beta Health`, `Gamma Retail`) y se añadieron aserciones `Assert.areNotEqual` y `Assert.isNotNull`. Se ejecutó con `Run Tests` en VS Code. |
| **Gemini / LLM** | Creación de componentes React `App.jsx` y `AccountCard.jsx` con Vite. | ESLint arrojó advertencias `no-unused-vars` (`'React' is defined but never used`) y posteriormente un error `no-undef` (`'useState' is not defined`) al eliminar la importación completa. | Se corrigieron manualmente las cabeceras de importación en `App.jsx` para destructurar exclusivamente `{ useState } from 'react'` y se eliminó la importación redundante de `React` en `AccountCard.jsx`. Se validó con `npm run dev`. |
| **Gemini / LLM** | Configuración de metadata del componente LWC `accountExplorer.js-meta.xml`. | El componente no estaba disponible para ser incrustado en páginas de inicio de Salesforce por falta de definiciones explícitas de targets. | Se definió `<isExposed>true</isExposed>` y se añadieron los nodos de destino `<target>lightning__HomePage</target>`, `<target>lightning__AppPage</target>` y `<target>lightning__RecordPage</target>`. Verificado en el *Lightning App Builder*. |
| **Gemini / LLM** | Inserción automatizada de datos de prueba en la organización Salesforce mediante la terminal. | La instrucción inicial utilizó el comando `sf apex run --code "..."`, el cual falló en la terminal con el error `Error (2): Nonexistent flag: --code` debido a cambios de sintaxis en versiones recientes de Salesforce CLI. | Se reemplazó por la ejecución interactiva a través de `sf apex run` (capturando la entrada por estándar stdin y cerrando con `Ctrl + D`), poblando exitosamente las 5 cuentas base en el Sandbox. |
| **Gemini / LLM** | Script de limpieza y desduplicación de datos en Apex Anónimo. | Al reintentar inserciones se generaron registros duplicados que saturaban la interfaz del LWC. | Se diseñó y ejecutó un script en Apex que utiliza un `Set<String>` para identificar nombres duplicados y ejecutar una operación `delete` sobre las cuentas repetidas, dejando un catálogo limpio. |
| **Gemini / LLM** | Documentación unificada en `README.md` (Salesforce DX + React). | La estructura de despliegue sugerida inicialmente omitía la bandera requerida `--instance-url https://test.salesforce.com` necesaria para autenticar sandboxes institucionales de UADY. | Se corrigió la guía de conexión en el README especificando la URL del servidor de autenticación para entornos sandbox y se mapearon las rutas exactas del monorepositorio. |

---

## Resumen de Verificación Técnica

* **Salesforce DX (Backend y LWC):** Desplegado con `SFDX: Deploy Source to Org` / `sf project deploy start`; pruebas unitarias de Apex ejecutadas y aprobadas en verde; registros poblados y desduplicados vía Apex anónimo interactivo (`sf apex run`); componente visual verificado en la página de Inicio dentro de *Lightning App Builder*.
* **React (Local):** Dependencias instaladas limpiamente con `npm install`; servidor levantado con `npm run dev`; validación manual de búsqueda en tiempo real insensible a mayúsculas/minúsculas, filtrado por industria, renderizado de tarjetas `AccountCard` y activación de estado vacío (*Empty State*).
* **Calidad de Código:** Errores de ESLint resueltos en los archivos `.jsx`; archivos de metadata LWC (`.js-meta.xml`) y Apex (`.cls-meta.xml`) sincronizados con `apiVersion 60.0`.