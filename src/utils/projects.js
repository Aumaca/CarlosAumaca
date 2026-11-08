import translations from '@/utils/projectTranslations'

const projects = [
  {
    name: 'marium',
    featured: true,
    stack: [],
    desktopImages: ['marium/image.png'],
    mobileImages: ['marium/image copy.png', 'marium/image copy 2.png'],
    description: {
      en: `A quiet place for the things you love.\nmarium is one calm profile for your photos, albums, films, series, anime and books, shared with a link. Free, with no feed and no noise.`,
      pt: `Um lugar tranquilo para as coisas que você ama.\nO marium é um perfil calmo para suas fotos, álbuns, filmes, séries, animes e livros, compartilhado com um link. Gratuito, sem feed e sem ruído.`
    }
  },
  {
    name: 'Evamo: Digital Catalog',
    featured: true,
    url: 'https://evamo-aftermarket.com.br/',
    stack: [
      'dart',
      'flutter',
      'supabase',
      'postgresql',
      'netlify',
      'python',
      'pandas',
      'android',
      'provider'
    ],
    desktopImages: [
      'slider9/1.png',
      'slider9/2.png',
      'slider9/3.png',
      'slider9/4.png',
      'slider9/5.png'
    ],
    mobileImages: [
      'slider9/6.png',
      'slider9/7.png',
      'slider9/8.png',
      'slider9/9.png',
      'slider9/10.png',
      'slider9/11.png'
    ],
    description: {
      en: `This project was developed for the multinational company Evamo - Pump Technology Solutions.\nGiven the need to create an intuitive and easily accessible online catalog for the company’s products, this system was developed, allowing for the search and detailed viewing of sets, components, and repair kits for the pump solutions offered by the company. The catalog features filters and relationships between products, making navigation and searching for specific items easier.`,
      pt: `Este é um projeto criado para a empresa multinacional Evamo - Pump Technology Solutions.\nDiante a necessidade da criação de um catálogo online de fácil uso e acesso aos produtos da empresa, foi desenvolvido este catálogo, que possibilita a pesquisa e visualização de detalhes de conjuntos, componentes e jogos de reparo das soluções de bombas providas pela empresa, através de filtros e relações entre os produtos.`
    }
  },
  {
    name: 'AnimeRank',
    url: 'https://aumaca-animerank.vercel.app/',
    stack: [
      'javascript',
      'typescript',
      'nodejs',
      'html5',
      'css3',
      'mongodb',
      'react',
      'express',
      'redux',
      'jwt',
      'mocha',
      'vercel'
    ],
    desktopImages: [
      'slider1/1.png',
      'slider1/2.png',
      'slider1/3.png',
      'slider1/4.png',
      'slider1/5.png',
      'slider1/6.png'
    ],
    mobileImages: ['slider1/7.png'],
    description: {
      en: `This is a project created based on the website MyAnimeList, that allows users to create a list of animes and score them, also allowing comments.`,
      pt: `Este é um projeto criado com base no site MyAnimeList, que permite aos usuários criar uma lista de animes e avaliá-los, além de permitir comentários.`
    }
  },
  {
    name: 'MyNikki',
    video: 'mynikki',
    stack: ['dart', 'flutter', 'googleplay', 'sqlite', 'googledrive', 'firebase', 'android'],
    desktopImages: ['slider2/1.png'],
    mobileImages: ['slider2/1.png'],
    description: {
      en: `My first app (that I would like to publish in Google Play Store, but due the Google policies to indie developers I couldn't do it) a digital diary app made using Flutter.\nThis project was indeed to be a complex app, with MongoDB server, images from AWS S3 server, login through a backend server and more. After I realized that the app should be simple.\nHowever, even without releasing the complex version, I did the app in the complex way using pre-signed objects for image visualization permission, login using Google, and more.`,
      pt: `Meu primeiro aplicativo (que eu gostaria de publicar na Google Play Store, porém, infelizmente às políticas do Google para desenvolvedores indie, não pude publicar) de diário digital feito com Flutter.\nEste projeto deveria ser um aplicativo complexo, com servidor MongoDB, imagens no servidor AWS S3, login através de um servidor backend e mais. Depois percebi que o aplicativo deveria ser simples.\nNo entanto, mesmo sem lançar a versão complexa, fiz o aplicativo da maneira complexa, usando objetos pré-assinados para permissão de visualização de imagens, login usando Google e mais.`
    },
    file: 'https://drive.google.com/file/d/17tDMulySmvqJeyRw0pyUH_cT41MxtrEC/view?usp=sharingk'
  },
  {
    name: 'Truth Table Generator',
    url: 'https://aumaca.github.io/Truth-Table-Generator/',
    stack: ['javascript', 'typescript', 'html5', 'css3'],
    desktopImages: ['slider3/1.png', 'slider3/2.png', 'slider3/3.png', 'slider3/4.png'],
    mobileImages: ['slider3/5.png', 'slider3/6.png'],
    description: {
      en: `I developed a basic Truth Table Generator that constructs truth tables for AND, OR, conditional, and negation operations.\nThis project marked my first significant coding challenge, taking two weeks to complete.\nI utilized object-oriented programming principles to enhance code readability and organization.`,
      pt: `Eu desenvolvi um gerador básico de Tabelas Verdade que constrói tabelas para operações de AND, OR, condicional e negação.\nEste projeto marcou meu primeiro desafio significativo de programação, levando duas semanas para ser concluído.\nEu utilizei princípios de programação orientada a objetos para melhorar a legibilidade e organização do código.`
    }
  },
  {
    name: 'César Contador Website',
    url: 'https://cesarcontador.netlify.app/',
    stack: ['html5', 'css3', 'javascript', 'vuejs', 'tailwindcss', 'netlify', 'sanity'],
    desktopImages: [
      'slider8/1.png',
      'slider8/2.png',
      'slider8/3.png',
      'slider8/4.png',
      'slider8/5.png',
      'slider8/6.png',
      'slider8/7.png'
    ],
    mobileImages: [
      'slider8/8.png',
      'slider8/9.png',
      'slider8/10.png',
      'slider8/11.png',
      'slider8/12.png',
      'slider8/13.png',
      'slider8/14.png',
      'slider8/15.png',
      'slider8/16.png',
      'slider8/17.png'
    ],
    description: {
      en: "I developed a modern website for an accountant looking for a flexible online presence with easy content management.\nUsing Vue.js, Sanity CMS, HTML, CSS, and Tailwind, I built an intuitive platform that's simple to update. The Sanity CMS allows for seamless content management, while the responsive design ensures a smooth experience across devices.\nInitially, I considered WordPress, but Sanity offered a streamlined, modern solution with real-time content editing and data hosting.",
      pt: 'Desenvolvi um site moderno para um contador que buscava uma presença online flexível e com gerenciamento de conteúdo facilitado.\nUtilizando Vue.js, Sanity CMS, HTML, CSS e Tailwind, construí uma plataforma intuitiva e fácil de atualizar. O Sanity CMS permite um gerenciamento de conteúdo simplificado, enquanto o design responsivo garante uma experiência fluida em diversos dispositivos.\nInicialmente, considerei WordPress, mas o Sanity ofereceu uma solução mais enxuta e moderna, com edição de conteúdo em tempo real e hospedagem de dados.'
    }
  },
  {
    name: 'Organização Contábil Sorocaba Website',
    url: 'https://contabilsorocaba.com.br/',
    stack: ['wordpress', 'javascript', 'html5', 'css3'],
    desktopImages: ['slider7/1.png', 'slider7/2.png', 'slider7/3.png'],
    mobileImages: ['slider7/4.png', 'slider7/5.png', 'slider7/6.png', 'slider7/7.png'],
    description: {
      en: `This project marked my first professional work as a web developer in 2023.\nIn my previous job at an accounting office, I was tasked with creating a new website for the company, which was previously on WordPress. My responsibility was to completely redesign the site's aesthetics, taking into account the specific needs and requests of the client.\nI hand-coded all the design in CSS, which allowed me to customize each element of the site according to the company's visual guidelines, ensuring a unique and professional presentation.\nDuring this process, I had the opportunity to work on a project on demand, facing various requirements that demanded creativity and attention to detail. This experience not only helped me improve my technical skills but also provided me with a deeper understanding of the importance of intuitive and attractive design for user satisfaction.`,
      pt: `Este projeto marcou meu primeiro trabalho profissional como desenvolvedor web em 2023.\nEm meu antigo emprego em um escritório de contabilidade, fui encarregado de criar um novo site para a empresa, que estava previamente em WordPress. Minha responsabilidade consistiu em reformular completamente a estética do site, levando em conta as necessidades específicas e as solicitações do cliente.\nRealizei todo o design à mão em CSS, o que me permitiu personalizar cada elemento do site de acordo com as diretrizes visuais da empresa, garantindo uma apresentação única e profissional.\nDurante esse processo, tive a oportunidade de trabalhar em um projeto sob demanda, enfrentando diversos requisitos que exigiam criatividade e atenção aos detalhes. Essa experiência não apenas me ajudou a aprimorar minhas habilidades técnicas, mas também me proporcionou uma compreensão mais profunda da importância de um design intuitivo e atraente para a satisfação do usuário.`
    }
  },
  {
    name: 'PsicoAjuda',
    video: 'psicoajuda',
    stack: [],
    desktopImages: [],
    mobileImages: [],
    description: {
      en: `An application made for psychologists to manage their patients and customers, with notes, AI support for notes and patients, money management and session management.\nWe built it as our college final project (TCC) and received the maximum score: 100.`,
      pt: `Uma aplicação feita para psicólogos gerenciarem seus pacientes e clientes, com anotações, suporte de IA para anotações e pacientes, gestão financeira e gestão de sessões.\nDesenvolvemos como nosso Trabalho de Conclusão de Curso (TCC) e recebemos a nota máxima: 100.`
    }
  },
  {
    name: 'Shell Password Manager',
    url: 'https://github.com/Aumaca/Shell-Password-Manager',
    stack: ['python', 'sqlite'],
    desktopImages: [
      'slider4/1.png',
      'slider4/2.png',
      'slider4/3.png',
      'slider4/4.png',
      'slider4/5.png',
      'slider4/6.png',
      'slider4/7.png'
    ],
    mobileImages: [],
    description: {
      en: `I was curious about how to really build a password manager, that can unlock one password with another.\nThrough this little practice, I learned how to do it, and it was great!`,
      pt: `Eu estava curioso sobre como realmente construir um gerenciador de senhas, que pudesse desbloquear uma senha com outra.\nAtravés dessa pequena prática, aprendi como fazer isso, e foi ótimo!`
    }
  },
  {
    name: 'Chess',
    url: 'https://aumaca.github.io/Chess-Game/',
    stack: ['javascript', 'typescript', 'html5', 'css3', 'react'],
    desktopImages: ['slider6/1.png', 'slider6/2.png', 'slider6/3.png', 'slider6/4.png'],
    mobileImages: ['slider6/5.png', 'slider6/6.png'],
    description: {
      en: `This was another challenging one for me.\nFor the first time, I would use OOP to create a project from scratch. I was also learning about layout (grid, flex), code organization, etc.\nAnd yes, this took a lot of logic to make. In reality, I stopped at some point, still lacking some functionalities like recognizing a draw or some movements.`,
      pt: `Este foi outro desafio para mim.\nPela primeira vez, eu usaria OOP para criar um projeto do zero. Eu também estava aprendendo sobre layout (grid, flex), organização de código, etc.\nE sim, isso exigiu muita lógica para ser feito. Na verdade, eu parei em algum ponto, ainda faltando algumas funcionalidades como reconhecer um empate ou alguns movimentos.`
    }
  },
  {
    name: 'Tic-Tac-Toe',
    url: 'https://aumaca.github.io/Tic-Tac-Toe/',
    stack: ['javascript', 'typescript', 'html5', 'css3', 'bootstrap'],
    desktopImages: ['slider5/1.png', 'slider5/2.png'],
    mobileImages: ['slider5/3.png', 'slider5/4.png'],
    description: {
      en: `One of the first projects I ever did, when I was still learning about the whole concept of web development.`,
      pt: `Um dos primeiros projetos que eu fiz, quando ainda estava aprendendo sobre todo o conceito de desenvolvimento web.`
    }
  }
]

projects.forEach((project) => Object.assign(project.description, translations[project.name]))

export default projects
