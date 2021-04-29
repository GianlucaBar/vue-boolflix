var app = new Vue(
    {
        el: '#root',

        data: {
            albums: [],
            inputSearch: '',
            movieCards: [],
            tvShowCards: []
        },

        methods: {
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
                    console.log(result.results)
                });
            }

		},

        // mounted() {
        //         
        // },

    });