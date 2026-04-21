export interface MockIdentity {
  name: string;
  email: string;
}

const FIRST_NAMES = [
  // Femininos
  "Ana", "Amanda", "Adriana", "Alice", "Aline", "Alessandra", "Andreia", "Aparecida",
  "Beatriz", "Bianca", "Bruna", "Camila", "Carla", "Carolina", "Catarina", "Cecília",
  "Clara", "Cláudia", "Cristiane", "Daniela", "Débora", "Denise", "Eduarda", "Elaine",
  "Eliana", "Elisa", "Érica", "Fabiana", "Fátima", "Fernanda", "Flávia", "Francisca",
  "Gabriela", "Giovana", "Giovanna", "Helena", "Heloísa", "Isabel", "Isabela", "Isabella",
  "Isadora", "Jaqueline", "Joana", "Jorgina", "Josefa", "Juliana", "Júlia", "Karina",
  "Larissa", "Laura", "Leonor", "Letícia", "Lívia", "Luana", "Lúcia", "Luiza",
  "Manuela", "Marcela", "Márcia", "Margarida", "Maria", "Mariana", "Marina", "Marta",
  "Mayara", "Melissa", "Mônica", "Natália", "Nathalia", "Nicole", "Núbia", "Olívia",
  "Patrícia", "Paula", "Priscila", "Rafaela", "Raquel", "Regina", "Renata", "Roberta",
  "Rosana", "Rosângela", "Sabrina", "Sandra", "Sara", "Silvana", "Simone", "Sofia",
  "Solange", "Sônia", "Stephanie", "Sueli", "Tainá", "Tatiane", "Thais", "Valentina",
  "Valéria", "Vanessa", "Vera", "Verônica", "Viviane", "Yasmin",
  // Masculinos
  "Adriano", "Alan", "Alberto", "Alessandro", "Alexandre", "Alexsandro", "Álvaro", "André",
  "Anderson", "Antônio", "Arthur", "Augusto", "Benedito", "Bernardo", "Bruno", "Caio",
  "Carlos", "César", "Cláudio", "Cristiano", "Daniel", "Davi", "Denis", "Diego",
  "Diogo", "Douglas", "Eduardo", "Elias", "Emanuel", "Enzo", "Érico", "Ewerton",
  "Fábio", "Felipe", "Fernando", "Flávio", "Francisco", "Gabriel", "Geraldo", "Gilberto",
  "Gustavo", "Heitor", "Henrique", "Hugo", "Ian", "Igor", "Ismael", "Ivan",
  "Jair", "Jefferson", "João", "Joaquim", "Jonas", "Jonatan", "Jorge", "José",
  "Júlio", "Kaique", "Kelvin", "Leandro", "Leonardo", "Levi", "Lucas", "Luciano",
  "Luís", "Marcelo", "Marco", "Marcos", "Mário", "Matheus", "Maurício", "Miguel",
  "Murilo", "Nathan", "Nelson", "Nicolas", "Orlando", "Otávio", "Pablo", "Paulo",
  "Pedro", "Rafael", "Raimundo", "Raphael", "Raul", "Renan", "Renato", "Ricardo",
  "Roberto", "Rodrigo", "Rogério", "Romário", "Ronaldo", "Ruan", "Samuel", "Sandro",
  "Sebastião", "Sérgio", "Silvio", "Thales", "Thiago", "Tiago", "Valter", "Vicente",
  "Victor", "Vinicius", "Vitor", "Wagner", "Wallace", "Washington", "Wesley", "William",
];

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira",
  "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes",
  "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Araújo",
  "Moreira", "Cavalcanti", "Monteiro", "Cardoso", "Reis", "Castro", "Pinto", "Teixeira",
  "Correia", "Nunes", "Moura", "Mendes", "Freitas", "Campos", "Batista", "Guimarães",
  "Abreu", "Aguiar", "Andrade", "Antunes", "Azevedo", "Bastos", "Borges", "Braga",
  "Brito", "Camargo", "Cardoso", "Coelho", "Cunha", "Duarte", "Esteves", "Farias",
  "Figueiredo", "Fonseca", "Franco", "Furtado", "Galvão", "Godoy", "Gonçalves", "Granado",
  "Leal", "Leite", "Machado", "Macedo", "Magalhães", "Maia", "Marinho", "Matos",
  "Medeiros", "Melo", "Miranda", "Mota", "Neves", "Novaes", "Oliva", "Pacheco",
  "Paes", "Paiva", "Passos", "Peixoto", "Pimenta", "Prado", "Queiroz", "Ramos",
  "Rangel", "Resende", "Rezende", "Romano", "Salgado", "Sampaio", "Saraiva", "Serra",
  "Siqueira", "Tavares", "Torres", "Valente", "Vargas", "Vasconcelos", "Viana", "Xavier",
];

const EMAIL_DOMAINS = [
  "gmail.com", "icloud.com", "hotmail.com", "outlook.com", "yahoo.com.br",
];

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
