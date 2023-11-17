---
title: "Using Quill JS in Laravel. Also, fixing the ops.insert is a null issue when setting the contents with quill.setContents(data)."
description: "How we wrap our head around the unknown"
publishedDate: "May 12 2020"
updatedDate: "May 12 2020"
isFeatured: true
tags: ['Quill', 'Laravel','Vue','Javascript']
heroImage:
    url: ""
    alt: ""
---
I have recently added Quill JS to one of my Laravel projects. I made a JSON column to save the details.
``````
// migration
$table->json('syllabus')->nullable();
``````
The installation is straight forward. Just get the CSS and JS of Quill and import in the page you need. Since I only use in two places of the application. I used sections to add them.
``````
@section('styles')
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
@endsection
@section('scripts')
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
@endsection
``````
I need it to edit the contents and also display the contents. So I have created a Vue component.

``````
<template>
  <section>
    <div id="editor-container" style="font-family: inherit; font-size: inherit;">
    </div>
    <button class="btn btn-secondary mt-3" v-on:click.prevent="updateSyllabus" v-if="canEdit">Update Syllabus</button>

    <p v-if="syllabusUpdated" class="mt-3"><i class="fas fa-check text-success"></i> Syllabus updated. Redirecting back to course...</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quill: '',
      syllabusUpdated: false,
    }
  },
  props: ["url", "redirectUrl", "canEdit", "syllabus"],
  mounted() {
    let options;
    if (this.canEdit) {
      options = {
        placeholder: 'Add detailed syllabus here...',
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ]
        }
      };
    } else {
      options = {
        readOnly: true
      };
    }
    this.quill = new Quill('#editor-container', options);
    if (this.syllabus != "") {
      let editedSyllabus = JSON.parse(this.syllabus);
      editedSyllabus.ops.forEach(item => {
        if (typeof item.insert != "string") {
          item.insert = "\n";
        }  
      });
      this.quill.setContents(editedSyllabus);
    }
  },
  methods: {
    updateSyllabus() {
      console.log(this.quill.getContents());
      axios.post(this.url, {
        syllabus: this.quill.getContents()
      })
      .then(response => {
        console.log(response);
        if (response.data.status == 'ok') {
          this.syllabusUpdated = true;
          window.setTimeout(() => location.href = this.redirectUrl, 2000);
        }
      })
      .catch(errors => {
        alert('Something went wrong.');
      });
    }
  }
}
</script>

``````
Fixing the insert is null error
Quill saves the details in a JSON object. Whenever there is a new line, it adds “\n” to theinsert key.

We can directly send the data with axios and save it on the database. When we want to show the details, we just grab the data from the database, parse it and give to the quill with quill.setContents(dataFromDatabase).

The issue comes here. By default, Laravel trims the empty values using TrimStrings and ConvertEmptyStringsToNull middlewares.

When we send the data from axios, Laravel is catching it and looking deep into the object and changing the “\n” values to “null.”

One way to fix is to remove those two middlewares from the global middleware object; which is not a good option to do. So, instead, we should parse those null values in the front-end.

``````

this.quill = new Quill('#editor-container', options);
if (this.syllabus != "") {                             
let editedSyllabus = JSON.parse(this.syllabus); 
// we are looping through the entire object and changing null values back to "\n"                                                 
editedSyllabus.ops.forEach(item => {                               if (typeof item.insert != "string") {                                 
item.insert = "\n";                               }                              
 });
// And set the new contents                                               
  this.quill.setContents(editedSyllabus);
``````