/**
 * Shared utilities, mock data, and state management for Email Engine Admin
 * Vanilla JavaScript - No external dependencies
 */

// ============================================
// 1. MOCK DATA
// ============================================

const MOCK_DATA = [
  {
    cnpj: "12.345.678/0001-90",
    companyName: "Tech Solutions LTDA",
    serialNumbers: ["SN001", "SN002", "SN003"],
    lastUpdate: "2026-02-15T10:30:00Z",
    email: "contato@techsolutions.com.br"
  },
  {
    cnpj: "98.765.432/0001-21",
    companyName: "Comercio Express S.A.",
    serialNumbers: ["SN004", "SN005"],
    lastUpdate: "2026-01-20T14:45:00Z",
    email: "financeiro@comercioexpress.com.br"
  },
  {
    cnpj: "45.678.901/0001-34",
    companyName: "Industria Brasil Ltda",
    serialNumbers: ["SN006", "SN007", "SN008", "SN009"],
    lastUpdate: "2025-11-10T09:15:00Z",
    email: "suporte@industriabrasil.com.br"
  },
  {
    cnpj: "11.222.333/0001-44",
    companyName: "Servicos Digitais ME",
    serialNumbers: ["SN010"],
    lastUpdate: "2026-02-18T16:00:00Z",
    email: "admin@servicosdigitais.com.br"
  },
  {
    cnpj: "55.666.777/0001-55",
    companyName: "Logistica Rapida S.A.",
    serialNumbers: ["SN011", "SN012", "SN013"],
    lastUpdate: "2025-12-05T11:20:00Z",
    email: "operacoes@logisticarapida.com.br"
  },
  {
    cnpj: "88.999.000/0001-66",
    companyName: "Farmacia Saude LTDA",
    serialNumbers: ["SN014", "SN015"],
    lastUpdate: "2026-02-01T08:00:00Z",
    email: "compras@farmaciasaude.com.br"
  },
  {
    cnpj: "22.333.444/0001-77",
    companyName: "Restaurante Sabor ME",
    serialNumbers: ["SN016"],
    lastUpdate: "2025-10-15T19:30:00Z",
    email: "gerencia@restaurantesabor.com.br"
  },
  {
    cnpj: "66.777.888/0001-88",
    companyName: "Construcao Solida S.A.",
    serialNumbers: ["SN017", "SN018", "SN019"],
    lastUpdate: "2026-01-05T13:45:00Z",
    email: "engenharia@construsolida.com.br"
  }
];

// ============================================
// 2. STATE MANAGER
// ============================================

const StateManager = {
  STORAGE_KEY: 'emailEngine_state',
  UPLOADED_DATA_KEY: 'emailEngine_uploadedData',
  SELECTED_CNPJS_KEY: 'emailEngine_selectedCNPJs',
  FILTER_KEY: 'emailEngine_filter',

  /**
   * Get current state
   * @returns {Object} Current state object
   */
  getState() {
    try {
      const state = localStorage.getItem(this.STORAGE_KEY);
      return state ? JSON.parse(state) : {};
    } catch (error) {
      console.error('Error getting state:', error);
      return {};
    }
  },

  /**
   * Save state to localStorage
   * @param {Object} data - State data to save
   */
  setState(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  },

  /**
   * Clear all state from localStorage
   */
  clearState() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.UPLOADED_DATA_KEY);
      localStorage.removeItem(this.SELECTED_CNPJS_KEY);
      localStorage.removeItem(this.FILTER_KEY);
    } catch (error) {
      console.error('Error clearing state:', error);
    }
  },

  /**
   * Get uploaded CSV data
   * @returns {Array} Array of uploaded data objects
   */
  getUploadedData() {
    try {
      const data = localStorage.getItem(this.UPLOADED_DATA_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting uploaded data:', error);
      return [];
    }
  },

  /**
   * Save uploaded CSV data
   * @param {Array} data - Array of data objects from CSV
   */
  setUploadedData(data) {
    try {
      localStorage.setItem(this.UPLOADED_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving uploaded data:', error);
    }
  },

  /**
   * Get selected CNPJs
   * @returns {Array} Array of selected CNPJ strings
   */
  getSelectedCNPJs() {
    try {
      const cnpgs = localStorage.getItem(this.SELECTED_CNPJS_KEY);
      return cnpgs ? JSON.parse(cnpgs) : [];
    } catch (error) {
      console.error('Error getting selected CNPJs:', error);
      return [];
    }
  },

  /**
   * Save selected CNPJs
   * @param {Array} cnpgs - Array of CNPJ strings to save
   */
  setSelectedCNPJs(cnpgs) {
    try {
      localStorage.setItem(this.SELECTED_CNPJS_KEY, JSON.stringify(cnpgs));
    } catch (error) {
      console.error('Error saving selected CNPJs:', error);
    }
  },

  /**
   * Get current filter value
   * @returns {number} Filter value (15, 45, or 90 days)
   */
  getFilter() {
    try {
      const filter = localStorage.getItem(this.FILTER_KEY);
      return filter ? parseInt(filter, 10) : 15;
    } catch (error) {
      console.error('Error getting filter:', error);
      return 15;
    }
  },

  /**
   * Save filter value
   * @param {number} filter - Filter value (15, 45, or 90)
   */
  setFilter(filter) {
    try {
      localStorage.setItem(this.FILTER_KEY, filter.toString());
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  }
};

// ============================================
// 3. UTILITY FUNCTIONS
// ============================================

/**
 * Format date to DD/MM/YYYY
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '--/--/----';
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return '--/--/----';
  }
}

/**
 * Format CNPJ to XX.XXX.XXX/XXXX-XX
 * @param {string} cnpj - CNPJ string (can be formatted or numbers only)
 * @returns {string} Formatted CNPJ string
 */
function formatCNPJ(cnpj) {
  if (!cnpj) return '';

  // Remove any non-numeric characters
  const numbers = cnpj.replace(/\D/g, '');

  // Check if we have 14 digits
  if (numbers.length !== 14) {
    return cnpj; // Return original if not 14 digits
  }

  // Format as XX.XXX.XXX/XXXX-XX
  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

/**
 * Calculate days since a given date
 * @param {string|Date} date - Starting date
 * @returns {number} Number of days since the date
 */
function daysSince(date) {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return -1;
    }
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    return -1;
  }
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
 */
function showToast(message, type = 'info') {
  // Remove existing toast if present
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  // Define colors based on type
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  // Define icons based on type
  const icons = {
    success: '&#10003;',
    error: '&#10005;',
    warning: '&#9888;',
    info: '&#8505;'
  };

  // Apply styles
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    backgroundColor: colors[type] || colors.info,
    color: '#ffffff',
    fontWeight: '500',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '400px',
    animation: 'slideIn 0.3s ease-out'
  });

  // Add icon
  const icon = document.createElement('span');
  icon.innerHTML = icons[type] || icons.info;
  icon.style.fontSize = '16px';
  toast.appendChild(icon);

  // Add message
  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    opacity: 0.8;
    padding: 0;
    line-height: 1;
  `;
  closeBtn.onclick = () => {
    toast.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  };
  toast.appendChild(closeBtn);

  // Add animation styles if not present
  if (!document.querySelector('#toast-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'toast-styles';
    styleSheet.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // Add to DOM
  document.body.appendChild(toast);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 300);
    }
  }, 5000);
}

// ============================================
// 4. MOCK PROCESSING FUNCTIONS
// ============================================

/**
 * Simulate CSV file processing with progress callback
 * @param {string|Array} data - CSV data (string or already parsed array)
 * @param {Function} callback - Progress callback (progress, status, result)
 * @returns {void}
 */
function simulateCSVProcessing(data, callback) {
  if (typeof callback !== 'function') {
    console.error('Callback function is required');
    return;
  }

  // Parse data if it's a string (simulate CSV parsing)
  let parsedData = data;
  if (typeof data === 'string') {
    // In a real scenario, this would parse CSV
    // For mock, we'll use MOCK_DATA or parse simple format
    parsedData = MOCK_DATA;
  }

  const totalSteps = 5;
  const steps = [
    { progress: 10, status: 'Iniciando processamento...' },
    { progress: 30, status: 'Validando dados do arquivo...' },
    { progress: 50, status: 'Processando registros...' },
    { progress: 70, status: 'Verificando duplicatas...' },
    { progress: 90, status: 'Finalizando importacao...' }
  ];

  let currentStep = 0;

  const processStep = () => {
    if (currentStep < steps.length) {
      callback(steps[currentStep].progress, steps[currentStep].status, null);
      currentStep++;
      setTimeout(processStep, 400 + Math.random() * 300);
    } else {
      // Processing complete
      callback(100, 'Processamento concluido com sucesso!', parsedData);
    }
  };

  // Start processing
  setTimeout(processStep, 200);
}

/**
 * Simulate email sending with progress callback
 * @param {Array} recipients - Array of recipient objects with email and company info
 * @param {Function} callback - Progress callback (progress, status, currentRecipient, stats)
 * @returns {void}
 */
function simulateEmailSending(recipients, callback) {
  if (typeof callback !== 'function') {
    console.error('Callback function is required');
    return;
  }

  if (!Array.isArray(recipients) || recipients.length === 0) {
    callback(100, 'Nenhum destinatario para enviar', null, { sent: 0, failed: 0, total: 0 });
    return;
  }

  const total = recipients.length;
  let sent = 0;
  let failed = 0;
  let currentIndex = 0;

  const stats = {
    sent: 0,
    failed: 0,
    total: total
  };

  // Initial status
  callback(0, 'Iniciando envio de emails...', null, { ...stats });

  const sendNext = () => {
    if (currentIndex < recipients.length) {
      const recipient = recipients[currentIndex];

      // Simulate sending (90% success rate)
      const success = Math.random() > 0.1;

      if (success) {
        sent++;
        stats.sent = sent;
        callback(
          Math.round(((currentIndex + 1) / total) * 100),
          `Email enviado para ${recipient.email || recipient.companyName}`,
          recipient,
          { ...stats }
        );
      } else {
        failed++;
        stats.failed = failed;
        callback(
          Math.round(((currentIndex + 1) / total) * 100),
          `Falha ao enviar para ${recipient.email || recipient.companyName}`,
          recipient,
          { ...stats }
        );
      }

      currentIndex++;

      // Random delay between 200ms and 600ms
      setTimeout(sendNext, 200 + Math.random() * 400);
    } else {
      // All done
      const finalStats = { sent, failed, total };
      let finalMessage = 'Envio concluido! ';

      if (failed === 0) {
        finalMessage += `${sent} emails enviados com sucesso.`;
      } else {
        finalMessage += `${sent} enviados, ${failed} falharam.`;
      }

      callback(100, finalMessage, null, finalStats);
    }
  };

  // Start sending after a short delay
  setTimeout(sendNext, 500);
}

// ============================================
// EXPORTS (for module systems if available)
// ============================================

// Make available globally
if (typeof window !== 'undefined') {
  window.MOCK_DATA = MOCK_DATA;
  window.StateManager = StateManager;
  window.formatDate = formatDate;
  window.formatCNPJ = formatCNPJ;
  window.daysSince = daysSince;
  window.showToast = showToast;
  window.simulateCSVProcessing = simulateCSVProcessing;
  window.simulateEmailSending = simulateEmailSending;
}

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MOCK_DATA,
    StateManager,
    formatDate,
    formatCNPJ,
    daysSince,
    showToast,
    simulateCSVProcessing,
    simulateEmailSending
  };
}
