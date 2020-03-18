<template>
    <div id="all">
      <iframe :src="url" id="mobsf"
              frameborder="0"
              border="0"
              marginwidth="0"
              marginheight="0"
              scrolling="no"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowfullscreen="true"
              allowusermedia="true"
              allowpaymentrequest="true"
              allowtransparency="true"
              style="width:100%;height: 100%"></iframe>
    </div>
</template>

<script>
  export default {
    name: 'InnerPlayer',
    props: {
      url: String,
      required: true
    },
    data(){
      return{
        htmlContent:""
      }
    }
  }
</script>

<style scoped>
  #all{
    background-color: black;
    width:100%;
    height: 100%;
  }

</style>
