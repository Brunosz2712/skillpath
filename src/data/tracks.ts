export type Course = {
  id: string;
  name: string;
  description: string;
};

export type Track = {
  id: 'tech' | 'contabilidade' | 'administracao' | 'economia';
  name: string;
  description: string;
  courses: Course[];
  companies: string[];
};

export const TRACKS: Track[] = [
  {
    id: 'tech',
    name: 'Tecnologia',
    description: 'Base para entrar em desenvolvimento de software como iniciante.',
    courses: [
      {
        id: 'tech-1',
        name: 'Lógica de Programação & Pensamento Computacional',
        description: 'Variáveis, condicionais, laços, algoritmos e raciocínio lógico.',
      },
      {
        id: 'tech-2',
        name: 'Fundamentos de HTML & CSS',
        description: 'Estrutura de páginas e estilização básica para web.',
      },
      {
        id: 'tech-3',
        name: 'Introdução a Banco de Dados (SQL)',
        description: 'Conceitos de tabelas, chaves e comandos SQL básicos.',
      },
      {
        id: 'tech-4',
        name: 'Introdução à Programação com Java',
        description: 'Sintaxe básica, estruturas de controle e primeiros programas em Java.',
      },
    ],
    companies: [
      'Software houses e consultorias de tecnologia',
      'Startups em fase inicial',
      'Squads júnior de grandes empresas',
    ],
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade',
    description: 'Fundamentos para atuar em rotinas contábeis júnior.',
    courses: [
      {
        id: 'cont-1',
        name: 'Fundamentos de Contabilidade',
        description: 'Ativo, passivo, PL, receitas, despesas, débito e crédito.',
      },
      {
        id: 'cont-2',
        name: 'Escrituração Contábil Básica',
        description: 'Lançamentos simples no diário e razão.',
      },
      {
        id: 'cont-3',
        name: 'Demonstrações Financeiras Introdutórias',
        description: 'Balanço Patrimonial e DRE em nível básico.',
      },
      {
        id: 'cont-4',
        name: 'Noções de Tributos e Obrigações Acessórias',
        description: 'Visão geral de tributos e obrigações comuns.',
      },
    ],
    companies: [
      'Escritórios de contabilidade',
      'Empresas de BPO financeiro',
      'Departamentos contábeis de pequenas e médias empresas',
    ],
  },
  {
    id: 'administracao',
    name: 'Administração',
    description: 'Base para rotinas administrativas e suporte organizacional.',
    courses: [
      {
        id: 'adm-1',
        name: 'Fundamentos de Administração & Organizações',
        description: 'Estrutura das empresas e funções do administrador.',
      },
      {
        id: 'adm-2',
        name: 'Processos Administrativos & Rotinas de Escritório',
        description: 'Fluxo de documentos, atendimento e organização diária.',
      },
      {
        id: 'adm-3',
        name: 'Noções de Finanças e Orçamento',
        description: 'Fluxo de caixa, controle de custos e orçamento básico.',
      },
      {
        id: 'adm-4',
        name: 'Ferramentas de Produtividade (Planilhas & E-mail)',
        description: 'Uso de planilhas e comunicação profissional.',
      },
    ],
    companies: [
      'Setores administrativos de serviços, comércio e indústria',
      'Escritórios e consultorias',
      'Startups com backoffice enxuto',
    ],
  },
  {
    id: 'economia',
    name: 'Economia',
    description: 'Fundamentos para entender mercado e indicadores econômicos.',
    courses: [
      {
        id: 'eco-1',
        name: 'Introdução à Economia',
        description: 'Escassez, trade-offs, incentivos e agentes econômicos.',
      },
      {
        id: 'eco-2',
        name: 'Microeconomia Básica',
        description: 'Oferta, demanda, equilíbrio e formação de preços.',
      },
      {
        id: 'eco-3',
        name: 'Macroeconomia Básica',
        description: 'PIB, inflação, desemprego e taxa de juros.',
      },
      {
        id: 'eco-4',
        name: 'Indicadores Econômicos & Economia Aplicada',
        description: 'IPCA, Selic, PIB e impacto em pessoas e empresas.',
      },
    ],
    companies: [
      'Bancos e fintechs',
      'Consultorias econômicas',
      'Áreas de planejamento e estratégia',
    ],
  },
];
