import { ProjectModel } from "./project.model";

export var projectsList: ProjectModel[] = [
    {
      image: "assets/amn.jpg",
      title: 'AZ MVD Now',
      description: 'AZ MVD Now is a fast, easy, secure, and personalized Arizona citizen MVD portal.'
        + ' Get access to over 30 Arizona MVD Services from the comfort of your home.',
      codeLink: "",
      demoLink: 'https://azmvdnow.gov/home',
      html: '<i class="fab fa--techstack fa-angular" title="Angular"></i>'
        + '<i class="fas fa-database fa--techstack" title="SQL Server"></i>',
      isExternalDemo: true
    },
    {
      image: 'assets/sorting.jpg',
      title: 'Sorting Algorithms',
      description: 'Animates sorting algorithms.',
      codeLink: "https://github.com/DennyHo2020/DennyHo/tree/main/src/app/areas/projects/sorting",
      demoLink: 'projects/sorting',
      html: '',
      isExternalDemo: false
    },
    {
      image: 'assets/iris-flower.jpg',
      title: 'Iris Flower Parallel Coordinates',
      description: 'Visualizes the Iris Flower Dataset with parallel coordinates.',
      codeLink: "https://github.com/DennyHo2020/DennyHo/tree/main/src/app/areas/projects/data-visualizations",
      demoLink: 'projects/data-visualizations/parallelcoordinates',
      html: '',
      isExternalDemo: false
    },
    {
      image: 'assets/MAX.jpg',
      title: 'Motor Vehicle Modernization',
      description: 'Private government Arizona Department of Transportation employee portal to complete official MVD tasks.',
      codeLink: '',
      demoLink: '',
       html: '', //'<i class="fab fa--techstack fa-angular" title="Angular"></i>'
      //   + '<i class="fas fa-database fa--techstack" title="SQL Server"></i>',
      isExternalDemo: false
    },
    // {
    //   image: 'assets/iris-flower.jpg',
    //   title: 'Calvin Scores Scatterplot',
    //   description: 'Displays Calvin Scores in a scatterplot.',
    //   codeLink: '',
    //   demoLink: '',
    //   html: '',
    //   isExternalDemo: false
    // },
    {
      image: 'assets/iris-flower.jpg',
      title: 'Iris Flower Data Linked Views',
      description: 'Visualizes the Iris Flower Dataset with linked scaterplot views.',
      codeLink: '',
      demoLink: '',
      html: '',
      isExternalDemo: false
    },
    {
      image: 'assets/reversi-computer.jpg',
      title: 'Reversi',
      description: 'Recreation of the class board game Reversi. Play against another human' 
        + ' on a network connection or play against an AI locally.',
      codeLink: 'https://github.com/DennyHo2020/Reversi',
      demoLink: '',
      html: '<i class="fas fa--techstack fa-gamepad" title="Game"></i>'
        + '<i class="fas fa--techstack fa-network-wired" title="Networking"></i>',
      isExternalDemo: true
    },
    {
      image: 'assets/treemap.jpg',
      title: 'Data Visualizations Showcase',
      description: 'Showcase of all my data visualizations.'
        + ' All built with the D3.js library to seemlessly animate data transitions and states.',
      codeLink: 'https://github.com/DennyHo2020/Data-Visualizations-Showcase',
      demoLink: '',
      html: '',
      isExternalDemo: true
    },
    {
      image: 'assets/food.jpg',
      title: "Anything's Fine",
      description: 'Original food recommendation and food social media mobile app.'
        + ' Built with a team of 3 in an iOS career development program at the University of Arizona.',
      codeLink: 'https://github.com/UofA-CodePathGroup2/anythingsfine',
      demoLink: '',
      html: '<i class="fab fa--techstack fa-apple" title="iOS Application"></i>'
        + '<i class="fas fa--techstack fa-mobile-alt" title="Mobile Device"></i>',
      isExternalDemo: true
    }
  ];