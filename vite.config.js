import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  //plugins: [Pages()],
  build: {
    outDir: "../dist",
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        to_watch: resolve(__dirname, "src/to-watch/index.html"),
        movie_page: resolve(__dirname, "src/movie/index.html"),
        confi: resolve(__dirname, "src/confi/index.html"),
        header_template: resolve(__dirname, "src/partials/header.html"),
        footer_template: resolve(__dirname, "src/partials/footer.html"),
        pdp_movie_data_template: resolve(
          __dirname,
          "src/partials/pdp.movie.data.template.html",
        ),
      },
    },
  },
});
