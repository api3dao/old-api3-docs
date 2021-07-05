<template>
  <div>
      <!-- This hidden block calculates the running badge total for the page -->
      <span style="display:none;">
      {{$page.todoCnt}} 
      {{$page.todoCnt = $page.todoCnt + 1}}
      {{$page.todoCnt}}
      </span>

      <!-- badge total fixed on top left -->
      <span class="badgeCnt"><Badge
        type="tip" :text="'Todos: '+$page.todoCnt" 
        vertical="top" />
      </span>

      <!-- The slot -->
      <div  class="borderRed">
        <span><Badge 
          style="padding-top:0px;backgroundColor:red;" 
          type="tip" :text="'Todo: '+$page.todoCnt" 
          vertical="top" />
        </span>
        <a v-show="issueID" :href="githubURL" target="github">
          GitHub Issue: #{{issueID}}
        </a>
        <div style="margin-top:-10px;margin-bottom:-10px;"><slot>Todo:</slot></div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'todo',
    props: {issueID:Number},
    data: () => ({
      githubURL:String,
    }),
    mounted() {
      this.$nextTick(function () {
        this.$page.todoCnt = 0 // Needed here and beforeMount
        this.githubURL = "https://github.com/api3dao/api3-docs/issues/"+this.issueID
      })
    },
    beforeUpdate() {
      this.$nextTick(function () {
        this.$page.todoCnt = 0 // Needed here and mounted
        //console.log('> beforeUpdate', this.$page)
      })
    }
  }
</script>

<style scoped>
.borderRed{
  padding-top:5px;
  color:#404040;
  border:dotted red 2px;
  padding-left:5px;
}
.badgeCnt {
  position:fixed;
  top:59px;
  right:10px;
  z-index:999;
}
a{
  float:right;
  padding-right:20px;
}
</style>