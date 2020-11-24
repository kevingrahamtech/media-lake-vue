<template>
    <footer>
        <section class="row justify-content-around py-5">

            <div class="col-11 col-md-4 col-lg-3 pb-4">
                <div id="social-links">
                <a href="https://github.com/kevingrahamtech"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="col-5 col-md-4 col-lg-3 text-left">
                <div class="mb-2">
                <span>Powered By</span>
                </div>
                <div class="col-8">
                <img id="tmdb-logo" src="../assets/primary-short.svg">
                </div>
            </div>
        </section>
    </footer>
</template>

<script>
export default {
    name: "MainFooter"
}
</script>

<style scoped>
footer {
    border-top: 1px solid #42b983;
}
#social-links {
        font-size: 3rem;
    }
</style>