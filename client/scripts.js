// Converts data from form serialized array into object
function serializedArrToObj(arr) {
  return arr.reduce(function (acc, obj) {
    return { ...acc, [obj.name]: obj.value };
  }, {});
}

function getRoundedPercent(n, d) {
  return Math.round((n / d) * 100);
}

$(document).ready(function () {
  function submitForm(url, data, successCallback, errorCallback) {
    $.ajax(url, {
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json",
      method: "POST",
      success: successCallback,
      error: errorCallback,
    });
  }
  function getFormData(form) {
    const serializedArray = form.serializeArray();
    return serializedArrToObj(serializedArray);
  }
  function onReviewCreateSuccess(data) {
    addReview(data);
    resetCreateReviewForm();
  }
  function onReviewCreateError(error) {
    console.log(error);
  }
  function addReview(review) {
    $(".reviews").prepend(
      `
      <li class="review">
        <div class="rating">
          <div class="rating__stars">
            <div class="rating__stars--filled" style="width: ${getRoundedPercent(
              review.rating,
              5
            )}%">
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
            </div>
            <div class="rating__stars--empty">
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
              <svg><use href="#star"></use></svg>
            </div>
          </div>
          <span>${review.rating} / 5</span>
        </div>
        <p>${review.description}</p>
      </li>
      `
    );
  }

  function resetCreateReviewForm() {
    $("#createReviewForm").trigger("reset");
  }

  $("#createReviewForm").on("submit", function (e) {
    e.preventDefault();

    const data = getFormData($(this));

    submitForm(
      "http://localhost:4567/reviews",
      data,
      onReviewCreateSuccess,
      onReviewCreateError
    );
  });
});
