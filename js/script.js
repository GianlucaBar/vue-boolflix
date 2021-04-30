var app = new Vue(
    {
        el: '#root',

        data: {
            inputSearch: '',
            movieCards: [],
            tvShowCards: []
        },

        methods: {
            // funzione che chiama l'api 
            // dall'input utente arriva la chiave di ricerca 'query'
            // cerca sia serietv che film e pusha nei rispettivi array
            getSearchResult(){
                axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                    params: {
                        query: this.inputSearch,
                        page: 1
                    }
                })
                .then( (response) => {
                    const result = response.data;
                    
                    this.movieCards = result.results;
                });

                axios
                .get('https://api.themoviedb.org/3/search/tv?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                    params: {
                        query: this.inputSearch,
                        page: 1
                    }
                })
                .then( (response) => {
                    const result = response.data;
                    
                    this.tvShowCards = result.results;
                });
            },

            // gli viene passato il voto in decimi che viene dall'api
            // restituisce un valore in quinti arrotondato per ecesso
            getVoteOnFive(vote){
                const voteOnFive = Math.ceil(vote / 2)
                return voteOnFive;
            }

		},

        mounted() {
            axios
            .get('https://api.themoviedb.org/3/discover/tv?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                params: {
        
                }
            })
            .then( (response) => {
                const result = response.data;
                
                this.tvShowCards = result.results;
            });
            
            axios
                .get('https://api.themoviedb.org/3/discover/movie?api_key=7848f97dd1bd380d77cb8f9495749dba', {
                    params: {
    
                    }
                })
                .then( (response) => {
                    const result = response.data;
                    
                    this.movieCards = result.results;
                });
        },

    });