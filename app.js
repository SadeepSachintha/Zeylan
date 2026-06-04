document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'rgba(9, 9, 11, 0.95)';
      navMenu.style.padding = '2rem';
      navMenu.style.borderBottom = '1px solid rgba(0, 242, 254, 0.1)';
      navMenu.style.gap = '1.5rem';
    } else {
      icon.className = 'fa-solid fa-bars';
      navMenu.removeAttribute('style');
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        navMenu.removeAttribute('style');
      }
    });
  });

  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // --- Customizer State & Config ---
  const state = {
    color: 'black',
    image: null,
    scale: 0.6,
    x: 0.5, // relative X position (0 to 1)
    y: 0.45, // relative Y position (0 to 1)
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    printSize: 'A4'
  };

  const colorFilters = {
    black: { src: 'assets/black_tshirt.png', filter: 'none', label: 'Black' },
    white: { src: 'assets/white_tshirt.png', filter: 'none', label: 'White' },
    cyan: { src: 'assets/white_tshirt.png', filter: 'hue-rotate(180deg) saturate(2.5) brightness(0.9)', label: 'Cyan' },
    magenta: { src: 'assets/white_tshirt.png', filter: 'hue-rotate(300deg) saturate(3) brightness(0.85)', label: 'Magenta' },
    blue: { src: 'assets/white_tshirt.png', filter: 'hue-rotate(220deg) saturate(2.2) brightness(0.7)', label: 'Royal Blue' },
    red: { src: 'assets/white_tshirt.png', filter: 'hue-rotate(350deg) saturate(2.8) brightness(0.8)', label: 'Crimson Red' }
  };

  // DOM Elements
  const tshirtMockup = document.getElementById('tshirt-mockup');
  const canvas = document.getElementById('customizer-canvas');
  const designArea = document.getElementById('design-area');
  const specColorText = document.getElementById('spec-color-text');
  const specSizeText = document.getElementById('spec-size-text');
  
  const scaleInput = document.getElementById('design-scale');
  const fileInput = document.getElementById('artwork-file-input');
  const customizerPriceDisplay = document.getElementById('customizer-price-display');
  const orderWhatsappBtn = document.getElementById('order-whatsapp-btn');
  const resetBtn = document.getElementById('reset-customizer-btn');

  // --- Canvas Rendering Logic ---
  const ctx = canvas.getContext('2d');
  const designImage = new Image();

  function resizeCanvas() {
    canvas.width = designArea.clientWidth;
    canvas.height = designArea.clientHeight;
    drawCanvas();
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!state.image) {
      // Draw a subtle placeholder inside the printable box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DRAG & RESIZE HERE', canvas.width / 2, canvas.height / 2);
      return;
    }

    const imgWidth = state.image.width;
    const imgHeight = state.image.height;

    // Maintain aspect ratio, size relative to canvas
    const maxDimension = Math.max(canvas.width, canvas.height);
    const renderWidth = (imgWidth / Math.max(imgWidth, imgHeight)) * maxDimension * state.scale;
    const renderHeight = (imgHeight / Math.max(imgWidth, imgHeight)) * maxDimension * state.scale;

    const drawX = (state.x * canvas.width) - (renderWidth / 2);
    const drawY = (state.y * canvas.height) - (renderHeight / 2);

    ctx.drawImage(state.image, drawX, drawY, renderWidth, renderHeight);
  }

  // Set design image source
  designImage.onload = () => {
    state.image = designImage;
    drawCanvas();
  };

  // Load default template design on start
  designImage.src = 'assets/design_neon_skull.png';
  window.addEventListener('load', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);

  // --- Dragging Functionality on Canvas ---
  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDrag(e) {
    if (!state.image) return;
    const coords = getCoords(e);
    
    // Relative start offset from design center
    state.isDragging = true;
    state.dragStart = {
      x: coords.x - (state.x * canvas.width),
      y: coords.y - (state.y * canvas.height)
    };
    designArea.classList.add('active');
  }

  function drag(e) {
    if (!state.isDragging || !state.image) return;
    const coords = getCoords(e);

    let newX = (coords.x - state.dragStart.x) / canvas.width;
    let newY = (coords.y - state.dragStart.y) / canvas.height;

    // Bound controls within range
    state.x = Math.max(0.05, Math.min(0.95, newX));
    state.y = Math.max(0.05, Math.min(0.95, newY));

    drawCanvas();
  }

  function endDrag() {
    state.isDragging = false;
    designArea.classList.remove('active');
  }

  // Mouse Listeners
  canvas.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', endDrag);

  // Touch Listeners (Mobile support)
  canvas.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', drag, { passive: true });
  window.addEventListener('touchend', endDrag);


  // --- Customizer Control Actions ---

  // 1. Color Selector
  document.getElementById('color-selectors').addEventListener('click', (e) => {
    const btn = e.target.closest('.color-btn');
    if (!btn) return;

    // Toggle active class
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update state and mockup filters
    const color = btn.dataset.color;
    state.color = color;
    
    const config = colorFilters[color];
    tshirtMockup.src = config.src;
    tshirtMockup.style.filter = config.filter;
    
    // Also update hero mockup if visible
    const heroImg = document.getElementById('hero-shirt-img');
    if (heroImg) {
      heroImg.src = config.src;
      heroImg.style.filter = config.filter;
    }

    specColorText.textContent = config.label;
    updateCustomizerPrice();
  });

  // 2. Print Size Selector
  const sizeBtns = {
    A4: document.getElementById('size-btn-a4'),
    A3: document.getElementById('size-btn-a3'),
    Pocket: document.getElementById('size-btn-pocket')
  };

  Object.keys(sizeBtns).forEach(size => {
    sizeBtns[size].addEventListener('click', () => {
      Object.values(sizeBtns).forEach(b => b.classList.remove('active'));
      sizeBtns[size].classList.add('active');
      
      state.printSize = size;
      specSizeText.textContent = size === 'Pocket' ? 'Pocket Logo' : `${size} Print`;
      
      // Update overlay dimension styling for visual effect
      if (size === 'A4') {
        designArea.style.width = '140px';
        designArea.style.height = '170px';
      } else if (size === 'A3') {
        designArea.style.width = '165px';
        designArea.style.height = '200px';
      } else if (size === 'Pocket') {
        designArea.style.width = '60px';
        designArea.style.height = '60px';
      }
      
      resizeCanvas();
      updateCustomizerPrice();
    });
  });

  // 3. Scale Range Input
  scaleInput.addEventListener('input', (e) => {
    state.scale = parseFloat(e.target.value) / 100;
    drawCanvas();
  });

  // 4. File Upload
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      designImage.src = event.target.result;
      
      // Deselect template design active borders
      document.querySelectorAll('.sample-item').forEach(item => item.classList.remove('active'));
    };
    reader.readAsDataURL(file);
  });

  // 5. Sample Design Selection
  document.getElementById('sample-designs-list').addEventListener('click', (e) => {
    const item = e.target.closest('.sample-item');
    if (!item) return;

    document.querySelectorAll('.sample-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    designImage.src = item.dataset.src;
  });

  // 6. Reset Customizer
  resetBtn.addEventListener('click', () => {
    state.scale = 0.6;
    state.x = 0.5;
    state.y = 0.45;
    state.color = 'black';
    state.printSize = 'A4';
    
    scaleInput.value = 60;
    
    // Reset Color Buttons
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-color="black"]').classList.add('active');
    
    tshirtMockup.src = colorFilters.black.src;
    tshirtMockup.style.filter = colorFilters.black.filter;
    specColorText.textContent = colorFilters.black.label;

    // Reset Size Buttons
    Object.values(sizeBtns).forEach(b => b.classList.remove('active'));
    sizeBtns.A4.classList.add('active');
    specSizeText.textContent = 'A4 Print';
    designArea.style.width = '140px';
    designArea.style.height = '170px';

    // Reset design template
    document.querySelectorAll('.sample-item').forEach(i => i.classList.remove('active'));
    document.querySelector('[data-src="assets/design_neon_skull.png"]').classList.add('active');
    designImage.src = 'assets/design_neon_skull.png';

    fileInput.value = '';
    
    resizeCanvas();
    updateCustomizerPrice();
  });

  // --- Dynamic Pricing Calculator Logic ---
  const calcTabTshirt = document.getElementById('calc-tab-tshirt');
  const calcTabSheets = document.getElementById('calc-tab-sheets');
  const calcTshirtFields = document.getElementById('calc-tshirt-fields');
  const calcSheetsFields = document.getElementById('calc-sheets-fields');
  
  const calcShirtColor = document.getElementById('calc-shirt-color');
  const calcPrintSize = document.getElementById('calc-print-size');
  const calcSheetSize = document.getElementById('calc-sheet-size');
  const calcQuantity = document.getElementById('calc-quantity');
  const calcPriceDisplay = document.getElementById('calc-price-display');

  // Switch Calculator Modes
  calcTabTshirt.addEventListener('click', () => {
    calcTabTshirt.classList.add('active');
    calcTabSheets.classList.remove('active');
    calcTshirtFields.style.display = 'block';
    calcSheetsFields.style.display = 'none';
    calculatePricing();
  });

  calcTabSheets.addEventListener('click', () => {
    calcTabSheets.classList.add('active');
    calcTabTshirt.classList.remove('active');
    calcSheetsFields.style.display = 'block';
    calcTshirtFields.style.display = 'none';
    calculatePricing();
  });

  // Calculate pricing values
  function calculatePricing() {
    const isTshirtMode = calcTabTshirt.classList.contains('active');
    const qty = Math.max(1, parseInt(calcQuantity.value) || 1);
    let unitPrice = 0;
    let totalPrice = 0;

    if (isTshirtMode) {
      const shirtColor = calcShirtColor.value;
      const printSize = calcPrintSize.value;

      // Base pricing with bulk thresholds
      if (shirtColor === 'white') {
        if (qty >= 50) {
          unitPrice = 1050; // Bulk 50+
        } else if (qty >= 10) {
          unitPrice = 1250; // Bulk 10-49
        } else {
          unitPrice = 1600; // Single shirt retail
        }
      } else { // Dark / Colors
        if (qty >= 50) {
          unitPrice = 1200;
        } else if (qty >= 10) {
          unitPrice = 1400;
        } else {
          unitPrice = 1800;
        }
      }

      // Add adjustments for larger prints
      if (printSize === 'A3') {
        unitPrice += 350;
      } else if (printSize === 'Pocket') {
        unitPrice -= 150;
      }

      totalPrice = unitPrice * qty;

    } else {
      // Print sheet only pricing
      const sheetSize = calcSheetSize.value;

      if (sheetSize === 'A4') {
        unitPrice = 450;
      } else if (sheetSize === 'A3') {
        unitPrice = 800;
      } else if (sheetSize === 'Meter') {
        unitPrice = 2500;
      }

      // Sheet discount rate based on rolls/volume
      let discount = 0;
      if (qty >= 30) {
        discount = 0.20; // 20% off
      } else if (qty >= 10) {
        discount = 0.10; // 10% off
      }

      totalPrice = Math.round(unitPrice * qty * (1 - discount));
    }

    calcPriceDisplay.textContent = `LKR ${totalPrice.toLocaleString()}`;
  }

  // Attach listeners to calculator elements
  [calcShirtColor, calcPrintSize, calcSheetSize, calcQuantity].forEach(el => {
    el.addEventListener('input', calculatePricing);
  });


  // --- Customizer Pricing Update ---
  function updateCustomizerPrice() {
    let basePrice = state.color === 'white' ? 1600 : 1800;

    if (state.printSize === 'A3') {
      basePrice += 350;
    } else if (state.printSize === 'Pocket') {
      basePrice -= 150;
    }

    customizerPriceDisplay.textContent = `LKR ${basePrice.toLocaleString()}`;
    return basePrice;
  }

  // --- Order via WhatsApp Event ---
  orderWhatsappBtn.addEventListener('click', () => {
    const finalPrice = updateCustomizerPrice();
    const colorLabel = colorFilters[state.color].label;
    const printSizeLabel = state.printSize === 'Pocket' ? 'Pocket Logo' : `${state.printSize} Print`;
    const scalePercentage = Math.round(state.scale * 100);
    
    const msg = `Hello Zeylan! 🇱🇰\n\nI would like to place a custom DTF T-shirt print order from the website builder:\n` +
                `----------------------------------------\n` +
                `👕 Garment Color: ${colorLabel}\n` +
                `📐 Print Size: ${printSizeLabel}\n` +
                `🔍 Scale: ${scalePercentage}%\n` +
                `📍 Layout Center: X = ${Math.round(state.x * 100)}%, Y = ${Math.round(state.y * 100)}%\n` +
                `💵 Estimated Cost: LKR ${finalPrice.toLocaleString()}\n` +
                `----------------------------------------\n\n` +
                `Please let me know how to send my high-resolution PNG file to complete the print! Thank you.`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/94771234567?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
  });

  // Initialize prices
  updateCustomizerPrice();
  calculatePricing();

});
