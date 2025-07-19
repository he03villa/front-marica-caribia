import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lunch-delivery',
  standalone: true,
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './lunch-delivery.component.html',
  styleUrl: './lunch-delivery.component.scss'
})
export class LunchDeliveryComponent {
  // Formatos específicos para códigos de barras (sin QR)
  allowedFormats = [
    BarcodeFormat.EAN_13,       // Más común en productos
    BarcodeFormat.EAN_8,        // Productos pequeños
    BarcodeFormat.CODE_128,     // Muy versátil
    BarcodeFormat.CODE_39,      // Industrial/logística
    BarcodeFormat.UPC_A,        // Estados Unidos/Canadá
    BarcodeFormat.UPC_E,        // UPC compacto
    BarcodeFormat.CODE_93,      // Más denso que Code 39
    BarcodeFormat.ITF,          // Interleaved 2 of 5
    BarcodeFormat.CODABAR,      // Bibliotecas, bancos de sangre
  ];

  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  scannerEnabled = false;
  scanResult = '';
  barcodeType = '';
  productInfo: any = null;
  hasDevices = false;
  hasPermission = false;
  scanHistory: any[] = [];

  ngOnInit(): void {
    this.checkPermissions();
  }

  async checkPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.hasPermission = true;
      stream.getTracks().forEach(track => track.stop()); // Detener los tracks de la cámara después de verificar
      this.loadDevices();
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.hasPermission = false;
    }
  }

  async loadDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableDevices = devices.filter(device => device.kind === 'videoinput');
      this.hasDevices = this.availableDevices.length > 0;

      console.log('Dispositivos disponibles:', this.availableDevices);

      if (this.hasDevices) {
        // Seleccionar cámara trasera por defecto si está disponible
        this.currentDevice = this.availableDevices.find(device =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('rear')
        ) || this.availableDevices[1];
        console.log('Cámara seleccionada:', this.currentDevice);
      }
    } catch (error) {
      console.error('Error loading devices:', error);
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    // Asignar el dispositivo por defecto una vez que se encuentran las cámaras
    if (!this.currentDevice && this.hasDevices) {
      this.currentDevice = this.availableDevices[1];
      console.log('Cámara seleccionada:', this.currentDevice);
        /* this.currentDevice = this.availableDevices.find(device =>
            device.label.toLowerCase().includes('back') ||
            device.label.toLowerCase().includes('rear')
        ) || this.availableDevices[1]; */
    }
  }

  onCodeResult(resultString: string): void {
    console.log(resultString);
    this.scanResult = resultString;
    this.barcodeType = this.identifyBarcodeType(resultString);

    console.log('Código de barras escaneado:', resultString);
    console.log('Tipo:', this.barcodeType);

    // Agregar al historial
    this.addToHistory(resultString, this.barcodeType);

    // Procesar según el tipo de código de barras
    this.processBarcodeData(resultString, this.barcodeType);

    // Opcional: detener el escáner después de leer
    // this.stopScanner();
  }

  identifyBarcodeType(code: string): string {
    if (code.length === 13 && (code.startsWith('0') || code.match(/^\d{13}$/))) {
      return 'EAN-13 (Producto internacional)';
    } else if (code.length === 8 && code.match(/^\d{8}$/)) {
      return 'EAN-8 (Producto pequeño)';
    } else if (code.length === 12 && code.match(/^\d{12}$/)) {
      return 'UPC-A (Producto USA/Canadá)';
    } else if (code.length === 6 || (code.length === 7 && code.match(/^\d{7}$/))) { // UPC-E es 6 o 7 dígitos con un "check digit" implícito.
        return 'UPC-E (UPC compacto)';
    } else if (/^[A-Z0-9\-\.\$\/\+\%\s]+$/.test(code) && code.length > 0) {
      // CODE 39 es alfanumérico y tiene un conjunto de caracteres limitado.
      // Esta es una aproximación, ya que CODE 128 también puede contener estos.
      // Se podría refinar con expresiones regulares más específicas si es necesario.
      return 'CODE 39 (Industrial/Logística)';
    } else if (code.length > 0) { // Catch-all para otros códigos de longitud variable, comúnmente Code 128
      return 'CODE 128 (Uso general)';
    } else {
        return 'Tipo Desconocido';
    }
  }

  processBarcodeData(code: string, type: string): void {
    // Simular información del producto (normalmente sería una API)
    if (type.includes('EAN') || type.includes('UPC')) {
      this.productInfo = {
        barcode: code,
        name: `Producto ${code.slice(-4)}`,
        brand: 'Marca Ejemplo',
        category: 'Categoría Ejemplo',
        price: '$' + (Math.random() * 100 + 10).toFixed(2), // Genera un precio aleatorio
        description: `Producto identificado con código ${type}`
      };
    } else {
      this.productInfo = {
        barcode: code,
        type: type,
        data: code,
        timestamp: new Date().toLocaleString()
      };
    }
  }

  addToHistory(code: string, type: string): void {
    const historyItem = {
      code: code,
      type: type,
      timestamp: new Date().toLocaleString(),
      id: Date.now()
    };

    this.scanHistory.unshift(historyItem);

    // Mantener solo los últimos 10 escaneados
    if (this.scanHistory.length > 10) {
      this.scanHistory = this.scanHistory.slice(0, 10);
    }
  }

  onDeviceSelectChange(event: Event): void {
    const selectedDeviceId = (event.target as HTMLSelectElement).value;
    const selectedDevice = this.availableDevices.find(device => device.deviceId === selectedDeviceId);
    this.currentDevice = selectedDevice || this.currentDevice;
  }

  onHasPermission(has: any): void {
    this.hasPermission = has;
  }

  startScanner(): void {
    this.scannerEnabled = true;
    this.clearResult(); // Limpiar el resultado anterior al iniciar un nuevo escaneo
  }

  stopScanner(): void {
    this.scannerEnabled = false;
  }

  clearResult(): void {
    this.scanResult = '';
    this.barcodeType = '';
    this.productInfo = null;
  }

  clearHistory(): void {
    this.scanHistory = [];
  }

  rescanBarcode(code: string): void {
    // Simula el reescaneo cargando la información en el panel de resultados
    this.scanResult = code;
    this.barcodeType = this.identifyBarcodeType(code);
    this.processBarcodeData(code, this.barcodeType);
    this.scannerEnabled = false; // Opcional: detener el escáner si se selecciona del historial
  }

  onScanError(error: any): void {
    console.error('Error de escáner:', error);
    // Puedes mostrar un mensaje al usuario aquí si el error es relevante
  }

  copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => console.log('Texto copiado al portapapeles:', text))
        .catch(err => console.error('Error al copiar al portapapeles:', err));
    } else {
      // Fallback para navegadores antiguos o entornos sin soporte de Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed'; // Para que no interfiera con el scroll
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        console.log('Texto copiado (fallback):', text);
      } catch (err) {
        console.error('Error al copiar (fallback):', err);
      }
      document.body.removeChild(textArea);
    }
  }
}
