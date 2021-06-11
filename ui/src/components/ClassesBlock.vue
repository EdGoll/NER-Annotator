<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control" v-for="cl in classes" :key="cl.id">
      <div class="tags is-medium has-addons">
        <a
          class="tag is-medium"
          :class="{ 'is-link': cl.id === currentClass.id }"
          @click="setCurrentClass(cl.id)"
        >
          <span class="color-box" :style="{ backgroundColor: cl.color }"></span>
          {{ cl.name }}
        </a>
        <a class="tag is-medium is-delete" @click="removeClass(cl.id)"></a>
      </div>
    </div>

    <p class="control" v-if="showNewClassInput || classes.length === 0">
      <!-- <input
        type="text"
        class="input is-inline"
        v-model="newClassName"
        @keyup="onInputKeyup"
        placeholder="NER TAG"
      /> -->
      <!-- <button class="button is-info is-inline" @click="saveNewClass">
        Add
      </button>  -->
      <button class="button is-info is-inline" @click="loadNerTags">
        Load
      </button>
    </p>

    <!-- <p class="control">
      <button class="button is-primary" @click="showNewClassInput = true">
        <span class="icon">
          <font-awesome-icon class="fa-lg" icon="plus-square" />
        </span>
      </button>
    </p> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import json from './conf/custom-tags.json';
export default {
  name: "ClassesBlock",
  data() {
    return {
      showNewClassInput: false,
      newClassName: "",
    };
  },
  created() {
    this.loadNerTags();
  },
  computed: {
    ...mapState(["classes", "currentClass"]),
  },
  watch: {
    newClassName(now, then) {
      if (now != then) {
        this.newClassName = now.toUpperCase();
      }
    },
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    saveNewClass() {
      this.$store.commit("addClass", this.newClassName);
      this.showNewClassInput = false;
      this.newClassName = "";
    },
    onInputKeyup(e) {
      if (e.key === "Enter") {
        this.saveNewClass();
      }
    },
    loadNerTags(){
      // let tagsArray = ['M_DER' , 'M_IZQ' , 'M_AMBAS','C_SUP_EX' ,'C_SUP_IN' , 'C_INF_EX' , 'C_INF_IN' , 
      // 'C_CENTRO_SUP' , 'C_CENTRO_INF' , 'C_CENTRAL' , 'C_RETROAREOLA' , 'C_AXILAR', 'C_CENTRO_SUP', 'C_CENTRO_INF','H_MASA' , 'H_NODULO' ,
      //  'H_MICROCAL' , 'H_ASIMETRIA' , 'H_AUM_DENSIDAD' , 'H_ADENOPATIA' , 'H_DISTORSION' , 'H_ENG_CUTANEO' , 
      //  'H_RETRAC_CUTANEA' , 'H_RETRAC_PEZON','NEGACION']; 
      let tagsArray = json.tags
      tagsArray.forEach(element => 
        this.$store.commit("addClass", element)
      );
      
    },
  },
};
</script>

<style lang="css" scoped>
.color-box {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
</style>
