/**
 * This utility prevents conflicts with browser extensions and libraries
 * 1. Prevents ethereum property conflicts with wallet extensions
 * 2. Handles potential issues with Lucide React icon loading
 */

// Define a basic interface for the Ethereum provider
interface EthereumProvider {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (eventName: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (eventName: string, handler: (...args: unknown[]) => void) => void;
  // Add other properties as needed
}

// Add ethereum property to Window interface
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export function preventBrowserConflicts(): void {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Fix for ethereum property conflicts
  try {
    const ethereumDescriptor = Object.getOwnPropertyDescriptor(window, 'ethereum');
    
    // If ethereum is already defined but configurable, make it non-configurable
    if (ethereumDescriptor && ethereumDescriptor.configurable) {
      const currentValue = window.ethereum;
      Object.defineProperty(window, 'ethereum', {
        configurable: false,
        writable: false,
        value: currentValue
      });
    } 
    // If ethereum is not defined, create a non-configurable property
    else if (!ethereumDescriptor) {
      Object.defineProperty(window, 'ethereum', {
        configurable: false,
        value: undefined
      });
    }
  } catch (error) {
    console.debug('Failed to handle ethereum property:', error);
  }

  // Fix for potential Lucide React icon loading issues
  try {
    // Create a custom error handler for script loading errors
    window.addEventListener('error', (event) => {
      // Check if the error is related to loading a Lucide icon
      if (event.target && 
          event.target instanceof HTMLScriptElement && 
          event.target.src && 
          event.target.src.includes('lucide-react') && 
          event.target.src.includes('icons')) {
        
        // Prevent the error from bubbling up
        event.preventDefault();
        event.stopPropagation();
        
        console.debug('Handled Lucide icon loading error:', event.target.src);
        return true;
      }
      return false;
    }, true);
  } catch (error) {
    console.debug('Failed to set up Lucide error handler:', error);
  }
}
