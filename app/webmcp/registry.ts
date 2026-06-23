export const webmcpTools = [
  {
    "@context": "https://www.w3.org/ns/webmcp",
    "@type": "Tool",
    "name": "security_quote",
    "description": "Submit a security installation quote request for CCTV, alarms, electric fencing, access control, intercoms, gate automation, or maintenance.",
    "url": "/contact",
    "capabilities": ["quote"],
    "intents": ["request_quote"],
    "input": {
      "form": "Security Contact Form",
      "fields": ["name", "phone", "email", "suburb", "service"]
    }
  },
  {
    "@context": "https://www.w3.org/ns/webmcp",
    "@type": "Tool",
    "name": "security_maintenance",
    "description": "Request maintenance, repairs, or an SLA-backed priority emergency callout for an existing security system.",
    "url": "/contact",
    "capabilities": ["maintain"],
    "intents": ["request_maintenance"],
    "input": {
      "form": "Security Contact Form",
      "fields": ["name", "phone", "email", "suburb", "service"]
    }
  },
  {
    "@context": "https://www.w3.org/ns/webmcp",
    "@type": "Tool",
    "name": "security_contact",
    "description": "Contact Global Security Solutions for a general enquiry, security assessment, or callback request.",
    "url": "/contact",
    "capabilities": ["contact", "audit"],
    "intents": ["general_inquiry"],
    "input": {
      "form": "Security Contact Form",
      "fields": ["name", "phone", "email", "suburb", "service"]
    }
  }
];
