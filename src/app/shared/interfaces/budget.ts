export interface Budget {

  id:number; 
  name:string; 
  client:string; 
  currency:string; 
  fields:Field[]; 
}

export interface Field {

  name:string; 
  title:string; 
  unit_price:number;
  quantity:number;
  extras?:Field[]; 
  
}

export const defaultDataBudget = {

    id:0,
    name: '',
    client:'',
    currency:'$',
    
    fields:[

    {
      name:'web',
      title:'Fer una pàgina web',
      unit_price:500,
      quantity:0,
      extras:[

        {
          name: 'paginas',
          title:'Número de páginas',
          unit_price: 30,
          quantity:0
        },
        {
          name: 'idiomas',
          title:'Número de idiomas',
          unit_price: 30,
          quantity:0
        }
      ]
    },
    {
      name:'seo',
      title:'Fer una campanya SEO',
      unit_price:300,
      quantity:0
    },
    {
      name:'googleAds',
      title:'Fer una campanya de publicitat',
      unit_price:200,
      quantity:0

    }
  ]};

  



