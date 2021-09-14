const API_ENDPOINT = "http://localhost:4567";

// Converts data from form serialized array into object
function serializedArrToObj(arr) {
  return arr.reduce(function (acc, obj) {
    return { ...acc, [obj.name]: obj.value };
  }, {});
}

function getPercent(n, d) {
  return ((n / d) * 100).toFixed(1);
}

function getAverageFromArr(arr) {
  const total = arr.reduce(function (acc, val) {
    return acc + val;
  }, 0);

  return total / arr.length;
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
  function addProduct(product) {
    $("#productName").html(product.name);
    $("#productDescription").html(product.description);
    $(".product__image").attr("src", product.image);
  }
  function addReview(review) {
    $(".reviews").prepend(
      `
      <li class="review">
        <div class="rating">
          <div class="rating__stars">
            <div class="rating__stars--filled" style="width: ${getPercent(
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
  function addReviews(reviews) {
    $.each(reviews, function (_, review) {
      addReview(review);
    });

    $("#numReviews").html(reviews.length);

    const ratings = reviews.map(function (r) {
      return r.rating;
    });
    const average = getAverageFromArr(ratings);

    $("#averageRating").css("width", `${getPercent(average, 5)}%`);
  }

  function getProductSuccess(data) {
    const product = JSON.parse(data);
    const reviews = product.reviews;

    addProduct(product);
    addReviews(reviews);
  }

  function getProductError(error) {
    console.log(error);
  }

  function getProduct(successCallback, errorCallback) {
    $.ajax(`${API_ENDPOINT}/products/1`, {
      method: "GET",
      success: successCallback,
      error: errorCallback,
    });
  }

  function resetCreateReviewForm() {
    $("#createReviewForm").trigger("reset");
  }

  getProduct(getProductSuccess, getProductError);

  $("#createReviewForm").on("submit", function (e) {
    e.preventDefault();

    const data = getFormData($(this));

    submitForm(
      `${API_ENDPOINT}/reviews`,
      data,
      onReviewCreateSuccess,
      onReviewCreateError
    );
  });
});
