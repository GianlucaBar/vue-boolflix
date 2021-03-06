var app = new Vue(
    {
        el: '#root',

        data: {
            // data ricerca 
            inputSearch: '',
            movieCards: [],
            tvShowCards: [],

            // contiene le value delle select per filtrare la ricerca, inizializzato a all 
            currentGenre: 'all',

            // array dei generi presi dall'api 
            genresArray: []
        },

        methods: {
            // funzione che chiama l'api 
            // dall'input utente arriva la chiave di ricerca 'query'
            // cerca sia serietv che film e chiama la funzione getCast
            getSearchResult(){
                axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                    params: {
                        query: this.inputSearch,
                        page: 1
                    }
                })
                .then( (response) => {
                    
                    this.movieCards = []
                    const result = response.data;
                    // this.movieCards = result.results;

                    let movieArray = result.results;

                    this.getCast(movieArray, 'movie');
 
                    
                });

                axios
                .get('https://api.themoviedb.org/3/search/tv?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                    params: {
                        query: this.inputSearch,
                        page: 1
                    }
                })
                .then( (response) => {
                    this.tvShowCards = []
                    const result = response.data;

                    let tvArray = result.results;

                    this.getCast(tvArray, 'tv');
    
                });
            },

            // gli viene passato il voto in decimi che viene dall'api
            // restituisce un valore in quinti arrotondato per ecesso
            getVoteOnFive(vote){
                const voteOnFive = Math.ceil(vote / 2)
                return voteOnFive;
            },

            // gli viene passato l'array della ricerca e il tipo di ricerca (tv/movie) 
            //cerca e riduce a 5 elementi l'array cast e lo aggiunge alle informazioni di ciascun movie/tvshow
            //popola gli array movieCards e tvShowCards
            getCast(cardArray, type){
                cardArray.forEach(element => {
                    axios
                    .get(`https://api.themoviedb.org/3/${type}/${element.id}/credits?api_key=e05661b069389f9a2788162b272f96a8`, {
                        params: {
                        
                        }
                    })
                    .then( (response) => {
                        const castNames = [];
                        let cast = response.data.cast;
                        
                        cast = cast.slice(0, 5);
                        cast.forEach(obj => {
                            castNames.push(obj.name)
                        });

                        element.cast = castNames;
                        if(type == 'movie'){
                            this.movieCards.push(element)
                        } else {
                            this.tvShowCards.push(element)
                        }
                        
                    });

                });
                 return cardArray
            },

            // passo l'arrai del risultato ricerca e l'id del genere da filtrare
            //restituisce un array filtrato per genere
            getFilteredList(cardArray, genre){
                let filteredArray = [];
                if(genre != 'all'){
                    cardArray.forEach(element => {
                        if(element.genre_ids.includes(genre)){
                            filteredArray.push(element);
                        }
                    });
                
                } else{
                   filteredArray = cardArray;
                }

                return filteredArray
                
            },

		},
 
        mounted() {
            // costruisco un array di generi con id e nome presi dall'api 

            //prendo i generi dei movie
            axios
                .get('https://api.themoviedb.org/3/genre/movie/list?api_key=7848f97dd1bd380d77cb8f9495749dba')
                .then( (response) => {
                    const result = response.data;
                    this.genresArray = result.genres;
                });
            // appendo solo i generi esclusivi dei tv-show    
            axios
            .get('https://api.themoviedb.org/3/genre/tv/list?api_key=7848f97dd1bd380d77cb8f9495749dba')
            .then( (response) => {
                const result = response.data;
                result.genres.forEach(element => {
                    if(!this.genresArray.some(genre => genre.name === element.name)){
                        console.log(this.genresArray.some(genre => genre.name === element.name))
                        this.genresArray.push(element)
                    }
                });
                console.log(this.genresArray)
            });            

        },

    });