# 🎨 HidratArte - Referencia Visual de Componentes

## 📐 Especificaciones de Diseño

---

## 1️⃣ NAVBAR

### Estructura
```
┌────────────────────────────────────────────────────────────┐
│  [Logo] HidratArte    Home  Explorar  Admin  🛒(3)  👤User │
└────────────────────────────────────────────────────────────┘
```

### Estilos Clave
- **Posición**: `sticky-top`
- **Fondo**: `#ffffff`
- **Sombra**: `0 2px 10px rgba(0,0,0,0.08)`
- **Alto logo**: `60px`
- **Color links**: `#0a3d3f` → hover `#00b3a1`
- **Badge carrito**: `#00b3a1`

### Responsive
- **< 768px**: Navbar colapsable con toggle
- **> 768px**: Navbar horizontal completo

---

## 2️⃣ HOME - HERO SECTION

### Estructura
```
┌──────────────────────────────────────────────────┐
│                                                  │
│         🌊 Bienvenido a HidratArte, Juan        │
│                                                  │
│   Descubre las mejores bebidas refrescantes... │
│                                                  │
│   ┌──────────────────────────────────────┐     │
│   │ 🔍  Buscar bebidas...       [Buscar] │     │
│   └──────────────────────────────────────┘     │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Estilos Clave
- **Background**: `linear-gradient(135deg, #00b3a1 0%, rgba(0,179,161,0.4) 50%, rgba(255,255,255,0.9) 100%)`
- **Padding**: `4rem 2rem`
- **Border-radius**: `0 0 50px 50px`
- **Title size**: `2.5rem` (desktop), `2rem` (mobile)
- **Input border**: `2px solid #00b3a1`
- **Input padding**: `14px 24px 14px 50px`

---

## 3️⃣ HOME - CATEGORÍAS

### Estructura
```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  [🚰]   │  │  [🧃]   │  │  [🥤]   │  │  [🍺]   │
│  Agua   │  │  Jugo   │  │ Gaseosa │  │ Alcohol │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

### Estilos Clave
- **Tamaño ícono**: `120px × 120px` (desktop), `90px × 90px` (mobile)
- **Hover**: `scale(1.15) rotate(5deg)`
- **Drop shadow**: `0 4px 8px rgba(0,0,0,0.1)` → hover `0 8px 16px rgba(0,179,161,0.3)`
- **Padding contenedor**: `1rem`
- **Background hover**: `rgba(0,179,161,0.05)`
- **Font nombre**: `1.1rem` bold

---

## 4️⃣ HOME - CARACTERÍSTICAS

### Estructura
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│     💧       │  │     🚚       │  │     🎯       │
│   Frescura   │  │   Entrega    │  │  Variedad    │
│  Garantizada │  │    Rápida    │  │    Única     │
│              │  │              │  │              │
│  Productos   │  │   Recibe...  │  │   Amplia...  │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Estilos Clave
- **Fondo**: `#ffffff`
- **Padding**: `2rem`
- **Border-radius**: `12px`
- **Sombra**: `0 4px 12px rgba(0,0,0,0.08)`
- **Emoji size**: `3rem`
- **Título color**: `#0a3d3f`
- **Texto color**: `#6c757d`

---

## 5️⃣ MODAL +18

### Estructura
```
     ┌────────────────────────────┐
     │          🔞               │
     │  Verificación de Edad     │
     │                           │
     │  Para acceder a esta...   │
     │                           │
     │  ¿Eres mayor de 18 años?  │
     │                           │
     │  [Sí, soy mayor] [No...]  │
     └────────────────────────────┘
```

### Estilos Clave
- **Overlay**: `rgba(10,61,63,0.7)` con `backdrop-filter: blur(4px)`
- **z-index**: `1051`
- **Max-width**: `400px`
- **Padding**: `2rem`
- **Border-radius**: `12px`
- **Sombra**: `0 10px 40px rgba(0,0,0,0.3)`
- **Header border**: `2px solid #00b3a1`

---

## 6️⃣ PRODUCT CARDS

### Estructura
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│                  │  │                  │  │                  │
│     [IMAGEN]     │  │     [IMAGEN]     │  │     [IMAGEN]     │
│                  │  │                  │  │                  │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Agua Mineral     │  │ Jugo Naranja     │  │ Coca Cola        │
│ Producto de...   │  │ Natural y...     │  │ Refresco...      │
│                  │  │                  │  │                  │
│ $2.50           │  │ $3.80           │  │ $2.00           │
│ [🛒 Agregar...]  │  │ [🛒 Agregar...]  │  │ [🛒 Agregar...]  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Estilos Clave
- **Card border**: `none`
- **Border-radius**: `12px`
- **Sombra**: `0 4px 12px rgba(0,0,0,0.08)`
- **Hover sombra**: `0 8px 20px rgba(0,0,0,0.12)`
- **Hover transform**: `translateY(-8px)`
- **Imagen height**: `240px`
- **Image border-bottom**: `3px solid #00b3a1`
- **Precio color**: `#00b3a1` (1.3rem)
- **Botón**: full-width, `border-radius: 25px`

### Grid Responsive
- **Mobile (< 768px)**: 1 columna
- **Tablet (768px - 992px)**: 2 columnas
- **Desktop (992px - 1200px)**: 3 columnas
- **XL (> 1200px)**: 4 columnas

---

## 7️⃣ FOOTER

### Estructura
```
┌────────────────────────────────────────────────────────────┐
│  © 2025 HidratArte                      Síguenos en redes  │
│  Todos los derechos reservados          [📷] [📘] [📧]    │
│  ──────────────────────────────────────────────────────────│
│              Contacto | Bebidas refrescantes para todos    │
└────────────────────────────────────────────────────────────┘
```

### Estilos Clave
- **Fondo**: `#0a3d3f`
- **Color texto**: `#ffffff`
- **Color acento**: `#00b3a1`
- **Padding**: `2rem 0`
- **Ícono size**: `28px`
- **Ícono hover**: `scale(1.2) rotate(10deg)`
- **Línea divisoria**: `border-color: #00b3a1` con `opacity: 0.3`

---

## 8️⃣ ESTADOS DE CARGA

### Loading
```
        ┌─────────┐
        │    ⟳    │
        └─────────┘
     Cargando productos...
```

### Error
```
┌──────────────────────────────────────┐
│ ⚠️ Error: No se pudieron cargar los  │
│         productos. Intenta nuevamente │
└──────────────────────────────────────┘
```

### Sin Productos
```
           📦
   No hay productos disponibles
   Vuelve pronto para ver nuevos...
```

### Estilos
- **Spinner**: `3rem × 3rem`, color `#00b3a1`
- **Alert error**: `background: #ffe6e6`, `color: #d32f2f`
- **Emoji**: `4rem`

---

## 9️⃣ BARRA DE BÚSQUEDA

### Estructura
```
┌──────────────────────────────────────────────┐
│ 🔍  Buscar bebidas, marcas...    [Buscar]   │
└──────────────────────────────────────────────┘
```

### Estilos Clave
- **Border-radius**: `50px`
- **Border**: `2px solid #00b3a1`
- **Padding**: `14px 24px 14px 50px`
- **Icon left**: `18px`
- **Icon size**: `1.3rem`
- **Botón right**: `6px` del borde
- **Focus**: `border-color: #0a3d3f`, `box-shadow: 0 6px 20px rgba(0,179,161,0.25)`
- **Focus transform**: `translateY(-2px)`

---

## 🔟 BOTONES

### Variantes

#### Primary (Acento)
```css
background: linear-gradient(135deg, #00b3a1, #00d4bb)
color: #ffffff
box-shadow: 0 4px 10px rgba(0,179,161,0.3)
hover: translateY(-2px) + sombra más profunda
```

#### Secondary (Principal)
```css
background: #0a3d3f
color: #ffffff
hover: background #083032 + translateY(-2px)
```

#### Outline Primary
```css
border: 2px solid #00b3a1
color: #00b3a1
hover: background #00b3a1 + color #ffffff
```

### Tamaños
- **Padding estándar**: `10px 24px`
- **Border-radius**: `25px`
- **Transición**: `0.3s ease`

---

## 📊 Jerarquía Tipográfica

```
H1: 2.5rem (40px)  - Hero title
H2: 2rem (32px)    - Títulos de sección
H3: 1.75rem (28px) - Subtítulos
H4: 1.5rem (24px)  - Card titles
H5: 1.25rem (20px) - Modal titles
H6: 1rem (16px)    - Labels

Body: 1rem (16px)
Small: 0.9-0.95rem
```

---

## 🎨 Paleta Completa

```css
/* Colores Principales */
#0a3d3f  - Verde oscuro (primary)
#00b3a1  - Turquesa (accent)
#f9fbfc  - Gris muy claro (background)
#ffffff  - Blanco (cards)

/* Colores de Texto */
#2c3e50  - Texto oscuro (títulos)
#6c757d  - Texto gris (descripciones)

/* Colores de Estado */
#d32f2f  - Error (rojo)
#388e3c  - Success (verde)
#1976d2  - Info (azul)

/* Sombras */
rgba(0,0,0,0.08)  - Sombra suave
rgba(0,0,0,0.12)  - Sombra hover
rgba(0,179,161,0.3)  - Sombra acento
```

---

## ⚡ Transiciones y Animaciones

### Transiciones
```css
all 0.3s ease        - Por defecto
transform 0.3s ease  - Movimientos
box-shadow 0.3s ease - Sombras
color 0.3s ease      - Colores
```

### Animaciones
```css
fadeIn              - Opacidad 0 → 1 + translateY(20px → 0)
slideInFromTop      - translateY(-30px → 0)
```

### Efectos Hover
```css
Cards:       translateY(-8px)
Botones:     translateY(-2px)
Links:       translateY(-2px) + línea inferior
Categorías:  scale(1.15) + rotate(5deg)
Imágenes:    scale(1.05)
Íconos:      scale(1.2) + rotate(10deg)
```

---

## 📱 Breakpoints

```css
/* Mobile First */
Base:     < 768px   (1 col productos, 2 col categorías)
Tablet:   768px     (2 col productos)
Desktop:  992px     (3 col productos)
XL:       1200px    (4 col productos)
```

---

## ✨ Tips de Implementación

### 1. Espaciado Consistente
- **Secciones**: `py-5` (3rem vertical)
- **Cards**: `g-4` (1.5rem gap)
- **Elementos**: `mb-3` a `mb-5` (1rem a 3rem)

### 2. Bordes Redondeados
- **Cards/Modales**: `12px`
- **Botones**: `25px`
- **Inputs búsqueda**: `50px`

### 3. Sombras Progresivas
- **Reposo**: `0 4px 12px rgba(0,0,0,0.08)`
- **Hover**: `0 8px 20px rgba(0,0,0,0.12)`
- **Elevado**: `0 10px 40px rgba(0,0,0,0.3)`

### 4. Colores Semánticos
- **Títulos**: `#0a3d3f` (primary)
- **Precios/CTAs**: `#00b3a1` (accent)
- **Descripciones**: `#6c757d` (muted)
- **Errores**: `#d32f2f` (danger)

---

## 🎯 Checklist Visual

- [ ] Logo + nombre visible en navbar
- [ ] Badge de carrito en color acento
- [ ] Hero con degradado turquesa
- [ ] Búsqueda con ícono 🔍 a la izquierda
- [ ] Categorías con efecto hover
- [ ] Modal +18 con overlay blur
- [ ] Cards con sombra y hover elevado
- [ ] Precio en color acento grande
- [ ] Botones con emoji 🛒
- [ ] Footer oscuro con redes sociales
- [ ] Todas las transiciones suaves
- [ ] Responsive en todos los dispositivos

---

**Diseño implementado con atención al detalle** ✨
