// on click on devour button
//print devoured state
$(function () {
    $(".create-form").on("submit", function (event) {
        event.preventDefault()

        var newBurger = {
            burger_name: $("#newburger")
                .val()
                .trim(),
            devoured: 0
        }
        //POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("A new burger was added")
            location.reload()
        })
    })
    // onclick on the eat button
    $(".burger-button").on("click", function (event) {
        event.preventDefault()
        
        const id = $(this).data("id")
        var devouredState = {
            devoured: 1
        }
        //PUT or update request 
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState

        }).then(function () {
            console.log("Burger devoured")
            location.reload()
        })
    })

    //onclick on the delete button
    $(".delete-button").on("click", function (event) {
        event.preventDefault()
        var id = $(this).data("id")

        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload())
    })

    //sending the delete ajax request
  

})






