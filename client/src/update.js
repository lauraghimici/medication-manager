function run() {
    new Vue({
        el: '#update',
        data: {
            id: '',
            message: '',
            med: {},
        },
        created: function() {

            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);
            this.id = params.get("id");
            axios.get('http://localhost:3000/medication/' + this.id).then(
                (response) => {
                    this.med = response.data;
                }
            );
        },
        methods: {
            updateMed: function() {
                axios.put('http://localhost:3000/medication', this.med).then(
                    response => {

                        console.log(response);
                        this.medication = response.data;

                    }

                );


            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});