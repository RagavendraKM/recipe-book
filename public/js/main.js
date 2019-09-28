$(document).ready(() => {
    $(".delete-recipe").on("click", function() {
      var id = $(this).data("id");
      console.log(id);
      var url = `/delete/+${id}`;
      if (confirm("Delete recipe?")) {
        $.ajax({
          url: url,
          type: "DELETE"
        })
          .done((window.location.href = "/"))
          .fail(err => err.flash);
      }
    });
  
    $(".edit-recipe").on("click", function() {
      $("#edit-form-id").val($(this).data("id"));
      $("#edit-form-rname").val($(this).data("rname"));
      $("#edit-form-r_ingredients").val($(this).data("r_ingredients"));
      $("#edit-form-r_steps").val($(this).data("r_steps"));
    });

  });