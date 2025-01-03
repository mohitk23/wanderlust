(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
<<<<<<< HEAD
  })()

 
    // let filter = document.getElementsByClassName(filter)
    //   filter.addEventListener("click", ()=>{
    //     console.log("click it!")
    //   })
=======
  })()
>>>>>>> 2fd7c92b491d92b3fbcb7bbe08c3aa8f68be8479
