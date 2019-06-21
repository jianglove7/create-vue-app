<template>
    <div class="contrainer">
            <h1>{{text}}</h1>
    </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'hello world'
    };
  },
};
</script>

<style lang="scss" scoped>
.contrainer{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;  
}
</style>