///// STEP1. define var
var character = ["darth vader", "batman", "spider man", "gandalf", "joker", "iron man", "yoda", "jack sparrow", "harry potter", "elsa"]

///// STEP2. function to create buttons
function createButton() {
    // empty button container
    $("#button-container").empty()

    // for all elements in character array,
    for (var i = 0; i < character.length; i++) {
        // create new buttons and update the text of buttons to each elements in upper case
        var newButton = $("<button>").text(character[i].toUpperCase())

        // give buttons new attribution
        newButton.attr("class", "character-button btn btn-outline-primary mb-2 mr-2")
        newButton.attr("button-value", character[i])

        // append buttons in button container
        $("#button-container").append(newButton)
    }
}

createButton()

///// STEP3. when user click add button
$("#add-button").on("click", function (event) {
    // prevent default behavior of submit button
    event.preventDefault()

    // define var for what user entered
    var userCharacter = $("#user-type").val().trim();

    // it user enter existing character
    if (character.includes(userCharacter.toLowerCase())) {
        alert("We've already had that character!")
    }

    // if user enter new character
    else {
        // push user typed character in character array in lower case
        character.push(userCharacter.toLowerCase())

        // create new button
        createButton()
    }

})


///// STEP4. when user click character button (ajax call)
$(document).on("click","button", function () {
    // get the value of the button which user clicked
    var userClicked = $(this).attr("button-value")
    console.log(userClicked)

    // make the giphy API link with word that user clicked
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userClicked + "&api_key=qPTtrLiqDgaiJctHqDQybl9Y5KcImg1w&limit=10"
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (var i = 0; i < 10; i++) {
            // from the JSON object, find the url of still image in fixed height
            var stillImageUrl = response.data[i].images.fixed_height_still.url
            var animateImageUrl = response.data[i].images.fixed_height.url


            // create new image tag and add src
            var imageTag = $("<img>").attr("src", stillImageUrl)

            // add status attributes to stop and animate the images
            imageTag.attr("status", "still")

            // add stillImageUrl & animateImageUrl for future use
            imageTag.attr("still-image-url",stillImageUrl)
            imageTag.attr("animate-image-url",animateImageUrl)

            // add bootstrap class to have margins 
            imageTag.attr("class","mb-2 mr-2")


            // append image in image container
            $("#image-container").prepend(imageTag)
        }

    })
})


///// STEP5. when user click images
$(document).on("click", "img", function () {
    console.log(this)

    // define var for image status, still and animate image src
    var imageStatus = $(this).attr("status")
    var stillImageSrc = $(this).attr("still-image-url")
    var animateImageSrc = $(this).attr("animate-image-url")


    // if image is still, 
    if (imageStatus === "still") {
        // change the status to animate
        $(this).attr("status","animate")

        // and update the src to animate src
        $(this).attr("src",animateImageSrc)
    }

    // if image is animate
    if (imageStatus === "animate") {
        // change the status to still
        $(this).attr("status","still")

        // and update the src to still src
        $(this).attr("src",stillImageSrc)
    }
})