<template>
  <div id="game" v-if="game">
    <div class="sidebar-bg"></div>
    <div class="container game-horizontal-page">
      <aside class="sidebar">
        <Categories
          class="categories"
          :categories="game.categories"
          :active="category"
          @CategoryClick="onCategoryClick"
        />
      </aside>
      <div class="column content">
        <div class="container">
          <header class="content-header">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li
                  v-for="(b, i) in breadcrumbs"
                  :key="i"
                  :class="b.active ? 'is-active' : ''"
                >
                  <router-link :to="b.to">{{ b.text }}</router-link>
                </li>
              </ul>
            </nav>
          </header>
          <div class="seperator"></div>
          <div class="sub-categories" v-if="subcategories.length">
            <Subcategory
              v-for="(subc, i) in subcategories"
              :key="i"
              :variable="subc"
            />
          </div>
          <div class="content-main">
            <Leaderboard :game="game" :category="category" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import Subcategory from "@/components/Subcategory.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  data: () => ({
    game: null,
    category: Object.apply(null)
  }),
  components: {
    Categories,
    Subcategory,
    Leaderboard
  },
  methods: {
    onCategoryClick(category) {
      this.category = category;
      this.updateHash(category);
    },
    updateHash(category) {
      window.location.replace("#" + category.hash);
    },
    getCategoryFromHash() {
      return this.game.categories.find(category => {
        return window.location.hash === `#${category.hash}`;
      });
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: "Leaderboards",
          to: { name: "games" }
        },
        {
          text: this.game.name,
          to: {},
          active: true
        },
        {
          text: this.category.name,
          to: {},
          active: true
        }
      ];
    },
    subcategories() {
      return this.game
        .getSubcategories()
        .filter(v => v.category === this.category.id);
    }
  },
  async mounted() {
    this.game = await this.$speedsouls.getGame(this.$route.params.abbreviation);
    this.category = this.getCategoryFromHash() || this.game.categories[0];
    console.log(this.game);
  }
};
</script>

<style scoped>
#game {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
.game-horizontal-page {
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 18rem;
  padding: 2rem 1rem;
  background: #f5f5f5;
}

.sidebar-bg {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 50%;
  z-index: -1;
  background: #f5f5f5;
}

.sidebar .categories {
  position: sticky;
  top: 1rem;
}

.content {
  background: #fff;
  padding: 0 2rem;
}

.content .content-header {
  padding: 2rem 0;
}

.content .content-header .breadcrumb > ul {
  margin: 0;
}

.content .content-header .breadcrumb > ul > li {
  margin-top: 4px;
}

.content .seperator {
  border-bottom: 1px solid #f5f5f5;
}

.content .sub-categories {
  margin-top: 2rem;
}

.content .content-main {
  padding: 2rem 0;
}
</style>