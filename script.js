document.addEventListener("DOMContentLoaded", function() {
    let blogForm = document.getElementById("add-blog-form");
    let blogTitleInput = document.getElementById("blog-title");
    let blogContentInput = document.getElementById("blog-content");
    let blogsList = document.getElementById("blogs");
  
    // Retrieve blog posts from local storage
    let savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  
    // Populate the initial blog list
    savedBlogs.forEach(function(blog) {
      addBlog(blog.title, blog.content);
    });
  
    blogForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
  
      let title = blogTitleInput.value;
      let content = blogContentInput.value;
  
      if (title && content) {
        addBlog(title, content);
        clearInputs();
        saveToLocalStorage(); // Save the updated list to local storage
      }
    });
  
    function addBlog(title, content) {
      let blogItem = document.createElement("li");
      blogItem.classList.add("blog-item");
  
      let titleElement = document.createElement("h2");
      titleElement.textContent = title;
  
      let contentElement = document.createElement("p");
      contentElement.textContent = content;
  
      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function() {
        editBlog(blogItem);
      });
  
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this blog post?")) {
          deleteBlog(blogItem);
          saveToLocalStorage(); // Save the updated list to local storage
        }
      });
  
      blogItem.appendChild(titleElement);
      blogItem.appendChild(contentElement);
      blogItem.appendChild(editButton);
      blogItem.appendChild(deleteButton);
  
      blogsList.appendChild(blogItem);
    }
  
    function editBlog(blogItem) {
      let titleElement = blogItem.querySelector("h2");
      let contentElement = blogItem.querySelector("p");
  
      let newTitle = prompt("Enter the new title:", titleElement.textContent);
      let newContent = prompt("Enter the new content:", contentElement.textContent);
  
      if (newTitle !== null && newContent !== null) {
        titleElement.textContent = newTitle;
        contentElement.textContent = newContent;
        saveToLocalStorage(); // Save the updated list to local storage
      }
    }
  
    function deleteBlog(blogItem) {
      blogsList.removeChild(blogItem);
      saveToLocalStorage(); // Save the updated list to local storage
    }
  
    function clearInputs() {
      blogTitleInput.value = "";
      blogContentInput.value = "";
    }
  
    // Function to save the list of blogs to local storage
    function saveToLocalStorage() {
      let blogItems = Array.from(blogsList.querySelectorAll(".blog-item"));
      let blogs = blogItems.map(function(blogItem) {
        let titleElement = blogItem.querySelector("h2");
        let contentElement = blogItem.querySelector("p");
        return {
          title: titleElement.textContent,
          content: contentElement.textContent
        };
      });
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  });
  