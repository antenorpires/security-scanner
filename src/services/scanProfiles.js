export const profiles = {
  fast: {
    host: "",
    whois: "",
    dnssec: "",
    nmap: "nmap -F -Pn -sT --open {{target}}"
  },

  low: {
    host: "host -d {{target}}",
    whois: "whois {{target}}",
    dnssec: "dig DNSKEY +dnssec {{target}}",
    nmap: "nmap -F -Pn -sT -sV -O {{target}}"
  }
};
