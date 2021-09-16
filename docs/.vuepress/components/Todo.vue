<!--
  The caller should wrap their slot content with <p></p> tags to prevent errors 
  when using from markdown.

  2021-08-03: wkande: Commented out the GitHub link feature that was displayed 
  in the upper right hand corner.

  2021-09-17: wkande: THIS COMPONENT IS DEPRECATED, USE FIX INSTEAD
-->

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
      <div class="borderGreen">
        <span style="color:red">
          This component is depreacted, use the Fix component instread.
        </span>
        <br/>
        <span><Badge 
          style="padding-top:0px;" 
          type="tip" :text="'Todo: '+$page.todoCnt" 
          vertical="top" /><slot></slot>
        </span>
        <!--a v-show="issueID" :href="githubURL" target="github">
          GitHub Issue: #{{issueID}}
        </a-->
        <!--span style="margin-top:-10px;margin-bottom:-10px;"-->
          
        <!--/span-->
      </div>
  </div>
</template>

<script>
  export default {
    name: 'todo',
    //props: {issueID:Number},
    data: () => ({
      githubURL:String,
    }),
    mounted() {
      this.$nextTick(function () {
        this.$page.todoCnt = 0 // Needed here and in beforeMount()
        //this.githubURL = "https://github.com/api3dao/api3-docs/issues/"+this.issueID
      })
    },
    beforeUpdate() {
      this.$nextTick(function () {
        this.$page.todoCnt = 0 // Needed here and in mounted()
      })
    }
  }
</script>

<style scoped>
.borderGreen{
  padding-top:5px;
  color:#404040;
  border:solid green 2px;
  background-color:rgb(209, 238, 209);
  padding-left:5px;
}
.badgeCnt {
  position:fixed;
  top:59px;
  right:10px;
  z-index:999;
}
/*a{
  float:right;
  padding-right:20px;
}*/
</style>