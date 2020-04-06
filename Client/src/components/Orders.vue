<template>
    <div class="container">
        <div class="column is-three-fourth">
        <section class="accordions">
            <article :key="index" v-for="(data, index) in orders" :class="[data.isActive?'is-active':'','accordion']">
                <div class="accordion-header toggle" @click="collapse(data)">
                    <p>Order # : {{data.id}}</p>
                </div>
                <div class="accordion-body">
                    <div class="accordion-content">
                        <div class="columns">
                    <div class="steps column is-9" id="stepsDemo">
                        <div :class="[data.state=='1'?'is-active':'','step-item']">
                            <div class="step-marker">1</div>
                            <div class="step-details">
                                <p class="step-title">Order Placed</p>
                                <p class="subtitle is-size-7">{{data.orderDate}}</p>
                            </div>
                        </div>
                        <div :class="[data.state=='2'?'is-active':'','step-item']">
                            <div class="step-marker">2</div>
                            <div class="step-details">
                                <p class="step-title">Shipped</p>
                            </div>
                        </div>
                        <div :class="[data.state=='3'?'is-active':'','step-item']">
                            <div class="step-marker">3</div>
                            <div class="step-details">
                                <p class="step-title">Out for Delivery</p>
                            </div>
                        </div>
                        <div :class="[data.state=='4'?'is-active':'','step-item']">
                            <div class="step-marker">4</div>
                            <div class="step-details">
                                <p class="step-title">Delivered</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-3 is-right">
                            <p class="is-primary content">
                                <!--<span class="icon is-small">
                                <v-icon name="location-arrow"></v-icon>
                                </span>-->
                                <span v-if="data.state != '4'" class="has-text-weight-bold has-text-black">Expected On : {{data.deliveryDate}}</span>
                                <span v-else class="has-text-weight-bold has-text-black">Delivered On : {{data.deliveryDate}}</span>
                            </p>
                            <p class="button is-primary content" v-if="data.tracking" @click="trackPackage()">
                        <span class="icon is-small">
                            <v-icon name="location-arrow"></v-icon>
                        </span>
                        <span>Track Package</span>
                        </p>
                    </div>
                </div>
                </div>
                </div>
            </article>
            
        </section>
        </div>
    </div>
    <!-- <div class="modal is-active" v-if="showModal">
<div class="modal-background"></div>
<div class="modal-card">
    <header class="modal-card-head">
            <p slot="header" class="modal-card-title">Track Package</p>
            <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
        <div id="map" style="position:relative;width:800px;height:600px;"></div>
    </section>
    <footer class="modal-card-foot">
        <slot name="footer"></slot>
    </footer>
</div>
</div> -->
</template>
<script>
   export default {
     name: 'Orders',
     components: {
     },
     data(){
       return {
         map:null,
         directionsManager:null,
         orders:[
             {
                 "id": "7890673",
                 "state":"1",
                 "isActive":true,
                 "tracking": false,
                 "orderDate":"Mar 2, 2020",
                 "deliveryDate":"Mar 4, 2020",
                 "items":[
                     {
                         "itemId":"10498",
                         "itemName":"Laptop",
                         "modelNumber":"CID12478907"
                     },
                     {
                         "itemId":"10495",
                         "itemName":"Printer",
                         "modelNumber":"CID12478907"
                     }
                 ]
             },
             {
                 "id": "8887979",
                 "state":"3",
                 "tracking": false,
                 "isActive":false,
                 "orderDate":"Mar 1, 2020",
                 "deliveryDate":"Mar 2, 2020",
                 "items":[
                     {
                         "itemId":"10498",
                         "itemName":"Laptop",
                         "modelNumber":"CID12478907"
                     },
                     {
                         "itemId":"10495",
                         "itemName":"Printer",
                         "modelNumber":"CID12478907"
                     }
                 ]
             },
             {
                 "id": "8907865",
                 "state":"3",
                 "isActive":false,
                 "tracking": true,
                 "orderDate":"Mar 1, 2020",
                 "deliveryDate":"Mar 2, 2020",
                 "items":[
                     {
                         "itemId":"10498",
                         "itemName":"Laptop",
                         "modelNumber":"CID12478907"
                     },
                     {
                         "itemId":"10498",
                         "itemName":"Laptop",
                         "modelNumber":"CID12478907"
                     }
                 ]
             },
             {
                 "id": "10006789",
                 "state":"4",
                 "isActive":false,
                 "tracking": false,
                 "orderDate":"Feb 29, 2020",
                 "deliveryDate":"Mar 2, 2020",
                 "items":[
                     {
                         "itemId":"10498",
                         "itemName":"Laptop",
                         "modelNumber":"CID12478907"
                     },
                     {
                         "itemId":"10498",
                         "itemName":"Laptop",
                         "modelNumber":"CID12478907"
                     }
                 ]
             }
         ]
       }
     },
     methods:{
         collapse(data){
             this.orders.forEach(function(order){
                 if(order.id != data.id){
                     order.isActive = false;
                 }
             });
             data.isActive = !data.isActive;
         },
         trackPackage(){
             window.open("http://localhost:8080/#/track", "_blank");
         }
     }
  }
</script>
<style>
   #app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
   margin-top: 60px;
   }
   .steps .step-item:not(:first-child)::before {
    height: .2em;
    width: 100%;
    bottom: 0;
    left: -50%;
    top: 1rem;
    background: #b5b5b5 !important;
}
</style>