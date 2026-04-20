export interface MockIdentity {
  name: string;
  email: string;
}

const FIRST_NAMES = [
  "Ana", "André", "Beatriz", "Bruno", "Camila", "Carla", "Carlos", "César",
  "Daniel", "Daniela", "Diego", "Eduardo", "Elaine", "Fábio", "Felipe",
  "Fernanda", "Gabriel", "Gabriela", "Gustavo", "Henrique", "Igor", "Isabela",
  "João", "Juliana", "Kelvin", "Larissa", "Leonardo", "Letícia", "Lucas",
  "Marcos", "Mariana", "Matheus", "Natália", "Paula", "Pedro", "Rafael",
  "Rafaela", "Renato", "Ricardo", "Roberta", "Rodrigo", "Sabrina", "Sérgio",
  "Thiago", "Vanessa", "Victor", "Vinicius", "Yasmin", "Amanda", "Alexandre",
];

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
  "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho",
  "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha",
  "Dias", "Nascimento", "Araújo", "Moreira", "Cavalcanti", "Monteiro",
  "Cardoso", "Reis", "Castro", "Pinto", "Teixeira", "Correia", "Nunes",
  "Moura", "Mendes", "Freitas", "Campos", "Batista", "Guimarães",
];

const EMAIL_DOMAINS = ["gmail.com", "icloud.com"];

function removeAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateIdentity(): MockIdentity {
  const first = pick(FIRST_NAMES);
  const last1 = pick(LAST_NAMES);
  const useTwoLast = Math.random() < 0.4;
  const last2 = useTwoLast ? pick(LAST_NAMES.filter((l) => l !== last1)) : null;
  const name = last2 ? `${first} ${last1} ${last2}` : `${first} ${last1}`;

  const firstSlug = removeAccents(first).toLowerCase();
  const lastSlug = removeAccents(last1).toLowerCase();
  const sepRoll = Math.random();
  const separator = sepRoll < 0.4 ? "" : sepRoll < 0.8 ? "." : "_";
  const suffix = Math.random() < 0.65 ? String(Math.floor(Math.random() * 1000)) : "";
  const domain = pick(EMAIL_DOMAINS);
  const email = `${firstSlug}${separator}${lastSlug}${suffix}@${domain}`;

  return { name, email };
}
