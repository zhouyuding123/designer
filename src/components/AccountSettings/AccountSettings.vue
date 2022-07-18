<template>
    <div>
        <div class="headerBody">
            <div> </div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {
        console.log(localStorage.data);
    }
}
</script>

<style lang="less" scoped>
@import url("./AccountSettings.less");
</style>