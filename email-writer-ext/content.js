console.log("Email Writer Extension - Content Script Loaded");

// Keep track of processed compose windows
const processedWindows = new Set();

// Detect Gmail interface version
let gmailVersion = "";
if (document.querySelector('.zA')) {
  gmailVersion = "standard";
} else if (document.querySelector('.bkK')) {
  gmailVersion = "new";
}
console.log(`Detected Gmail version: ${gmailVersion || "unknown"}`);

// Create an AI Reply button that matches Gmail's style
function createAIButton() {
  const button = document.createElement('div');
  button.id = 'ai-reply-button';
  button.className = 'T-I J-J5-Ji aoO T-I-atl L3'; // Gmail button classes
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  button.style.marginRight = '10px';
  button.style.backgroundColor = '#1a73e8';
  button.style.color = 'white';
  button.style.padding = '0 16px';
  button.style.minWidth = '56px';
  button.style.textAlign = 'center';
  button.style.fontFamily = 'Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif';
  button.style.fontSize = '14px';
  button.style.fontWeight = '500';
  button.style.letterSpacing = '.25px';
  button.style.lineHeight = '36px';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.innerHTML = 'AI Reply';
  
  return button;
}

// Get the email content for processing
function getEmailContent() {
  // selectors for the email content
  const selectors = [
    '.a3s.aiL',
    '.h7',
    '.gmail_quote',
    '.ii.gt',
    '.a3s'
  ];
  
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    if (elements && elements.length > 0) {
      return Array.from(elements)
        .map(el => el.innerText.trim())
        .join('\n\n');
    }
  }
  
  return '';
}

// Function to find the compose toolbar
function findComposeToolbar() {
  // Direct selectors for the compose toolbar with the send button
  const possibleSelectors = [
    '.dC', // Common selector for the bottom toolbar
    '.aDh', // Another toolbar selector
    '.gU.Up', // Another possible toolbar
    '.bAK' // Yet another toolbar class
  ];
  
  for (const selector of possibleSelectors) {
    const toolbars = document.querySelectorAll(selector);
    for (const toolbar of toolbars) {
      // Check if this toolbar contains the send button
      if (toolbar.querySelector('[role="button"][data-tooltip*="Send"]') || 
          toolbar.querySelector('[role="button"][aria-label*="Send"]') ||
          toolbar.querySelector('.T-I.J-J5-Ji.aoO')) {
        console.log(`Found compose toolbar with selector: ${selector}`);
        return toolbar;
      }
    }
  }
  
  // If no direct match, try to find the Send button and get its parent
  const sendButton = document.querySelector('[role="button"][data-tooltip*="Send"], [role="button"][aria-label*="Send"], .T-I.J-J5-Ji.aoO');
  if (sendButton) {
    const toolbar = sendButton.parentElement;
    console.log("Found toolbar via send button");
    return toolbar;
  }
  
  return null;
}

// Function to inject the AI Reply button into the compose window
function injectButtonIntoCompose() {
  console.log("Attempting to inject AI button");
  
  // Find the compose toolbar
  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Compose toolbar not found, will retry");
    setTimeout(injectButtonIntoCompose, 1000);
    return;
  }
  
  // Check if we've already processed this toolbar
  if (processedWindows.has(toolbar)) {
    console.log("Toolbar already has AI button");
    return;
  }
  
  // Create and inject the AI Reply button
  const button = createAIButton();
  
  // Find the send button
  const sendButton = toolbar.querySelector('[role="button"][data-tooltip*="Send"], [role="button"][aria-label*="Send"], .T-I.J-J5-Ji.aoO');
  
  if (sendButton) {
    console.log("Found send button, injecting AI button before it");
    toolbar.insertBefore(button, sendButton);
  } else {
    console.log("Send button not found, appending AI button to toolbar");
    toolbar.appendChild(button);
  }
  
  // Add click event listener
  button.addEventListener('click', handleAIButtonClick);
  
  // Mark this toolbar as processed
  processedWindows.add(toolbar);
  console.log("AI button successfully injected");
}

// Handler for the AI button click
async function handleAIButtonClick() {
  const button = this;
  try {
    button.innerHTML = 'Generating...';
    button.style.backgroundColor = '#ccc';
    button.disabled = true;
    
    const emailContent = getEmailContent();
    console.log("Email content extracted:", emailContent.substring(0, 50) + "...");
    
    const response = await fetch('http://localhost:8080/api/email/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailContent: emailContent,
        tone: "professional"
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Request Failed: ${response.status}`);
    }
    
    const generatedReply = await response.text();
    
    // Find the compose box
    const composeBox = document.querySelector('[role="textbox"][g_editable="true"], .Am.Al.editable, .Am.aO9');
    
    if (composeBox) {
      composeBox.focus();
      document.execCommand('insertText', false, generatedReply);
      console.log("Reply inserted into compose box");
    } else {
      console.error('Compose box not found');
      alert('Could not find the compose area');
    }
  } catch (error) {
    console.error("Error generating reply:", error);
    alert('Failed to generate reply: ' + error.message);
  } finally {
    button.innerHTML = 'AI Reply';
    button.style.backgroundColor = '#1a73e8';
    button.disabled = false;
  }
}

// Function to detect compose window creation
function detectComposeActions() {
  // Listen for clicks on compose/reply buttons
  document.addEventListener('click', (event) => {
    const target = event.target;
    
    // Check if the clicked element is a compose or reply button
    const isComposeButton = target.closest('[role="button"][data-tooltip*="Compose"], [role="button"][aria-label*="Compose"]');
    const isReplyButton = target.closest('[role="button"][data-tooltip*="Reply"], [role="button"][aria-label*="Reply"]');
    
    if (isComposeButton || isReplyButton) {
      console.log(`Detected click on ${isComposeButton ? 'compose' : 'reply'} button`);
      // Wait for Gmail to create the compose window
      setTimeout(injectButtonIntoCompose, 1000);
    }
  });
  
  // Setup mutation observer to catch dynamic compose window creation
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        // Check if any added nodes are compose windows or contain compose toolbars
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if this is a compose window or has a send button
            if (node.querySelector('[role="dialog"][tabindex="0"]') || 
                node.querySelector('[role="button"][data-tooltip*="Send"]') ||
                node.querySelector('.T-I.J-J5-Ji.aoO')) {
              console.log("Compose window detected via mutation");
              setTimeout(injectButtonIntoCompose, 500);
              break;
            }
          }
        }
      }
    }
  });
  
  // Start observing the body for compose window creation
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also check for existing compose windows
  setTimeout(injectButtonIntoCompose, 2000);
}

// Initialize the extension
function initExtension() {
  console.log("Initializing Email Writer Extension");
  detectComposeActions();
  
  // Check for existing compose windows on page load
  setTimeout(() => {
    if (document.querySelector('[role="dialog"][tabindex="0"]') || 
        document.querySelector('[role="button"][data-tooltip*="Send"]')) {
      console.log("Found existing compose window on page load");
      injectButtonIntoCompose();
    }
  }, 3000);
}

// Start the extension
document.addEventListener('DOMContentLoaded', initExtension);
// Also try initializing on window load
window.addEventListener('load', initExtension);
// Run initialization immediately too
initExtension();