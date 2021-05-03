var app = new Vue(
    {
        el: '#root',

        data: {
            inputSearch: '',
            movieCards: [],
            tvShowCards: [],
            discoverMovies: [],
            discoverTvShows: [],

            // contengono le value delle select per filtrare la ricerca, inizializzato a all
            currentGenreMovie: 'all',
            currentGenreTv: 'all',
            // array dei generi presi dall'api
            movieGenres: [],
            tvGenres: [],
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

                    let movieArray = result.results;

                    this.getCast(movieArray, 'movie', 'search');


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

                    this.getCast(tvArray, 'tv', 'search');

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
            getCast(cardArray, type, section){
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
                      if(section == 'search'){
                        if(type == 'movie'){
                            this.movieCards.push(element)
                        } else {
                            this.tvShowCards.push(element)
                        }
                      } else{
                        if(type == 'movie'){
                            this.discoverMovies.push(element)
                        } else {
                            this.discoverTvShows.push(element)
                        }
                      }
                      

                    });

                });

            },

            
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
            axios
                .get('https://api.themoviedb.org/3/genre/movie/list?api_key=7848f97dd1bd380d77cb8f9495749dba')
                .then( (response) => {
                    const result = response.data;
                    this.movieGenres = result.genres;
                });
            axios
            .get('https://api.themoviedb.org/3/genre/tv/list?api_key=7848f97dd1bd380d77cb8f9495749dba')
            .then( (response) => {
                const result = response.data;
                this.tvGenres = result.genres;
            });

            // preacarico la pagina con una chiamata api discover
            axios
            .get('https://api.themoviedb.org/3/discover/tv?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                params: {

                }
            })
            .then( (response) => {

                this.discoverTvShows = []
                const result = response.data;

                let tvArray = result.results;

                this.getCast(tvArray, 'tv', 'discovery');
            });

            axios
                .get('https://api.themoviedb.org/3/discover/movie?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                    params: {

                    }
                })
                .then( (response) => {
                    this.discoverMovies = []
                    const result = response.data;
    
                    let movieArray = result.results;
    
                    this.getCast(movieArray, 'movie', 'discovery');
                });
        },

    });
