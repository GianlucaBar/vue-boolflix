var app = new Vue(
    {
        el: '#root',

        data: {
            albums: [],
            inputSearch: '',
            movieCards: []
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
                    console.log(result.results)
                });
            }

            // getLangFlag(){
            //     return 'img/flags/' + card.original_language + '.svg';
            // }
		},

        // mounted() {
        //         
        // },

    });