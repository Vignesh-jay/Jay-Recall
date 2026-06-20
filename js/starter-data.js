const STARTER_DATA = [
  {
"id": 1001,
"type": "⚡ Command Vault",
"title": "Check Disk Usage",
"tags": "linux,disk",
"command": "df -h",
"description": "Display filesystem disk usage",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1002,
"type": "⚡ Command Vault",
"title": "Check Memory Usage",
"tags": "linux,memory",
"command": "free -h",
"description": "Display memory usage",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1003,
"type": "⚡ Command Vault",
"title": "Check Listening Ports",
"tags": "network,linux",
"command": "sudo ss -tulpn",
"description": "Show listening ports",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1004,
"type": "⚡ Command Vault",
"title": "Restart Service",
"tags": "linux,systemd",
"command": "sudo systemctl restart service-name",
"description": "Restart a Linux service",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1005,
"type": "⚡ Command Vault",
"title": "Tail System Logs",
"tags": "linux,logs",
"command": "sudo tail -f /var/log/syslog",
"description": "Watch logs in real time",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1006,
"type": "⚡ Command Vault",
"title": "Docker Compose Up",
"tags": "docker",
"command": "docker compose up -d",
"description": "Start containers",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1007,
"type": "⚡ Command Vault",
"title": "Docker Compose Down",
"tags": "docker",
"command": "docker compose down",
"description": "Stop containers",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1008,
"type": "⚡ Command Vault",
"title": "Docker Logs",
"tags": "docker",
"command": "docker logs -f container-name",
"description": "Follow container logs",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1009,
"type": "⚡ Command Vault",
"title": "Docker Exec",
"tags": "docker",
"command": "docker exec -it container-name bash",
"description": "Enter running container",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 1010,
"type": "⚡ Command Vault",
"title": "Cloudflare Tunnel List",
"tags": "cloudflare",
"command": "cloudflared tunnel list",
"description": "List all tunnels",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 2001,
"type": "🛠 Troubleshooting",
"title": "Website Not Loading",
"problem": "Website inaccessible",
"solution": "Check DNS, firewall, web service and SSL certificate",
"outcome": "Website restored",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 2002,
"type": "🛠 Troubleshooting",
"title": "Docker Container Not Starting",
"problem": "Container exits immediately",
"solution": "Review logs, inspect container and verify ports",
"outcome": "Container started",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 2003,
"type": "🛠 Troubleshooting",
"title": "Cloudflare Tunnel Offline",
"problem": "Tunnel disconnected",
"solution": "Restart cloudflared and verify DNS routes",
"outcome": "Tunnel restored",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 2004,
"type": "🛠 Troubleshooting",
"title": "Printer Offline",
"problem": "Users cannot print",
"solution": "Ping printer, restart spooler and reinstall drivers",
"outcome": "Printing restored",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 3001,
"type": "☁️ Infrastructure",
"title": "Cloudflare Tunnel Setup",
"tags": "cloudflare",
"content": "Install cloudflared, authenticate, create tunnel, configure DNS and ingress rules.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 3002,
"type": "☁️ Infrastructure",
"title": "Jay Cloud Architecture",
"tags": "homelab,nextcloud",
"content": "Ubuntu Server + Docker + Nextcloud + Filebrowser + Cloudflare Tunnel.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 3003,
"type": "☁️ Infrastructure",
"title": "Jellyfin Deployment",
"tags": "jellyfin",
"content": "Media stored locally, exposed through Cloudflare Tunnel and custom domain.",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 4001,
"type": "🔐 Security",
"title": "MFA Best Practice",
"tags": "security,mfa",
"content": "All privileged accounts should require MFA.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 4002,
"type": "🔐 Security",
"title": "3-2-1 Backup Rule",
"tags": "backup",
"content": "3 copies, 2 media types, 1 offsite copy.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 4003,
"type": "🔐 Security",
"title": "USB Security Policy",
"tags": "endpoint",
"content": "Only approved encrypted USB devices may be used.",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 5001,
"type": "📋 Checklist",
"title": "New Employee Onboarding",
"tags": "itam",
"content": "Create account, assign laptop, assign M365 license, enable MFA and provide VPN access.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 5002,
"type": "📋 Checklist",
"title": "Employee Offboarding",
"tags": "security",
"content": "Disable account, collect assets, revoke access and archive mailbox.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 5003,
"type": "📋 Checklist",
"title": "Server Deployment",
"tags": "linux",
"content": "Install OS, update packages, configure firewall, SSH, Docker and backups.",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 6001,
"type": "📚 Documentation",
"title": "Linux File Structure",
"tags": "linux",
"content": "/etc configuration, /var logs, /home users, /opt applications.",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 6002,
"type": "📚 Documentation",
"title": "Docker Cheat Sheet",
"tags": "docker",
"content": "docker ps, docker logs, docker exec, docker compose up -d, docker compose down.",
"favorite": true,
"createdAt": "2026-06-21T00:00:00Z"
},
{
"id": 7001,
"type": "📝 Knowledge Note",
"title": "Useful Linux Directories",
"tags": "linux",
"content": "/etc stores configs, /var stores logs, /home stores user data.",
"favorite": false,
"createdAt": "2026-06-21T00:00:00Z"
}

];