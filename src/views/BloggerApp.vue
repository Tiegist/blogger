<template>
  <nav>
    <div class="w-screen bg-zinc-300 h-12 fixed flex">
      <router-link to="/BloggerApp">
        <img src="/logoOfBlog.jpg" alt="Logo" class="lg:w-14 lg:ml-1 cursor-pointer w-14 ml-1">
      </router-link>
      <router-link to="/BlogPost" class="text-md cursor-pointer text-green-700 ml-44 mt-3">about</router-link>
      <router-link to="/BlogPost" class="text-md cursor-pointer text-green-700 mt-3 ml-4">contact</router-link>
    </div>
  </nav>

  <div class="mb-32">
    <div class="font-serif flex">
      <img src="/homeblog.jpg" alt="Home Blog"
        class="lg:ml-32 lg:pt-20 lg:rounded-full lg:w- ml-2 pt-16 w-40 rounded-full">
      <p class="lg:text-4xl lg:ml-32 lg:mt-40 mt-24 font-bold">Share your voice with us!</p>
    </div>
    <div class="mt-8">
      <router-link to="/BlogPost"
        class="ml-10 p-4 mt-6 border-2 border-green-600 rounded-full bg-zinc-200 cursor-pointer">new to the
        site</router-link>
    </div>
    <div class="ml-4 mr-4 mt-3 border-2 border-green-600 font-serif rounded-full p-2 hover:scale-105 cursor-pointer">
      <p class="text-center">
        <span class="font-bold text-green-900">Have a passion for writing?</span><br>
        <span class="font-semibold text-green-800">A story to tell?</span>
      </p>
    </div>
    <div class="flex">
      <img src="/blogwith computer.webp" alt="" class="w-32 h-32 mt-4 ml-4 rounded-r-xl rounded-t-xl">
      <div
        class="ml-8 mr-4 border-2 border-green-600 -mt-2 font-serif rounded-full p-4 w-44 hover:scale-105 cursor-pointer bg-zinc-300">
        <p class="text-center p-1">Share your insights, experiences, and creativity with our community!</p>
      </div>
    </div>

    <button @click="displayForm" class="ml-28 mt-4 text-white bg-green-800 py-2 px-8 rounded-md font-serif">Post
      Blog</button>
    <div v-if="showform" class="mt-4 ml-2 mr-2 shadow-md bg-cyan-700 rounded-md py-6 px-4 font-serif">
      <label for="blog-title" class="ml-1 text-white">Enter blog title</label>
      <input type="text" v-model="title" class="w-80 py-2 mb-2 rounded-lg bg-zinc-200 outline-cyan-600">
      <label for="blog-content" class="ml-1 text-white">Your content</label>
      <textarea type="text" v-model="content" class="w-80 py-2 rounded-lg bg-zinc-200 outline-cyan-600 p-4"></textarea>
      <div class="ml-10 ">
        <label class="font-serif text-md text-black -ml-10">Photo:</label><br />
        <input type="file" @change="handlephoto" name="photo"
          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-64 mr-10 -ml-10" /><br />
      </div>
      <button @click="post"
        class="btn rounded-md py-2 px-6 ml-28 border-2 border-white mt-4 text-white font-semibold">submit</button>
    </div>
    <div class="lg-flex">
      <div v-for="(blog, index) in blogs" :key="index"
        class="shadow-md ml-4 mr-4 px-4 pt-16 pb-4 bg-zinc-200 mt-8 mb-10 font-serif lg:flex">
        <div class="">
          <p class="font-bold text-lg ml-6 -mt-10">{{ blog.title }}</p>
          <img v-if="blog.photo" :src="blog.photo" alt="upload photo" class="w-56 ml-10 mb-4 rounded-full ">
          <p class="font-">{{ blog.content }}</p>
          <div class="flex">
            <i v-if="!writeComment" @click="handleComment(); displayComment(blog)" class="pi pi-comments ml-2 mr-40 text-xl mt-6"></i>
            <div v-if="writeComment" class=" mt-4">
              <input type="text" v-model="comment" placeholder="Write a comment..."
                class="rounded-md p-1 outline-green-600 w-64 mr-4" />
              <button @click="submitComment(blog)" class="border-2 border-green-700 px-4 rounded-md mt-2 hover:scale-105">submit</button>
              <button v-if="writeComment" @click="handleCancle" class="px-2 ml-4 rounded-md border-2 border-zinc-500">cancle</button>
              <div>
                <p v-for="comment in comments" :key="comment">{{ comment }}</p>
              </div>
            </div>
            <div v-if="!writeComment" class="flex -ml-10"> 
              <i @click="toggleLike(blog)" class="pi pi-thumbs-up-fill mr-8  mt-6 -ml-4 text-xl" :class="{
              'text-blue-500': blog.liked,
              'pi-thumbs-up': !blog.liked
            }"></i>
              <p class="mt-6 -ml-6 mr-8">{{ count }}Likes</p>
            </div>
            <button v-if="!writeComment" @click="toggleLove(blog)" class="px-4 py-2 rounded-lg bg-red-600 text-white mt-4 -ml-6" :class="{
              'bg-zinc-500': blog.subscribed,
              'bg-red-500': !blog.subscribed
            }">{{ blog.subscribed ? 'subscribed' : 'subscribe' }}</button>
            <div class="flex mt-10">
              <p v-if="!writeComment">{{ countsub }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showPost: false,
      writeComment: false,
      comments:[],
      title: '',
      content: '',
      comment:'',
      photo: '',
      showform: false,
      feedbacks: ['like', 'heart'],
      blogs: [],
      count: null,
      countsub: null,
    };
  },
  mounted() {
    this.loadBlogs()
  },
  methods: {
    handleComment() {
      this.writeComment = true
    },
    displayForm() {
      this.showform = true;
    },
    handleCancle(){
      this.writeComment =false
    },
    displayComment(){
      const savedComments = JSON.parse(localStorage.getItem('comments'))
      this.comments = savedComments
    },
    submitComment(blog){
      if(this.comment.trim()){
        this.comments.push(blog)
      localStorage.setItem('comments',JSON.stringify(this.comment))
      this.comment =''
      }
    },
    loadBlogs() {
      const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
      this.blogs = savedBlogs
    },
    post() {
      const newBlog = {
        title: this.title,
        content: this.content,
        photo: null,
      }
      if (this.photo) {
        const reader = new FileReader();
        reader.onload = () => {
          newBlog.photo = reader.result
          this.saveBlog(newBlog)
        }
        reader.readAsDataURL(this.photo)
      } else {
        this.saveBlog(newBlog)
      }
      this.title = ''
      this.content = ''
      this.photo = ''
    },
    saveBlog(blog) {
      this.blogs.push(blog)
      localStorage.setItem('blogs', JSON.stringify(this.blogs))
      this.loadBlogs()
    },
    handlephoto(event) {
      const file = event.target.files[0]
      if (file) {
        this.photo = event.target.files[0]
        console.log(this.photo)
      }
    },
    countLike(blog) {
      if (blog.liked) {
        this.count++
      }
    },
    countSubscribe(blog) {
      if (blog.subscribed && this.countsub < 1) {
        this.countsub++
      }
    },
    toggleLike(blog) {
      blog.liked = !blog.liked
      this.countLike(blog)
    },
    toggleLove(blog) {
      blog.subscribed = !blog.subscribed
      this.countSubscribe(blog)
    }
  }
}
</script>

<style></style>