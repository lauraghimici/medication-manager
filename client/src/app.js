function run() {
    new Vue({
        el: '#app',
        data: {
            medication: [],
            medicationService: null,
            id: '',
            name: '',
            info: '',
            image: '',
            brand: '',
            quantity: '',
            price: '',
            expirationDate: '',
            productionDate: '',
            activeSubstance: ''

        },
        created: function() {
            this.medicationService = medication();
            this.medicationService.get().then(response => (this.medication = response.data));
        },
        methods: {
            deleteMed: function(index) {
                axios.delete('http://localhost:3000/medication/' + index).then(() => {
                    console.log('deleted from server')
                    this.medicationService.get().then(response => {
                        this.medication = response.data;

                    });


                });
            },
            addMed: function() {
                console.log("hello addMed");
                axios.post('http://localhost:3000/medication', {
                    id: this.id,
                    name: this.name,
                    info: this.info,
                    image: this.image,
                    brand: this.brand,
                    quantity: this.quantity,
                    price: this.price,
                    expirationDate: this.expirationDate,
                    productionDate: this.productionDate,
                    activeSubstance: this.activeSubstance
                }).then(() =>
                    this.medicationService.get().then(response => {
                        this.medication = response.data;
                        window.location.reload()
                    }),

                );
            },
        }
    });

}

document.addEventListener('DOMContentLoaded', () => {
    run();
});